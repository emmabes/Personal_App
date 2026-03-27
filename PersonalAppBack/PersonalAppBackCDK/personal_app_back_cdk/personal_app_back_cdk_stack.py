import os
import shutil
import subprocess

from aws_cdk import BundlingOptions, CfnOutput, DockerImage, Duration, ILocalBundling, Stack, RemovalPolicy
from aws_cdk import aws_lambda as _lambda
from aws_cdk import aws_secretsmanager as secretsmanager
from aws_cdk import aws_apigateway as apigw
from aws_cdk import aws_cognito as cognito
from aws_cdk import aws_iam as iam
from aws_cdk import aws_wafv2 as wafv2
from constructs import Construct
import jsii


@jsii.implements(ILocalBundling)
class PythonLocalBundling:
    def try_bundle(self, output_dir: str, *, image, entrypoint=None, command=None,
                   volumes=None, environment=None, working_directory=None,
                   user=None, security_opt=None, network=None,
                   bundling_file_access=None) -> bool:
        source_dir = os.path.join(
            os.path.dirname(__file__), "..", "lambda_funcs", "sign_url"
        )
        subprocess.check_call([
            "pip", "install", "cryptography", "cffi",
            "--platform", "manylinux2014_x86_64",
            "--implementation", "cp",
            "--python-version", "312",
            "--only-binary=:all:",
            "-t", output_dir, "-q",
        ])
        for item in os.listdir(source_dir):
            src = os.path.join(source_dir, item)
            dst = os.path.join(output_dir, item)
            if os.path.isdir(src):
                shutil.copytree(src, dst, dirs_exist_ok=True)
            else:
                shutil.copy2(src, dst)
        return True


class PersonalAppBackCDKStack(Stack):
    def __init__(self, scope: Construct, construct_id: str, env_config: dict = None, **kwargs) -> None:
        super().__init__(scope, construct_id, **kwargs)
        env_config = env_config or {}

        signing_secret = secretsmanager.Secret.from_secret_name_v2(
            self, "CfSigningKey", "personal_app_cf_signing_key"
        )

        key_pair_id_secret = secretsmanager.Secret.from_secret_name_v2(
            self, "CfKeyPairId", "personal_app_cf_key_pair_id"
        )

        sign_url_fn = _lambda.Function(
            self,
            "SignUrlFunction",
            runtime=_lambda.Runtime.PYTHON_3_12,
            handler="handler.handler",
            code=_lambda.Code.from_asset(
                os.path.join(os.path.dirname(__file__), "..", "lambda_funcs", "sign_url"),
                bundling=BundlingOptions(
                    local=PythonLocalBundling(),
                    image=DockerImage.from_registry("public.ecr.aws/sam/build-python3.12"),
                    command=[
                        "bash", "-c",
                        "pip install cryptography -t /asset-output && cp -au . /asset-output",
                    ],
                ),
            ),
            timeout=Duration.seconds(10),
            memory_size=128,
            # Hard ceiling: at most 5 simultaneous executions
            reserved_concurrent_executions=5,
            environment={
                "SIGNING_KEY_SECRET_ARN": signing_secret.secret_arn,
                "KEY_PAIR_ID_SECRET_ARN": key_pair_id_secret.secret_arn,
                "CF_DOMAIN": env_config.get("cf_domain", "erikmabes.com"),
                "RESOURCE_PATH": env_config.get("resource_path", "private/resume.pdf"),
            },
        )

        signing_secret.grant_read(sign_url_fn)
        key_pair_id_secret.grant_read(sign_url_fn)

        # --- Cognito Identity Infrastructure (Phase 1) ---
        user_pool = cognito.UserPool(
            self, "UserPool",
            user_pool_name="personal-app-user-pool",
            self_sign_up_enabled=True,
            user_verification=cognito.UserVerificationConfig(
                email_subject="Verify your email for ErikMabes.com",
                email_body="Thanks for signing up! Your verification code is {####}",
                email_style=cognito.VerificationEmailStyle.CODE
            ),
            sign_in_aliases=cognito.SignInAliases(email=True),
            auto_verify=cognito.AutoVerifiedAttrs(email=True),
            removal_policy=RemovalPolicy.RETAIN,
            mfa=cognito.Mfa.OPTIONAL,
            mfa_second_factor=cognito.MfaSecondFactor(
                otp=True, 
                sms=False
            )
        )

        user_pool_client = user_pool.add_client(
            "UserPoolClient",
            user_pool_client_name="personal-app-client",
            o_auth=cognito.OAuthSettings(
                flows=cognito.OAuthFlows(
                    authorization_code_grant=True
                ),
                scopes=[cognito.OAuthScope.OPENID, cognito.OAuthScope.EMAIL, cognito.OAuthScope.PROFILE],
                callback_urls=[
                    "https://erikmabes.com/callback",
                    "https://www.erikmabes.com/callback",
                ],
                logout_urls=[
                    "https://erikmabes.com/",
                    "https://www.erikmabes.com/",
                ]
            )
        )

        user_pool.add_domain(
            "UserPoolDomain",
            cognito_domain=cognito.CognitoDomainOptions(
                domain_prefix="erikmabes-auth"
            )
        )

        # RBAC Groups
        cognito.CfnUserPoolGroup(
            self, "AdminGroup",
            user_pool_id=user_pool.user_pool_id,
            group_name="Admin",
            description="Full administrator access"
        )

        cognito.CfnUserPoolGroup(
            self, "UserGroup",
            user_pool_id=user_pool.user_pool_id,
            group_name="User",
            description="Standard functional access"
        )

        # PostConfirmation trigger: auto-assign every new verified user to the User group.
        # Admins can be manually promoted via the Cognito console.
        auto_assign_group_fn = _lambda.Function(
            self,
            "AutoAssignGroupFunction",
            runtime=_lambda.Runtime.PYTHON_3_12,
            handler="handler.handler",
            code=_lambda.Code.from_asset(
                os.path.join(os.path.dirname(__file__), "..", "lambda_funcs", "auto_assign_group")
            ),
            timeout=Duration.seconds(10),
            memory_size=128,
        )

        # Intentionally scoped to userpool/* (not the exact pool ARN) to break the
        # circular dependency: UserPool needs Lambda ARN (trigger), Lambda IAM policy
        # needed UserPool ARN — referencing user_pool.user_pool_arn created a cycle.
        # Scoping to account+region+service is still tightly bounded; the Lambda can
        # only be invoked by Cognito for this specific pool anyway.
        auto_assign_group_fn.add_to_role_policy(
            iam.PolicyStatement(
                actions=["cognito-idp:AdminAddUserToGroup"],
                resources=[f"arn:aws:cognito-idp:{self.region}:{self.account}:userpool/*"],
            )
        )

        user_pool.add_trigger(
            cognito.UserPoolOperation.POST_CONFIRMATION,
            auto_assign_group_fn,
        )

        # API Gateway REST API with stage-level throttling.
        # burst_limit=5: max simultaneous requests allowed before throttling kicks in.
        # rate_limit=2: steady-state requests per second across the whole stage.
        # Both limits return HTTP 429 to the caller when exceeded — no Lambda invocation,
        # no Secrets Manager reads, no cost.
        api = apigw.RestApi(
            self, "SignUrlApi",
            rest_api_name="personal-app-sign-url",
            deploy_options=apigw.StageOptions(
                stage_name="prod",
                throttling_burst_limit=5,
                throttling_rate_limit=2,
            ),
        )

        sign_url_resource = api.root.add_resource("sign-url")
        sign_url_resource.add_method(
            "GET",
            apigw.LambdaIntegration(sign_url_fn)
        )

        # CORS preflight for the /sign-url resource
        sign_url_resource.add_cors_preflight(
            allow_origins=["https://erikmabes.com", "https://www.erikmabes.com"],
            allow_methods=["GET", "OPTIONS"],
            allow_headers=["content-type", "authorization"], # Added authorization header for JWT
        )

        # WAF — rate-limit per source IP at the API Gateway stage level.
        # This is a second, independent ceiling on top of API Gateway throttling.
        # Minimum WAF rate-based limit is 100 requests per 5-minute window.
        waf_acl = wafv2.CfnWebACL(
            self, "SignUrlWafAcl",
            scope="REGIONAL",
            default_action=wafv2.CfnWebACL.DefaultActionProperty(allow={}),
            visibility_config=wafv2.CfnWebACL.VisibilityConfigProperty(
                cloud_watch_metrics_enabled=True,
                metric_name="personal-app-sign-url-waf",
                sampled_requests_enabled=True,
            ),
            rules=[
                wafv2.CfnWebACL.RuleProperty(
                    name="IPRateLimit",
                    priority=1,
                    action=wafv2.CfnWebACL.RuleActionProperty(block={}),
                    statement=wafv2.CfnWebACL.StatementProperty(
                        rate_based_statement=wafv2.CfnWebACL.RateBasedStatementProperty(
                            limit=100,
                            aggregate_key_type="IP",
                        )
                    ),
                    visibility_config=wafv2.CfnWebACL.VisibilityConfigProperty(
                        cloud_watch_metrics_enabled=True,
                        metric_name="IPRateLimit",
                        sampled_requests_enabled=True,
                    ),
                )
            ],
        )

        wafv2.CfnWebACLAssociation(
            self, "SignUrlWafAssociation",
            resource_arn=api.deployment_stage.stage_arn,
            web_acl_arn=waf_acl.attr_arn,
        )

        CfnOutput(self, "SignUrlApiEndpoint", value=f"{api.url}sign-url")
        CfnOutput(self, "UserPoolId", value=user_pool.user_pool_id)
        CfnOutput(self, "UserPoolClientId", value=user_pool_client.user_pool_client_id)

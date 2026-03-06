import os
from aws_cdk import CfnOutput, Duration, Stack
from aws_cdk import aws_lambda as _lambda
from aws_cdk import aws_secretsmanager as secretsmanager
from constructs import Construct


class PersonalAppBackCDKStack(Stack):
    def __init__(self, scope: Construct, construct_id: str, **kwargs) -> None:
        super().__init__(scope, construct_id, **kwargs)

        signing_secret = secretsmanager.Secret.from_secret_name_v2(
            self, "CfSigningKey", "personal_app_cf_signing_key"
        )

        sign_url_fn = _lambda.Function(
            self,
            "SignUrlFunction",
            runtime=_lambda.Runtime.PYTHON_3_12,
            handler="handler.handler",
            code=_lambda.Code.from_asset(
                os.path.join(os.path.dirname(__file__), "..", "lambda", "sign_url"),
                bundling=_lambda.BundlingOptions(
                    image=_lambda.Runtime.PYTHON_3_12.bundling_image,
                    command=[
                        "bash", "-c",
                        "pip install cryptography -t /asset-output && cp -au . /asset-output",
                    ],
                ),
            ),
            timeout=Duration.seconds(10),
            memory_size=128,
            environment={
                "SECRETS_ARN": signing_secret.secret_arn,
                "CF_DOMAIN": "erikmabes.com",
                "CF_KEY_PAIR_ID": "PLACEHOLDER_DEPLOY_FRONTEND_FIRST",
                "RESOURCE_PATH": "private/resume.pdf",
            },
        )

        signing_secret.grant_read(sign_url_fn)

        fn_url = sign_url_fn.add_function_url(
            auth_type=_lambda.FunctionUrlAuthType.NONE,
            cors=_lambda.FunctionUrlCorsOptions(
                allowed_origins=["https://erikmabes.com", "https://www.erikmabes.com"],
                allowed_methods=[_lambda.HttpMethod.GET],
                allowed_headers=["content-type"],
            ),
        )

        CfnOutput(self, "SignUrlFunctionUrl", value=fn_url.url)

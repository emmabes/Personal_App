import os
import subprocess

from aws_cdk import BundlingOptions, CfnOutput, DockerImage, Duration, ILocalBundling, Stack
from aws_cdk import aws_lambda as _lambda
from aws_cdk import aws_secretsmanager as secretsmanager
from aws_cdk import aws_apigateway as apigw
from constructs import Construct
import jsii


@jsii.implements(ILocalBundling)
class PythonLocalBundling:
    def try_bundle(self, output_dir: str, *, image, entrypoint=None, command=None,
                   volumes=None, environment=None, working_directory=None,
                   user=None, security_opt=None, network=None,
                   bundling_file_access=None) -> bool:
        source_dir = os.path.join(
            os.path.dirname(__file__), "..", "lambda", "sign_url"
        )
        subprocess.check_call([
            "pip", "install", "cryptography", "cffi",
            "--platform", "manylinux2014_x86_64",
            "--implementation", "cp",
            "--python-version", "312",
            "--only-binary=:all:",
            "-t", output_dir, "-q",
        ])
        subprocess.check_call(["cp", "-r", source_dir + "/.", output_dir])
        return True


class PersonalAppBackCDKStack(Stack):
    def __init__(self, scope: Construct, construct_id: str, **kwargs) -> None:
        super().__init__(scope, construct_id, **kwargs)

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
                os.path.join(os.path.dirname(__file__), "..", "lambda", "sign_url"),
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
                "CF_DOMAIN": "erikmabes.com",
                "RESOURCE_PATH": "private/resume.pdf",
            },
        )

        signing_secret.grant_read(sign_url_fn)
        key_pair_id_secret.grant_read(sign_url_fn)

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
            apigw.LambdaIntegration(sign_url_fn),
        )

        # CORS preflight for the /sign-url resource
        sign_url_resource.add_cors_preflight(
            allow_origins=["https://erikmabes.com", "https://www.erikmabes.com"],
            allow_methods=["GET"],
            allow_headers=["content-type"],
        )

        CfnOutput(self, "SignUrlApiEndpoint", value=f"{api.url}sign-url")

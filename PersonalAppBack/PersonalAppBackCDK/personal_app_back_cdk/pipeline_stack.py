import json
import os

from aws_cdk import Stack, SecretValue, Stage
from aws_cdk.pipelines import CodePipeline, CodePipelineSource, ShellStep
from constructs import Construct
from .personal_app_back_cdk_stack import PersonalAppBackCDKStack

_ENVIRONMENTS = json.loads(
    open(os.path.join(os.path.dirname(__file__), '..', 'environments.json')).read()
)

class BackendStage(Stage):
    def __init__(self, scope: Construct, construct_id: str, env_config: dict, **kwargs):
        super().__init__(scope, construct_id, **kwargs)
        PersonalAppBackCDKStack(self, 'BackendStack', env_config=env_config)

class BackendPipelineStack(Stack):
    def __init__(self, scope: Construct, construct_id: str, cdk_env: str = 'prod', **kwargs) -> None:
        super().__init__(scope, construct_id, **kwargs)

        env_config = _ENVIRONMENTS[cdk_env]
        branch = env_config['branch']

        pipeline = CodePipeline(
            self, 'Pipeline',
            pipeline_name=f'PersonalAppBackendPipeline-{cdk_env}',
            synth=ShellStep(
                'Synth',
                input=CodePipelineSource.git_hub(
                    'emmabes/Personal_App',
                    branch,
                    authentication=SecretValue.secrets_manager('personal_app_frontend_pipeline_token')
                ),
                # CDK_ENV must be passed explicitly — CodeBuild runs in detached HEAD
                # so git branch detection in app.py won't work during self-mutation.
                env={'CDK_ENV': cdk_env},
                commands=[
                    'cd PersonalAppBack/PersonalAppBackCDK',
                    'pip install -r requirements.txt',
                    'npx cdk synth'
                ],
                primary_output_directory='PersonalAppBack/PersonalAppBackCDK/cdk.out'
            ),
            self_mutation=True
        )

        pipeline.add_stage(BackendStage(
            self, cdk_env.capitalize(),
            env_config=env_config,
            env=kwargs.get('env')
        ))

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
    def __init__(self, scope: Construct, construct_id: str, **kwargs) -> None:
        super().__init__(scope, construct_id, **kwargs)

        pipeline = CodePipeline(
            self, 'Pipeline',
            pipeline_name='PersonalAppBackendPipeline',
            synth=ShellStep(
                'Synth',
                input=CodePipelineSource.git_hub(
                    'emmabes/Personal_App',
                    'main',
                    authentication=SecretValue.secrets_manager('personal_app_frontend_pipeline_token')
                ),
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
            self, 'Production',
            env_config=_ENVIRONMENTS['prod'],
            env=kwargs.get('env')
        ))

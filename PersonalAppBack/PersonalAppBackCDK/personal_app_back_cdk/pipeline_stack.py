from aws_cdk import Stack, SecretValue, Stage
from aws_cdk.pipelines import CodePipeline, CodePipelineSource, ShellStep
from constructs import Construct
from .personal_app_back_cdk_stack import PersonalAppBackCDKStack

class BackendStage(Stage):
    def __init__(self, scope: Construct, construct_id: str, **kwargs):
        super().__init__(scope, construct_id, **kwargs)
        PersonalAppBackCDKStack(self, 'BackendStack')

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
                    'if git diff --name-only HEAD^ HEAD | grep -qE "^PersonalAppBack/"; then export DO_BUILD=true; else export DO_BUILD=false; fi',
                    'if [ "$DO_BUILD" = "false" ]; then echo "No changes in backend directories, skipping build."; exit 0; fi',
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
            env=kwargs.get('env')
        ))

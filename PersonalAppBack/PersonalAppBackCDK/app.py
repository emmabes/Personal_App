#!/usr/bin/env python3
import os
import aws_cdk as cdk
from personal_app_back_cdk.pipeline_stack import BackendPipelineStack

app = cdk.App()

BackendPipelineStack(
    app, 'PipelineStack',
    env=cdk.Environment(
        account=os.environ.get('CDK_DEFAULT_ACCOUNT'),
        region=os.environ.get('CDK_DEFAULT_REGION')
    )
)

app.synth()

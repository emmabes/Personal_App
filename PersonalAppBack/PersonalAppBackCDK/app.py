#!/usr/bin/env python3
from os import environ

import aws_cdk as cdk
from personal_app_back_cdk.pipeline_stack import BackendPipelineStack

app = cdk.App()

env = cdk.Environment(
    account=environ.get('AWS_ACCOUNT'),
    region=environ.get('AWS_REGION'),
)

BackendPipelineStack(app, 'PersonalAppBackendPipelineStack', env=env)

app.synth()

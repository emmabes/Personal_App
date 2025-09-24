#!/usr/bin/env python3
import os
from os import environ
from subprocess import check_output

import aws_cdk as cdk
from personal_app_back_cdk.pipeline_stack import BackendPipelineStack

app = cdk.App()

BRANCH = check_output(['git', 'branch', '--show-current']).decode('utf-8').strip()

ENVIRONMENT = {
    'cdk_env': cdk.Environment(
        account=environ.get('AWS_ACCOUNT'),
        region=environ.get('AWS_REGION')),
    'branch': BRANCH,
    'env': 'prod' if BRANCH == 'main' else 'dev'
}

BackendPipelineStack(
    app, 'PipelineStack',
    env= ENVIRONMENT['cdk_env'],
)

app.synth()

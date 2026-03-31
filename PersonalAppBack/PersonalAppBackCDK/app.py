#!/usr/bin/env python3
import subprocess
from os import environ

import aws_cdk as cdk
from personal_app_back_cdk.pipeline_stack import BackendPipelineStack

app = cdk.App()

env = cdk.Environment(
    account=environ.get('AWS_ACCOUNT'),
    region=environ.get('AWS_REGION'),
)

# CDK_ENV is injected by the pipeline synth step — CodeBuild checks out in detached
# HEAD so git branch detection doesn't work there. Fall back to git for local deploys.
cdk_env = environ.get('CDK_ENV')
if not cdk_env:
    branch = subprocess.check_output(['git', 'branch', '--show-current']).decode().strip()
    cdk_env = 'prod' if branch == 'main' else branch

if cdk_env not in ('dev', 'sandbox', 'prod'):
    raise ValueError(f"Unrecognized CDK_ENV '{cdk_env}'. Expected dev, sandbox, or prod.")

BackendPipelineStack(app, f'PersonalAppBackendPipelineStack-{cdk_env}', cdk_env=cdk_env, env=env)

app.synth()

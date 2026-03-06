#!/usr/bin/env python3
import os
from os import environ
from subprocess import check_output

import aws_cdk as cdk
from personal_app_back_cdk.personal_app_back_cdk_stack import PersonalAppBackCDKStack

app = cdk.App()

ENVIRONMENT = {
    'cdk_env': cdk.Environment(
        account=environ.get('AWS_ACCOUNT'),
        region=environ.get('AWS_REGION')),
}

PersonalAppBackCDKStack(
    app, 'PersonalAppBackendStack',
    env=ENVIRONMENT['cdk_env'],
)

app.synth()

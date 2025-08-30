#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { PersonalAppFrontCdkStack } from '../lib/personal_app_front_cdk-stack';
import { FrontendPipelineStack } from './pipeline2';

const app = new cdk.App();
const ENVIRONMENT = {
    'account': process.env.AWS_ACCOUNT, 
    'region': process.env.AWS_REGION
};
if (!ENVIRONMENT['account'] || !ENVIRONMENT['region']) {
    throw new Error(`CDK context ${
        !ENVIRONMENT['account'] && !ENVIRONMENT['region'] ? 'account and region' :
        !ENVIRONMENT['account'] ? 'account' :
        !ENVIRONMENT['region'] ? 'region' : ''
    } were not captured during initialization.`)
}

new FrontendPipelineStack(app, 'PersonalAppFrontendPipelineStack', {
    env: ENVIRONMENT
});

new PersonalAppFrontCdkStack(app, 'PersonalAppFrontCdkStack', {
    /* If you don't specify 'env', this stack will be environment-agnostic.
    * Account/Region-dependent features and context lookups will not work,
    * but a single synthesized template can be deployed anywhere. */

    /* Uncomment the next line to specialize this stack for the AWS Account
    * and Region that are implied by the current CLI configuration. */
    // env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },

    /* Uncomment the next line if you know exactly what Account and Region you
    * want to deploy the stack to. */
    // env: { account: '123456789012', region: 'us-east-1' },

    /* For more information, see https://docs.aws.amazon.com/cdk/latest/guide/environments.html */

    env: ENVIRONMENT,
});

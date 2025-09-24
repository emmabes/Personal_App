#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import { PersonalAppFrontendStack } from "./frontend-stack";
import { FrontendPipelineStack } from "./pipeline2";
import { CertificateStack } from "./certificate-stack";
import { execSync } from "child_process";

const app = new cdk.App();
const BRANCH = execSync('git branch --show-current').toString().trim();
const ENVIRONMENT = {
  account: process.env.AWS_ACCOUNT,
  region: process.env.AWS_REGION,
  branch: BRANCH,
  environment: BRANCH === 'main' ? 'prod' : 'dev',
  config: require('../environments.json')[BRANCH === 'main' ? 'prod' : 'dev']
};
if (!ENVIRONMENT["account"] || !ENVIRONMENT["region"]) {
  throw new Error(
    `CDK context ${
      !ENVIRONMENT["account"] && !ENVIRONMENT["region"]
        ? "account and region"
        : !ENVIRONMENT["account"]
        ? "account"
        : !ENVIRONMENT["region"]
        ? "region"
        : ""
    } were not captured during initialization.`
  );
}

const certificateStack = new CertificateStack(app, "CertificateStack", {
  env: {
    account: ENVIRONMENT.account,
    region: "us-east-1",
  },
});

const frontendStack = new PersonalAppFrontendStack(
  app,
  "PersonalAppFrontendStack",
  certificateStack.certificate,
  {
    env: ENVIRONMENT,
    crossRegionReferences: true,
  }
);

new FrontendPipelineStack(app, "PersonalAppFrontendPipelineStack", frontendStack, {
  env: ENVIRONMENT,
});

#!/usr/bin/env node
import { EnvironmentConfig, PersAppStackProps } from "./utils/personal_app";

import * as cdk from "aws-cdk-lib";
import { PersonalAppFrontendStack } from "./frontend-stack";
import { FrontendPipelineStack } from "./pipeline2";
import { CertificateStack } from "./certificate-stack";
import { execSync } from "child_process";

const FIRST_DEPLOYMENT = false;

const app = new cdk.App();
const BRANCH = execSync("git branch --show-current").toString().trim();
const DOMAIN = BRANCH === "main" ? "prod" : BRANCH === "sandbox" ? "sandbox" : BRANCH === "dev" ? "dev" : "";
const environment = new EnvironmentConfig(
  process.env.AWS_ACCOUNT ? process.env.AWS_ACCOUNT : "",
  process.env.AWS_REGION ? process.env.AWS_REGION : "",
  BRANCH,
  DOMAIN,
  require("../environments.json")[DOMAIN]
);
if (!environment.account || !environment.region) {
  throw new Error(
    `CDK context ${
      !environment.account && !environment.region
        ? "account and region" : !environment.account
        ? "account" : !environment.region 
        ? "region" : ""
    } were not captured during initialization.`
  );
}

const certificateStack = new CertificateStack(app, 'PersAppCertificateStack', {
  env: {
    account: environment.account,
    region: "us-east-1",
  },
});

const frontendStack = new PersonalAppFrontendStack(
  app,
  `PersAppFrontendStack-${environment.deployment}`,
  FIRST_DEPLOYMENT ? undefined : certificateStack.getCertificateForEnvironment(environment.deployment),
  {
    env: { account:environment.account, region: environment.region},
    environment: environment,
    crossRegionReferences: FIRST_DEPLOYMENT ? undefined : true,
  }
);

new FrontendPipelineStack(app, `PersAppFrontPipelineStack-${environment.deployment}`, frontendStack, {
  env: { account:environment.account, region: environment.region},
  environment: environment,
});

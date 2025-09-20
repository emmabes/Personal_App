#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import { PersonalAppFrontCdkStack } from "../lib/personal_app_front_cdk-stack";
import { FrontendPipelineStack } from "./pipeline2";
import { CertificateStack } from "./certificate-stack";

const app = new cdk.App();
const ENVIRONMENT = {
  account: process.env.AWS_ACCOUNT,
  region: process.env.AWS_REGION,
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

new FrontendPipelineStack(app, "PersonalAppFrontendPipelineStack", {
  env: ENVIRONMENT,
});

const certificateStack = new CertificateStack(app, "CertificateStack", {
  env: {
    account: ENVIRONMENT.account,
    region: "us-east-1",
  },
});

const frontendStack = new PersonalAppFrontCdkStack(
  app,
  "PersonalAppFrontCdkStack",
  {
    env: ENVIRONMENT,
    certificate: certificateStack.certificate,
    crossRegionReferences: true,
  }
);

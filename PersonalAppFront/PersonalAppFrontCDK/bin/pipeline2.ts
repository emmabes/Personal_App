#!/usr/bin/env node
import { PersAppStackProps } from "./utils/personal_app";

import * as cdk from "aws-cdk-lib";
import { StackProps } from "aws-cdk-lib";
// import {
//   CodePipeline,
//   CodePipelineSource,
//   ShellStep,
// } from "aws-cdk-lib/pipelines";
import { Construct } from "constructs";
import { Artifact, Pipeline } from "aws-cdk-lib/aws-codepipeline";
import {
  CodeBuildAction,
  GitHubSourceAction,
} from "aws-cdk-lib/aws-codepipeline-actions";
import { BuildEnvironmentVariableType, PipelineProject, BuildSpec } from "aws-cdk-lib/aws-codebuild";
import { PolicyStatement, Effect } from "aws-cdk-lib/aws-iam";
import { Certificate } from "aws-cdk-lib/aws-certificatemanager";
import { PersonalAppFrontendStack } from "./frontend-stack";

export class FrontendPipelineStack extends cdk.Stack {
  constructor(scope: Construct, id: string, frontendStack: PersonalAppFrontendStack, props: PersAppStackProps) {
    super(scope, id, props);

    const { environment } = props;

    const sourceOutput = new Artifact();
    const sourceAction = new GitHubSourceAction({
      actionName: `GithubPersApp-${environment.deployment}`,
      owner: "emmabes",
      repo: "Personal_App",
      branch: `${environment.branch}`,
      oauthToken: cdk.SecretValue.secretsManager(
        "personal_app_frontend_pipeline_token"
      ),
      output: sourceOutput,
    });

    const buildPolicyStatement = new PolicyStatement({
      effect: Effect.ALLOW,
      actions: ["secretsmanager:GetSecretValue"],
      resources: [
        `arn:aws:secretsmanager:${this.region}:${this.account}:secret:personal_app_frontend_pipeline_token`,
      ],
    });
    const buildProject = new PipelineProject(this, `PersAppFront-${environment.deployment}`, {
      buildSpec: BuildSpec.fromSourceFilename(`buildspec.yml`),
      environmentVariables: {
        BUCKET_NAME: { value: frontendStack.siteBucket.bucketName },
        DISTRIBUTION_ID: { value: frontendStack.distributionId },
        // Vite reads VITE_* env vars from the process environment at build time.
        // Values are stored in Secrets Manager as a JSON object under personal-app/frontend-config.
        // CDK automatically grants this CodeBuild role GetSecretValue on the referenced secret.
        VITE_USER_POOL_ID: {
          value: "personal-app/frontend-config:VITE_USER_POOL_ID",
          type: BuildEnvironmentVariableType.SECRETS_MANAGER,
        },
        VITE_USER_POOL_CLIENT_ID: {
          value: "personal-app/frontend-config:VITE_USER_POOL_CLIENT_ID",
          type: BuildEnvironmentVariableType.SECRETS_MANAGER,
        },
        VITE_SIGN_URL_ENDPOINT: {
          value: "personal-app/frontend-config:VITE_SIGN_URL_ENDPOINT",
          type: BuildEnvironmentVariableType.SECRETS_MANAGER,
        },
        VITE_COGNITO_DOMAIN: {
          value: "personal-app/frontend-config:VITE_COGNITO_DOMAIN",
          type: BuildEnvironmentVariableType.SECRETS_MANAGER,
        },
      }
    });
    buildProject.grantPrincipal.addToPrincipalPolicy(
      new PolicyStatement({
        effect: Effect.ALLOW,
        actions: ["secretsmanager:GetSecretValue"],
        resources: [
          `arn:aws:secretsmanager:${this.region}:${this.account}:secret:personal_app_frontend_pipeline_token`,
        ],
      })
    );

    // Add S3 permissions here
    buildProject.addToRolePolicy(
      new PolicyStatement({
        effect: Effect.ALLOW,
        actions: [
          "s3:PutObject",
          "s3:PutObjectAcl",
          "s3:GetObject",
          "s3:DeleteObject",
          "s3:ListBucket",
        ],
        resources: [
          `arn:aws:s3:::${frontendStack.siteBucket.bucketName}`,
          `arn:aws:s3:::${frontendStack.siteBucket.bucketName}/*`
        ],
      })
    );

    buildProject.addToRolePolicy(
      new PolicyStatement({
        effect: Effect.ALLOW,
        actions: [
          "cloudfront:CreateInvalidation",
          "cloudfront:GetInvalidation",
          "cloudfront:ListInvalidations"
        ],
        resources: [
          `arn:aws:cloudfront::${this.account}:distribution/*`
        ],
      })
    );

    const buildAction = new CodeBuildAction({
      actionName: `PersAppFrontAction-${environment.deployment}`,
      project: buildProject,
      input: sourceOutput,
    });

    new Pipeline(this, `PersAppFrontPipeline-${environment.deployment}`, {
      stages: [
        {
          stageName: "Source",
          actions: [sourceAction],
        },
        {
          stageName: "Build",
          actions: [buildAction],
        },
      ],
    });
  }
}

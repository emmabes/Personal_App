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
import { PipelineProject, BuildSpec } from "aws-cdk-lib/aws-codebuild";
import { PolicyStatement, Effect } from "aws-cdk-lib/aws-iam";
import { Certificate } from "aws-cdk-lib/aws-certificatemanager";
import { PersonalAppFrontendStack } from "./frontend-stack";

export class FrontendPipelineStack extends cdk.Stack {
  constructor(scope: Construct, id: string, frontendStack: PersonalAppFrontendStack, props: PersAppStackProps) {
    super(scope, id, props);

    const { environment } = props;

    const sourceOutput = new Artifact();
    const sourceAction = new GitHubSourceAction({
      actionName: "GithubPersApp",
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
        `arn:aws:secretsmanager:${this.region}:${this.account}:secret:personal_app_frontend_pipeline_token-${environment.deployment}`,
      ],
    });
    const buildProject = new PipelineProject(this, `PersAppFront-${environment.deployment}`, {
      buildSpec: BuildSpec.fromSourceFilename(`buildspec.yml`),
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

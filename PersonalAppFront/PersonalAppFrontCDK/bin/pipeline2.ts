#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
// import {
//   CodePipeline,
//   CodePipelineSource,
//   ShellStep,
// } from 'aws-cdk-lib/pipelines';
import { Construct } from "constructs";
import { Artifact, Pipeline } from "aws-cdk-lib/aws-codepipeline";
import {
  CodeBuildAction,
  GitHubSourceAction,
} from "aws-cdk-lib/aws-codepipeline-actions";
import { PipelineProject, BuildSpec } from "aws-cdk-lib/aws-codebuild";
import { PolicyStatement, Effect } from "aws-cdk-lib/aws-iam";

export class FrontendPipelineStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const sourceOutput = new Artifact();
    const sourceAction = new GitHubSourceAction({
      actionName: "GitHub_Source",
      owner: "emmabes",
      repo: "Personal_App",
      branch: "main",
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
    const buildProject = new PipelineProject(this, "PersonalAppFrontPipeline", {
      buildSpec: BuildSpec.fromSourceFilename("buildspec.yml"),
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
          `arn:aws:s3:::erikmabes-com-${this.account}`,
          `arn:aws:s3:::erikmabes-com-${this.account}/*`,
        ],
      })
    );

    const buildAction = new CodeBuildAction({
      actionName: "FrontendBuild",
      project: buildProject,
      input: sourceOutput,
    });

    new Pipeline(this, "PersonalAppFrontendPipeline", {
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

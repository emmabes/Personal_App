import { SecretValue, Stack, StackProps } from "aws-cdk-lib";
import {
  CodePipeline,
  CodePipelineSource,
  ShellStep,
} from "aws-cdk-lib/pipelines";
import { Construct } from "constructs";
import { FrontendStage } from "./frontend-stage";

export class FrontendPipelineStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const pipeline = new CodePipeline(this, "PersonalAppFrontendPipeline", {
      pipelineName: "PersonalAppFrontendPipeline",
      synth: new ShellStep("Synth", {
        input: CodePipelineSource.gitHub("emmabes/personal_app", "main", {
          authentication: SecretValue.secretsManager(
            "personal_app_frontend_pipeline_token"
          ),
        }),
        commands: [
          'if [ "$(git diff --name-only HEAD^ HEAD | grep -E "^PersonalAppFront/(PersonalAppFrontend|PersonalAppFrontCDK)/")" ]; then export DO_BUILD=true; else export DO_BUILD=false; fi',
          'if [ "$DO_BUILD" = "false" ]; then echo "No changes in frontend directories, skipping build."; exit 0; fi',
          "cd PersonalAppFront/PersonalAppFrontCDK",
          "npm install",
          "npx cdk synth",
        ],
        primaryOutputDirectory: "PersonalAppFront/PersonalAppFrontCDK/cdk.out",
      }),
      selfMutation: true,
    });

    const buildStage = pipeline.addStage(
      new FrontendStage(this, "Alpha", {
        env: props?.env,
      })
    );

    buildStage.addPost(
      new ShellStep("BuildFrontend", {
        commands: [
          "cd PersonalAppFront/PersonalAppFrontend",
          "npm install",
          "npm run build",
        ],
      })
    );

    const prodStage = pipeline.addStage(
      new FrontendStage(this, "Production", {
        env: props?.env,
      })
    );

    prodStage.addPost(
      new ShellStep("DeployToS3", {
        commands: [
          "cd PersonalAppFront/PersonalAppFrontend",
          "npm install",
          "npm run build",
          "export BUCKET_NAME=personal-app-frontent-$(aws sts get-caller-identity --query Account --output text)",
          "aws s3 sync dist/ s3://$BUCKET_NAME/ --delete",
        ],
      })
    );
  }
}

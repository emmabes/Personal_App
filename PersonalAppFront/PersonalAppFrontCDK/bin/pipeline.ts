// #!/usr/bin/env node
// import * as cdk from 'aws-cdk-lib';
// import {
//   CodePipeline,
//   CodePipelineSource,
//   ShellStep,
// } from 'aws-cdk-lib/pipelines';
// import { Construct } from 'constructs';
// import { PolicyStatement, Effect } from 'aws-cdk-lib/aws-iam';

// export class FrontendPipelineStack extends cdk.Stack {
//     constructor(scope: Construct, id: string, props?: cdk.StackProps) {
//         super(scope, id, props);

//         const pipelinePolicyStatement = new PolicyStatement({
//                 effect: Effect.ALLOW,
//                 actions: ['secretsmanager:GetSecretValue'],
//                 resources: [
//                     `arn:aws:secretsmanager:${this.region}:${this.account}:secret:personal_app_frontend_pipeline_token`
//                 ],
//             });

//         const synthStep = new ShellStep('Synth', {
//             input: CodePipelineSource.gitHub('emmabes/personal_app', 'main', {
//                 authentication: cdk.SecretValue.secretsManager('personal_app_frontend_pipeline_token'),
//             }),
//             commands: [
//                 'if [ "$(git diff --name-only HEAD^ HEAD | grep ^PersonalAppFrontend/)" ]; then export DO_BUILD=true; else export DO_BUILD=false; fi',
//                 'if [ "$DO_BUILD" = "false" ]; then echo "No changes in PersonalAppFrontend/, skipping build."; exit 0; fi',
//                 'cd infra',
//                 'npm install',
//                 'npx cdk synth',
//             ],
//             primaryOutputDirectory: 'infra/cdk.out',
//         });

//         // Add the IAM policy statement directly to the synth step's project role.
//         // The project is available on the ShellStep before the pipeline is created.
//         synthStep.project.addToRolePolicy(
//             new PolicyStatement({
//                 effect: Effect.ALLOW,
//                 actions: ['secretsmanager:GetSecretValue'],
//                 resources: [
//                     `arn:aws:secretsmanager:${this.region}:${this.account}:secret:personal_app_frontend_pipeline_token`
//                 ],
//             })
//         );
        
//         const pipeline = new CodePipeline(this, 'MyFrontendPipeline', {
//             pipelineName: 'FrontendPipeline',
//             synth: synthStep,
//             selfMutation: true,
//             crossAccountKeys: false,
//         });
//     }
// }

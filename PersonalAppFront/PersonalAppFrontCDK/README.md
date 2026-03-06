# Welcome to your CDK TypeScript project

This is a blank project for CDK development with TypeScript.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Testing

This project uses `jest` for unit testing.

```bash
# Perform the jest unit tests
npm run test
```

## Multi-Environment Deployment

This project uses branch-based environment detection for seamless multi-environment deployments. Ensure you are on the correct branch before deploying:

- **Development**: `dev` branch
- **Production**: `main` branch

To deploy the frontend pipeline:
```bash
git checkout <branch>
npx cdk deploy -a "npx ts-node bin/personal_app_front_cdk.ts" FrontendPipelineStack
```

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `npx cdk deploy`  deploy this stack to your default AWS account/region
* `npx cdk diff`    compare deployed stack with current state
* `npx cdk synth`   emits the synthesized CloudFormation template

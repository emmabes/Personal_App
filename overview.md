### Accomplishments and Next Steps

We've made significant progress in building a full-stack, serverless application. We’ve successfully set up the foundational DevOps infrastructure, a working CI/CD pipeline, and a deployed static frontend.

Here is a summary of our accomplishments in a checklist format.

#### DevOps Infrastructure

✅**Initialized a Git Repository**
    🐛 **Issues**: Initial confusion on whether to use a monorepo structure for both infrastructure code (IaC) and application code.
    🚀 **Resolution**: We decided on a monorepo structure, storing both in a single GitHub repository to simplify version control and development.

✅**Configured a CI/CD Pipeline**
    🐛 **Issues**: Initial struggles with the `CodePipeline` constructor syntax in CDK v2, the `CfnDistribution` properties for the `FrontendStack`, and the `PipelineProject`'s `role` property. These were primarily due to outdated or incorrect knowledge of the CDK API.
    🚀 **Resolution**: We used a lower-level `aws-codepipeline.Pipeline` construct to manually define the pipeline, gaining a deeper understanding of its components and IAM roles.

✅**Secured Credentials**
    **Issues**: Storing a GitHub Personal Access Token (PAT) in a public repository and needing to find a secure, automated way to manage it.
    🚀 **Resolution**: We implemented AWS Secrets Manager to securely store the PAT, and granted the pipeline's IAM role permissions to read it, which is a key security best practice.

---

#### Frontend Application

✅**Created a React Application**
    🐛 **Issues**: The `npm create vite` command appeared to be "hanging" and the CodeBuild environment's default Node.js version was too old for Vite.
    🚀 **Resolution**: The command was actually waiting for user input, and we resolved the Node.js version mismatch by adding a `runtime-versions` block to the `buildspec.yml` file.

✅**Hosted a Static Website on AWS**
    🐛 **Issues**: Confusion with deprecated and abstract CDK constructs for hosting a static website (e.g., `S3Origin`, `S3BucketOrigin`, `CfnDistribution`), and a simple typo in the `CfnDistribution` property.
    🚀 **Resolution**: We successfully used a low-level `CfnDistribution` to host a secure, public-facing website, overcoming several syntax and logical errors in the process.

---

#### Backend Infrastructure

✅**Created Python CDK Infrastructure for Backend**
    🐛 **Issues**: Initial confusion about project structure and whether to separate pipeline infrastructure from application code.
    🚀 **Resolution**: Created dedicated `PersonalAppBackCDK` directory for CDK infrastructure, separate from future `PersonalAppBackend` application code.

✅**Implemented Backend CI/CD Pipeline**
    🐛 **Issues**: Multiple complex issues encountered:
        - **Circular Dependency**: Pipeline trying to synth itself during self-mutation, causing "No stacks match the name(s) BackendPipelineStack" error
        - **Directory Path Issues**: Pipeline couldn't find CDK files, "no matching base directory path found for cdk.out"
        - **Chicken-and-Egg Problem**: Pipeline referencing GitHub code that didn't exist yet
        - **Windows Dependencies**: `pywin32==310` package failing in CodePipeline Linux environment
        - **File Corruption**: requirements.txt corrupted with null bytes
    🚀 **Resolution**: 
        - Used CDK Stages pattern with `pipeline.add_stage()` instead of synth commands to eliminate circular dependency
        - Updated paths to `PersonalAppBack/PersonalAppBackCDK` to match GitHub repo structure
        - Deployed pipeline infrastructure first, then committed code to GitHub
        - Created clean requirements.txt with only essential CDK packages (`aws-cdk-lib>=2.0.0`, `constructs>=10.0.0`)
        - Manually recreated requirements.txt with proper UTF-8 encoding

✅**Established Enterprise-Grade Pipeline Foundation**
    🐛 **Issues**: Ensuring the pipeline follows AWS best practices and can scale to support multi-stage deployments, automated testing, and security scanning.
    🚀 **Resolution**: Implemented CDK Pipelines pattern with self-mutation enabled, stage-based deployment architecture, and proper separation of concerns between pipeline and application infrastructure.

CloudFrontDomainName = dthzzwznmie2q.cloudfront.net

---

### Next Steps

The current architecture is a static frontend with a working CI/CD pipeline and a working CI/CD pipeline with no backend. The following steps will expand this into a dynamic, full-stack application.

#### Next Implementation

Create a simple homepage on the frontend that can be called. 

#### Next Technical Steps

- **Create the first homepage**: Create a static homepage that can be called through the app, using the personally owned domain `erikmabes.com`
- **Backend Infrastructure**: Build the backend of the application using AWS Lambda and Amazon API Gateway. This will be a serverless REST API that your frontend can call to perform dynamic tasks.
- **Database Integration**: Implement a database, such as Amazon DynamoDB, to store the application's data.
- **Frontend-Backend Integration**: Update the React frontend to make API calls to the new backend, making the application truly dynamic and interactive.
- **Backend CI/CD Pipeline**: continue developing the pipeline into its final form.


---

### Goals for This Project

Have a dynamic, full-stack web app that serves as an effective personal portfolio for prospective hiring managers and potential future clients or associates. It will host a number of features that will serve to demonstrate flexibility, adaptability, and capability as a Software Engineer. 

#### Potential Features

- an exquisitely implemented CSS homepage that features advanced CSS and JavaScript implementations for dazzling display features.
- a menu of pages featuring the beginnings of certain items
  - fitness tracking
    - an AI chat that takes descriptions logs different fitness and nutrition stats
      - a text messaging implementation of that, with a screen-record demonstration
      - a picture submission where a picture of a plate of food can be analyzed and estimated for nutrients, which is then stored after approval
    - a tic tac toe game, with different levels ranging from super easy (intentional loser with some randomness), easy (randomness with a few intentional loss moves), hard (intention win moves with many random moves) and super hard (a near-unbeatable mode); previous game stats are stored and available; multipleayer,single player, or zero-player options available (show-casing)
    - the beginnings of a recipe app
        - for now, llms can do the haeavy (and likely inferior) lifting, but it can be stated that a databse of food-item flavor and texture profiles can be stored, programmed into an AI model, and then utilized to maximize recipes
      - a website submitted to be scraped and recipe extracted
      - recipe to be generated and/or recipe to be looked at and improved
      - recipe to be processed into a shopping list

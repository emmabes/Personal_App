<style>
    * { background-color: #eed; color: #222; font-family: courier; }
</style>

# My Full-Stack App

Welcome to my personal portfolio! After a very busy season of life, I've managed to carve out time to start work on a long-awaited portfolio project. While it starts as a simple looking webpage, it's overengineered with a large-scale application design in mind:
- CI/CD pipelines for both frontend and backend deployments, with Source, Build, and Production stages, with the hopes of adding integration testing soon.
- A backend CDK using Python for infrastructure as code
- A frontend CDK using TypeScript for infrastructure as code
- A Vite+React frontend web ui with comprehensive test coverage
- Soon to come: a Java backend with secure APIs for more complex interactions

At current state, enjoy some uplifting motivation from the "Coming Soon" page, and be sure to check back for more info soon!

## Local Development Setup

### Environment Variables

The frontend requires a `.env` file before it can run locally. The values live in AWS Secrets Manager.

**1. Retrieve the values:**
```bash
aws secretsmanager get-secret-value \
  --secret-id personal-app/frontend-config \
  --region us-west-2
```

**2. Create the `.env` file from the template:**
```bash
cp PersonalAppFront/PersonalAppFrontend/.env.example \
   PersonalAppFront/PersonalAppFrontend/.env
```

**3. Fill in the four values from the Secrets Manager output:**

| Variable | Description |
|---|---|
| `VITE_USER_POOL_ID` | Cognito User Pool ID |
| `VITE_USER_POOL_CLIENT_ID` | Cognito App Client ID |
| `VITE_SIGN_URL_ENDPOINT` | API Gateway URL for `/sign-url` |
| `VITE_COGNITO_DOMAIN` | Cognito hosted UI domain |

> These are compiled into the JS bundle by Vite at build time. They are not secrets — but the `.env` file is gitignored to keep the repo environment-agnostic.

---

## Updating the Resume PDF

The resume PDF is stored directly in S3 at `private/resume.pdf` inside the frontend bucket. It is **not** part of the git repo or the CI/CD build — pushing to git will not update it. It must be uploaded manually.

**1. Upload the new PDF:**
```bash
# Production
aws s3 cp /path/to/your/resume.pdf s3://pers-app-front-prod/private/resume.pdf

# Development
aws s3 cp /path/to/your/resume.pdf s3://pers-app-front-dev/private/resume.pdf
```

**2. Find your CloudFront distribution ID:**
```bash
# Production
aws cloudfront list-distributions \
  --query "DistributionList.Items[?contains(Aliases.Items, 'erikmabes.com')].Id" \
  --output text

# Development
aws cloudfront list-distributions \
  --query "DistributionList.Items[?contains(Aliases.Items, 'dev.erikmabes.com')].Id" \
  --output text
```

**3. Invalidate the CloudFront cache:**
```bash
aws cloudfront create-invalidation \
  --distribution-id <DIST_ID> \
  --paths "/private/resume.pdf"
```

> The invalidation is required because CloudFront's `/private/*` cache behavior strips query string parameters (including signed URL tokens) from the cache key — meaning it can serve the old PDF from cache until invalidated.

---

## Testing

The frontend includes a robust testing suite with **47 tests** across **9 test suites**, covering:
- React component functionality and interactions
- Game logic and state management
- User interface behavior
- Service layer operations

```bash
# Run tests
cd PersonalAppFront/PersonalAppFrontend
npm test
```

## Development Steps

### Environment Detection & Deployment Strategy

This application uses **git branch-based environment detection** for seamless multi-environment deployments:

#### Environment Configuration
- **Production Environment**: `main` branch → `erikmabes.com` production site
- **Development Environment**: `dev` branch → `erikmabes.com` development site
- **Single Codebase**: All environments share the same code with environment-specific configurations

#### Deployment Workflow
```bash
# Development deployment
git checkout dev
git push origin dev

# Production deployment  
git checkout main
git push origin main
```

#### Configuration Management
- **Frontend**: `PersonalAppFront/PersonalAppFrontCDK/environments.json`
- **Backend**: `PersonalAppBack/PersonalAppBackCDK/environments.json`
- **Automatic Detection**: CDK reads current git branch and loads appropriate config
- **No Manual Variables**: Environment settings are automatically injected based on branch

#### Infrastructure Components
- **Certificates**: Separate SSL certificates for each environment domain
- **S3 Buckets**: Environment-prefixed bucket names for isolation
- **CloudFront Distributions**: Dedicated distributions per environment
- **Pipelines**: Branch-triggered CI/CD with automatic environment detection

#### Key Benefits
- **Single Source of Truth**: One codebase prevents configuration drift
- **Automated Deployment**: Git branch determines target environment
- **Clean Separation**: Each environment has isolated AWS resources
- **Developer Friendly**: Simple git workflow for environment switching

# My Full-Stack App

Welcome to my personal portfolio! After a very busy season of life, I've managed to carve out time to start work on a long-awaited portfolio project. While it starts as a simple looking webpage, it's overengineered with a large-scale application design in mind:
- CI/CD pipelines for both frontend and backend deployments, with Source, Build, and Production stages, with the hopes of adding integration testing soon.
- A backend CDK using Python for infrastructure as code
- A frontend CDK using TypeScript for infrastructure as code
- A Vite+React frontend web ui with comprehensive test coverage
- Soon to come: a Java backend with secure APIs for more complex interactions

At current state, enjoy some uplifting motivation from the "Coming Soon" page, and be sure to check back for more info soon!

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

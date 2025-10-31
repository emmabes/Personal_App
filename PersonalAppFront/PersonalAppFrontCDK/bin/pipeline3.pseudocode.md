```
Developer pushes code to feature branch
  GitHub webhook triggers branch-specific pipeline

PipelineBootstrap executed once per branch
  branch type detected from git metadata
  environment configuration loaded from central config
  shared resources created if not exist
    SSL certificates for all domains
    IAM roles and policies
    cross-environment networking

BranchPipeline instantiated with environment-aware logic
  source stage pulls code from specific branch
  synthesis stage generates infrastructure templates
    branch detection embedded in templates
    environment-specific resource naming applied

Pipeline execution begins based on branch type

IF branch == "dev":
  QuickBuild stage
    minimal infrastructure deployed
      lightweight database instances
      basic compute resources
      dev.domain.com endpoints
    application code built and deployed
    basic smoke tests executed
  pipeline terminates early for speed

IF branch == "staging":
  QuickBuild stage (same as dev but staging resources)
  QualityGate stage
    unit test suite executed
    code coverage thresholds enforced
    security scans performed
  IntegrationValidation stage
    staging.domain.com infrastructure deployed
    integration tests run against curated datasets
    API contract tests executed
    cross-service communication verified
  PreProductionValidation stage
    production-like infrastructure deployed
    performance tests executed with production data volumes
    disaster recovery procedures tested
    manual approval gate for stakeholder sign-off

IF branch == "main":
  all staging stages executed first
  ProductionDeployment stage
    blue-green deployment to production infrastructure
    domain.com traffic gradually shifted to new version
    production monitoring and alerting activated
    rollback procedures armed and ready

Post-deployment activities
  environment-specific monitoring dashboards updated
  deployment notifications sent to relevant teams
  infrastructure costs tracked per environment
  compliance and audit logs generated
```

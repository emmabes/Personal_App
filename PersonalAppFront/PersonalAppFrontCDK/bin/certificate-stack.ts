import { PersAppStackProps } from "./utils/personal_app";

import { CfnOutput, Stack, StackProps } from "aws-cdk-lib";
import {
  Certificate,
  CertificateValidation,
} from "aws-cdk-lib/aws-certificatemanager";
import { Construct } from "constructs";

export class CertificateStack extends Stack {
  public readonly certificate: Certificate;
  public readonly output: CfnOutput;

  constructor(scope: Construct, id: string, props: PersAppStackProps) {
    super(scope, id, props);

    const { environment } = props;
    
    this.certificate = this.getCertificateForEnvironment(environment.deployment);
    this.output = this.getCfnOutput(environment.deployment);
    this.output;
  }

  public getCertificateForEnvironment(environment: string): Certificate {
    switch (environment) {
      case "prod":
        return this.certificate ? this.certificate : new Certificate(this, "PersonalAppDomainCertificate-prod", {
          domainName: "erikmabes.com",
          subjectAlternativeNames: [
            "www.erikmabes.com",
            "ericmabes.com",
            "www.ericmabes.com",
          ],
          validation: CertificateValidation.fromDns(),
        });
      case "dev":
        return this.certificate ? this.certificate : new Certificate(this, "PersonalAppDomainCertificate-dev", {
          domainName: "dev.erikmabes.com",
          validation: CertificateValidation.fromDns(),
        });;
      case "sandbox":
        return this.certificate ? this.certificate : new Certificate(this, "SingleDomainCertificate-sandbox", {
          domainName: "sandbox.erikmabes.com",
          validation: CertificateValidation.fromDns(),
        });
      default:
        throw new Error(`Unknown development environment requested in CertificateStack for Certificate: ${environment}`);
    }
  }

  public getCfnOutput(environment: string): CfnOutput {
    switch (environment) {
      case "prod":
        return this.output ? this.output : new CfnOutput(this, "CertificateArn-prod", {
          value: this.certificate.certificateArn,
          exportName: `MultiDomainCertificateArn-prod`,
        });
      case "dev":
        return this.output ? this.output : new CfnOutput(this, "CertificateArn-dev", {
          value: this.certificate.certificateArn,
          exportName: "SingleDomainDevCertificateArn-dev",
        });
      case "sandbox":
        return this.output ? this.output : new CfnOutput(this, "CertificateArn-sandbox", {
          value: this.certificate.certificateArn,
          exportName: "SingleDomainSandboxCertificateArn-sandbox",
        });
      default:
        throw new Error(`Unknown development environment requested in CertificateStack for CfnOutput: ${environment}`);
    }
  }
}

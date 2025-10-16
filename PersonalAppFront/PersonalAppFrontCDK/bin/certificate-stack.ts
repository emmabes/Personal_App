import { CfnOutput, Stack, StackProps } from "aws-cdk-lib";
import {
  Certificate,
  CertificateValidation,
} from "aws-cdk-lib/aws-certificatemanager";
import { Construct } from "constructs";

export class CertificateStack extends Stack {
  public readonly certificate: Certificate;
  public readonly devCertificate: Certificate;
  public readonly sandboxCertificate: Certificate;

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
    
    this.certificate = new Certificate(this, "PersonalAppDomainCertificate-prod", {
      domainName: "erikmabes.com",
      subjectAlternativeNames: [
        "www.erikmabes.com",
        "ericmabes.com",
        "www.ericmabes.com",
      ],
      validation: CertificateValidation.fromDns(),
    });
    this.devCertificate = new Certificate(this, "PersonalAppDomainCertificate-dev", {
      domainName: "dev.erikmabes.com",
      validation: CertificateValidation.fromDns(),
    });
    this.sandboxCertificate = new Certificate(this, "SingleDomainCertificate-sandbox", {
      domainName: "sandbox.erikmabes.com",
      validation: CertificateValidation.fromDns(),
    });

    new CfnOutput(this, "CertificateArn-prod", {
      value: this.certificate.certificateArn,
      exportName: "MultiDomainCertificateArn",
    });
    new CfnOutput(this, "CertificateArn-dev", {
      value: this.devCertificate.certificateArn,
      exportName: "SingleDomainDevCertificateArn",
    });
    new CfnOutput(this, "CertificateArn-sandbox", {
      value: this.sandboxCertificate.certificateArn,
      exportName: "SingleDomainSandboxCertificateArn",
    });
  }
}

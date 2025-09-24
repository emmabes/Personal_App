import { CfnOutput, Stack, StackProps } from "aws-cdk-lib";
import {
  Certificate,
  CertificateValidation,
} from "aws-cdk-lib/aws-certificatemanager";
import { Construct } from "constructs";

export class CertificateStack extends Stack {
  public readonly certificate: Certificate;
  public readonly devCertificate: Certificate;

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
    
    this.certificate = new Certificate(this, "MultiDomainCertificate", {
      domainName: "erikmabes.com",
      subjectAlternativeNames: [
        "www.erikmabes.com",
        "ericmabes.com",
        "www.ericmabes.com",
      ],
      validation: CertificateValidation.fromDns(),
    });
    this.devCertificate = new Certificate(this, "SingleDomainDevCertificate", {
      domainName: "dev.erikmabes.com",
      validation: CertificateValidation.fromDns(),
    });


    new CfnOutput(this, "CertificateArn", {
      value: this.certificate.certificateArn,
      exportName: "MultiDomainCertificateArn",
    });
    new CfnOutput(this, "CertificateArnDev", {
      value: this.devCertificate.certificateArn,
      exportName: "SingleDomainDevCertificateArn",
    });

  }
}

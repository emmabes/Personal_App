import { CfnOutput, RemovalPolicy, Stack, StackProps } from "aws-cdk-lib";
import { Certificate } from "aws-cdk-lib/aws-certificatemanager";
import {
  CfnCloudFrontOriginAccessIdentity,
  CfnDistribution,
  Distribution,
  OriginAccessIdentity,
} from "aws-cdk-lib/aws-cloudfront";
import {
  CanonicalUserPrincipal,
  Effect,
  PolicyStatement,
} from "aws-cdk-lib/aws-iam";
import { BlockPublicAccess, Bucket } from "aws-cdk-lib/aws-s3";
import { Construct } from "constructs";

export class PersonalAppFrontendStack extends Stack {
  public readonly siteBucket: Bucket; 
  public readonly distributionId: string;

  constructor(scope: Construct, id: string, certificate: Certificate, props?: StackProps) {
    super(scope, id, props);

    const bucketName:string = 'portfolio-app-frontend-bucket'; // if this should change for any reason, update the buildspec

    const logsBucket = new Bucket(this, "LogsBucket", {
      bucketName: `${bucketName}-logs`,
      removalPolicy: RemovalPolicy.DESTROY,
      publicReadAccess: false,
      blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
      enforceSSL: true,
    });

    this.siteBucket = new Bucket(this, "PersonalFrontSiteBucket", {
      bucketName: bucketName,
      websiteIndexDocument: "index.html",
      publicReadAccess: false,
      blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
      removalPolicy: RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
      enforceSSL: true,
      serverAccessLogsBucket: logsBucket,
      serverAccessLogsPrefix: "access-logs/"
    });

    const originAccessIdentity = new OriginAccessIdentity(this, "OAI", {
      comment: "Allows CloudFront to access the S3 bucket",
    });

    const distribution = new CfnDistribution(this, "SiteDistribution", {
      distributionConfig: {
        enabled: true,
        defaultRootObject: "index.html",
        defaultCacheBehavior: {
          targetOriginId: "s3-origin-id",
          viewerProtocolPolicy: "redirect-to-https",
          allowedMethods: ["GET", "HEAD", "OPTIONS"],
          // Use legacy TTL settings for short cache
          minTtl: 0,
          defaultTtl: 180, // 5 minutes
          maxTtl: 300,
          forwardedValues: {
            queryString: false,
            cookies: { forward: "none" },
          },
        },
        cacheBehaviors: [
          {
            pathPattern: "/assets/*",
            targetOriginId: "s3-origin-id",
            viewerProtocolPolicy: "redirect-to-https",
            cachePolicyId: "4135ea2d-6df8-44a3-9df3-4b5a84be39ad", // Disabling Caching during development; reistate optimized with "658327ea-f89d-4fab-a63d-7e88639e58f6"
          },
        ],
        origins: [
          {
            id: "s3-origin-id",
            domainName: this.siteBucket.bucketRegionalDomainName,
            s3OriginConfig: {
              originAccessIdentity: `origin-access-identity/cloudfront/${originAccessIdentity.originAccessIdentityId}`,
            },
          },
        ],
        aliases: ['erikmabes.com', 'www.erikmabes.com', 'ericmabes.com', 'www.ericmabes.com'],
        viewerCertificate: certificate ? {
          acmCertificateArn: certificate.certificateArn,
          sslSupportMethod: 'sni-only',
        } : undefined,
      },
    });
    this.distributionId = distribution.getAtt("Id").toString();

    this.siteBucket.addToResourcePolicy(
      new PolicyStatement({
        effect: Effect.ALLOW,
        actions: ["s3:GetObject"],
        principals: [
          new CanonicalUserPrincipal(
            originAccessIdentity.cloudFrontOriginAccessIdentityS3CanonicalUserId
          ),
        ],
        resources: [this.siteBucket.arnForObjects("*")],
      })
    );

    new CfnOutput(this, "DistributionDomainName", {
      value: distribution.getAtt("DomainName").toString(),
    });

    new CfnOutput(this, "ProductionBucketName", {
      value: this.siteBucket.bucketName,
    });

    new CfnOutput(this, "DistributionId", {
      value: this.distributionId,
    });
  }
}

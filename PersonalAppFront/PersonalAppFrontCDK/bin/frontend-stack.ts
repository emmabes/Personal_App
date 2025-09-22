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

export class FrontendStack extends Stack {
  constructor(scope: Construct, id: string, certificate: Certificate, props?: StackProps) {
    super(scope, id, props);

    const siteBucket = new Bucket(this, "SiteBucket", {
      bucketName: `personal-app-frontent-${this.account}`,
      websiteIndexDocument: "index.html",
      publicReadAccess: false,
      blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
      removalPolicy: RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
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
            domainName: siteBucket.bucketRegionalDomainName,
            s3OriginConfig: {
              originAccessIdentity: `origin-access-identity/cloudfront/${
                new CfnCloudFrontOriginAccessIdentity(this, "OAI", {
                  cloudFrontOriginAccessIdentityConfig: {
                    comment: "now cloudfront can access the s3 bucket",
                  },
                }).ref
              }`,
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

    siteBucket.addToResourcePolicy(
      new PolicyStatement({
        effect: Effect.ALLOW,
        actions: ["s3:GetObject"],
        principals: [
          new CanonicalUserPrincipal(
            originAccessIdentity.cloudFrontOriginAccessIdentityS3CanonicalUserId
          ),
        ],
        resources: [siteBucket.arnForObjects("*")],
      })
    );

    new CfnOutput(this, "DistributionDomainName", {
      value: distribution.getAtt("DomainName").toString(),
    });
  }
}

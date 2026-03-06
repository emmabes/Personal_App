import { PersAppStackProps } from "./utils/personal_app";

import { CfnOutput, RemovalPolicy, Stack, StackProps } from "aws-cdk-lib";
import { Certificate } from "aws-cdk-lib/aws-certificatemanager";
import {
  CfnCloudFrontOriginAccessIdentity,
  CfnDistribution,
  CfnKeyGroup,
  CfnPublicKey,
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
  public readonly cfSigningKeyPairId: string;

  constructor(scope: Construct, id: string, certificate: Certificate | undefined, props: PersAppStackProps) {
    super(scope, id, props);

    const { environment } = props;
    const bucketName:string = `pers-app-front-${environment.deployment}`;

    const logsBucket = new Bucket(this, `pers-app-front-logs-${environment.deployment}`, {
      bucketName: `${bucketName}-logs`,
      removalPolicy: RemovalPolicy.DESTROY,
      publicReadAccess: false,
      blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
      enforceSSL: true,
    });

    this.siteBucket = new Bucket(this, `pers-app-site-${environment.deployment}`, {
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

    const originAccessIdentity = new OriginAccessIdentity(this, `OAI-${environment.deployment}`, {
      comment: "Allows CloudFront to access the S3 bucket",
    });

    const cfSigningPublicKey = new CfnPublicKey(this, `CfSigningPublicKey-${environment.deployment}`, {
      publicKeyConfig: {
        callerReference: `pers-app-cf-signing-key-${environment.deployment}`,
        name: `pers-app-cf-signing-key-${environment.deployment}`,
        encodedKey: [
          '-----BEGIN PUBLIC KEY-----',
          'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzq5xHqErVaREpp0CEEEE',
          '1yIvzc4nuKgs+JgaK/YLdkB/1e/B70If4ye3PQHKsfcZTV2CaHLZYgAiw2L6dBca',
          '/ACm0mhvU2BPm7rmk+OP7KFG99FE9zsn2rgit8S/NVwKpPSsTZm67ZVozh08qMdi',
          'Dpgf3ynByCm1PSty70OrvC+pXMKHK0Hk/PsBmIlPcbP7aj+EfCElgtD0rzO2ObGO',
          'Q7KlLR6P09yO0GovoS2jMDSJ6wSbRwwwvjg/JHWXTflW0s0nn7RWmGhYlitpYEg6',
          'u4P+NnzQQondjLp7ERwGlaZRxenRlT9nl8HKzXRS8Rk7ytBmJVOxEMNz51OOp+/d',
          '4QIDAQAB',
          '-----END PUBLIC KEY-----',
        ].join('\n'),
      },
    });

    const cfKeyGroup = new CfnKeyGroup(this, `CfKeyGroup-${environment.deployment}`, {
      keyGroupConfig: {
        name: `pers-app-cf-key-group-${environment.deployment}`,
        items: [cfSigningPublicKey.ref],
      },
    });

    const distribution = new CfnDistribution(this, `PersAppFront-${environment.deployment}`, {
      distributionConfig: {
        enabled: true,
        defaultRootObject: "index.html",
        defaultCacheBehavior: {
          targetOriginId: `s3-origin-id-${environment.deployment}`,
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
            targetOriginId: `s3-origin-id-${environment.deployment}`,
            viewerProtocolPolicy: "redirect-to-https",
            cachePolicyId: "4135ea2d-6df8-44a3-9df3-4b5a84be39ad", // Disabling Caching during development; reistate optimized with "658327ea-f89d-4fab-a63d-7e88639e58f6"
          },
          {
            pathPattern: "/private/*",
            targetOriginId: `s3-origin-id-${environment.deployment}`,
            viewerProtocolPolicy: "redirect-to-https",
            trustedKeyGroups: [cfKeyGroup.ref],
            forwardedValues: {
              queryString: false,
              cookies: { forward: "none" },
            },
          },
        ],
        origins: [
          {
            id: `s3-origin-id-${environment.deployment}`,
            domainName: this.siteBucket.bucketRegionalDomainName,
            s3OriginConfig: {
              originAccessIdentity: `origin-access-identity/cloudfront/${originAccessIdentity.originAccessIdentityId}`,
            },
          },
        ],
        aliases: certificate ? environment.config.domainNames : undefined, // comment out when redploying the stack
        viewerCertificate: certificate ? {
          acmCertificateArn: certificate.certificateArn,
          sslSupportMethod: "sni-only",
        } : undefined,
        customErrorResponses: [
          {
            errorCode: 404,
            responseCode: 200,
            responsePagePath: "/index.html",
            errorCachingMinTtl: 300,
          },
        ],
      },
    });
    this.distributionId = distribution.getAtt("Id").toString();
    this.cfSigningKeyPairId = cfSigningPublicKey.ref;

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

    new CfnOutput(this, `DistributionDomainName-${environment.deployment}`, {
      value: distribution.getAtt("DomainName").toString(),
    });

    new CfnOutput(this, `ProductionBucketName-${environment.deployment}`, {
      value: this.siteBucket.bucketName,
    });

    new CfnOutput(this, `DistributionId-${environment.deployment}`, {
      value: this.distributionId,
    });

    new CfnOutput(this, `CfSigningKeyPairId-${environment.deployment}`, {
      value: cfSigningPublicKey.ref,
      exportName: `CfSigningKeyPairId-${environment.deployment}`,
    });
  }
}

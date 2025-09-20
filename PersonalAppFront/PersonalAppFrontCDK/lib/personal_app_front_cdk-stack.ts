import { Construct } from "constructs";
import {
  Bucket,
  BlockPublicAccess,
  BucketEncryption,
} from "aws-cdk-lib/aws-s3";
import { RemovalPolicy, CfnOutput, Stack, StackProps, Aws } from "aws-cdk-lib";
import { ICertificate } from "aws-cdk-lib/aws-certificatemanager";
import { Distribution, ViewerProtocolPolicy } from "aws-cdk-lib/aws-cloudfront";
import { S3StaticWebsiteOrigin } from "aws-cdk-lib/aws-cloudfront-origins";

export interface PersonalAppFrontCdkStackProps extends StackProps {
  certificate: ICertificate;
}

export class PersonalAppFrontCdkStack extends Stack {
  constructor(
    scope: Construct,
    id: string,
    props: PersonalAppFrontCdkStackProps
  ) {
    super(scope, id, props);

    const websiteBucket = new Bucket(this, "WebsiteBucket", {
      bucketName: `erikmabes-com-${Aws.ACCOUNT_ID}`,
      websiteIndexDocument: "index.html",
      websiteErrorDocument: "index.html",
      publicReadAccess: true,
      removalPolicy: RemovalPolicy.DESTROY,
      encryption: BucketEncryption.S3_MANAGED,
      blockPublicAccess: BlockPublicAccess.BLOCK_ACLS_ONLY,
      autoDeleteObjects: true,
    });

    const distribution = new Distribution(this, "Distribution", {
      defaultBehavior: {
        origin: new S3StaticWebsiteOrigin(websiteBucket),
        viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
      },
      domainNames: [
        "erikmabes.com",
        "www.erikmabes.com",
        "ericmabes.com",
        "www.ericmabes.com",
      ],
      certificate: props.certificate,
      defaultRootObject: "index.html",
      errorResponses: [
        {
          httpStatus: 404,
          responseHttpStatus: 200,
          responsePagePath: "/index.html",
        },
      ],
    });

    new CfnOutput(this, "CloudFrontDomainName", {
      value: distribution.distributionDomainName,
      description: "CloudFront domain for DNS setup",
    });

    new CfnOutput(this, "BucketName", {
      value: websiteBucket.bucketName,
      description: "S3 bucket for website files",
    });
  }
}

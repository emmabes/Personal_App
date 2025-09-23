import { Stage, StageProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { PersonalAppFrontendStack } from "./frontend-stack";
import { Certificate } from "aws-cdk-lib/aws-certificatemanager";

export class FrontendStage extends Stage {
    constructor(scope: Construct, id: string, certificate: Certificate, props?: StageProps) {
        super(scope, id, props);
        
        new PersonalAppFrontendStack(this, 'FrontendInfrstructure', certificate);
    }
}

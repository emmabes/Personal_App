import { StackProps } from "aws-cdk-lib";

export interface Environment {
  account: string,
  region: string,
  branch: string,
  deployment: string,
  config: { [key:string]: any}
}

export interface PersAppStackProps extends StackProps {
  env: {account: string, region: string},
  environment: Environment,
}

export class EnvironmentConfig implements Environment {
    public readonly account: string;
    public readonly region: string;
    public readonly branch: string;
    public readonly deployment: string;
    public readonly config: { [key:string]: any};
    constructor(
        account: string, 
        region: string,
        branch: string,
        deployment: string,
        config: { [key:string]: string}
    ) {
        this.account = account; 
        this.region = region;
        this.branch = branch;
        this.deployment = deployment;
        this.config = config;
    }
}

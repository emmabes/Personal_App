import boto3

client = boto3.client("cognito-idp")


def handler(event, context):
    client.admin_add_user_to_group(
        UserPoolId=event["userPoolId"],
        Username=event["userName"],
        GroupName="User",
    )
    # Cognito triggers require the event to be returned unchanged
    return event

import aws_cdk as core
import aws_cdk.assertions as assertions

from personal_app_back_cdk.personal_app_back_cdk_stack import PersonalAppBackCDKStack

# example tests. To run these tests, uncomment this file along with the example
# resource in personal_app_back/personal_app_back_stack.py
def test_sqs_queue_created():
    app = core.App()
    stack = PersonalAppBackCDKStack(app, "personal-app-back-cdk")
    template = assertions.Template.from_stack(stack)

#     template.has_resource_properties("AWS::SQS::Queue", {
#         "VisibilityTimeout": 300
#     })

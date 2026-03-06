import json
import os
import datetime
import boto3
from botocore.signers import CloudFrontSigner
from cryptography.hazmat.primitives import hashes, serialization
from cryptography.hazmat.primitives.asymmetric import padding


secrets_client = boto3.client("secretsmanager")

SECRETS_ARN = os.environ["SECRETS_ARN"]
CF_DOMAIN = os.environ["CF_DOMAIN"]
CF_KEY_PAIR_ID = os.environ["CF_KEY_PAIR_ID"]
RESOURCE_PATH = os.environ.get("RESOURCE_PATH", "private/resume.pdf")

_private_key = None


def _get_private_key():
    global _private_key
    if _private_key is None:
        resp = secrets_client.get_secret_value(SecretId=SECRETS_ARN)
        pem_data = resp["SecretString"].encode("utf-8")
        _private_key = serialization.load_pem_private_key(pem_data, password=None)
    return _private_key


def _rsa_signer(message):
    private_key = _get_private_key()
    return private_key.sign(message, padding.PKCS1v15(), hashes.SHA1())


def handler(event, context):
    url = f"https://{CF_DOMAIN}/{RESOURCE_PATH}"
    expire_date = datetime.datetime.utcnow() + datetime.timedelta(seconds=60)

    cf_signer = CloudFrontSigner(CF_KEY_PAIR_ID, _rsa_signer)
    signed_url = cf_signer.generate_presigned_url(url, date_less_than=expire_date)

    return {
        "statusCode": 200,
        "headers": {
            "Content-Type": "application/json",
        },
        "body": json.dumps({"url": signed_url}),
    }

import json
import os
import datetime
import boto3
from botocore.signers import CloudFrontSigner
from cryptography.hazmat.primitives import hashes, serialization
from cryptography.hazmat.primitives.asymmetric import padding


secrets_client = boto3.client("secretsmanager")

SIGNING_KEY_SECRET_ARN = os.environ["SIGNING_KEY_SECRET_ARN"]
KEY_PAIR_ID_SECRET_ARN = os.environ["KEY_PAIR_ID_SECRET_ARN"]
CF_DOMAIN = os.environ["CF_DOMAIN"]
RESOURCE_PATH = os.environ.get("RESOURCE_PATH", "private/resume.pdf")

ALLOWED_ORIGINS = {"https://erikmabes.com", "https://www.erikmabes.com"}

_private_key = None
_key_pair_id = None


def _get_private_key():
    global _private_key
    if _private_key is None:
        resp = secrets_client.get_secret_value(SecretId=SIGNING_KEY_SECRET_ARN)
        pem_data = resp["SecretString"].encode("utf-8")
        _private_key = serialization.load_pem_private_key(pem_data, password=None)
    return _private_key


def _get_key_pair_id():
    global _key_pair_id
    if _key_pair_id is None:
        resp = secrets_client.get_secret_value(SecretId=KEY_PAIR_ID_SECRET_ARN)
        _key_pair_id = resp["SecretString"]
    return _key_pair_id


def _rsa_signer(message):
    private_key = _get_private_key()
    return private_key.sign(message, padding.PKCS1v15(), hashes.SHA1())


def handler(event, context):
    # Reflect the origin header if it is in the allowed list, otherwise fall back
    # to the primary domain. API Gateway passes the raw origin through the event.
    request_headers = event.get("headers") or {}
    origin = request_headers.get("origin") or request_headers.get("Origin", "")
    allow_origin = origin if origin in ALLOWED_ORIGINS else "https://erikmabes.com"

    url = f"https://{CF_DOMAIN}/{RESOURCE_PATH}"
    expire_date = datetime.datetime.utcnow() + datetime.timedelta(seconds=60)

    key_pair_id = _get_key_pair_id()
    cf_signer = CloudFrontSigner(key_pair_id, _rsa_signer)
    signed_url = cf_signer.generate_presigned_url(url, date_less_than=expire_date)

    return {
        "statusCode": 200,
        "headers": {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": allow_origin,
        },
        "body": json.dumps({"url": signed_url}),
    }

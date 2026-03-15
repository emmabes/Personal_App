import json
import sys
import os
from unittest.mock import MagicMock, patch

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "../../lambda_funcs/sign_url"))


def _make_event(origin=None):
    headers = {}
    if origin:
        headers["origin"] = origin
    return {"headers": headers}


# ── Origin blocking ────────────────────────────────────────────────────────────

def test_blocks_request_with_no_origin():
    import handler
    result = handler.handler(_make_event(), {})
    assert result["statusCode"] == 403
    assert json.loads(result["body"]) == {"error": "Forbidden"}


def test_blocks_request_with_invalid_origin():
    import handler
    result = handler.handler(_make_event("https://evil.com"), {})
    assert result["statusCode"] == 403


def test_blocks_request_with_localhost_origin():
    import handler
    result = handler.handler(_make_event("http://localhost:5173"), {})
    assert result["statusCode"] == 403


# ── Allowed origins ────────────────────────────────────────────────────────────

def test_allows_primary_domain(mock_signing):
    import handler
    result = handler.handler(_make_event("https://erikmabes.com"), {})
    assert result["statusCode"] == 200
    assert result["headers"]["Access-Control-Allow-Origin"] == "https://erikmabes.com"
    body = json.loads(result["body"])
    assert "url" in body


def test_allows_www_domain(mock_signing):
    import handler
    result = handler.handler(_make_event("https://www.erikmabes.com"), {})
    assert result["statusCode"] == 200
    assert result["headers"]["Access-Control-Allow-Origin"] == "https://www.erikmabes.com"


# ── Fixtures ───────────────────────────────────────────────────────────────────

import pytest

@pytest.fixture(autouse=False)
def mock_signing():
    """Patch secrets and CloudFront signer so happy-path tests don't hit AWS."""
    import handler
    handler._private_key = None
    handler._key_pair_id = None

    with patch.object(handler, "_get_private_key", return_value=MagicMock()), \
         patch.object(handler, "_get_key_pair_id", return_value="test-key-pair-id"), \
         patch("handler.CloudFrontSigner") as mock_signer_cls:
        mock_signer_cls.return_value.generate_presigned_url.return_value = "https://erikmabes.com/private/resume.pdf?signature=test"
        yield

import sys
import os
from unittest.mock import patch, MagicMock

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "../../lambda_funcs/auto_assign_group"))


def _make_event(user_pool_id="us-west-2_test", username="testuser"):
    return {
        "userPoolId": user_pool_id,
        "userName": username,
        "triggerSource": "PostConfirmation_ConfirmSignUp",
        "request": {},
        "response": {},
    }


def test_assigns_user_to_user_group():
    with patch("handler.client") as mock_client:
        import handler
        event = _make_event()
        handler.handler(event, {})

        mock_client.admin_add_user_to_group.assert_called_once_with(
            UserPoolId="us-west-2_test",
            Username="testuser",
            GroupName="User",
        )


def test_returns_event_unchanged():
    """Cognito requires the trigger to return the event object unmodified."""
    with patch("handler.client"):
        import handler
        event = _make_event()
        result = handler.handler(event, {})
        assert result == event


def test_passes_correct_pool_id_and_username():
    with patch("handler.client") as mock_client:
        import handler
        event = _make_event(user_pool_id="us-west-2_abc123", username="alice@example.com")
        handler.handler(event, {})

        call_kwargs = mock_client.admin_add_user_to_group.call_args.kwargs
        assert call_kwargs["UserPoolId"] == "us-west-2_abc123"
        assert call_kwargs["Username"] == "alice@example.com"
        assert call_kwargs["GroupName"] == "User"

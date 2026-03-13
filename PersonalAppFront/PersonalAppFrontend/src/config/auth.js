export const cognitoConfig = {
    authority: `https://cognito-idp.us-west-2.amazonaws.com/${import.meta.env.VITE_USER_POOL_ID}`,
    client_id: import.meta.env.VITE_USER_POOL_CLIENT_ID,
    redirect_uri: window.location.origin + "/callback",
    response_type: "code",
    scope: "openid email profile",
    automaticSilentRenew: true,
    loadUserInfo: true,
};

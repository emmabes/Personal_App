import { WebStorageStateStore, InMemoryWebStorage } from "oidc-client-ts";

export const cognitoConfig = {
    authority: `https://cognito-idp.us-west-2.amazonaws.com/${import.meta.env.VITE_USER_POOL_ID}`,
    client_id: import.meta.env.VITE_USER_POOL_CLIENT_ID,
    redirect_uri: window.location.origin + "/callback",
    response_type: "code",
    scope: "openid email profile",
    automaticSilentRenew: true,
    loadUserInfo: true,
    // Store tokens in memory only — not sessionStorage/localStorage — to reduce XSS exposure.
    // Tradeoff: user must re-authenticate after a page refresh. True HttpOnly cookie storage
    // requires a Backend-for-Frontend (BFF) pattern and is out of scope for this SPA.
    userStore: new WebStorageStateStore({ store: new InMemoryWebStorage() }),
};

<style> * { background-color: #dee; color: #222; font-family: courier; } </style>

# Implementation Plan: User Authentication & Role-Based Access (RBAC)

## 1. Overview
To transform this portfolio from a "billboard" into a functional services platform, we need a robust identity layer. This layer will handle User Authentication (Who are you?), Authorization (What can you do?), and Role-Based Access Control (What is your role?).

Given the constraints of **low cost** and **high security**, we will leverage **AWS Cognito** as our Identity Provider (IdP) and **OpenID Connect (OIDC)** as the protocol.

---

## 2. Enlisted Services & Tools

### Infrastructure (AWS)
*   **AWS Cognito (User Pool):** Managed user directory. Handles sign-up, sign-in, MFA, and password resets.
    *   *Why:* Industry standard, $0 for up to 50k users, highly secure, and integrates natively with API Gateway.
*   **AWS API Gateway (Cognito Authorizer):** A built-in feature to validate JWT tokens before they ever reach our Lambda functions.
    *   *Why:* Zero-code security layer; rejects unauthorized requests at the edge, saving Lambda execution costs.
*   **AWS Lambda (Context-Aware):** Our backend functions will be updated to read the user's `sub` (unique ID) and `groups` (roles) from the request context.
*   **AWS Secrets Manager:** To store any sensitive environment variables related to the Auth flow (e.g., App Client Secrets, though we'll prefer public clients for SPAs).

### Frontend (Open-Source)
*   **`oidc-client-ts` or `react-oidc-context`:** A lightweight, standards-compliant Open-Source library for handling the OIDC flow in React.
    *   *Why:* Unlike AWS Amplify (which can be bloated), these libraries are small, modular, and vendor-agnostic.
*   **React Router v7:** To create "Protected Routes" that redirect unauthenticated users to the sign-in page.

---

## 3. Cost Projections (Up to 10 Users)

| Service | Tier | Estimated Monthly Cost |
| :--- | :--- | :--- |
| **AWS Cognito** | First 50,000 MAUs free | **$0.00** |
| **API Gateway** | First 1M requests/mo free | **$0.00** |
| **AWS Lambda** | First 1M requests/mo free | **$0.00** |
| **Data Transfer** | Outbound to internet (minimal) | **<$0.01** |
| **Total** | | **$0.00** |

*Note: The only "real" cost would be SMS MFA if enabled (~$0.01/SMS after the first 50), so we will prefer **TOTP (Authenticator App)** which is $0.*

---

## 4. Security Analysis & Best Practices

### Authentication (AuthN)
*   **MFA (Multi-Factor Auth):** We will enforce TOTP for the primary administrator account to prevent credential-stuffing attacks.
*   **Token Lifecycle:** We will use short-lived **Access Tokens** (e.g., 1 hour) and longer-lived **Refresh Tokens**.
*   **Secure Storage:** Since this is a SPA, we will store tokens in `sessionStorage` (cleared on tab close) or use the "BFF" (Backend-for-Frontend) pattern later if higher security is needed.

### Authorization (AuthZ) & RBAC
*   **Cognito Groups:** We will define three standard roles:
    1.  `Admin`: Full access to all services and logs.
    2.  `User`: Access to basic functional services (e.g., fitness tracking).
    3.  `Guest`: Read-only access to the portfolio.
*   **JWT Validation:** Our backend MUST validate the `iss` (issuer), `aud` (audience), and `exp` (expiration) of every token. Using API Gateway's built-in Authorizer handles this automatically.

### Mitigation of "Detrimental Exploits"
*   **Rate Limiting:** We have already implemented API Gateway throttling. We will add per-user rate limiting to prevent an authorized but compromised account from racking up costs.
*   **Scope Limitation:** Roles will be enforced at the API level. Even if a user "hacks" the frontend to show an Admin button, the backend will reject the request if the JWT doesn't have the `Admin` group.

---

## 5. Implementation Roadmap

### Phase 1: Identity Infrastructure (CDK)
*   Define a `CognitoUserPool` in `PersonalAppBackCDK`.
*   Configure a `UserPoolClient` (No Secret, for SPA use).
*   Add a `UserPoolDomain` for the hosted UI (optional, can be custom).
*   Add `CognitoUserPoolGroup` for `Admin` and `User`.

### Phase 2: API Security (CDK)
*   Create a `CognitoUserPoolAuthorizer` in API Gateway.
*   Update the `GET /sign-url` (and future) methods to use this authorizer.
*   Update Lambda environment variables to allow for user-specific data paths.

### Phase 3: Frontend Integration (React)
*   Install `react-oidc-context`.
*   Create a `Sign-In` page and a `Callback` route.
*   Implement an `AuthContext` to provide user state (`user`, `isAuthenticated`, `role`) throughout the app.
*   Wrap sensitive pages (e.g., Fitness, Recipes) in a `<ProtectedRoute />` component.

### Phase 4: Validation & Hardening
*   Test the "unauthorized" flow (direct API call without token).
*   Test the "forbidden" flow (User trying to access Admin API).
*   Perform a security audit of the JWT payload to ensure no PII is leaked unnecessarily.

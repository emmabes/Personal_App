import React from "react";
import ReactDOM from "react-dom/client";
import { AuthProvider } from "react-oidc-context";
import { cognitoConfig } from "./config/auth";
import App from "./App.jsx";
import "./index.css";

const onSigninCallback = (_user) => {
    window.history.replaceState(
        {},
        document.title,
        window.location.pathname
    );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider {...cognitoConfig} onSigninCallback={onSigninCallback}>
      <App />
    </AuthProvider>
  </React.StrictMode>
);

import React from 'react';
import { PublicClientApplication, Configuration } from '@azure/msal-browser';
import { MsalProvider, useMsal, AuthenticatedTemplate, UnauthenticatedTemplate, useIsAuthenticated } from "@azure/msal-react";
import "./Login.css";

const msalConfig: Configuration = {
    auth: {
        clientId: "<YOUR_AZURE_AD_CLIENT_ID>",
        authority: "https://login.microsoftonline.com/<YOUR_TENANT_ID>",
        redirectUri: window.location.origin,
    }
};

const pca = new PublicClientApplication(msalConfig);

const LoginPage: React.FC = () => {
    const { instance } = useMsal();
    const isAuthenticated = useIsAuthenticated();

    const handleLogin = () => {
        instance.loginRedirect();
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>NovaHR Login</h2>
                {!isAuthenticated && (
                    <button onClick={handleLogin}>Sign In with Azure AD</button>
                )}
            </div>
        </div>
    );
};

const App: React.FC = () => (
    <MsalProvider instance={pca}>
        <AuthenticatedTemplate>
            <div>Welcome to NovaHR!</div>
        </AuthenticatedTemplate>
        <UnauthenticatedTemplate>
            <LoginPage />
        </UnauthenticatedTemplate>
    </MsalProvider>
);

export default App;

import React from 'react';
import { useAuth } from './auth-context';
import { LoginPage } from './login-page';

/**
 * Wraps any route/page.
 * Renders <LoginPage> if the user is not authenticated;
 * otherwise renders children normally.
 */
export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? <>{children}</> : <LoginPage />;
};

import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
} from 'react';

const AUTH_SESSION_KEY = 'chartdb_auth';
const DEFAULT_PASSWORD = 'chartdb123';

// Password is set via VITE_APP_PASSWORD env variable.
// Falls back to DEFAULT_PASSWORD if not set.
const getConfiguredPassword = (): string => {
    return (
        (import.meta.env.VITE_APP_PASSWORD as string | undefined) ??
        DEFAULT_PASSWORD
    );
};

interface AuthContextType {
    isAuthenticated: boolean;
    login: (password: string) => boolean;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
        try {
            return sessionStorage.getItem(AUTH_SESSION_KEY) === 'true';
        } catch {
            return false;
        }
    });

    useEffect(() => {
        try {
            sessionStorage.setItem(
                AUTH_SESSION_KEY,
                isAuthenticated ? 'true' : 'false'
            );
        } catch {
            // sessionStorage unavailable (SSR/privacy mode) — in-memory only
        }
    }, [isAuthenticated]);

    const login = useCallback((password: string): boolean => {
        const configured = getConfiguredPassword();
        if (password === configured) {
            setIsAuthenticated(true);
            return true;
        }
        return false;
    }, []);

    const logout = useCallback(() => {
        setIsAuthenticated(false);
        try {
            sessionStorage.removeItem(AUTH_SESSION_KEY);
        } catch {
            // ignore
        }
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const ctx = useContext(AuthContext);
    if (!ctx) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return ctx;
};

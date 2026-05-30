import React, { FormEvent, useState } from 'react';
import { useAuth } from './auth-context';

export const LoginPage: React.FC = () => {
    const { login } = useAuth();
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [shake, setShake] = useState(false);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const ok = login(password);
        if (!ok) {
            setError('Incorrect password. Please try again.');
            setShake(true);
            setPassword('');
            setTimeout(() => setShake(false), 500);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-background">
            <div
                className={`w-full max-w-sm rounded-2xl border border-border bg-card p-8 shadow-lg transition-all${
                    shake ? ' animate-shake' : ''
                }`}
            >
                {/* Logo / Brand */}
                <div className="mb-6 flex flex-col items-center gap-2">
                    <svg
                        aria-label="ChartDB"
                        className="text-primary"
                        fill="none"
                        height="40"
                        viewBox="0 0 40 40"
                        width="40"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <rect
                            height="40"
                            rx="10"
                            width="40"
                            className="fill-primary/10"
                        />
                        <rect
                            fill="currentColor"
                            height="12"
                            rx="2"
                            width="6"
                            x="8"
                            y="20"
                        />
                        <rect
                            fill="currentColor"
                            height="18"
                            rx="2"
                            width="6"
                            x="17"
                            y="14"
                        />
                        <rect
                            fill="currentColor"
                            height="24"
                            rx="2"
                            width="6"
                            x="26"
                            y="8"
                        />
                    </svg>
                    <h1 className="text-xl font-semibold tracking-tight">
                        ChartDB
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Enter your password to access DB diagrams
                    </p>
                </div>

                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-1.5">
                        <label
                            className="text-sm font-medium"
                            htmlFor="password"
                        >
                            Password
                        </label>
                        <input
                            autoComplete="current-password"
                            autoFocus
                            className="h-10 rounded-lg border border-input bg-background px-3 text-sm outline-none ring-offset-background transition focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                            id="password"
                            onChange={(e) => {
                                setPassword(e.target.value);
                                setError('');
                            }}
                            placeholder="Enter password"
                            type="password"
                            value={password}
                        />
                        {error && (
                            <p className="text-xs text-destructive">{error}</p>
                        )}
                    </div>

                    <button
                        className="mt-1 h-10 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition hover:bg-primary/90 active:scale-[0.98] disabled:opacity-50"
                        disabled={!password}
                        type="submit"
                    >
                        Sign in
                    </button>
                </form>
            </div>

            {/* Shake animation */}
            <style>{`
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    20%       { transform: translateX(-8px); }
                    40%       { transform: translateX(8px); }
                    60%       { transform: translateX(-5px); }
                    80%       { transform: translateX(5px); }
                }
                .animate-shake { animation: shake 0.45s ease-in-out; }
            `}</style>
        </div>
    );
};

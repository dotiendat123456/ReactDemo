// src/context/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';

type AuthState = {
    token: string | null;
    user: any | null;
};

type AuthActions = {
    setAuth: (token: string, user?: any) => void;
    logout: () => void;
};

const AuthContext = createContext<AuthState & AuthActions | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [token, setToken] = useState<string | null>(() => localStorage.getItem('accessToken'));
    const [user, setUser] = useState<any | null>(() => {
        try {
            const raw = localStorage.getItem('authUser');
            return raw ? JSON.parse(raw) : null;
        } catch {
            return null;
        }
    });

    const setAuth = (newToken: string, newUser?: any) => {
        setToken(newToken);
        setUser(newUser || null);
        localStorage.setItem('accessToken', newToken);
        if (newUser) {
            localStorage.setItem('authUser', JSON.stringify(newUser));
        }
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('authUser');
    };

    return (
        <AuthContext.Provider value={{ token, user, setAuth, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
    return ctx;
};

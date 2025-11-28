import React, { createContext, useContext, useState, useEffect } from 'react';
import { userService } from '@/services/userService';
import type { User } from '@/types/user';

type AuthState = {
    token: string | null;
    user: User | null;
};

type AuthActions = {
    setAuth: (token: string, user?: User | null) => void;
    reloadProfile: () => Promise<void>;
    logout: () => void;
};

const AuthContext = createContext<AuthState & AuthActions | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [token, setToken] = useState<string | null>(() => localStorage.getItem('accessToken'));
    const [user, setUser] = useState<User | null>(() => {
        try {
            const raw = localStorage.getItem('authUser');
            return raw ? (JSON.parse(raw) as User) : null;
        } catch {
            return null;
        }
    });

    const setAuth = (newToken: string, newUser?: User | null) => {
        setToken(newToken);
        localStorage.setItem('accessToken', newToken);

        if (newUser) {
            setUser(newUser);
            localStorage.setItem('authUser', JSON.stringify(newUser));
        }
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('authUser');
    };

    const reloadProfile = async () => {
        if (!token) return;
        try {
            const profile = await userService.fetchProfile();
            setUser(profile);
            localStorage.setItem('authUser', JSON.stringify(profile));
        } catch (err) {
            console.error('Fetch profile failed', err);
            // token hỏng / hết hạn → có thể logout luôn
            // logout();
        }
    };

    // Auto load profile lần đầu nếu có token mà chưa có user
    useEffect(() => {
        if (token && !user) {
            reloadProfile();
        }
    }, [token]);

    return (
        <AuthContext.Provider value={{ token, user, setAuth, reloadProfile, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
    return ctx;
};

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

/**
 * Chỉ cho phép truy cập nếu CHƯA đăng nhập.
 * Nếu đã có token -> đá về homepage (/)
 */
export const GuestRoute: React.FC<{ children: React.ReactElement }> = ({
    children,
}) => {
    const { token } = useAuth();

    if (token) {
        // đã đăng nhập rồi -> không cho vào /login nữa
        return <Navigate to="/" replace />;
    }

    return children;
};

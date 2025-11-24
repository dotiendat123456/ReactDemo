// src/pages/HomePage.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

const HomePage: React.FC = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login', { replace: true });
    };

    return (
        <div style={{ padding: 24 }}>
            <h1>Trang chủ</h1>
            <p>Xin chào, {user?.name || user?.email || 'bạn'} 👋</p>

            <button onClick={handleLogout}>Đăng xuất</button>
        </div>
    );
};

export default HomePage;

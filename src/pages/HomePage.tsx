// src/pages/HomePage.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import './HomePage.css';

const HomePage: React.FC = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login', { replace: true });
    };

    const features = [
        {
            key: 'profile',
            title: 'Hồ sơ của tôi',
            description:
                'Xem và cập nhật thông tin cá nhân, phòng ban, chức danh, thông tin ngân hàng, người thân...',
            path: '/my-profile',
        },
        {
            key: 'posts',
            title: 'Danh sách bài viết',
            description: 'Xem danh sách các bài viết đã được đăng.',
            path: '/posts',
        },
    ];

    return (
        <div className="home-page">
            <div className="home-page__header">
                <div>
                    <h1 className="home-page__title">Trang chủ</h1>
                    <p className="home-page__subtitle">
                        Xin chào, {user?.name || user?.email || 'bạn'} 👋
                    </p>
                </div>

                <button
                    onClick={handleLogout}
                    className="home-page__logout-btn"
                >
                    Đăng xuất
                </button>
            </div>

            <div className="home-page__features">
                {features.map((item) => (
                    <div
                        key={item.key}
                        className="home-page__card"
                        onClick={() => navigate(item.path)}
                    >
                        <h2 className="home-page__card-title">{item.title}</h2>
                        <p className="home-page__card-desc">
                            {item.description}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomePage;

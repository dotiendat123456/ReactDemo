import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import './Header.css';

const Header: React.FC = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login', { replace: true });
    };

    return (
        <header className="app-header">
            <div className="app-header__inner">
                {/* Logo / Brand */}
                <div className="app-header__brand" onClick={() => navigate('/')}>
                    <div className="app-header__logo">KH</div>
                    <div className="app-header__title">
                        <span className="app-header__title-main">KHGC System</span>
                        <span className="app-header__title-sub">Quản lý nhân sự</span>
                    </div>
                </div>

                {/* Nav links */}
                <nav className="app-header__nav">
                    <NavLink
                        to="/"
                        end
                        className={({ isActive }) =>
                            'app-header__link' + (isActive ? ' app-header__link--active' : '')
                        }
                    >
                        Trang chủ
                    </NavLink>
                    <NavLink
                        to="/employees"
                        className={({ isActive }) =>
                            'app-header__link' + (isActive ? ' app-header__link--active' : '')
                        }
                    >
                        Nhân viên
                    </NavLink>
                    <NavLink
                        to="/reports"
                        className={({ isActive }) =>
                            'app-header__link' + (isActive ? ' app-header__link--active' : '')
                        }
                    >
                        Báo cáo
                    </NavLink>
                </nav>

                {/* User info + logout */}
                <div className="app-header__user">
                    <div className="app-header__user-info">
                        <span className="app-header__user-name">
                            {user?.name || 'Người dùng'}
                        </span>
                        <span className="app-header__user-email">
                            {user?.email || ''}
                        </span>
                    </div>
                    <button className="app-header__logout" onClick={handleLogout}>
                        Đăng xuất
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;

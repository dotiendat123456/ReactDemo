// // src/pages/HomePage.tsx
// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '@/context/AuthContext';

// const HomePage: React.FC = () => {
//     const { user, logout } = useAuth();
//     const navigate = useNavigate();

//     const handleLogout = () => {
//         logout();
//         navigate('/login', { replace: true });
//     };

//     return (
//         <div style={{ padding: 24 }}>
//             <h1>Trang chủ</h1>
//             <p>Xin chào, {user?.name || user?.email || 'bạn'} 👋</p>

//             <button onClick={handleLogout}>Đăng xuất</button>
//         </div>
//     );
// };

// export default HomePage;



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

    // Các mục trong homepage
    const features = [
        {
            key: 'profile',
            title: 'Hồ sơ của tôi',
            description: 'Xem và cập nhật thông tin cá nhân, phòng ban, chức danh, thông tin ngân hàng, người thân...',
            path: '/my-profile',
        },
        {
            key: 'employees',
            title: 'Quản lý nhân viên',
            description: 'Xem danh sách nhân viên, vai trò, phòng ban, trạng thái làm việc.',
            path: '/employees',
        },
        {
            key: 'reports',
            title: 'Báo cáo & thống kê',
            description: 'Xem các báo cáo tổng hợp, KPI, lịch sử đăng nhập, dữ liệu hệ thống.',
            path: '/reports',
        },
    ];

    return (
        <div
            style={{
                minHeight: '100vh',
                padding: 24,
                fontFamily:
                    'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
                color: '#e5e7eb',
            }}
        >
            {/* Header đơn giản trong page (Header layout tổng vẫn có riêng nếu em đã dùng MainLayout) */}
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 24,
                }}
            >
                <div>
                    <h1 style={{ fontSize: 28, margin: 0 }}>Trang chủ</h1>
                    <p style={{ marginTop: 4, fontSize: 14, color: '#9ca3af' }}>
                        Xin chào, {user?.name || user?.email || 'bạn'} 👋
                    </p>
                </div>

                <button
                    onClick={handleLogout}
                    style={{
                        border: 'none',
                        borderRadius: 999,
                        padding: '8px 14px',
                        fontSize: 13,
                        fontWeight: 600,
                        cursor: 'pointer',
                        background:
                            'linear-gradient(135deg, rgb(248 113 113), rgb(239 68 68))',
                        color: '#0b1120',
                    }}
                >
                    Đăng xuất
                </button>
            </div>

            {/* Grid các mục chức năng */}
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                    gap: 16,
                }}
            >
                {features.map((item) => (
                    <div
                        key={item.key}
                        onClick={() => navigate(item.path)}
                        style={{
                            background: '#020617',
                            borderRadius: 16,
                            padding: 16,
                            border: '1px solid #1f2937',
                            boxShadow: '0 18px 28px rgba(15,23,42,0.7)',
                            cursor: 'pointer',
                            transition:
                                'transform 0.12s ease, box-shadow 0.12s ease, border-color 0.12s ease, background 0.12s ease',
                        }}
                        onMouseEnter={(e) => {
                            (e.currentTarget as HTMLDivElement).style.transform =
                                'translateY(-3px)';
                            (e.currentTarget as HTMLDivElement).style.boxShadow =
                                '0 22px 35px rgba(15,23,42,0.9)';
                            (e.currentTarget as HTMLDivElement).style.borderColor =
                                '#3b82f6';
                        }}
                        onMouseLeave={(e) => {
                            (e.currentTarget as HTMLDivElement).style.transform =
                                'translateY(0px)';
                            (e.currentTarget as HTMLDivElement).style.boxShadow =
                                '0 18px 28px rgba(15,23,42,0.7)';
                            (e.currentTarget as HTMLDivElement).style.borderColor =
                                '#1f2937';
                        }}
                    >
                        <h2
                            style={{
                                fontSize: 18,
                                fontWeight: 600,
                                marginBottom: 6,
                            }}
                        >
                            {item.title}
                        </h2>
                        <p
                            style={{
                                fontSize: 13,
                                color: '#9ca3af',
                                marginBottom: 0,
                            }}
                        >
                            {item.description}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomePage;

// src/pages/MyProfilePage.tsx
import React, { useEffect, useState } from 'react';
import { userService } from '@/services/userService';
import type { User } from '@/types/user';
import { fileToBase64 } from '@/utils/file';
import './MyProfilePage.css';

const MyProfilePage: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // state edit avatar
    const [isEditingAvatar, setIsEditingAvatar] = useState(false);
    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
    const [savingAvatar, setSavingAvatar] = useState(false);

    // state edit background
    const [isEditingBg, setIsEditingBg] = useState(false);
    const [bgFile, setBgFile] = useState<File | null>(null);
    const [bgPreview, setBgPreview] = useState<string | null>(null);
    const [savingBg, setSavingBg] = useState(false);

    // ================== LOAD PROFILE LẦN ĐẦU ==================
    useEffect(() => {
        const init = async () => {
            try {
                setLoading(true);
                setError(null);
                const profile = await userService.fetchProfile();
                setUser(profile);
            } catch (err) {
                console.error(err);
                setError('Không tải được thông tin hồ sơ.');
            } finally {
                setLoading(false);
            }
        };

        void init();
    }, []);

    const handleRefresh = async () => {
        try {
            setLoading(true);
            setError(null);
            const profile = await userService.fetchProfile();
            setUser(profile);

            // reset trạng thái edit
            setIsEditingAvatar(false);
            setAvatarFile(null);
            setAvatarPreview(null);
            setIsEditingBg(false);
            setBgFile(null);
            setBgPreview(null);
        } catch (err) {
            console.error(err);
            setError('Làm mới dữ liệu thất bại.');
        } finally {
            setLoading(false);
        }
    };

    // ================== AVATAR HANDLERS ==================
    const handleStartEditAvatar = () => {
        setIsEditingAvatar(true);
        setAvatarPreview(user?.avatar_url ?? null);
        setAvatarFile(null);
    };

    const handleAvatarFileChange = (
        e: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setAvatarFile(file);
        setAvatarPreview(URL.createObjectURL(file));
    };

    const handleCancelAvatarEdit = () => {
        setIsEditingAvatar(false);
        setAvatarFile(null);
        setAvatarPreview(null);
    };

    const handleSaveAvatar = async () => {
        if (!avatarFile) {
            handleCancelAvatarEdit();
            return;
        }

        try {
            setSavingAvatar(true);
            setError(null);

            const base64 = await fileToBase64(avatarFile);

            const updated = await userService.updateAvatar({
                name: avatarFile.name,
                data: base64,
            });

            setUser(updated);
            setIsEditingAvatar(false);
            setAvatarFile(null);
            setAvatarPreview(null);
        } catch (err) {
            console.error(err);
            setError('Cập nhật avatar thất bại.');
        } finally {
            setSavingAvatar(false);
        }
    };

    // ================== BACKGROUND HANDLERS ==================
    const handleStartEditBg = () => {
        setIsEditingBg(true);
        setBgPreview(user?.background ?? null);
        setBgFile(null);
    };

    const handleBgFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setBgFile(file);
        setBgPreview(URL.createObjectURL(file));
    };

    const handleCancelBgEdit = () => {
        setIsEditingBg(false);
        setBgFile(null);
        setBgPreview(null);
    };

    const handleSaveBg = async () => {
        if (!bgFile) {
            handleCancelBgEdit();
            return;
        }

        try {
            setSavingBg(true);
            setError(null);

            const base64 = await fileToBase64(bgFile);

            await userService.updateBackground({
                name: bgFile.name,
                data: base64,
            });

            const refreshed = await userService.fetchProfile();
            setUser(refreshed);

            setIsEditingBg(false);
            setBgFile(null);
            setBgPreview(null);
        } catch (err) {
            console.error(err);
            setError('Cập nhật background thất bại.');
        } finally {
            setSavingBg(false);
        }
    };

    // ================== RENDER GUARDS ==================
    if (loading && !user) {
        return (
            <div className="myprofile-page">
                <div className="myprofile-card">
                    <p>Đang tải hồ sơ...</p>
                </div>
            </div>
        );
    }

    if (!loading && !user) {
        return (
            <div className="myprofile-page">
                <div className="myprofile-card">
                    <p>Không tìm thấy thông tin người dùng.</p>
                </div>
            </div>
        );
    }

    if (!user) return null;

    const fullName =
        user.name || `${user.last_name} ${user.first_name}`.trim();
    const currentAvatar = avatarPreview || user.avatar_url || '';
    const currentBg = bgPreview || user.background || '';

    return (
        <div className="myprofile-page">
            <div className="myprofile-header">
                <h1>My Profile</h1>
                <button
                    type="button"
                    onClick={handleRefresh}
                    disabled={loading}
                    className="myprofile-refresh-btn"
                >
                    {loading ? 'Đang cập nhật...' : 'Làm mới'}
                </button>
            </div>

            {error && <p className="myprofile-error">{error}</p>}

            {/* ===== HERO: background + avatar + nút đổi avatar ===== */}
            <section className="myprofile-hero">
                {currentBg && (
                    <div
                        className="myprofile-hero-background"
                        style={{ backgroundImage: `url(${currentBg})` }}
                    />
                )}

                {/* avatar + nút chỉnh sửa đứng cạnh nhau */}
                <div className="myprofile-hero-bottom">
                    <div className="myprofile-hero-avatar">
                        {currentAvatar ? (
                            <img src={currentAvatar} alt={fullName} />
                        ) : (
                            <span>{(user.first_name || user.name || 'U')[0]}</span>
                        )}
                    </div>

                    <div className="myprofile-hero-avatar-actions">
                        {!isEditingAvatar ? (
                            <button
                                type="button"
                                className="myprofile-icon-button"
                                onClick={handleStartEditAvatar}
                            >
                                ✏️ Đổi avatar
                            </button>
                        ) : (
                            <div className="myprofile-edit-actions">
                                <label className="myprofile-file-label">
                                    Chọn ảnh
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleAvatarFileChange}
                                        disabled={savingAvatar}
                                    />
                                </label>
                                <button
                                    type="button"
                                    onClick={handleSaveAvatar}
                                    disabled={savingAvatar || !avatarFile}
                                    className="myprofile-save-btn"
                                >
                                    {savingAvatar ? 'Đang lưu...' : 'Lưu'}
                                </button>
                                <button
                                    type="button"
                                    onClick={handleCancelAvatarEdit}
                                    disabled={savingAvatar}
                                    className="myprofile-cancel-btn"
                                >
                                    Hủy
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* nút đổi background ở góc phải trên */}
                <div className="myprofile-bg-edit">
                    {!isEditingBg ? (
                        <button
                            type="button"
                            className="myprofile-icon-button"
                            onClick={handleStartEditBg}
                        >
                            ✏️ Đổi background
                        </button>
                    ) : (
                        <div className="myprofile-edit-actions">
                            <label className="myprofile-file-label">
                                Chọn ảnh
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleBgFileChange}
                                    disabled={savingBg}
                                />
                            </label>
                            <button
                                type="button"
                                onClick={handleSaveBg}
                                disabled={savingBg || !bgFile}
                                className="myprofile-save-btn"
                            >
                                {savingBg ? 'Đang lưu...' : 'Lưu'}
                            </button>
                            <button
                                type="button"
                                onClick={handleCancelBgEdit}
                                disabled={savingBg}
                                className="myprofile-cancel-btn"
                            >
                                Hủy
                            </button>
                        </div>
                    )}
                </div>
            </section>

            {/* ===== 2 cột bên dưới ===== */}
            <div className="myprofile-layout">
                {/* Cột trái: info cơ bản (không còn nút đổi avatar ở đây) */}
                <section className="myprofile-left">
                    <div className="myprofile-basic">
                        <h2>{fullName}</h2>
                        <p className="myprofile-email">{user.email}</p>
                        <p
                            className={`myprofile-status myprofile-status--${user.badge_name || 'default'
                                }`}
                        >
                            {user.status_name}
                        </p>

                        {user.roles?.length > 0 && (
                            <div className="myprofile-section">
                                <h3>Vai trò</h3>
                                <div className="myprofile-tags">
                                    {user.roles.map((role) => (
                                        <span key={role.id} className="myprofile-tag">
                                            {role.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {user.departments?.length > 0 && (
                            <div className="myprofile-section">
                                <h3>Phòng ban</h3>
                                <div className="myprofile-tags">
                                    {user.departments.map((dep) => (
                                        <span
                                            key={dep.id}
                                            className="myprofile-tag myprofile-tag--blue"
                                        >
                                            {dep.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {user.titles?.length > 0 && (
                            <div className="myprofile-section">
                                <h3>Chức danh</h3>
                                <ul className="myprofile-list">
                                    {user.titles.map((t) => (
                                        <li key={t.id}>
                                            <strong>{t.description}</strong> ({t.level})
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </section>

                {/* Cột phải: 3 card thông tin chi tiết */}
                <section className="myprofile-right">
                    <div className="myprofile-card">
                        <h3>Thông tin cá nhân</h3>
                        <div className="myprofile-grid">
                            <div>
                                <span className="label">Ngày sinh</span>
                                <span className="value">
                                    {user.profile?.birth
                                        ? new Date(user.profile.birth).toLocaleDateString('vi-VN')
                                        : '—'}
                                </span>
                            </div>
                            <div>
                                <span className="label">Giới tính</span>
                                <span className="value">
                                    {user.profile?.gender || '—'}
                                </span>
                            </div>
                            <div>
                                <span className="label">Nơi sinh</span>
                                <span className="value">
                                    {user.profile?.birth_place || '—'}
                                </span>
                            </div>
                            <div>
                                <span className="label">Trình độ</span>
                                <span className="value">
                                    {user.profile?.education_level || '—'}
                                </span>
                            </div>
                            <div>
                                <span className="label">Trường</span>
                                <span className="value">
                                    {user.profile?.school_name || '—'}
                                </span>
                            </div>
                            <div>
                                <span className="label">Ngành</span>
                                <span className="value">
                                    {user.profile?.field || '—'}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="myprofile-card">
                        <h3>Thông tin giấy tờ</h3>
                        <div className="myprofile-grid">
                            <div>
                                <span className="label">CMND / CCCD</span>
                                <span className="value">
                                    {user.profile?.identification_number || '—'}
                                </span>
                            </div>
                            <div>
                                <span className="label">Ngày cấp</span>
                                <span className="value">
                                    {user.profile?.identification_date
                                        ? new Date(
                                            user.profile.identification_date,
                                        ).toLocaleDateString('vi-VN')
                                        : '—'}
                                </span>
                            </div>
                            <div>
                                <span className="label">Nơi cấp</span>
                                <span className="value">
                                    {user.profile?.identification_place || '—'}
                                </span>
                            </div>
                            <div>
                                <span className="label">Mã số thuế TNCN</span>
                                <span className="value">
                                    {user.profile?.personal_income_tax || '—'}
                                </span>
                            </div>
                            <div>
                                <span className="label">Số BHXH</span>
                                <span className="value">
                                    {user.profile?.insurance_number || '—'}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="myprofile-card">
                        <h3>Thông tin công việc & liên hệ</h3>
                        <div className="myprofile-grid">
                            <div>
                                <span className="label">Ngày vào công ty</span>
                                <span className="value">
                                    {user.profile?.company_entry_date
                                        ? new Date(
                                            user.profile.company_entry_date,
                                        ).toLocaleDateString('vi-VN')
                                        : '—'}
                                </span>
                            </div>
                            <div>
                                <span className="label">Số ngày gắn bó</span>
                                <span className="value">
                                    {user.profile?.number_of_date_attached ?? '—'}
                                </span>
                            </div>
                            <div>
                                <span className="label">Ngân hàng</span>
                                <span className="value">
                                    {user.profile?.bank_name
                                        ? `${user.profile.bank_name} - ${user.profile.bank_number}`
                                        : '—'}
                                </span>
                            </div>
                            <div>
                                <span className="label">Người thân</span>
                                <span className="value">
                                    {user.profile?.relative_name
                                        ? `${user.profile.relative_name} (${user.profile.relative_role})`
                                        : '—'}
                                </span>
                            </div>
                            <div>
                                <span className="label">SĐT người thân</span>
                                <span className="value">
                                    {user.profile?.relative_number || '—'}
                                </span>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default MyProfilePage;

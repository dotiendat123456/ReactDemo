// src/services/userService.ts
import { apiFetch } from './api';
import type { ProfileResponse, User } from '@/types/user';

/**
 * Gọi API:
 * GET /api/v1/profile
 * Header: Authorization: Bearer <token>
 */
export async function fetchProfile(): Promise<User> {
    const res = await apiFetch<ProfileResponse>('/api/v1/profile', {
        method: 'GET',
    });

    return res.data;
}

type FilePayload = {
    name: string;
    data: string;
};

export async function updateAvatar(payload: FilePayload) {
    const res = await apiFetch<ProfileResponse>('/api/v1/user/update-avatar', {
        method: 'POST',
        body: JSON.stringify({
            user_avatar: payload,
        }),
    });

    return res.data;
}

export async function updateBackground(payload: FilePayload) {
    const res = await apiFetch<ProfileResponse>('/api/v1/user/update-background', {
        method: 'POST',
        body: JSON.stringify({
            background: payload,
        }),
    });

    return res.data;
}

export const userService = {
    fetchProfile,
    updateAvatar,
    updateBackground,
};

// src/services/postService.ts
import { apiFetch } from './api';
import type { PostResponse, Post } from '@/types/post';

/**
 * Gọi API:
 * GET /api/v1/posts
 * Header: Authorization: Bearer <token>
 */
export async function fetchPosts(page: number = 1): Promise<PostResponse> {
    // Tạo URL với tham số query
    const url = `/api/v1/posts?page=${page}`;

    const res = await apiFetch<PostResponse>(url, {
        method: 'GET',
    });

    return res;
}
/**
 * Gọi API:
 * GET /api/v1/posts/{id}
 * Header: Authorization: Bearer <token>
 */
export async function fetchPostById(postId: number): Promise<Post> {
    const res = await apiFetch<Post>(`/api/v1/posts/${postId}`, {
        method: 'GET',
    });
    return res;
}

/**
 * Gọi API để thay đổi trạng thái bài viết (ví dụ: "Đã duyệt")
 * POST /api/v1/posts/{id}/update-status
 * Body: { status: string }
 */
export async function updatePostStatus(postId: number, status: string): Promise<Post> {
    const res = await apiFetch<PostResponse>(`/api/v1/posts/${postId}/update-status`, {
        method: 'POST',
        body: JSON.stringify({
            status,
        }),
    });

    return res.data[0]; // Trả về bài viết đã cập nhật
}

export const postService = {
    fetchPosts,
    fetchPostById,
    updatePostStatus,
};

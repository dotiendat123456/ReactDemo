// src/utils/postApi.ts
import type { Post } from '@/types/post';

export const POSTS_PATH = '/api/v1/posts';

export type CreatePostApiResponse = {
    data?: Post | Post[];
} & Partial<Post>;

/**
 * Chuẩn hoá response:
 * - { data: Post }
 * - { data: [Post] }
 * - Post trực tiếp
 */
export function extractPostFromResponse(
    json: CreatePostApiResponse | any,
): Post {
    if (json && json.data) {
        if (Array.isArray(json.data)) {
            return json.data[0] as Post;
        }
        return json.data as Post;
    }

    return json as Post;
}

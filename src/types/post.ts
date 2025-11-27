// src/types/post.ts

export interface Post {
    id: number;
    content: string;
    user: {
        id: number;
        name: string;
        avatar_url: string;
    };
    comments_count: number;
    emotes_count: number;
    created_at: string;
    status_name: string;
    file_upload: string;
    file_uploads: FileUpload[];
}

export interface FileUpload {
    uuid: string;
    name: string;
    original_url: string;
    extension: string;
    size: number;
}

export interface PostResponse {
    data: Post[];
    meta: {
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
}

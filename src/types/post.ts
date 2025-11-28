// src/types/post.ts

export interface CommentUser {
    id: number;
    name: string;
    first_name?: string;
    last_name?: string;
    email: string;
    status: number;
    status_name: string;
    badge_name: string;
    avatar_url: string;
}

export interface Comment {
    id: number;
    content: string;
    user: CommentUser;
    parent: number | null;
    created_at?: string;
    emotes_count?: number;
}

export interface AddCommentPayload {
    content: string;
    parent?: number | null;
}

export interface AddCommentResponse {
    message: string;
    data: Post[];
}

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
    comments?: Comment[];
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

export interface CreatePostPayload {
    content: string;
    survey_id?: number | null;
    fileUpload?: string[] | null;
}



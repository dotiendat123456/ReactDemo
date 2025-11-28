import { apiFetch, API_BASE } from './api';
import type {
  PostResponse,
  Post,
  CreatePostPayload,
  AddCommentPayload,
  AddCommentResponse,
} from '@/types/post';
import {
  POSTS_PATH,
  extractPostFromResponse,
  type CreatePostApiResponse,
} from '@/utils/postApi';

export async function fetchPosts(page: number = 1): Promise<PostResponse> {
  const url = `/api/v1/posts?page=${page}`;

  const res = await apiFetch<PostResponse>(url, {
    method: 'GET',
  });

  return res;
}

export async function fetchPostById(postId: number): Promise<Post> {
  const res = await apiFetch<Post>(`/api/v1/posts/${postId}`, {
    method: 'GET',
  });
  return res;
}

export async function createPost(
  payload: CreatePostPayload,
  files?: File[],
): Promise<Post> {
  const token = localStorage.getItem('accessToken') ?? '';

  if (!token) {
    throw new Error('Thiếu access token, vui lòng đăng nhập lại.');
  }

  if (files && files.length > 0) {
    const formData = new FormData();

    formData.append('content', payload.content);

    if (payload.survey_id != null) {
      formData.append('survey_id', String(payload.survey_id));
    }

    files.forEach((file) => {
      formData.append('fileUpload[]', file);
    });

    const base = API_BASE || window.location.origin;
    const url = new URL(POSTS_PATH, base).toString();

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!res.ok) {
      const txt = await res.text();
      console.error('createPost (multipart) error >>>', res.status, txt);
      throw new Error(txt || res.statusText);
    }

    const json = (await res.json()) as CreatePostApiResponse;
    console.log('createPost (multipart) response >>>', json);
    return extractPostFromResponse(json);
  }

  const json = await apiFetch<CreatePostApiResponse | any>(POSTS_PATH, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  });

  console.log('createPost (json) response >>>', json);
  return extractPostFromResponse(json);
}

export async function addComment(
  postId: number,
  payload: AddCommentPayload,
): Promise<Post> {
  const body: any = {
    content: payload.content,
  };

  if (payload.parent != null) {
    body.parent = String(payload.parent);
  }

  const res = await apiFetch<AddCommentResponse>(
    `/api/v1/add-comment${postId}`,
    {
      method: 'POST',
      body: JSON.stringify(body),
    },
  );

  if (!res.data || res.data.length === 0) {
    throw new Error(res.message || 'API không trả về dữ liệu sau khi bình luận.');
  }

  return res.data[0];
}

export const postService = {
  fetchPosts,
  fetchPostById,
  createPost,
  addComment,
};

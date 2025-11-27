// src/pages/PostDetailPage.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { postService } from '@/services/postService';
import type { Post } from '@/types/post';
import './PostDetailPage.css';

const BASE_URL = 'https://khgc-system.khgc.dev'; // Đảm bảo đây là URL gốc chính xác của bạn

const PostDetailPage: React.FC = () => {
  const { id } = useParams(); // Lấy ID từ URL
  const [post, setPost] = useState<Post | null>(null); // Lưu bài viết chi tiết vào state
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      const fetchPostDetail = async () => {
        try {
          const data = await postService.fetchPostById(Number(id)); // Gọi API chi tiết bài viết
          setPost(data);
        } catch (err) {
          setError('Failed to load post details.');
        } finally {
          setLoading(false);
        }
      };
      fetchPostDetail();
    }
  }, [id]); // Chạy lại khi ID thay đổi

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  // Tạo URL hoàn chỉnh cho ảnh bài viết
  const postImageUrl = post?.file_upload ? BASE_URL + post.file_upload : '';

  return (
    <div className="post-detail">
      {post && (
        <>
          <h1>{post.content}</h1>
          <p>{new Date(post.created_at).toLocaleDateString()}</p>
          {postImageUrl && (
            <img src={postImageUrl} alt="Post file" className="post-file" />
          )}
          <div className="user-info">
            <h3>{post.user.name}</h3>
            <img src={post.user.avatar_url} alt={post.user.name} className="avatar" />
          </div>
        </>
      )}
    </div>
  );
};

export default PostDetailPage;

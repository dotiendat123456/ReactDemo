import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { postService } from '@/services/postService';
import type { Post } from '@/types/post';
import './PostDetailPage.css';

const BASE_URL = 'https://khgc-system.khgc.dev';

const PostDetailPage: React.FC = () => {
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [commentContent, setCommentContent] = useState<string>('');
  const [commentError, setCommentError] = useState<string | null>(null);
  const [commentSubmitting, setCommentSubmitting] = useState<boolean>(false);

  useEffect(() => {
    if (!id) return;
    const fetchPostDetail = async () => {
      try {
        const data = await postService.fetchPostById(Number(id));
        setPost(data);
      } catch {
        setError('Failed to load post details.');
      } finally {
        setLoading(false);
      }
    };
    fetchPostDetail();
  }, [id]);

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!post) return;
    if (!commentContent.trim()) {
      setCommentError('Nội dung bình luận không được để trống.');
      return;
    }
    setCommentError(null);
    setCommentSubmitting(true);
    try {
      const updatedPost = await postService.addComment(post.id, {
        content: commentContent.trim(),
        parent: null,
      });
      setPost(updatedPost);
      setCommentContent('');
    } catch {
      setCommentError('Gửi bình luận thất bại.');
    } finally {
      setCommentSubmitting(false);
    }
  };

  if (loading) return <div className="post-detail-loading">Loading...</div>;
  if (error) return <div className="post-detail-error">{error}</div>;
  if (!post) return <div className="post-detail-error">Post not found.</div>;

  const postImageUrl = post.file_upload ? BASE_URL + post.file_upload : '';

  return (
    <div className="post-detail-page">
      <div className="post-detail-card">
        <header className="post-detail-header">
          <div className="post-detail-user">
            <img
              src={post.user.avatar_url}
              alt={post.user.name}
              className="post-detail-avatar"
            />
            <div className="post-detail-user-info">
              <h3>{post.user.name}</h3>
              <p className="post-detail-meta">
                {new Date(post.created_at).toLocaleString()}
              </p>
            </div>
          </div>
          <span className="post-detail-status">{post.status_name}</span>
        </header>

        <div className="post-detail-content">
          <p>{post.content}</p>
          {postImageUrl && (
            <img src={postImageUrl} alt="Post file" className="post-detail-image" />
          )}
        </div>

        <div className="post-detail-stats">
          <span>{post.comments_count} bình luận</span>
          <span>{post.emotes_count} lượt cảm xúc</span>
        </div>

        <section className="post-detail-comments">
          <h2>Bình luận</h2>

          {Array.isArray(post.comments) && post.comments.length > 0 ? (
            <ul className="comments-list">
              {post.comments.map((c) => (
                <li key={c.id} className="comment-item">
                  <div className="comment-header">
                    <img
                      src={c.user.avatar_url}
                      alt={c.user.name}
                      className="comment-avatar"
                    />
                    <div className="comment-author-block">
                      <span className="comment-author-name">{c.user.name}</span>
                    </div>
                  </div>
                  <p className="comment-text">{c.content}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="no-comments">Chưa có bình luận nào.</p>
          )}

          <form className="comment-form" onSubmit={handleAddComment}>
            <label className="comment-label">Thêm bình luận</label>
            <textarea
              value={commentContent}
              onChange={(e) => setCommentContent(e.target.value)}
              rows={3}
              placeholder="Nhập nội dung bình luận..."
            />
            {commentError && <p className="comment-error">{commentError}</p>}
            <button type="submit" disabled={commentSubmitting}>
              {commentSubmitting ? 'Đang gửi...' : 'Gửi bình luận'}
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default PostDetailPage;

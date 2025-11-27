// src/pages/PostsListPage.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { postService } from '@/services/postService';
import PostCard from '@/components/PostCard';
import type { Post } from '@/types/post';
import './PostsListPage.css';

const PostsListPage: React.FC = () => {
  const navigate = useNavigate(); // Sử dụng hook navigate để điều hướng
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const data = await postService.fetchPosts(currentPage);
        setPosts(data.data);
        setTotalPages(data.meta.last_page);
      } catch (err) {
        setError('Failed to load posts.');
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, [currentPage]);

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Điều hướng đến trang chi tiết của bài viết
  const handlePostClick = (id: number) => {
    navigate(`/posts/${id}`); // Điều hướng đến URL của bài viết chi tiết
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="posts-list">
      {posts.map((post) => (
        <PostCard
          key={post.id}
          id={post.id}
          content={post.content}
          user={post.user}
          created_at={post.created_at}
          file_upload={post.file_upload}
          file_uploads={post.file_uploads}
          onClick={() => handlePostClick(post.id)} // Gọi handlePostClick khi nhấn vào bài viết
        />
      ))}

      <div className="pagination">
        <button onClick={goToPrevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>{`Page ${currentPage} of ${totalPages}`}</span>
        <button onClick={goToNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default PostsListPage;

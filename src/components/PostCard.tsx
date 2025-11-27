// src/components/PostCard.tsx
import React from 'react';

const BASE_URL = 'https://khgc-system.khgc.dev'; // Đảm bảo đây là URL gốc chính xác của bạn

type PostCardProps = {
  id: number;
  content: string;
  user: {
    name: string;
    avatar_url: string;
  };
  created_at: string;
  file_upload: string;
  file_uploads: any;
  onClick: () => void; // Sự kiện nhấn vào bài viết
};

const PostCard: React.FC<PostCardProps> = ({
  id,
  content,
  user,
  created_at,
  file_upload,
  file_uploads,
  onClick,
}) => {
  // Kiểm tra và tạo đường dẫn URL đầy đủ cho file ảnh
  const postImageUrl = file_upload ? BASE_URL + file_upload : null; // Tạo URL đầy đủ cho ảnh bài viết

  return (
    <div className="post-card" onClick={onClick}>
      <div className="post-card-header">
        <img className="avatar" src={user.avatar_url} alt={user.name} />
        <h3>{user.name}</h3>
        <p>{new Date(created_at).toLocaleDateString()}</p>
      </div>
      <p className="content">{content}</p>
      {postImageUrl && <img className="post-file" src={postImageUrl} alt="Post file" />} {/* Hiển thị ảnh bài viết */}
    </div>
  );
};

export default PostCard;

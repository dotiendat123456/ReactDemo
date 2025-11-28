// src/components/PostCard.tsx
import React from 'react';

const BASE_URL = 'https://khgc-system.khgc.dev';

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
  onClick: () => void;
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
  const postImageUrl = file_upload ? BASE_URL + file_upload : null;

  return (
    <div className="post-card" onClick={onClick}>
      <div className="post-card-header">
        <img className="avatar" src={user.avatar_url} alt={user.name} />
        <h3>{user.name}</h3>
        <p>{new Date(created_at).toLocaleDateString()}</p>
      </div>
      <p className="content">{content}</p>
      {postImageUrl && <img className="post-file" src={postImageUrl} alt="Post file" />}
    </div>
  );
};

export default PostCard;

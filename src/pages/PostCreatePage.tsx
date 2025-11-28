// src/pages/PostCreatePage.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { postService } from '@/services/postService';
import type { CreatePostPayload } from '@/types/post';
import './PostCreatePage.css';

type PostCreateForm = {
  content: string;
  survey_id: string;
  files: FileList;
};

const PostCreatePage: React.FC = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<PostCreateForm>({
    defaultValues: {
      content: '',
      survey_id: '',
    },
  });

  // show preview tên file
  const watchedFiles = watch('files');

  const onSubmit = async (data: PostCreateForm) => {
    try {
      // convert FileList -> File[]
      const filesArray = data.files ? Array.from(data.files) : [];

      const payload: CreatePostPayload = {
        content: data.content,
        survey_id: data.survey_id ? Number(data.survey_id) : null,
        // không cần set fileUpload ở đây, vì khi dùng multipart
        // backend sẽ đọc trực tiếp từ fileUpload[]
      };

      console.log('final payload >>>', payload);
      console.log('filesArray >>>', filesArray);

      const createdPost = await postService.createPost(
        payload,
        filesArray.length ? filesArray : undefined, // 👈 GỬI FILE XUỐNG SERVICE
      );

      navigate(`/posts/${createdPost.id}`);
    } catch (err) {
      console.error('Create post error >>>', err);
      alert('Tạo bài viết thất bại 🥲');
    }
  };

  return (
    <div className="post-create">
      <h1>Tạo bài viết mới</h1>

      <form
        className="post-create-form"
        onSubmit={handleSubmit(onSubmit)}
        encType="multipart/form-data"
      >
        {/* CONTENT */}
        <div className="form-group">
          <label>Nội dung (content)</label>
          <textarea
            rows={4}
            {...register('content', {
              required: 'Nội dung là bắt buộc',
              maxLength: {
                value: 3000,
                message: 'Tối đa 3000 ký tự',
              },
            })}
          />
          {errors.content && (
            <p className="error">{errors.content.message}</p>
          )}
        </div>

        {/* SURVEY ID */}
        <div className="form-group">
          <label>Survey ID (survey_id)</label>
          <input
            type="number"
            min={1}
            {...register('survey_id')}
            placeholder="1"
          />
        </div>

        {/* FILES – chọn & upload thật */}
        <div className="form-group">
          <label>Ảnh đính kèm</label>
          <input
            type="file"
            accept="image/*"
            multiple
            {...register('files')}
          />

          {watchedFiles && watchedFiles.length > 0 && (
            <ul className="file-list">
              {Array.from(watchedFiles).map((file) => (
                <li key={file.name}>{file.name}</li>
              ))}
            </ul>
          )}

          <small>
            Ảnh sẽ được upload lên server trong field{' '}
            <code>fileUpload[]</code>.
          </small>
        </div>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Đang tạo...' : 'Tạo bài viết'}
        </button>
      </form>
    </div>
  );
};

export default PostCreatePage;

// src/pages/LoginPage.tsx
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';

import { authService } from '@/services/authService';
import type { LoginPayload } from '@/types/auth';
import { useAuth } from '@/context/AuthContext';
import './LoginPage.css';

const schema = yup.object({
  email: yup.string().email('Email không hợp lệ').required('Email là bắt buộc'),
  password: yup.string().min(8, 'Ít nhất 8 ký tự').required('Mật khẩu là bắt buộc'),
});

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<LoginPayload>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: LoginPayload) => {
    try {
      const res = await authService.loginRequest(values);
      const anyRes = res as any;

      // Lấy token + user từ res giống chỗ trong authService để sync
      const token: string | undefined =
        anyRes?.data?.token ??
        anyRes?.token ??
        anyRes?.access_token;

      const user = anyRes?.data?.user ?? anyRes?.user;

      if (token) {
        setAuth(token, user);
      }

      // Login thành công → chuyển sang homepage
      navigate('/', { replace: true });
    } catch (err: any) {
      setError('root', {
        type: 'server',
        message: err?.message || 'Đăng nhập thất bại',
      });
    }
  };

  return (
    <div className="login-page">
      <h1>Đăng nhập</h1>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" {...register('email')} />
          {errors.email && <p className="error-text">{errors.email.message}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="password">Mật khẩu</label>
          <input id="password" type="password" {...register('password')} />
          {errors.password && (
            <p className="error-text">{errors.password.message}</p>
          )}
        </div>

        {errors.root && errors.root.message && (
          <p className="error-text">{errors.root.message}</p>
        )}

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Đang đăng nhập...' : 'Đăng nhập'}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;

// src/App.tsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from '@/pages/LoginPage';
import HomePage from '@/pages/HomePage';
import { ProtectedRoute } from '@/routes/ProtectedRoute';
import { GuestRoute } from '@/routes/GuestRoute';
import MainLayout from '@/layouts/MainLayout';
import MyProfilePage from '@/pages/MyProfilePage';
import PostsListPage from '@/pages/PostsListPage';
import PostDetailPage from '@/pages/PostDetailPage';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* CHỈ CHO KHÁCH VÀO /login */}
        <Route
          path="/login"
          element={
            <GuestRoute>
              <LoginPage />
            </GuestRoute>
          }
        />

        {/* LAYOUT CHÍNH: bọc bởi ProtectedRoute + MainLayout */}
        <Route
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          {/* Các route “ở trong” layout */}
          <Route path="/" element={<HomePage />} />
          <Route path="/my-profile" element={<MyProfilePage />} />
          <Route path="/posts" element={<PostsListPage />} />
          <Route path="/posts/:id" element={<PostDetailPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;

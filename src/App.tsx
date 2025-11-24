import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from '@/pages/LoginPage';
import HomePage from '@/pages/HomePage';
import { ProtectedRoute } from '@/routes/ProtectedRoute';
import { GuestRoute } from '@/routes/GuestRoute';

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

        {/* CHỈ CHO USER ĐÃ LOGIN VÀO / */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

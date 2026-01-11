import { Routes, Route, useLocation } from 'react-router';
import { useEffect, useState } from '@lynx-js/react';
import { App } from './App';
import LoginPage from './app/views/Login/LoginPages';
import RegisterPage from './app/views/Register/RegisterPages';
import HomePage from './app/views/Home/HomePage';
import { AuthProvider } from './app/context/AuthProvider';
import { ProtectedRoute } from './app/middleware/ProtectedRoute';
import { StyleProvider } from './app/context/styleContext/StyleProvider';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/context/QueryClient';

export function AppRoutes() {
  const loc = useLocation();
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <StyleProvider>
          <Routes location={loc}>
            <Route path="/" element={<App />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<RegisterPage />} />
            <Route
              path="/home"
              element={<ProtectedRoute element={<HomePage />} />}
            />
          </Routes>
        </StyleProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

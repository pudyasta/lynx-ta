import { Routes, Route, useLocation } from 'react-router';
import './app/styles/core.css';
import LoginPage from './app/views/Login/LoginPages';
import RegisterPage from './app/views/Register/RegisterPages';
import HomePage from './app/views/Home/HomePage';
import { AuthProvider } from './app/context/AuthProvider';
import { ProtectedRoute } from './app/middleware/ProtectedRoute';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/context/QueryClient';
import { StyleProvider } from '@/context/StyleProvider';

declare module '@lynx-js/types' {
  interface GlobalProps {
    appTheme: string;
    title: string;
    appName: string;
    deviceType: string;
    deviceModel: string;
    osVersion: string;
  }
}
export function AppRoutes() {
  const loc = useLocation();
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <StyleProvider>
          <Routes location={loc}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<RegisterPage />} />
            <Route
              path="/"
              element={<ProtectedRoute element={<HomePage />} />}
            />
          </Routes>
        </StyleProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

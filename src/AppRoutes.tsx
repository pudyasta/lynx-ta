import { Routes, Route, useLocation } from 'react-router';
import './styles/core.css';
import LoginPage from './views/Login/LoginPages';
import RegisterPage from './views/Register/RegisterPages';
import HomePage from './views/Home/HomePage';
import { AuthProvider } from './context/AuthProvider';
import { ProtectedRoute } from './middleware/ProtectedRoute';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './context/QueryClient';
import { StyleProvider } from './context/StyleProvider';

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
            <Route path="/" element={<LoginPage />} />
            <Route path="/signup" element={<RegisterPage />} />
            <Route
              path="/a"
              element={<ProtectedRoute element={<HomePage />} />}
            />
          </Routes>
        </StyleProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

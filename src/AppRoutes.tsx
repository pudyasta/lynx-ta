import { Routes, Route, useLocation } from 'react-router';
import './styles/core.css';
import LoginPage from './pages/Login/LoginPages';
import RegisterPage from './pages/Register/RegisterPages';
import HomePage from './pages/Home/HomePage';
import { AuthProvider } from './context/AuthProvider';
import { ProtectedRoute } from './middleware/ProtectedRoute';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './context/QueryClient';
import { StyleProvider } from './context/StyleProvider';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
import {
  FORGOT_PASSWORD_ROUTE,
  SIGNIN_ROUTE,
  SIGNUP_ROUTE,
} from './constant/route';

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
            <Route path={SIGNIN_ROUTE} element={<LoginPage />} />
            <Route path={SIGNUP_ROUTE} element={<RegisterPage />} />
            <Route
              path={FORGOT_PASSWORD_ROUTE}
              element={<ForgotPasswordPage />}
            />
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

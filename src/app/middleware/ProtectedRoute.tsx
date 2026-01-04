import { Navigate, useLocation } from 'react-router';
import { useAuth } from '../context/AuthProvider';
import { useEffect } from 'react';

export const ProtectedRoute = ({ element }: { element: JSX.Element }) => {
  const { accessToken } = useAuth();

  useEffect(() => {
    // if(accessToken && accessToken.expires_in )
  }, []);

  const location = useLocation();
  if (!accessToken) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  return element;
};

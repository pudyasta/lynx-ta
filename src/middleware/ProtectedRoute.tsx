import { Navigate, useLocation } from 'react-router';
import { useAuth } from '../context/AuthProvider';

export const ProtectedRoute = ({ element }: { element: JSX.Element }) => {
  const { isAuthenticated } = useAuth();

  const location = useLocation();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  return element;
};

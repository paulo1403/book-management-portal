import { Navigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import { PropsWithChildren } from 'react';

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute = ({ children }: PropsWithChildren<PrivateRouteProps>) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated());

  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

export default PrivateRoute;

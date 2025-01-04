import { Navigate } from "react-router-dom";
import useAuthStore from "../store/authStore";
import { PropsWithChildren, useEffect, useState } from "react";

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute = ({ children }: PropsWithChildren<PrivateRouteProps>) => {
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated, token, fetchUserProfile } = useAuthStore();

  useEffect(() => {
    const initAuth = async () => {
      if (token && !isAuthenticated()) {
        await fetchUserProfile();
      }
      setIsLoading(false);
    };

    initAuth();
  }, [token]);

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  return isAuthenticated() ? <>{children}</> : <Navigate to="/login" />;
};

export default PrivateRoute;

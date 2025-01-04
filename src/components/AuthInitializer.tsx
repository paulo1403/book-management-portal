import { useEffect } from 'react';
import useAuthStore from '../store/authStore';

const AuthInitializer = ({ children }: { children: React.ReactNode }) => {
  const { fetchUserProfile, token } = useAuthStore();

  useEffect(() => {
    if (token) {
      fetchUserProfile();
    }
  }, []);

  return <>{children}</>;
};

export default AuthInitializer;

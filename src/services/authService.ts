import axios from './axiosConfig';
import { useAuthStore } from '../store/authStore';

const API_URL = 'http://localhost:8000/api'; // Ajusta esto a tu URL de Django

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
}

class AuthService {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await axios.post(`${API_URL}/auth/login/`, credentials);
      if (response.data.token) {
        useAuthStore.getState().setAuth(response.data.token, response.data.user);
      }
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async register(credentials: RegisterCredentials): Promise<AuthResponse> {
    try {
      const response = await axios.post(`${API_URL}/auth/register/`, credentials);
      if (response.data.token) {
        useAuthStore.getState().setAuth(response.data.token, response.data.user);
      }
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  logout(): void {
    useAuthStore.getState().clearAuth();
  }

  getCurrentUser() {
    return useAuthStore.getState().user;
  }

  getToken() {
    return useAuthStore.getState().token;
  }

  private handleError(error: any): Error {
    if (error.response) {
      // El servidor respondió con un estado de error
      throw new Error(error.response.data.message || 'An error occurred');
    } else if (error.request) {
      // La petición fue hecha pero no se recibió respuesta
      throw new Error('No response from server');
    } else {
      // Algo sucedió al configurar la petición
      throw new Error('Error setting up request');
    }
  }
}

export default new AuthService();

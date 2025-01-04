import axios from "axios";
import useAuthStore from "../store/authStore";
import { API_BASE_URL } from "../constants/config";

const API_URL = API_BASE_URL;

interface LoginCredentials {
  username: string;
  password: string;
}

interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  password_confirmation: string;
}

class AuthService {
  private setupAxiosConfig(token: string | null) {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Token ${token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  }

  private async setAuthToken(token: string) {
    useAuthStore.getState().setToken(token);
    this.setupAxiosConfig(token);
    await this.fetchUserProfile();
  }

  async login(credentials: LoginCredentials): Promise<void> {
    try {
      this.setupAxiosConfig(null);

      const response = await axios.post(`${API_URL}/token/`, credentials);
      if (response.data.token) {
        await this.setAuthToken(response.data.token);
        console.log('Login successful, token:', response.data.token);
      }
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async register(data: RegisterRequest): Promise<void> {
    try {
      const response = await axios.post(`${API_URL}/register/`, data);
      if (response.data.id) {
        await this.login({
          username: data.username,
          password: data.password,
        });
      }
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async fetchUserProfile(): Promise<void> {
    try {
      const response = await axios.get(`${API_URL}/user/profile/`);
      if (response.data) {
        useAuthStore.getState().setUser(response.data);
      }
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async logout(): Promise<void> {
    try {
      const token = useAuthStore.getState().token;
      this.setupAxiosConfig(token);

      await axios.post(`${API_URL}/user/logout/`);

      useAuthStore.getState().setUser(null);
      useAuthStore.getState().setToken(null);
      this.setupAxiosConfig(null);
    } catch (error) {
      console.error("Error during logout:", error);
    }
  }

  private handleError(error: any): Error {
    if (error.response) {
      const message =
        error.response.data.message ||
        error.response.data.detail ||
        Object.values(error.response.data)[0] ||
        "An error occurred";
      throw new Error(typeof message === "string" ? message : message[0]);
    } else if (error.request) {
      throw new Error("No response from server");
    } else {
      throw new Error("Error setting up request");
    }
  }
}

export default new AuthService();

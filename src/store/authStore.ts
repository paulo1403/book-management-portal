import { create } from "zustand";

interface User {
  id: number;
  username: string;
  email: string;
  date_joined: string;
}

interface AuthStore {
  user: User | null;
  token: string | null;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  logout: () => Promise<void>;
  fetchUserProfile: () => Promise<void>;
  isAuthenticated: () => boolean;
}

const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  token: localStorage.getItem("token"),
  setUser: (user) => set({ user }),
  setToken: (token) => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
    set({ token });
  },
  logout: async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        await fetch("http://localhost:8000/api/user/logout/", {
          method: "POST",
          headers: {
            Authorization: `Token ${token}`,
          },
        });
      }
      localStorage.removeItem("token");
      set({ user: null, token: null });
    } catch (error) {
      console.error("Error during logout:", error);
      localStorage.removeItem("token");
      set({ user: null, token: null });
    }
  },
  fetchUserProfile: async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await fetch("http://localhost:8000/api/user/profile/", {
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      if (response.ok) {
        const userData = await response.json();
        set({ user: userData });
      } else {
        throw new Error("Failed to fetch user profile");
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
      set({ user: null, token: null });
      localStorage.removeItem("token");
    }
  },
  isAuthenticated: () => {
    const token = localStorage.getItem("token");
    const user = get().user;
    return !!token && !!user;
  },
}));

export default useAuthStore;

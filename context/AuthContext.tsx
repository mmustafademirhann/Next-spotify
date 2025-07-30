import { create } from 'zustand';
import axios from 'axios';

interface User {
  id?: string;
  username: string;
  email?: string;
  role?: string;
}

interface AuthStore {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  register: (username: string, password: string, email?: string) => Promise<boolean>;
  logout: () => Promise<void>;
  checkAuthStatus: () => Promise<void>;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080';
axios.defaults.withCredentials = true;

export const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  loading: true,
  isAuthenticated: false,

  checkAuthStatus: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/playlists`);
      if (response.status === 200) {
        set({
          user: { username: 'authenticated_user' }, // Dilersen burada gerçek kullanıcıyı çekebilirsin
          isAuthenticated: true,
        });
      }
    } catch {
      set({ user: null, isAuthenticated: false });
    } finally {
      set({ loading: false });
    }
  },

  login: async (username, password) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/login`, {
        username,
        password,
      });

      if (response.status === 200) {
        await get().checkAuthStatus();
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  },

  register: async (username, password, email) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/register`, {
        username,
        password,
        email,
      });

      if (response.status === 200) {
        return await get().login(username, password);
      }
      return false;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
  },

  logout: async () => {
    try {
      await axios.post(`${API_BASE_URL}/api/auth/logout`);
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      set({ user: null, isAuthenticated: false });
    }
  },
}));

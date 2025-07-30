import { create } from 'zustand';
import { apiService } from '../utils/api';

interface User {
  id: string;
  username: string;
  email?: string;
}

interface AuthState {
  // State
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;

  // Actions
  login: (username: string, password: string) => Promise<boolean>;
  register: (username: string, password: string, email?: string) => Promise<boolean>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  // Initial state
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,

  // Actions
  clearError: () => set({ error: null }),

  login: async (username: string, password: string) => {
    set({ loading: true, error: null });
    try {
      const response = await apiService.auth.login(username, password);
      const user = response.data;
      set({ 
        user, 
        isAuthenticated: true, 
        loading: false 
      });
      return true;
    } catch (error: any) {
      console.error('Login error:', error);
      set({ 
        error: error.response?.data?.message || 'Login failed', 
        loading: false,
        user: null,
        isAuthenticated: false
      });
      return false;
    }
  },

  register: async (username: string, password: string, email?: string) => {
    set({ loading: true, error: null });
    try {
      const response = await apiService.auth.register(username, password, email);
      const user = response.data;
      set({ 
        user, 
        isAuthenticated: true, 
        loading: false 
      });
      return true;
    } catch (error: any) {
      console.error('Registration error:', error);
      set({ 
        error: error.response?.data?.message || 'Registration failed', 
        loading: false,
        user: null,
        isAuthenticated: false
      });
      return false;
    }
  },

  logout: async () => {
    set({ loading: true });
    try {
      await apiService.auth.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      set({ 
        user: null, 
        isAuthenticated: false, 
        loading: false,
        error: null
      });
    }
  },

  checkAuth: async () => {
    set({ loading: true });
    try {
      const response = await apiService.auth.me();
      const user = response.data;
      set({ 
        user, 
        isAuthenticated: true, 
        loading: false 
      });
    } catch (error) {
      console.error('Auth check error:', error);
      set({ 
        user: null, 
        isAuthenticated: false, 
        loading: false 
      });
    }
  },
}));

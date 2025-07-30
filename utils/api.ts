import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080';

// Configure axios to include credentials (cookies) for all requests
axios.defaults.withCredentials = true;

// Create axios instance with base configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor to handle authentication errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Redirect to login on authentication error
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    } else if (error.response?.status === 403) {
      // Handle forbidden access - user might not be logged in
      console.warn('Access forbidden - user might need to log in');
    } else if (error.response?.status === 500) {
      // Log server errors for debugging
      console.error('Server error:', error.response?.data || error.message);
    }
    return Promise.reject(error);
  }
);

export const apiService = {
  // Authentication
  auth: {
    login: (username: string, password: string) =>
      api.post('/api/auth/login', { username, password }),
    register: (username: string, password: string, email?: string) =>
      api.post('/api/auth/register', { username, password, email }),
    logout: () => api.post('/api/auth/logout'),
    me: () => api.get('/api/auth/me'),
  },

  // Playlists
  playlists: {
    getAll: () => api.get('/api/playlists'),
    getById: (id: string) => api.get(`/api/playlists/${id}`),
    create: (playlist: any) => api.post('/api/playlists', playlist),
    update: (playlist: any) => api.put('/api/playlists', playlist),
    delete: (id: string) => api.delete(`/api/playlists/${id}`),
    getLibrary: () => api.get('/api/playlists/library'),
    addToLibrary: (id: string) => api.post(`/api/playlists/${id}/library`),
    removeFromLibrary: (id: string) => api.delete(`/api/playlists/${id}/library`),
    isInLibrary: (id: string) => api.get(`/api/playlists/${id}/library`),
  },

  // Tracks
  tracks: {
    getAll: () => api.get('/api/tracks'),
    getById: (id: string) => api.get(`/api/tracks/${id}`),
    search: (query: string) => api.get(`/api/tracks/search?q=${encodeURIComponent(query)}`),
    getLiked: () => api.get('/api/tracks/liked'),
    like: (id: string) => api.post(`/api/tracks/${id}/like`),
    unlike: (id: string) => api.delete(`/api/tracks/${id}/like`),
    isLiked: (id: string) => api.get(`/api/tracks/${id}/liked`),
  },

  // Albums
  albums: {
    getAll: () => api.get('/api/albums'),
    getById: (id: string) => api.get(`/api/albums/${id}`),
    search: (query: string) => api.get(`/api/albums/search?q=${encodeURIComponent(query)}`),
    getLibrary: () => api.get('/api/albums/library'),
    addToLibrary: (id: string) => api.post(`/api/albums/${id}/library`),
    removeFromLibrary: (id: string) => api.delete(`/api/albums/${id}/library`),
    isInLibrary: (id: string) => api.get(`/api/albums/${id}/library`),
  },

  // Artists
  artists: {
    getAll: () => api.get('/api/artists'),
    getById: (id: string) => api.get(`/api/artists/${id}`),
    search: (query: string) => api.get(`/api/artists/search?q=${encodeURIComponent(query)}`),
  },

  // Search functionality
  search: {
    // Generic search across all types
    query: (query: string, type?: string) => {
      const params = new URLSearchParams({ q: query });
      if (type) params.append('type', type);
      return api.get(`/api/search?${params.toString()}`);
    },
    // Search with all method for comprehensive results
    all: (query: string) => {
      return api.get(`/api/search/all?q=${encodeURIComponent(query)}`);
    },
  },
};

export default api;

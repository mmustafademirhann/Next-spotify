import { create } from 'zustand';
import { apiService } from '../utils/api';
import { PlaylistType, SearchResults, Track } from '../types/types';

interface SpotifyState {
  // State
  playlists: PlaylistType[];
  searchResults: SearchResults | null;
  query: string;
  currentTrack: Track | null;
  tracksQueue: Track[];
  loading: boolean;
  error: string | null;

  // Actions
  setQuery: (query: string) => void;
  setCurrentTrack: (track: Track | null) => void;
  setTracksQueue: (tracks: Track[]) => void;
  fetchPlaylists: () => Promise<void>;
  fetchSearchResults: (query: string) => Promise<void>;
  clearError: () => void;
}

export const useSpotifyStore = create<SpotifyState>((set, get) => ({
  // Initial state
  playlists: [],
  searchResults: null,
  query: '',
  currentTrack: null,
  tracksQueue: [],
  loading: false,
  error: null,

  // Actions
  setQuery: (query: string) => set({ query }),
  
  setCurrentTrack: (track: Track | null) => set({ currentTrack: track }),
  
  setTracksQueue: (tracks: Track[]) => set({ tracksQueue: tracks }),
  
  clearError: () => set({ error: null }),

  fetchPlaylists: async () => {
    set({ loading: true, error: null });
    try {
      const response = await apiService.playlists.getAll();
      set({ playlists: response.data, loading: false });
    } catch (error) {
      console.error('Error fetching playlists:', error);
      set({ 
        error: 'Failed to fetch playlists', 
        loading: false,
        playlists: []
      });
    }
  },

  fetchSearchResults: async (query: string) => {
    if (!query.trim()) return;
    
    set({ loading: true, error: null, query });
    try {
      const response = await apiService.search.query(query);
      set({ searchResults: response.data, loading: false });
    } catch (error) {
      console.error('Error fetching search results:', error);
      set({ 
        error: 'Failed to fetch search results', 
        loading: false,
        searchResults: null
      });
    }
  },
}));

// Updated types for custom backend integration

export interface User {
  id?: string;
  username: string;
  email?: string;
  role?: string;
  createdAt?: string;
}

export interface AuthResponse {
  message: string;
  username: string;
  token?: string;
}

interface Image {
  height: number | null;
  url: string | null;
  width: number | null;
}

export interface Album {
  id: string | number;
  name?: string; // Spotify format
  title?: string; // Backend format
  artists?: [Artist]; // Spotify format
  artistId?: number; // Backend format
  artistName?: string; // Backend format
  images?: [Image];
  album_type?: string;
  release_date?: string;
  tracks?: {
    total: number;
    items: Track[];
  };
}

export interface Artist {
  id: string;
  name: string;
  images?: [Image];
  followers?: {
    total: number;
  };
  genres?: [string];
}

export interface Track {
  id: string;
  name: string;
  title?: string; // Backend compatibility
  album: Album;
  artists: [Artist];
  artistName?: string; // Backend compatibility
  duration_ms: number;
  preview_url: string;
}

export interface PlaylistType {
  description?: string;
  id: string | number;
  followers?: {
    total?: number;
  };
  images?: [Image];
  name: string;
  owner?: {
    id: string;
    display_name?: string;
  };
  items?: [{ added_at: string; track: Track }];
  tracks?: {
    items?: [{ added_at: string; track: Track }];
    total: number;
  };
  type?: string;
  total?: number;
}

export interface SearchResults {
  albums?: {
    items: Album[];
  };
  artists?: {
    items: Artist[];
  };
  playlists?: {
    items: PlaylistType[];
  };
  tracks?: {
    items: Track[];
  };
}

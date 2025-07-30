import { useEffect, useState } from "react";
import { useAuthStore } from "../../store/useAuthStore";
import { apiService } from "../../utils/api";
import AlbumList from "../../components/AlbumList";
import Heading from "../../components/Heading";
import Layout from "../../components/Layout";
import { Album } from "../../types/types";

export default function Albums() {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    const fetchAlbums = async () => {
      if (!isAuthenticated) return;
      
      try {
        const response = await apiService.albums.getAll();
        setAlbums(response.data);
      } catch (error) {
        console.error('Error fetching albums:', error);
        setError('Failed to load albums');
      } finally {
        setLoading(false);
      }
    };

    fetchAlbums();
  }, [isAuthenticated]);

  if (loading) {
    return (
      <Layout title="Spotify Clone - Albums">
        <div className="flex items-center justify-center h-64">
          <div className="text-white">Loading albums...</div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout title="Spotify Clone - Albums">
        <div className="flex items-center justify-center h-64">
          <div className="text-white">{error}</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Spotify Clone - Albums">
      <Heading text="Albums" />
      <AlbumList albums={albums} />
    </Layout>
  );
}


import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Heading from "../../../components/Heading";
import Layout from "../../../components/Layout";
import TracksTable from "../../../components/TracksTable";
import { Track } from "../../../types/types";
import { apiService } from "../../../utils/api";
import { useAuthStore } from "../../../store/useAuthStore";

export default function SearchTracks() {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();
  const { query } = router.query;
  useEffect(() => {
    const fetchTracks = async () => {
      if (!isAuthenticated || !query) return;
      
      try {
        const response = await apiService.search.query(query as string, 'track');
        setTracks(response.data.tracks?.items || []);
      } catch (error) {
        console.error('Error fetching tracks:', error);
        setError('Failed to load tracks');
      } finally {
        setLoading(false);
      }
    };

    fetchTracks();
  }, [isAuthenticated, query]);

  if (loading) {
    return (
      <Layout title="Spotify Clone - Search Tracks">
        <div className="flex items-center justify-center h-64">
          <div className="text-white">Loading tracks...</div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout title="Spotify Clone - Search Tracks">
        <div className="flex items-center justify-center h-64">
          <div className="text-white">{error}</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Spotify Clone - Search Tracks">
      <Heading text={`All songs for "${query}"`} />
      <TracksTable tracks={tracks} />
    </Layout>
  );
}



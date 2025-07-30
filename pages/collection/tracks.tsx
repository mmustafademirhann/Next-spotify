import { useEffect, useState } from "react";
import Image from "next/image";
import Layout from "../../components/Layout";
import TracksTable from "../../components/TracksTable";
import { useAuthStore } from "../../store/useAuthStore";
import { apiService } from "../../utils/api";
import { Track } from "../../types/types";

export default function LikedTracks() {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated, user } = useAuthStore();

  useEffect(() => {
    const fetchLikedTracks = async () => {
      if (!isAuthenticated) {
        setLoading(false);
        return;
      }
      
      try {
        setError(null);
        // Try to fetch liked tracks first, fallback to all tracks if not available
        let response;
        try {
          response = await apiService.tracks.getLiked();
        } catch (likedError: any) {
          if (likedError.response?.status === 404) {
            // Fallback to all tracks if liked endpoint doesn't exist
            response = await apiService.tracks.getAll();
          } else {
            throw likedError;
          }
        }
        setTracks(response.data || []);
      } catch (error: any) {
        console.error('Error fetching liked tracks:', error);
        const errorMessage = error.response?.status === 403 
          ? 'You need to log in to view your liked tracks'
          : error.response?.status === 500
          ? 'Server error - please try again later'
          : 'Failed to load liked tracks';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchLikedTracks();
  }, [isAuthenticated]);

  if (loading) {
    return (
      <Layout title="Spotify - Liked Songs">
        <div className="flex items-center justify-center h-64">
          <div className="text-white">Loading liked songs...</div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout title="Spotify - Liked Songs">
        <div className="flex items-center justify-center h-64">
          <div className="text-white">{error}</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Spotify - Liked Songs">
      <div className="flex items-end gap-6">
        <Image
          src="https://t.scdn.co/images/3099b3803ad9496896c43f22fe9be8c4.png"
          alt="Liked Songs"
          height={208}
          width={208}
        />
        <div className="flex flex-col gap-3">
          <h5 className="text-sm font-bold uppercase">Playlist</h5>
          <h2 className="text-5xl font-bold">Liked Songs</h2>

          <div className="flex items-center gap-5 text-sm">
            <span className="font-bold">{user?.username || 'User'}</span>
            {tracks.length > 0 && (
              <span className="text-gray">{tracks.length} songs</span>
            )}
          </div>
        </div>
      </div>

      {tracks.length > 0 && <TracksTable tracks={tracks} />}
    </Layout>
  );
}

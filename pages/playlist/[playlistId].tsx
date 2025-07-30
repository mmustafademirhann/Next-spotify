import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import parse from "html-react-parser";
import { RiMusic2Fill } from "react-icons/ri";
import Layout from "../../components/Layout";
import TracksTable from "../../components/TracksTable";
import styles from "../../styles/Description.module.css";
import { PlaylistType } from "../../types/types";
import { apiService } from "../../utils/api";
import { useAuthStore } from "../../store/useAuthStore";

export default function Playlist() {
  const [playlist, setPlaylist] = useState<PlaylistType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();
  const { playlistId } = router.query;
  useEffect(() => {
    const fetchPlaylist = async () => {
      if (!isAuthenticated || !playlistId) return;
      
      try {
        const response = await apiService.playlists.getById(playlistId as string);
        setPlaylist(response.data);
      } catch (error) {
        console.error('Error fetching playlist:', error);
        setError('Failed to load playlist');
      } finally {
        setLoading(false);
      }
    };

    fetchPlaylist();
  }, [isAuthenticated, playlistId]);

  if (loading) {
    return (
      <Layout title="Spotify Clone - Loading Playlist">
        <div className="flex items-center justify-center h-64">
          <div className="text-white">Loading playlist...</div>
        </div>
      </Layout>
    );
  }

  if (error || !playlist) {
    return (
      <Layout title="Spotify Clone - Playlist Not Found">
        <div className="flex items-center justify-center h-64">
          <div className="text-white">{error || 'Playlist not found'}</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title={`Spotify Clone - ${playlist?.name}`}>
      <div className="flex items-end gap-6">
        {playlist && (
          <>
            {playlist.images && playlist.images.length > 0 && playlist.images[0]?.url ? (
              <img
                src={playlist.images[0].url}
                alt={playlist.name}
                className="object-contain w-60 h-60 "
              />
            ) : (
              <div className="w-60 h-60 flex items-center justify-center bg-gray-800 rounded">
                <RiMusic2Fill className="w-16 h-16 text-gray-400" />
              </div>
            )}
            <div className="flex flex-col gap-3">
              <h5 className="text-xs font-bold uppercase">{playlist.type}</h5>
              <h2 className="text-5xl font-bold">{playlist.name}</h2>

              {playlist.description && (
                <p className={styles.description}>
                  {parse(playlist.description)}
                </p>
              )}

              <div className="flex items-center gap-5 text-sm">
                <span className="font-bold">{playlist.owner?.display_name || 'Unknown User'}</span>
                {playlist.followers?.total > 0 && (
                  <span className="text-gray">
                    {playlist.followers.total.toLocaleString()}{" "}
                    {playlist.followers.total > 1 ? "likes" : "like"}
                  </span>
                )}
                {playlist.tracks?.items?.length > 0 && (
                  <span className="text-gray">
                    {playlist.tracks.total?.toLocaleString() || playlist.tracks.items.length} songs
                  </span>
                )}
              </div>
            </div>
          </>
        )}
      </div>

      {playlist.tracks?.items && (
        <div className="mt-5">
          <TracksTable
            tracks={playlist.tracks.items
              .filter((item) => item.track !== null)
              .map((item) => item.track)}
          />
        </div>
      )}
    </Layout>
  );
}



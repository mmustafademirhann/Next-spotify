import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { RiMusic2Fill } from "react-icons/ri";
import Layout from "../../components/Layout";
import TracksTable from "../../components/TracksTable";
import { Album } from "../../types/types";
import { apiService } from "../../utils/api";
import { useAuthStore } from "../../store/useAuthStore";

export default function SingleAlbum() {
  const [album, setAlbum] = useState<Album | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();
  const { albumId } = router.query;

  useEffect(() => {
    const fetchAlbum = async () => {
      if (!isAuthenticated || !albumId) return;
      
      try {
        const response = await apiService.albums.getById(albumId as string);
        setAlbum(response.data);
      } catch (error) {
        console.error('Error fetching album:', error);
        setError('Failed to load album');
      } finally {
        setLoading(false);
      }
    };

    fetchAlbum();
  }, [isAuthenticated, albumId]);

  if (loading) {
    return (
      <Layout title="Loading Album...">
        <div className="flex items-center justify-center h-64">
          <div className="text-white">Loading album...</div>
        </div>
      </Layout>
    );
  }

  if (error || !album) {
    return (
      <Layout title="Album Not Found">
        <div className="flex items-center justify-center h-64">
          <div className="text-white">{error || 'Album not found'}</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title={`Spotify Clone - ${album?.title || album?.name || 'Album'}`}>
      <div className="flex items-end gap-6">
        {album && (
          <>
            {album.images && album.images.length > 0 && album.images[0]?.url ? (
              <img
                src={album.images[0].url}
                alt={album.title || album.name || 'Album'}
                className="object-contain w-52 h-52"
              />
            ) : (
              <div className="w-52 h-52 flex items-center justify-center bg-gray-800 rounded">
                <RiMusic2Fill className="w-16 h-16 text-gray-400" />
              </div>
            )}
            <div className="flex flex-col gap-3">
              <h5 className="text-xs font-bold uppercase">
                {album.album_type || 'Album'}
              </h5>
              <h2 className="text-5xl font-bold">{album.title || album.name || 'Unknown Album'}</h2>

              <div className="flex items-center gap-5 text-sm">
                <span className="font-bold">{album.artistName || (album.artists && album.artists[0]?.name) || 'Unknown Artist'}</span>
                {album.release_date && <span>{album.release_date}</span>}
                {album.tracks?.items?.length > 0 && (
                  <span className="text-gray">{album.tracks.total || album.tracks.items.length} songs</span>
                )}
              </div>
            </div>
          </>
        )}
      </div>

      {album.tracks?.items && <TracksTable tracks={album.tracks.items} noAlbum />}
    </Layout>
  );
}

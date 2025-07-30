import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { RiMusic2Fill } from "react-icons/ri";
import Heading from "../../components/Heading";
import Layout from "../../components/Layout";
import { Artist } from "../../types/types";
import { apiService } from "../../utils/api";
import { useAuthStore } from "../../store/useAuthStore";

export default function SingleArtist() {
  const [artist, setArtist] = useState<Artist | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();
  const { artistId } = router.query;
  useEffect(() => {
    const fetchArtist = async () => {
      if (!isAuthenticated || !artistId) return;
      
      try {
        const response = await apiService.artists.getById(artistId as string);
        setArtist(response.data);
      } catch (error) {
        console.error('Error fetching artist:', error);
        setError('Failed to load artist');
      } finally {
        setLoading(false);
      }
    };

    fetchArtist();
  }, [isAuthenticated, artistId]);

  if (loading) {
    return (
      <Layout title="Spotify Clone - Loading Artist">
        <div className="flex items-center justify-center h-64">
          <div className="text-white">Loading artist...</div>
        </div>
      </Layout>
    );
  }

  if (error || !artist) {
    return (
      <Layout title="Spotify Clone - Artist Not Found">
        <div className="flex items-center justify-center h-64">
          <div className="text-white">{error || 'Artist not found'}</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title={`Spotify Clone - ${artist?.name}`}>
      <div className="flex items-end gap-6">
        {artist && (
          <>
            {artist.images && artist.images.length > 0 && artist.images[0]?.url ? (
              <img
                src={artist.images[0].url}
                alt={artist.name}
                className="object-contain rounded-full w-52 h-52"
              />
            ) : (
              <div className="w-52 h-52 flex items-center justify-center bg-gray-800 rounded-full">
                <RiMusic2Fill className="w-16 h-16 text-gray-400" />
              </div>
            )}
            <div className="flex flex-col items-start gap-3">
              <h2 className="text-5xl font-bold">{artist.name}</h2>
              {artist.followers?.total && (
                <span className="text-sm">
                  {artist.followers.total.toLocaleString()} followers
                </span>
              )}
              {artist.genres && artist.genres.length > 0 && (
                <div className="flex items-center gap-5 text-sm">
                  {artist.genres.map((genre) => (
                    <span key={genre}>{genre}</span>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>

      <div className="mt-8">
        <div className="text-center text-gray-400">
          <p>Artist details loaded from your backend!</p>
          <p className="mt-2 text-sm">Additional features like tracks and albums can be added when your backend supports them.</p>
        </div>
      </div>
    </Layout>
  );
}



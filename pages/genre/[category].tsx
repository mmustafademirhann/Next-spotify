import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuthStore } from "../../store/useAuthStore";
import { useSpotifyStore } from "../../store/useSpotifyStore";
import Heading from "../../components/Heading";
import Layout from "../../components/Layout";
import PlaylistList from "../../components/PlaylistList";

export default function CategoryPlaylists() {
  const router = useRouter();
  const { category } = router.query;
  const { isAuthenticated } = useAuthStore();
  const { playlists, loading, error, fetchPlaylists } = useSpotifyStore();
  
  const [capitalizedCategory, setCapitalizedCategory] = useState("");

  const categoryName = Array.isArray(category) ? category[0] : category || "";

  useEffect(() => {
    if (categoryName) {
      const afterName = categoryName
        .split(" ")
        .map((i) => i[0].toUpperCase() + i.slice(1))
        .join(" ");
      setCapitalizedCategory(afterName);
    }
  }, [categoryName]);

  useEffect(() => {
    if (categoryName && isAuthenticated) {
      // This would typically fetch playlists by category from your backend
      // For now, we'll fetch all playlists and filter by category if needed
      fetchPlaylists();
    }
  }, [categoryName, isAuthenticated, fetchPlaylists]);

  if (loading) {
    return (
      <Layout title={`Spotify - ${capitalizedCategory}`}>
        <div className="flex items-center justify-center h-64">
          <div className="text-white">Loading playlists...</div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout title={`Spotify - ${capitalizedCategory}`}>
        <div className="flex items-center justify-center h-64">
          <div className="text-white">{error}</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title={`Spotify - ${capitalizedCategory}`}>
      <Heading text={capitalizedCategory} className="capitalize" />
      <PlaylistList playlists={playlists} />
    </Layout>
  );
}



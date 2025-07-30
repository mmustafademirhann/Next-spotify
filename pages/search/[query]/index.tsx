import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import AlbumList from "../../../components/AlbumList";
import ArtistList from "../../../components/ArtistList";
import Heading from "../../../components/Heading";
import Layout from "../../../components/Layout";
import PlaylistList from "../../../components/PlaylistList";
import { useSpotifyStore } from "../../../store/useSpotifyStore";
import { SearchResults, Track } from "../../../types/types";
import { apiService } from "../../../utils/api";
import { fmtMSS } from "../../../utils/formatDuration";
import { useAuthStore } from "../../../store/useAuthStore";

export default function Search() {
  const [searchResults, setSearchResults] = useState<SearchResults | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();
  const { query } = router.query;
  const { setCurrentTrack } = useSpotifyStore();

  const playTrack = (track: Track) => {
    if (track.preview_url) {
      setCurrentTrack(track);
    }
  };

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!isAuthenticated || !query) return;
      
      try {
        const response = await apiService.search.all(query as string);
        setSearchResults(response.data);
      } catch (error) {
        console.error('Error searching:', error);
        setError('Failed to search');
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [isAuthenticated, query]);

  if (loading) {
    return (
      <Layout title="Spotify Clone - Search">
        <div className="flex items-center justify-center h-64">
          <div className="text-white">Searching...</div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout title="Spotify Clone - Search">
        <div className="flex items-center justify-center h-64">
          <div className="text-white">{error}</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title={`Spotify Clone - Search: ${query}`}>
      {searchResults && (
        <>
          <div className="mt-5">
            <Link href={`/search/${query}/tracks`}>
              <a>
                <Heading text="Songs" />
              </a>
            </Link>

            {searchResults.tracks?.items?.slice(0, 5).map((track) => (
              <div
                className={`grid grid-cols-12 col-span-12 p-1 ${
                  !track.preview_url ? "opacity-50" : ""
                }`}
                key={track.id}
              >
                <div className="flex items-center w-full col-span-11 my-3">
                  <div className="flex items-center w-full gap-4">
                    <div className="flex-shrink-0 w-10 h-10">
                      {track.album?.images?.[0]?.url ? (
                        <img
                          src={track.album.images[0].url}
                          alt={track.name || track.title || 'Track'}
                          className="object-contain w-10 h-10"
                        />
                      ) : (
                        <div className="w-10 h-10 bg-gray-800 rounded flex items-center justify-center">
                          <span className="text-gray-400 text-xs">♪</span>
                        </div>
                      )}
                    </div>

                    <div className="w-full">
                      <div
                        className={`w-10/12 text-sm font-medium truncate ${
                          track.preview_url
                            ? "cursor-pointer hover:underline"
                            : "cursor-default"
                        }`}
                        onClick={() => playTrack(track)}
                      >
                        {track.name || track.title || 'Unknown Track'}
                      </div>

                      <div className="flex flex-wrap items-center w-10/12 gap-1 text-sm text-gray">
                        <span className="truncate ">
                          {track.artists?.map((artist, index) => (
                            <Link key={artist.id} href={`/artist/${artist.id}`}>
                              <a>
                                <span className="hover:text-white hover:underline">
                                  {index !== 0
                                    ? `, ${artist.name}`
                                    : artist.name}
                                </span>
                              </a>
                            </Link>
                          )) || (
                            <span>{track.artistName || 'Unknown Artist'}</span>
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center col-span-1 my-3 text-sm text-gray ">
                  {track.duration_ms ? fmtMSS(track.duration_ms) : '0:00'}
                </div>
              </div>
            ))}
          </div>

          {searchResults.artists?.items?.length > 0 && (
            <div className="mt-5">
              <Link href={`/search/${query}/artists`}>
                <a>
                  <Heading text="Artists" />
                </a>
              </Link>
              <ArtistList artists={searchResults.artists.items.slice(0, 6)} />
            </div>
          )}

          {searchResults.albums?.items?.length > 0 && (
            <div className="mt-5">
              <Link href={`/search/${query}/albums`}>
                <a>
                  <Heading text="Albums" />
                </a>
              </Link>
              <AlbumList albums={searchResults.albums.items.slice(0, 6)} />
            </div>
          )}

          {searchResults.playlists?.items?.length > 0 && (
            <div className="mt-5">
              <Link href={`/search/${query}/playlists`}>
                <a>
                  <Heading text="Playlists" />
                </a>
              </Link>
              <PlaylistList
                playlists={searchResults.playlists.items.slice(0, 6)}
              />
            </div>
          )}
        </>
      )}
    </Layout>
  );
}



import { GetServerSideProps } from "next";
import Link from "next/link";
import CardItem from "../../components/CardItem";
import CardItemGrid from "../../components/CardItemGrid";
import Heading from "../../components/Heading";
import Layout from "../../components/Layout";
import { useSpotifyStore } from "../../store/useSpotifyStore";
import { PlaylistType } from "../../types/types";
import { customGet } from "../../utils/customGet";

interface IProps {
  likedTracks: PlaylistType;
}

import { useAuthStore } from "../../store/useAuthStore";

export default function UserPlaylists({ likedTracks }: IProps) {
  const { playlists } = useSpotifyStore();
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return (
      <Layout title="Spotify - Your Library">
        <Heading text="Your Library" />
        <div className="flex flex-col items-center justify-center h-64 text-white">
          <p className="mb-4 text-lg">Kütüphaneni görmek için giriş yapmalısın.</p>
          <Link href="/login">
            <a className="px-6 py-2 text-white bg-primary rounded-full hover:bg-opacity-80">Giriş Yap</a>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Spotify - Your Library">
      <Heading text="Playlists" />
      <CardItemGrid>
        <Link href="/collection/tracks" passHref>
          <div
            className="flex flex-col items-start justify-end col-span-2 gap-8 p-4 rounded cursor-pointer"
            style={{
              background: "linear-gradient(149.46deg,#450af5,#8e8ee5 99.16%)",
            }}
          >
            <div className="inline">
              {likedTracks?.items.map(({ track }) => (
                <span key={track.id} className="mr-3">
                  <span>{track.artists[0].name}</span>{" "}
                  <span className="text-white opacity-70">{track.name}</span>
                </span>
              ))}
            </div>
            <div>
              <h1 className="text-4xl font-bold">Liked songs</h1>
              <h3 className="mt-1">{likedTracks.total} liked songs</h3>
            </div>
          </div>
        </Link>

        {playlists?.map((playlist) => (
          <CardItem
            key={playlist.id}
            heading={playlist.name}
            id={String(playlist.id)}
            images={playlist.images}
            altTitle={playlist.name}
            subheading={playlist.description}
            type="playlist"
          />
        ))}
      </CardItemGrid>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // Check for JWT token in cookies
  const token = ctx.req.cookies.token;

  // If no token, just return empty likedTracks, let component handle login prompt
  if (!token) {
    return {
      props: {
        likedTracks: {
          id: 'liked',
          name: 'Liked Songs',
          description: 'Your liked songs',
          images: [],
          items: [],
          total: 0
        }
      }
    };
  }

  // Fetch liked tracks from your backend API
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'}/api/playlists/liked`, {
      headers: {
        'Cookie': ctx.req.headers.cookie || '',
      },
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch liked tracks');
    }
    
    const likedTracks = await response.json();
    return { props: { likedTracks } };
  } catch (error) {
    console.error('Error fetching liked tracks:', error);
    // Return empty playlist if API call fails
    return { 
      props: { 
        likedTracks: {
          id: 'liked',
          name: 'Liked Songs',
          description: 'Your liked songs',
          images: [],
          tracks: { total: 0 }
        }
      } 
    };
  }
};

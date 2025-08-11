import React from 'react';
import { IoPlay, IoHeart, IoAdd } from 'react-icons/io5';
import Link from 'next/link';
import { useSpotifyStore } from '../store/useSpotifyStore';
import { useAuthStore } from '../store/useAuthStore';

interface ContentItem {
  id: bigint;
  name: string;
  image: string;
  type: 'album' | 'artist' | 'playlist';
  subtitle?: string;
  description?: string;
}

const ModernCard: React.FC<{ item: ContentItem }> = ({ item }) => {
  return (
    <div className="group relative bg-gray-900 rounded-lg p-4 hover:bg-gray-800 transition-all duration-300 cursor-pointer">
      {/* Image Container */}
      <div className="relative mb-4">
        <img
          src={item.image || '/default-cover.jpg'}
          alt={item.name}
          className={`w-full aspect-square object-cover shadow-lg transition-all duration-300 group-hover:shadow-2xl ${
            item.type === 'artist' ? 'rounded-full' : 'rounded-md'
          }`}
        />
        M
        {/* Play Button Overlay */}
        <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
          <button className="bg-primary text-black rounded-full p-3 shadow-lg hover:scale-105 hover:bg-green-400 transition-all">
            <IoPlay className="w-5 h-5 ml-0.5" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-1">
        <h3 className="font-semibold text-white truncate group-hover:text-green-400 transition-colors">
          {item.name}
        </h3>
        {item.subtitle && (
          <p className="text-sm text-gray-400 truncate">
            {item.subtitle}
          </p>
        )}
        {item.description && (
          <p className="text-xs text-gray-500 line-clamp-2">
            {item.description}
          </p>
        )}
      </div>
    </div>
  );
};

const SectionHeader: React.FC<{ title: string; showAll?: boolean }> = ({ title, showAll = true }) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-2xl font-bold text-white">{title}</h2>
      {showAll && (
        <Link href="/browse/all">
          <a className="text-sm text-gray-400 hover:text-white transition-colors font-medium">
            Tümünü göster
          </a>
        </Link>
      )}
    </div>
  );
};

const QuickAccessGrid: React.FC = () => {
  const quickAccess = [
    { id: '1', name: 'Beğenilen Şarkılar', image: '/liked-songs.jpg', type: 'playlist' as const },
    { id: '2', name: 'Son Çalınanlar', image: '/recent.jpg', type: 'playlist' as const },
    { id: '3', name: 'Keşfet Haftalık', image: '/discover.jpg', type: 'playlist' as const },
    { id: '4', name: 'Günün Karışımı', image: '/daily-mix.jpg', type: 'playlist' as const },
    { id: '5', name: 'Türkçe Pop', image: '/turkish-pop.jpg', type: 'playlist' as const },
    { id: '6', name: 'Chill Hits', image: '/chill.jpg', type: 'playlist' as const },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
      {quickAccess.map((item) => (
        <Link key={item.id} href={`/playlist/${item.id}`}>
          <a className="group flex items-center bg-gray-800 rounded-md overflow-hidden hover:bg-gray-700 transition-all duration-300">
            <img
              src={item.image}
              alt={item.name}
              className="w-16 h-16 object-cover"
            />
            <span className="px-4 font-medium text-white group-hover:text-green-400 transition-colors truncate">
              {item.name}
            </span>
            <div className="ml-auto mr-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="bg-primary text-black rounded-full p-2 hover:scale-105 transition-transform">
                <IoPlay className="w-4 h-4 ml-0.5" />
              </button>
            </div>
          </a>
        </Link>
      ))}
    </div>
  );
};

const ModernHomepage: React.FC = () => {
  const { playlists } = useSpotifyStore();
  const { isAuthenticated } = useAuthStore();

  // Mock data for demonstration
  const recentlyPlayed = [
    { id: '1', name: 'Midnight City', image: '/album1.jpg', type: 'album' as const, subtitle: 'M83' },
    { id: '2', name: 'Daft Punk', image: '/artist1.jpg', type: 'artist' as const, subtitle: 'Sanatçı' },
    { id: '3', name: 'Indie Rock Mix', image: '/playlist1.jpg', type: 'playlist' as const, subtitle: 'Spotify' },
    { id: '4', name: 'Random Access Memories', image: '/album2.jpg', type: 'album' as const, subtitle: 'Daft Punk' },
    { id: '5', name: 'Arctic Monkeys', image: '/artist2.jpg', type: 'artist' as const, subtitle: 'Sanatçı' },
  ];

  const madeForYou = [
    { id: '1', name: 'Discover Weekly', image: '/discover-weekly.jpg', type: 'playlist' as const, subtitle: 'Spotify', description: 'Senin için seçilen yeni müzikler' },
    { id: '2', name: 'Release Radar', image: '/release-radar.jpg', type: 'playlist' as const, subtitle: 'Spotify', description: 'Takip ettiğin sanatçılardan yeni çıkanlar' },
    { id: '3', name: 'Daily Mix 1', image: '/daily-mix-1.jpg', type: 'playlist' as const, subtitle: 'Spotify', description: 'Arctic Monkeys, The Strokes ve daha fazlası' },
    { id: '4', name: 'Daily Mix 2', image: '/daily-mix-2.jpg', type: 'playlist' as const, subtitle: 'Spotify', description: 'Daft Punk, Justice ve daha fazlası' },
  ];

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Günaydın';
    if (hour < 18) return 'İyi öğleden sonra';
    return 'İyi akşamlar';
  };

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center h-96 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Müziğin dünyasına hoş geldin</h2>
        <p className="text-gray-400 mb-6">Milyonlarca şarkı, podcast ve daha fazlası seni bekliyor.</p>
        <Link href="/login">
          <a className="bg-primary text-black px-8 py-3 rounded-full font-semibold hover:scale-105 transition-transform">
            Spotify'ı Kullanmaya Başla
          </a>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Greeting */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">{getGreeting()}</h1>
      </div>

      {/* Quick Access */}
      <QuickAccessGrid />

      {/* Recently Played */}
      <section>
        <SectionHeader title="Son çalınanlar" />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {recentlyPlayed.map((item) => (
            <ModernCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      {/* Made For You */}
      <section>
        <SectionHeader title="Senin için yapıldı" />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {madeForYou.map((item) => (
            <ModernCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      {/* Your Playlists */}
      {playlists && playlists.length > 0 && (
        <section>
          <SectionHeader title="Playlistlerin" />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {playlists.slice(0, 6).map((playlist) => (
              <ModernCard 
                key={playlist.id.toString()} 
                item={{
                  id: BigInt(playlist.id),
                  name: playlist.name,
                  image: playlist.images?.[0]?.url || '/default-playlist.jpg',
                  type: 'playlist',
                  subtitle: 'Playlist',
                  description: playlist.description
                }} 
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ModernHomepage;

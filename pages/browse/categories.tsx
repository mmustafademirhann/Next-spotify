import React from 'react';
import Layout from '../../components/Layout';
import Heading from '../../components/Heading';
import Link from 'next/link';
import { IoMusicalNotes, IoMic, IoAlbums, IoRadio } from 'react-icons/io5';

interface Category {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  href: string;
}

const categories: Category[] = [
  {
    id: 'playlists',
    name: 'Playlistler',
    description: 'Küratörlü ve kullanıcı playlistleri',
    icon: <IoMusicalNotes className="w-12 h-12" />,
    color: 'from-purple-600 to-purple-800',
    href: '/browse/playlists'
  },
  {
    id: 'albums',
    name: 'Albümler',
    description: 'En yeni ve popüler albümler',
    icon: <IoAlbums className="w-12 h-12" />,
    color: 'from-blue-600 to-blue-800',
    href: '/browse/albums'
  },
  {
    id: 'artists',
    name: 'Sanatçılar',
    description: 'Favori sanatçılarını keşfet',
    icon: <IoMic className="w-12 h-12" />,
    color: 'from-green-600 to-green-800',
    href: '/browse/artists'
  },
  {
    id: 'podcasts',
    name: 'Podcastler',
    description: 'İlginç podcast serileri',
    icon: <IoRadio className="w-12 h-12" />,
    color: 'from-orange-600 to-orange-800',
    href: '/browse/podcasts'
  }
];

const CategoryCard: React.FC<{ category: Category }> = ({ category }) => {
  return (
    <Link href={category.href}>
      <a className="group block">
        <div className={`relative overflow-hidden rounded-lg bg-gradient-to-br ${category.color} p-6 h-40 transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl`}>
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-black bg-opacity-10"></div>
          
          {/* Icon */}
          <div className="relative z-10 text-white mb-4">
            {category.icon}
          </div>
          
          {/* Content */}
          <div className="relative z-10">
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-gray-100 transition-colors">
              {category.name}
            </h3>
            <p className="text-sm text-white text-opacity-80 group-hover:text-opacity-100 transition-all">
              {category.description}
            </p>
          </div>
          
          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-white bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
        </div>
      </a>
    </Link>
  );
};

const GenreGrid: React.FC = () => {
  const genres = [
    { name: 'Pop', color: 'from-pink-500 to-rose-500' },
    { name: 'Rock', color: 'from-red-600 to-red-800' },
    { name: 'Hip Hop', color: 'from-yellow-500 to-orange-600' },
    { name: 'Electronic', color: 'from-cyan-500 to-blue-600' },
    { name: 'Jazz', color: 'from-indigo-600 to-purple-700' },
    { name: 'Classical', color: 'from-gray-600 to-gray-800' },
    { name: 'Country', color: 'from-amber-600 to-yellow-700' },
    { name: 'R&B', color: 'from-purple-600 to-pink-600' },
    { name: 'Indie', color: 'from-green-500 to-teal-600' },
    { name: 'Folk', color: 'from-emerald-600 to-green-700' },
    { name: 'Reggae', color: 'from-lime-500 to-green-600' },
    { name: 'Blues', color: 'from-blue-700 to-indigo-800' }
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {genres.map((genre) => (
        <Link key={genre.name} href={`/genre/${genre.name.toLowerCase()}`}>
          <a className="group block">
            <div className={`aspect-square rounded-lg bg-gradient-to-br ${genre.color} p-4 flex items-end transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg`}>
              <h4 className="text-white font-bold text-lg group-hover:text-gray-100 transition-colors">
                {genre.name}
              </h4>
            </div>
          </a>
        </Link>
      ))}
    </div>
  );
};

export default function BrowseCategories() {
  return (
    <Layout title="Spotify - Kategoriler">
      <div className="space-y-8">
        <Heading text="Kategorilere Göz At" />
        
        {/* Main Categories */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-6">Ana Kategoriler</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </section>

        {/* Genres */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-6">Türler</h2>
          <GenreGrid />
        </section>

        {/* Featured Playlists */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-6">Öne Çıkan Playlistler</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="group cursor-pointer">
                <div className="bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition-all duration-300">
                  <div className="aspect-square bg-gradient-to-br from-purple-500 to-pink-600 rounded-md mb-4 flex items-center justify-center">
                    <span className="text-white font-bold text-2xl">#{i}</span>
                  </div>
                  <h4 className="font-semibold text-white truncate group-hover:text-green-400 transition-colors">
                    Top Hits {i}
                  </h4>
                  <p className="text-sm text-gray-400 truncate">Spotify</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
}

import React from 'react';
import Layout from '../../components/Layout';
import Heading from '../../components/Heading';
import CardItem from '../../components/CardItem';
import CardItemGrid from '../../components/CardItemGrid';

export default function BrowseAlbums() {
  // Mock album data - replace with real data from your backend
  const albums = [
    {
      id: '1',
      name: 'Random Access Memories',
      images: [{ url: '/album1.jpg' }],
      artists: [{ name: 'Daft Punk' }],
      type: 'album'
    },
    {
      id: '2', 
      name: 'AM',
      images: [{ url: '/album2.jpg' }],
      artists: [{ name: 'Arctic Monkeys' }],
      type: 'album'
    },
    {
      id: '3',
      name: 'The Dark Side of the Moon',
      images: [{ url: '/album3.jpg' }],
      artists: [{ name: 'Pink Floyd' }],
      type: 'album'
    },
    {
      id: '4',
      name: 'Thriller',
      images: [{ url: '/album4.jpg' }],
      artists: [{ name: 'Michael Jackson' }],
      type: 'album'
    },
    {
      id: '5',
      name: 'Abbey Road',
      images: [{ url: '/album5.jpg' }],
      artists: [{ name: 'The Beatles' }],
      type: 'album'
    },
    {
      id: '6',
      name: 'Back to Black',
      images: [{ url: '/album6.jpg' }],
      artists: [{ name: 'Amy Winehouse' }],
      type: 'album'
    }
  ];

  return (
    <Layout title="Spotify - Albümler">
      <div className="space-y-6">
        <Heading text="Popüler Albümler" />
        
        <CardItemGrid>
          {albums.map((album) => (
            <CardItem
              key={album.id}
              id={album.id}
              heading={album.name}
              subheading={album.artists[0]?.name}
              images={album.images}
              altTitle={album.name}
              type="album"
            />
          ))}
        </CardItemGrid>
      </div>
    </Layout>
  );
}

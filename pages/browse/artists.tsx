import React from 'react';
import Layout from '../../components/Layout';
import Heading from '../../components/Heading';
import CardItem from '../../components/CardItem';
import CardItemGrid from '../../components/CardItemGrid';

export default function BrowseArtists() {
  // Mock artist data - replace with real data from your backend
  const artists = [
    {
      id: '1',
      name: 'Daft Punk',
      images: [{ url: '/artist1.jpg' }],
      followers: { total: 8500000 },
      type: 'artist'
    },
    {
      id: '2',
      name: 'Arctic Monkeys', 
      images: [{ url: '/artist2.jpg' }],
      followers: { total: 12000000 },
      type: 'artist'
    },
    {
      id: '3',
      name: 'Billie Eilish',
      images: [{ url: '/artist3.jpg' }],
      followers: { total: 45000000 },
      type: 'artist'
    },
    {
      id: '4',
      name: 'The Weeknd',
      images: [{ url: '/artist4.jpg' }],
      followers: { total: 35000000 },
      type: 'artist'
    },
    {
      id: '5',
      name: 'Taylor Swift',
      images: [{ url: '/artist5.jpg' }],
      followers: { total: 60000000 },
      type: 'artist'
    },
    {
      id: '6',
      name: 'Ed Sheeran',
      images: [{ url: '/artist6.jpg' }],
      followers: { total: 40000000 },
      type: 'artist'
    }
  ];

  const formatFollowers = (count: number) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M takipçi`;
    }
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K takipçi`;
    }
    return `${count} takipçi`;
  };

  return (
    <Layout title="Spotify - Sanatçılar">
      <div className="space-y-6">
        <Heading text="Popüler Sanatçılar" />
        
        <CardItemGrid>
          {artists.map((artist) => (
            <CardItem
              key={artist.id}
              id={artist.id}
              heading={artist.name}
              subheading={formatFollowers(artist.followers.total)}
              images={artist.images}
              altTitle={artist.name}
              imageRounded={true}
              type="artist"
            />
          ))}
        </CardItemGrid>
      </div>
    </Layout>
  );
}

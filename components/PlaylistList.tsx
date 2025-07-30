import { PlaylistType } from "../types/types";
import CardItem from "./CardItem";
import CardItemGrid from "./CardItemGrid";

interface IProps {
  playlists: PlaylistType[];
}

export default function PlaylistList({ playlists }: IProps) {
  return (
    <CardItemGrid>
      {playlists?.map((playlist) => (
        <CardItem
          key={playlist.id}
          id={playlist.id.toString()}
          heading={playlist.name || 'Unknown Playlist'}
          subheading={playlist.description || ''}
          altTitle={playlist.name || 'Unknown Playlist'}
          images={playlist.images || []}
          type="playlist"
        />
      ))}
    </CardItemGrid>
  );
}

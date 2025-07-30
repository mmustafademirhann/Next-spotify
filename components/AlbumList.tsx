import CardItem from "../components/CardItem";
import { Album } from "../types/types";
import CardItemGrid from "./CardItemGrid";

interface IProps {
  albums: Album[];
}

export default function AlbumList({ albums }: IProps) {
  return (
    <CardItemGrid>
      {albums?.map((album) => (
        <CardItem
          key={album.id}
          id={album.id.toString()}
          heading={album.title || album.name || 'Unknown Album'}
          images={album.images || []}
          altTitle={album.title || album.name || 'Unknown Album'}
          subheading={album.artistName || (album.artists && album.artists[0]?.name) || 'Unknown Artist'}
          type="album"
        />
      ))}
    </CardItemGrid>
  );
}

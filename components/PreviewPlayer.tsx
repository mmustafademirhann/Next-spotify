import { usePlayerStore } from "../store/usePlayerStore";
import AdditionalControllers from "./AdditionalControllers";
import MainControllers from "./MainControllers";
import PlayerTrackInfo from "./PlayerTrackInfo";

export default function PreviewPlayer() {
  const currentTrack = usePlayerStore((state) => state.currentTrack);

  if (!currentTrack) {
    return null;
  }

  return (
    <footer
      className={`sticky bottom-0 grid grid-cols-12 gap-12 items-center justify-between px-5 border-[#272727] bg-player ${
        currentTrack ? "py-3 border-t" : "py-0 border-0"
      }`}
    >
      <PlayerTrackInfo currentTrack={currentTrack} />
      <MainControllers />
      <AdditionalControllers />
    </footer>
  );
}

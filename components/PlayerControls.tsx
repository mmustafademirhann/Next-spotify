'use client';

import { usePlayerStore } from '../store/usePlayerStore';



export default function PlayerControls() {
  const {
    currentTrack,
    isPlaying,
    togglePlay,
    currentTime,
    duration,
    slider,
    setDrag,
  } = usePlayerStore();

  return (
    <div className="p-4 border-t">
      {currentTrack ? (
        <>
          <p className="font-semibold">{currentTrack.name}</p>
          <p>
            {Math.floor(currentTime)} / {Math.floor(duration)} sec
          </p>
          <input
            type="range"
            min={0}
            max={100}
            value={slider}
            onChange={(e) => setDrag(Number(e.target.value))}
          />
          <button
            onClick={togglePlay}
            className="mt-2 px-4 py-1 bg-blue-500 text-white rounded"
          >
            {isPlaying ? 'Pause' : 'Play'}
          </button>
        </>
      ) : (
        <p>No track selected</p>
      )}
    </div>
  );
}

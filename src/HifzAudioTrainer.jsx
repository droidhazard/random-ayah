// HifzAudioTrainer.jsx
import { useState, useRef, useEffect } from "react";
import "./App.css";

const MAX_AYAH = 227;
const AUDIO_FOLDER = "/audio/juzz25";

function shuffleArray(array) {
  return array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

export default function HifzAudioTrainer() {
  const [playlist, setPlaylist] = useState(() => shuffleArray([...Array(MAX_AYAH).keys()].map(i => i + 1)));
  const [currentAyah, setCurrentAyah] = useState(null);
  const audioRef = useRef(null);

  const getAyahFilename = (number) => {
    return `${AUDIO_FOLDER}/ayah${String(number).padStart(3, "0")}.mp3`;
  };

  const playRandomAyah = () => {
    if (playlist.length === 0) {
      // Reshuffle when all ayahs are played
      const reshuffled = shuffleArray([...Array(MAX_AYAH).keys()].map(i => i + 1));
      setPlaylist(reshuffled);
    } else {
      const nextAyah = playlist[0];
      setCurrentAyah(nextAyah);
      setPlaylist(prev => prev.slice(1)); // Remove it from the list

      if (audioRef.current) {
        audioRef.current.src = getAyahFilename(nextAyah);
        audioRef.current.play();
      }
    }
  };

  const replayAyah = () => {
    if (audioRef.current && currentAyah !== null) {
      audioRef.current.src = getAyahFilename(currentAyah);
      audioRef.current.play();
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto text-center">
      <h1 className="text-2xl font-bold mb-4">Hifz Audio Trainer</h1>
      <div className="flex gap-4 justify-center mb-4">
        <button
          onClick={playRandomAyah}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Random
        </button>
        <button
          onClick={replayAyah}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Replay
        </button>
      </div>
      <audio ref={audioRef} controls className="w-full" />
      {currentAyah && (
        <p className="mt-2 text-gray-600">Playing ayah #{}</p>
      )}
    </div>
  );
}


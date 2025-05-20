// HifzAudioTrainer.jsx
import { useState, useRef } from "react";
import "./App.css";

const MAX_AYAH = 93; // Set this to the number of ayahs in the Juzz
const AUDIO_FOLDER = "/audio/juzz25"; // Update to match your public folder structure

export default function HifzAudioTrainer() {
  const [currentAyah, setCurrentAyah] = useState(null);
  const audioRef = useRef(null);

  const getAyahFilename = (number) => {
    return `${AUDIO_FOLDER}/ayah${String(number).padStart(3, "0")}.mp3`;
  };

  const playRandomAyah = () => {
    const randomNumber = Math.floor(Math.random() * MAX_AYAH) + 1;
    setCurrentAyah(randomNumber);
    if (audioRef.current) {
      audioRef.current.src = getAyahFilename(randomNumber);
      audioRef.current.play();
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
      {/* {currentAyah && (
        <p className="mt-2 text-gray-600">Playing ayah #{currentAyah}</p>
      )} */}
    </div>
  );
}

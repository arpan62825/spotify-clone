import usePlayerStore from "@/stores/usePlayerStore.ts";
import { Pause, Play } from "lucide-react";
import { useEffect, useRef } from "react";

const AudioPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const previousSongRef = useRef<string | null>(null);
  const { currentSong, isPlaying, playNext, togglePlay, setAudio } =
    usePlayerStore();

  useEffect(() => {
    if (audioRef.current) {
      setAudio(audioRef.current);
    }
  }, [setAudio]);

  // Autoplay next logic
  useEffect(() => {
    const audio = audioRef.current;

    audio?.addEventListener("ended", () => playNext());
  }, [playNext]);

  // Handle song changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentSong) return;

    const shouldSongChange = previousSongRef.current !== currentSong?.audioUrl;

    if (shouldSongChange) {
      audio.src = currentSong?.audioUrl;
      previousSongRef.current = currentSong?.audioUrl;
      if (isPlaying) audio.play();
    }
  }, [currentSong, isPlaying]);

  return (
    <div className="h-24 w-full rounded-t-2xl bg-zinc-800/70 mt-2 flex items-center justify-center">
      <audio ref={audioRef} />
      <div onClick={togglePlay} className="cursor-pointer">
        {isPlaying ? <Pause /> : <Play />}
      </div>
    </div>
  );
};

export default AudioPlayer;

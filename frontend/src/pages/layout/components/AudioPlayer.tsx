import usePlayerStore from "@/stores/usePlayerStore.ts";
import { useEffect, useRef } from "react";

const AudioPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const previousSongRef = useRef<string | null>(null);

  const { currentSong, isPlaying, playNext } = usePlayerStore();

  // Play-Pause logic
  useEffect(() => {
    if (isPlaying) audioRef.current?.play();
    else audioRef.current?.pause();
  }, [isPlaying]);

  // Autoplay next logic
  useEffect(() => {
    const audio = audioRef.current;

    audio?.addEventListener("ended", () => playNext());
  }, [playNext]);

  return (
    <div>
      <audio src="" ref={audioRef} />
    </div>
  );
};

export default AudioPlayer;

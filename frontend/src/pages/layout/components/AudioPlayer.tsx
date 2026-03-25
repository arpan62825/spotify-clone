import { useMusicStore } from "@/stores/useMusicStore";
import usePlayerStore from "@/stores/usePlayerStore.ts";
import { Pause, Play, SkipBack, SkipForward } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const AudioPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const previousSongRef = useRef<string | null>(null);
  const {
    currentSong,
    isPlaying,
    playNext,
    togglePlay,
    setAudio,
    initializeQueue,
    playPrevious,
  } = usePlayerStore();
  const { featuredSongs } = useMusicStore();

  const [value, setValue] = useState(0);

  const [hoverTime, setHoverTime] = useState<number | null>(null);
  const [hoverPercent, setHoverPercent] = useState(0);

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    setValue(newValue);

    const audio = audioRef.current;
    if (!audio || !audio.duration) return;

    audio.currentTime = (newValue / 100) * audio.duration;
  };

  const handleTrackClick = (e: React.MouseEvent<HTMLInputElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = ((e.clientX - rect.left) / rect.width) * 100;

    const audio = audioRef.current;
    if (!audio || !audio.duration) return;

    const newTime = (percent / 100) * audio.duration;
    audio.currentTime = newTime;
    setValue(percent);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLInputElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = ((e.clientX - rect.left) / rect.width) * 100;

    const audio = audioRef.current;
    if (!audio || !audio.duration) return;

    const time = (percent / 100) * audio.duration;

    setHoverPercent(percent);
    setHoverTime(time);
  };

  const handleMouseLeave = () => {
    setHoverTime(null);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      if (!audio.duration) return;
      const percent = (audio.currentTime / audio.duration) * 100;
      setValue(percent);
    };

    audio.addEventListener("timeupdate", updateProgress);

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
    };
  }, []);

  useEffect(() => {
    console.log(featuredSongs);
    if (featuredSongs) {
      initializeQueue(featuredSongs);
    }
    console.log(initializeQueue);
  }, [featuredSongs, initializeQueue]);

  return (
    <div className="h-24 w-full rounded-t-2xl bg-zinc-800/70 mt-2 grid grid-cols-[1fr_1fr_1fr] items-center px-4">
      <div className="size-14 flex items-center ml-60">
        <img
          src={currentSong?.imageUrl}
          alt={currentSong?.title}
          className="rounded"
        />
      </div>

      <div className="flex items-center justify-center gap-6">
        <audio ref={audioRef}></audio>
        <div className="cursor-pointer" onClick={playPrevious}>
          <SkipBack className="size-5" />
        </div>
        <div onClick={togglePlay} className="cursor-pointer">
          {isPlaying ? (
            <Pause className="size-6" />
          ) : (
            <Play className="size-6" />
          )}
        </div>
        <div className="cursor-pointer" onClick={playNext}>
          <SkipForward className="size-5" />
        </div>
      </div>

      <div className="flex items-center justify-end w-full">
        <div className="relative w-full max-w-125 group">
          {hoverTime !== null && (
            <div
              className="absolute -top-6 text-xs bg-zinc-900 px-2 py-0.5 rounded text-white pointer-events-none"
              style={{
                left: `${hoverPercent}%`,
                transform: "translateX(-50%)",
              }}
            >
              {Math.floor(hoverTime / 60)}:
              {String(Math.floor(hoverTime % 60)).padStart(2, "0")}
            </div>
          )}
          <input
            type="range"
            value={value}
            max={100}
            name="progress-bar"
            id="progress-bar"
            onChange={handleChange}
            onClick={handleTrackClick}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="w-full max-w-125 appearance-none h-2 group-hover:h-3 transition-all duration-150 rounded-full cursor-pointer

            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:h-8
            [&::-webkit-slider-thumb]:w-1
            [&::-webkit-slider-thumb]:bg-zinc-300
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:shadow
            [&::-webkit-slider-thumb]:transition-transform
            [&::-webkit-slider-thumb]:hover:scale-125
            [&::-webkit-slider-thumb]:active:scale-150

            [&::-moz-range-thumb]:h-8
            [&::-moz-range-thumb]:w-1
            [&::-moz-range-thumb]:bg-zinc-300
            [&::-moz-range-thumb]:rounded-full"
            style={{
              background: `linear-gradient(
                to right,
                #166534 0%,
                #166534 ${value}%,
                #86efac ${value}%,
                #86efac 100%
                )`,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;

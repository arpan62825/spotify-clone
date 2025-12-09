import { useState, useEffect } from "react";
import axiosInstance from "@/lib/axios";

interface Song {
  _id: string;
  title: string;
  artist: string;
  imageUrl: string;
  audioUrl: string;
}

const ActualPlaylist = () => {
  const [songs, setSongs] = useState<Song[]>([]);

  useEffect(() => {
    axiosInstance.get<Song[]>("/song/featured").then((res) => {
      setSongs(res.data);
    });
  }, []);
  console.log(songs);
  return songs.map((song) => {
    return (
      <div
        key={song._id}
        className="p-2 rounded-md flex items-center gap-3 justify-center"
      >
        <div className="size-12 rounded-md flex-shrink-0 bg-zinc-700">
          <img src={song.imageUrl} alt={song.title} className="size-full rounded-lg" />
        </div>
        <div className="flex-1 min-w-0 hidden md:block space-y-2 ">
          <div className="h-4 rounded w-3/4 text-md">{song.title}</div>
          <div className="h-2 rounded w-1/2 text-xs">{song.artist}</div>
        </div>
      </div>
    );
  });
};

export default ActualPlaylist;

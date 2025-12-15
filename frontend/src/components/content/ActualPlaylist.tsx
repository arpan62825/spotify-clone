// import { useState, useEffect } from "react";
// import axiosInstance from "@/lib/axios";
// import { useMusicStore } from "@/stores/useMusicSore";
import type { Album } from "@/types";
import { Link } from "react-router-dom";

interface ActualPlaylistProps {
  albums: Album[];
}

const ActualPlaylist = ({ albums }: ActualPlaylistProps) => {
  return albums.map((album) => {
    return (
      <Link to={`/albums/${album._id}`}>
        <div
          key={album._id}
          className="p-2 rounded-md flex items-center gap-3 justify-center"
        >
          <div className="size-12 rounded-md flex-shrink-0 bg-zinc-700">
            <img
              src={album.imageUrl}
              alt={album.title}
              className="size-full rounded-lg"
            />
          </div>
          <div className="flex-1 min-w-0 hidden md:block space-y-2 ">
            <div className="h-4 rounded w-3/4 text-md">{album.title}</div>
            <div className="h-2 rounded w-1/2 text-xs">{album.artist}</div>
          </div>
        </div>
      </Link>
    );
  });
};

export default ActualPlaylist;

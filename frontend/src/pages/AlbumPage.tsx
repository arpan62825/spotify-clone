import { Button } from "@/components/ui/button";
import { useMusicStore } from "@/stores/useMusicStore";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CirclePause, Clock, Divide, Loader, Pause, Play } from "lucide-react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import usePlayerStore from "@/stores/usePlayerStore.ts";

const AlbumPage = () => {
  const { albumId } = useParams();

  const { fetchAlbumsById, currentAlbum, isLoading } = useMusicStore();
  const { currentSong, isPlaying, playAlbum, togglePlay } = usePlayerStore();

  useEffect(() => {
    if (albumId) fetchAlbumsById(albumId);
  }, [albumId, fetchAlbumsById]);

  const handlePlayAlbum = () => {
    if (!currentAlbum) return;

    const isCurrentAlbumPlaying = currentAlbum?.songs.some(
      (song) => song._id === currentSong?._id,
    );

    if (isCurrentAlbumPlaying) togglePlay();
    else playAlbum(currentAlbum?.songs, 0);
  };

  const handlePlaySong = (index: number) => {
    if (!currentAlbum) return;

    playAlbum(currentAlbum?.songs, index);
  };

  const formatDate = (isoDate: Date) => {
    const date = new Date(isoDate);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  };

  const formatDuration = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds).padStart(2, "0");

    return `${formattedMinutes}:${formattedSeconds}`;
  };

  return (
    <>
      {isLoading ? (
        <div className="h-screen w-full flex items-center justify-center">
          <Loader className="size-8 animate-spin text-emerald-500" />
        </div>
      ) : (
        <div className="h-screen">
          <ScrollArea className="h-screen w-full">
            {/* Main content */}
            <div className="relative min-h-full">
              {/* background gradient */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#5038a0]/80 via-zinc-900/80 to-zinc-900 pointer-events-none rounded-lg" />

              {/* content */}
              <div className="z-10 relative h-full">
                <div className="flex gap-6 p-6">
                  <img
                    src={currentAlbum?.imageUrl}
                    alt={currentAlbum?.title}
                    className="size-60 rounded shadow-xl"
                  />
                  <div className="flex flex-col justify-end">
                    <p className="text-sm font-medium">Album</p>
                    <h1 className="text-6xl font-bold my-4">
                      {currentAlbum?.title}
                    </h1>
                    <div className="flex gap-2 text-sm text-zinc-400 items-center">
                      <span>{currentAlbum?.artist}</span>
                      <p className="text-2xl">•</p>
                      <span>{currentAlbum?.songs.length} songs</span>
                      <p className="text-2xl">•</p>
                      <span>{currentAlbum?.releaseYear}</span>
                    </div>
                  </div>
                </div>
                {/* Play Button */}
                <div className="ml-6 my-6">
                  <Button
                    onClick={() => handlePlayAlbum()}
                    className="size-12 rounded-full bg-green-400 hover:bg-green-500 transition:all duration-300 ease-in-out"
                  >
                    {isPlaying ? <Pause /> : <Play className="size-5 " />}
                  </Button>
                </div>

                {/* Songs */}
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-zinc-400">#</TableHead>
                      <TableHead className="text-zinc-400">Title</TableHead>
                      <TableHead className="text-zinc-400">
                        Release Date
                      </TableHead>
                      <TableHead className="flex justify-end items-center text-zinc-400">
                        <Clock />
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody className="">
                    {currentAlbum?.songs.map((song, index) => {
                      const isCurrentSong = currentSong?._id === song._id;
                      return (
                        <TableRow
                          key={song._id}
                          onClick={() => handlePlaySong(index)}
                          className="group hover:bg-zinc-800/50 transition-colors"
                        >
                          <TableCell className="font-medium w-10">
                            {isCurrentSong && isPlaying ? (
                              <div>
                                <Pause className="size-4 text-green-400 cursor-pointer" />
                              </div>
                            ) : (
                              <span className="group-hover:hidden">
                                {index + 1}
                              </span>
                            )}
                            {!isCurrentSong && (
                              <Play className="hidden group-hover:block size-4 text-green-400 cursor-pointer" />
                            )}
                          </TableCell>
                          <TableCell className="flex gap-3">
                            <img
                              src={song.imageUrl}
                              alt={song.title}
                              className="size-12 rounded"
                            />
                            <div className="flex flex-col justify-top">
                              <p className="font-bold">{song.title}</p>
                              <p className="text-sm text-zinc-400">
                                {song.artist}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell>{formatDate(song.createdAt)}</TableCell>
                          <TableCell className="text-right">
                            {formatDuration(song.duration)}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </div>
          </ScrollArea>
        </div>
      )}
    </>
  );
};

export default AlbumPage;

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Trash2, Music } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus } from "lucide-react";
import { useMusicStore } from "@/stores/useMusicStore.ts";
import { useEffect } from "react";

const SongsTable = () => {
  const { songs, fetchAllSongs } = useMusicStore();

  useEffect(() => {
    fetchAllSongs();
  }, [fetchAllSongs]);

  const formatDate = (isoDate: Date) => {
    const date = new Date(isoDate);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  };

  return (
    <div className="rounded-xl border p-4 bg-card">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Songs Library</h2>
          <p className="text-sm text-muted-foreground">
            Manage your music tracks
          </p>
        </div>

        <Button className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600">
          <Plus className="h-4 w-4" />
          Add Song
        </Button>
      </div>

      {/* Scrollable Table */}
      <ScrollArea className="flex-1 rounded-md border h-full">
        <Table>
          <TableHeader className="sticky top-0 bg-card">
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Artist</TableHead>
              <TableHead>Release Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {songs.map((song) => (
              <TableRow key={song._id} className="hover:bg-muted/50">
                <TableCell>
                  <div className="flex h-10 w-10 items-center justify-center rounded-md border bg-muted">
                    {song.imageUrl ? (
                      <img
                        src={song.imageUrl}
                        alt={song.title}
                        className="h-full w-full rounded-md object-cover"
                      />
                    ) : (
                      <Music className="h-5 w-5 text-muted-foreground" />
                    )}
                  </div>
                </TableCell>

                <TableCell className="font-medium whitespace-nowrap">
                  {song.title}
                </TableCell>

                <TableCell className="whitespace-nowrap">
                  {song.artist}
                </TableCell>

                <TableCell className="whitespace-nowrap">
                  {formatDate(song.createdAt)}
                </TableCell>

                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-red-500 hover:text-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  );
};

export default SongsTable;

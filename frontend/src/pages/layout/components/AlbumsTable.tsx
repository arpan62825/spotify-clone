import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus, Trash2, Disc3 } from "lucide-react";
import { useEffect } from "react";
import { useMusicStore } from "@/stores/useMusicStore";

const AlbumsTable = () => {
  const { albums, fetchAlbums } = useMusicStore();

  useEffect(() => {
    fetchAlbums();
  }, [fetchAlbums]);

  const formatDate = (isoDate: Date) => {
    const date = new Date(isoDate);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  };

  return (
    <div className="rounded-xl border bg-card p-4">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Albums Library</h2>
          <p className="text-sm text-muted-foreground">Manage your albums</p>
        </div>

        <Button className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600">
          <Plus className="h-4 w-4" />
          Add Album
        </Button>
      </div>

      {/* Scrollable Table */}
      <ScrollArea className="h-[360px] rounded-md border">
        <Table>
          <TableHeader className="sticky top-0 bg-card">
            <TableRow>
              <TableHead className="w-[60px]"></TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Artist</TableHead>
              <TableHead>Release Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {albums.map((album) => (
              <TableRow key={album._id} className="hover:bg-muted/50">
                <TableCell>
                  <div className="flex h-10 w-10 items-center justify-center rounded-md border bg-muted">
                    {album.imageUrl ? (
                      <img
                        src={album.imageUrl}
                        alt={album.title}
                        className="h-full w-full rounded-md object-cover"
                      />
                    ) : (
                      <Disc3 className="h-5 w-5 text-muted-foreground" />
                    )}
                  </div>
                </TableCell>

                <TableCell className="font-medium whitespace-nowrap">
                  {album.title}
                </TableCell>

                <TableCell className="whitespace-nowrap">
                  {album.artist}
                </TableCell>

                <TableCell className="whitespace-nowrap">
                  {formatDate(album.createdAt)}
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

export default AlbumsTable;

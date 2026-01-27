import {
  Music,
  Library,
  Users,
  User,
  Plus,
  Trash2,
  Calendar,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";

const AdminPage = () => {
  /* -------------------- MOCK DATA -------------------- */

  const stats = [
    {
      label: "Total Songs",
      value: 14,
      icon: Music,
      color: "text-emerald-400",
    },
    {
      label: "Total Albums",
      value: 4,
      icon: Library,
      color: "text-purple-400",
    },
    {
      label: "Total Artists",
      value: 15,
      icon: Users,
      color: "text-orange-400",
    },
    {
      label: "Total Users",
      value: 3,
      icon: User,
      color: "text-cyan-400",
    },
  ];

  const songs = [
    {
      id: 1,
      title: "Urban Jungle",
      artist: "City Lights",
      releaseDate: "2024-10-30",
      cover: "/covers/urban.jpg",
    },
    {
      id: 2,
      title: "Neon Dreams",
      artist: "Cyber Pulse",
      releaseDate: "2024-10-30",
      cover: "/covers/neon.jpg",
    },
    {
      id: 3,
      title: "Summer Daze",
      artist: "Coastal Kids",
      releaseDate: "2024-10-30",
      cover: "/covers/summer.jpg",
    },
    {
      id: 4,
      title: "Ocean Waves",
      artist: "Coastal Drift",
      releaseDate: "2024-10-30",
      cover: "/covers/ocean.jpg",
    },
  ];

  /* -------------------- RENDER -------------------- */

  return (
    <div className="p-6 space-y-8">
      {/* ================== STATS CARDS ================== */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <Card key={label} className="bg-muted/40">
            <CardContent className="flex items-center justify-between p-6">
              <div>
                <p className="text-sm text-muted-foreground">{label}</p>
                <p className="text-2xl font-bold">{value}</p>
              </div>
              <Icon className={`h-6 w-6 ${color}`} />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* ================== TABS ================== */}
      <Tabs defaultValue="songs">
        <TabsList>
          <TabsTrigger value="songs" className="flex gap-2">
            <Music className="h-4 w-4" />
            Songs
          </TabsTrigger>

          <TabsTrigger value="albums" className="flex gap-2">
            <Library className="h-4 w-4" />
            Albums
          </TabsTrigger>
        </TabsList>
        <TabsContent value="songs">
          {/* ================== SONGS SECTION ================== */}
          <div className="rounded-lg border bg-muted/30 p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="flex items-center gap-2 text-lg font-semibold">
                  <Music className="h-5 w-5 text-emerald-400" />
                  Songs Library
                </h2>
                <p className="text-sm text-muted-foreground">
                  Manage your music tracks
                </p>
              </div>

              <Button className="gap-2 bg-emerald-500 hover:bg-emerald-600">
                <Plus className="h-4 w-4" />
                Add Song
              </Button>
            </div>

            {/* Table */}
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Artist</TableHead>
                  <TableHead>Release Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {songs.map((song) => (
                  <TableRow key={song.id}>
                    <TableCell className="flex items-center gap-3">
                      <img
                        src={song.cover}
                        alt={song.title}
                        className="h-10 w-10 rounded object-cover"
                      />
                      <span className="font-medium">{song.title}</span>
                    </TableCell>

                    <TableCell>{song.artist}</TableCell>

                    <TableCell className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      {song.releaseDate}
                    </TableCell>

                    <TableCell className="text-right">
                      <Trash2 className="h-4 w-4 text-red-500 cursor-pointer hover:opacity-80" />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPage;

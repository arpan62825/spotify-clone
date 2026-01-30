import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Music, Library } from "lucide-react";

import SongsTable from "./SongsTable.tsx";
import AlbumsTable from "./AlbumsTable.tsx";

const SongsAndAlbumsTabs = () => {
  return (
    <Tabs defaultValue="songs">
      <TabsList>
        <TabsTrigger value="songs">
          <Music className="size-4" />
          Songs
        </TabsTrigger>
        <TabsTrigger value="albums">
          <Library className="size-4" />
          Albums
        </TabsTrigger>
      </TabsList>

      <TabsContent value="songs">
        <Card>
          <CardHeader>
            <CardTitle>Songs</CardTitle>
            <CardDescription>Total number of songs</CardDescription>
          </CardHeader>
          <CardContent className="text-muted-foreground text-sm">
            <SongsTable />
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="albums">
        <Card>
          <CardHeader>
            <CardTitle>Albums</CardTitle>
            <CardDescription>Total number of Albums</CardDescription>
          </CardHeader>
          <CardContent className="text-muted-foreground text-sm">
            <AlbumsTable />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default SongsAndAlbumsTabs;

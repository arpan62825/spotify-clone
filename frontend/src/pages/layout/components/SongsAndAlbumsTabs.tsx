import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Music, Library } from "lucide-react";

import SongsTable from "./SongsTable.tsx";
import AlbumsTable from "./AlbumsTable.tsx";

const SongsAndAlbumsTabs = () => {
  return (
    <Tabs
      defaultValue="songs"
      className="flex flex-col h-full bg-transparent"
    >
      <TabsList className="shrink-0">
        <TabsTrigger value="songs">
          <Music className="size-4" />
          Songs
        </TabsTrigger>
        <TabsTrigger value="albums">
          <Library className="size-4" />
          Albums
        </TabsTrigger>
      </TabsList>

      <TabsContent value="songs" className="flex-1 overflow-hidden">
        <Card className="h-full flex flex-col">
          <CardContent className="flex-1 overflow-auto text-muted-foreground text-sm">
            <SongsTable />
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="albums" className="flex-1 overflow-hidden">
        <Card className="h-full flex flex-col">
          <CardContent className="flex-1 overflow-auto text-muted-foreground text-sm">
            <AlbumsTable />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default SongsAndAlbumsTabs;

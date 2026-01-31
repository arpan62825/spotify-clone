import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Music, Library, Users, User } from "lucide-react";
import { useMusicStore } from "@/stores/useMusicStore.ts";
import { useEffect } from "react";

const Stats = () => {
  const { stats, setStats, isLoading } = useMusicStore();

  useEffect(() => {
    setStats();
  }, [setStats]);

  return (
    <div className="grid grid-cols-2 gap-4 px-4 my-4 sm:grid-cols-2 sm:gap-6 sm:px-6 lg:grid-cols-4 lg:gap-8 lg:px-8">
      {/* Total Songs */}
      <div className="w-full">
        <Card className="p-5">
          <div className="flex items-start gap-5">
            <div className="size-12 flex justify-center items-center rounded-md shrink-0 bg-emerald-400/15 border-emerald-500 border-1 ">
              <Music className="text-emerald-500" />
            </div>
            <div className="flex flex-col gap-1">
              <CardHeader className="p-0 text-sm font-medium text-muted-foreground">
                Total Songs
              </CardHeader>
              <CardContent className="p-0 text-2xl font-semibold leading-none">
                {isLoading ? "Loading..." : stats.totalSongs}
              </CardContent>
            </div>
          </div>
        </Card>
      </div>

      {/* Total Albums */}
      <div className="w-full">
        <Card className="p-5">
          <div className="flex items-start gap-5">
            <div className="size-12 flex justify-center items-center rounded-md shrink-0 bg-purple-300/15 border-purple-400 border-1 ">
              <Library className="text-purple-400" />
            </div>
            <div className="flex flex-col gap-1">
              <CardHeader className="p-0 text-sm font-medium text-muted-foreground">
                Total Albums
              </CardHeader>
              <CardContent className="p-0 text-2xl font-semibold leading-none">
                {isLoading ? "Loading..." : stats.totalAlbums}
              </CardContent>
            </div>
          </div>
        </Card>
      </div>

      {/* Total Artists */}
      <div className="w-full">
        <Card className="p-5">
          <div className="flex items-start gap-5">
            <div className="size-12 flex justify-center items-center rounded-md shrink-0 bg-orange-300/15 border-orange-400 border-1 ">
              <Users className="text-orange-400" />
            </div>
            <div className="flex flex-col gap-1">
              <CardHeader className="p-0 text-sm font-medium text-muted-foreground">
                Total Artists
              </CardHeader>
              <CardContent className="p-0 text-2xl font-semibold leading-none">
                {isLoading ? "Loading..." : stats.totalArtists}
              </CardContent>
            </div>
          </div>
        </Card>
      </div>

      {/* Total Users */}
      <div className="w-full">
        <Card className="p-5">
          <div className="flex items-start gap-5">
            <div className="size-12 flex justify-center items-center rounded-md shrink-0 bg-cyan-300/15 border-cyan-400 border-1 ">
              <User className="text-cyan-400" />
            </div>
            <div className="flex flex-col gap-1">
              <CardHeader className="p-0 text-sm font-medium text-muted-foreground">
                Total Users
              </CardHeader>
              <CardContent className="p-0 text-2xl font-semibold leading-none">
                {isLoading ? "Loading..." : stats.totalUsers}
              </CardContent>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Stats;

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
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {/* Total Songs */}
      <div>
        <Card>
          <div className=" size-10 flex justify-center items-center rounded-md bg-emerald-400/15 border-emerald-500 border-1 ">
            <Music className="text-emerald-500" />
          </div>
          <CardHeader>Total Songs</CardHeader>
          <CardContent>
            {isLoading ? "Loading..." : stats.totalSongs}
          </CardContent>
        </Card>
      </div>

      {/* Total Albums */}
      <div>
        <Card>
          <div className=" size-10 flex justify-center items-center rounded-md bg-purple-300/15 border-purple-400 border-1 ">
            <Library className="text-purple-400" />
          </div>
          <CardHeader>Total Albums</CardHeader>
          <CardContent>
            {isLoading ? "Loading..." : stats.totalAlbums}
          </CardContent>
        </Card>
      </div>

      {/* Total Artists */}
      <div>
        <Card>
          <div className=" size-10 flex justify-center items-center rounded-md bg-orange-300/15 border-orange-400 border-1 ">
            <Users className="text-orange-400" />
          </div>
          <CardHeader>Total Artists</CardHeader>
          <CardContent></CardContent>
        </Card>
      </div>

      {/* Total Users */}
      <div>
        <Card>
          <div className=" size-10 flex justify-center items-center rounded-md bg-cyan-300/15 border-cyan-400 border-1 ">
            <User className="text-cyan-400" />
          </div>
          <CardHeader>Total Users</CardHeader>
          <CardContent></CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Stats;

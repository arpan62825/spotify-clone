import { useEffect, useState } from "react";
import { useMusicStore } from "@/stores/useMusicStore";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Play } from "lucide-react";

export default function HomePage() {
  const {
    featuredSongs,
    trendingSongs,
    madeForYouSongs,
    fetchFeaturedSongs,
    fetchTrendingSongs,
    fetchMadeForYouSongs,
  } = useMusicStore();

  const [greeting, setGreeting] = useState("Hello");

  useEffect(() => {
    fetchFeaturedSongs();
    fetchTrendingSongs();
    fetchMadeForYouSongs();
  }, [fetchFeaturedSongs, fetchTrendingSongs, fetchMadeForYouSongs]);

  useEffect(() => {
    const getDate = new Date();
    const hour = getDate.getHours();

    if (hour >= 5 && hour < 12) {
      setGreeting("Good morning");
    } else if (hour >= 12 && hour < 17) {
      setGreeting("Good afternoon");
    } else {
      setGreeting("Good evening");
    }
  }, []);

  return (
    <div className="bg-zinc-800/70 h-full rounded-lg p-6">
      <ScrollArea className="h-full pr-4">
        <h1 className="text-4xl font-bold mb-6">{greeting}</h1>

        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4">Featured</h2>
          <div className="grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(220px,1fr))]">
            {featuredSongs.map((song) => (
              <div
                key={song._id}
                className="flex items-center gap-4 bg-zinc-700/40 hover:bg-zinc-700/70 transition rounded-md p-3 cursor-pointer group relative"
              >
                <img
                  src={song.imageUrl}
                  alt={song.title}
                  className="size-12 rounded-md object-cover"
                />
                <div className="absolute left-3 flex items-center justify-center size-12 rounded-md bg-black/60 opacity-0 group-hover:opacity-100 transition">
                  <div className="size-6 rounded-full flex items-center justify-center">
                    <Play />
                  </div>
                </div>
                <div className="overflow-hidden">
                  <div className="font-medium truncate">{song.title}</div>
                  <div className="text-sm text-zinc-400 truncate">
                    {song.artist}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4">Trending</h2>
          <div className="grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(180px,1fr))]">
            {trendingSongs.map((song) => (
              <div
                key={song._id}
                className="bg-zinc-900/60 hover:bg-zinc-900 transition rounded-lg p-4 cursor-pointer group relative"
              >
                <div className="relative mb-3">
                  <img
                    src={song.imageUrl}
                    alt={song.title}
                    className="aspect-square w-full rounded-md object-cover"
                  />
                  <div className="absolute bottom-2 right-2 size-10 bg-green-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition shadow-lg text-black">
                    <Play />
                  </div>
                </div>
                <div className="font-medium truncate">{song.title}</div>
                <div className="text-sm text-zinc-400 truncate">
                  {song.artist}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Made For You</h2>
          <div className="grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(180px,1fr))]">
            {madeForYouSongs.map((song) => (
              <div
                key={song._id}
                className="bg-zinc-900/60 hover:bg-zinc-900 transition rounded-lg p-4 cursor-pointer group relative"
              >
                <div className="relative mb-3">
                  <img
                    src={song.imageUrl}
                    alt={song.title}
                    className="aspect-square w-full rounded-md object-cover"
                  />
                  <div className="absolute bottom-2 right-2 size-10 bg-green-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition shadow-lg text-black">
                    <Play />
                  </div>
                </div>
                <div className="font-medium truncate">{song.title}</div>
                <div className="text-sm text-zinc-400 truncate">
                  {song.artist}
                </div>
              </div>
            ))}
          </div>
        </section>
      </ScrollArea>
    </div>
  );
}

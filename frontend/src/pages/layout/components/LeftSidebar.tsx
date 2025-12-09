import { buttonVariants } from "@/components/ui/button.tsx";
import { HomeIcon, Library, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { SignedIn } from "@clerk/clerk-react";
import { ScrollArea } from "@/components/ui/scroll-area.tsx";
import PlaylistSkeleton from "../../../components/skeleton/PlaylistSkeleton.tsx";
import ActualPlaylist from "@/components/content/ActualPlaylist.tsx";

const LeftSidebar = () => {
  const isLoading = false;

  return (
    <div className="h-full flex flex-col gap-2">
      {/* Navigation */}
      <div className="bg-zinc-800/70 rounded-lg w-full p-2">
        <Link
          to="/"
          className={cn(
            buttonVariants({
              variant: "ghost",
              className: "w-full justify-start text-white hover:!bg-zinc-900",
            })
          )}
        >
          <div className="flex gap-2 items-center">
            <HomeIcon className="size-5" />
            <span className="hidden md:inline">Home</span>
          </div>
        </Link>
        <SignedIn>
          <Link
            to="/chat"
            className={cn(
              buttonVariants({
                variant: "ghost",
                className: "w-full justify-start text-white hover:!bg-zinc-900",
              })
            )}
          >
            <div className="flex gap-2 items-center">
              <MessageCircle className="size-5" />
              <span className="hidden md:inline">Messages</span>
            </div>
          </Link>
        </SignedIn>
      </div>

      {/* Library Section */}
      <div className="flex flex-col rounded-lg bg-zinc-800/70 p-2 h-full">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center text-white gap-2">
            <Library className="size-5" />
            <span className="hidden md:inline">Playlist</span>
          </div>
        </div>
        <ScrollArea className="h-full">
          <div className="space-y-2">
            {isLoading ? <PlaylistSkeleton /> : <ActualPlaylist />}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default LeftSidebar;

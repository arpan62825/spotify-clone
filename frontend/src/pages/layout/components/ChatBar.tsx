import useChatStore from "@/stores/useChatStore";
import { Loader, Users } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { SignedIn } from "@clerk/clerk-react";

const ChatBar = () => {
  const { users, fetchUsers, isLoading } = useChatStore();

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <div className="bg-zinc-800/70 size-full rounded-lg">
      <SignedIn>
        <div className="flex gap-2 p-4 justify-center items-center border-b-[0.5px] text-sm font-semibold">
          <Users />
          <h1>What they're listening to?</h1>
        </div>
        {isLoading ? (
          <div className="h-screen w-full flex items-center justify-center">
            <Loader className="size-8 animate-spin text-emerald-500" />
          </div>
        ) : (
          <div className="pt-3 px-3">
            {users.map((user) => {
              return (
                <Link
                  to={`/`}
                  className="flex gap-2 items-center hover:border-[1px] p-3 hover:p-[11px] hover:rounded-md hover:bg-zinc-900 transition-all duration-300 delay-75 ease-[cubic-bezier(0.1,0,0.2,1)]"
                >
                  {/* profile pic */}
                  <div className="size-8">
                    <img
                      src={user.imageUrl}
                      alt={user.fullName}
                      className="size-8 rounded-full"
                    />
                  </div>
                  {/* name */}
                  <div>{user.fullName}</div>
                </Link>
              );
            })}
          </div>
        )}
      </SignedIn>
    </div>
  );
};
export default ChatBar;

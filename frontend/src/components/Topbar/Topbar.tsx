import { LayoutDashboardIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { UserButton, useUser } from "@clerk/clerk-react";

const Topbar = () => {
  const { isSignedIn, user } = useUser();

  return (
    <div className="flex items-center justify-between p-4 sticky top-0 bg-zinc-800/70 backdrop-blur-md z-10">
      <div className="flex gap-2 items-center">Spotify</div>
      <div className="flex items-center gap-4 justify-center">
        {isSignedIn && user.id === import.meta.env.VITE_CLERK_USER_ID ? (
          // TODO: How to change the color of the button?
          <Link to={"/admin"}>
            <Button variant={"outline"}>
              <LayoutDashboardIcon className="h-4 w-fit inline" /> Admin
              Dashboard
            </Button>
          </Link>
        ) : (
          // TODO: How to change the color of the button?
          <Link to={"/signup"}>
            <Button variant={"outline"}>Signin</Button>
          </Link>
        )}
      <div className="flex items-center">
        <UserButton />
      </div>
      </div>
    </div>
  );
};

export default Topbar;

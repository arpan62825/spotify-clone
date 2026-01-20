import { LayoutDashboardIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { UserButton, useUser, SignInButton } from "@clerk/clerk-react";

import googlePng from "../../assets/google-logo.png";
import spotifyPng from "../../assets/spotify-logo.png";

const Topbar = () => {
  const { isSignedIn, user } = useUser();

  return (
    <>
      <div className="flex items-center justify-between p-4 sticky top-0 bg-zinc-800/70 backdrop-blur-md z-10 h-16">
        <Link to="/">
          <div className="flex gap-2 items-center text-2xl font-bold">
            <img src={spotifyPng} alt="spotify-logo" className="size-8" />
            Spotify
          </div>
        </Link>
        <div className="flex items-center gap-4 justify-center">
          {isSignedIn && user.id === import.meta.env.VITE_CLERK_USER_ID ? ( 
            <Link to={"/admin"}>
              <Button variant={"outline"}>
                <LayoutDashboardIcon className="h-4 w-fit inline" />
                Admin Dashboard
              </Button>
            </Link>
          ) : !isSignedIn ? (
            <SignInButton forceRedirectUrl={"/auth-add-user"}>
              <Button variant={"outline"}>
                <img src={googlePng} alt="google-logo" className="size-4" />
                Continue With Google
              </Button>
            </SignInButton>
          ) : null}
          <div className="flex items-center">
            <UserButton />
          </div>
        </div>
      </div>
    </>
  );
};

export default Topbar;

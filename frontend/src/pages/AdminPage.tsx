import { useUser } from "@clerk/clerk-react";
import SongsAndAlbumsTabs from "./layout/components/SongsAndAlbumsTabs.tsx";
import NotFoundPage from "./layout/components/NotFoundPage.tsx";
import Stats from "./layout/components/Stats.tsx";

const AdminPage = () => {
  const { isSignedIn, user } = useUser();
  return (
    <div>
      {isSignedIn && user.id === import.meta.env.VITE_CLERK_USER_ID ? (
        <div>
          <Stats />
          <SongsAndAlbumsTabs />
        </div>
      ) : (
        <div>
          <NotFoundPage/>
        </div>
      )}
    </div>
  );
};

export default AdminPage;

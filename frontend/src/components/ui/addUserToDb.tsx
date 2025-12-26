import { Card, CardContent } from "@/components/ui/card";
import axiosInstance from "@/lib/axios";
import { useUser } from "@clerk/clerk-react";
import { Loader } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AddUserToDb = () => {
  const { isLoaded, user } = useUser();
  const navigate = useNavigate();
  useEffect(() => {
    const syncUser = async () => {
      try {
        if (!isLoaded || !user) return;

        await axiosInstance.post("/auth/callback", {
          id: user.id,
          fullName: user.fullName,
          imageUrl: user.imageUrl,
        });
      } catch (error) {
        console.error(`An error occurred while trying to sync user: ${error}`);
      } finally {
        navigate("/");
      }
    };
    syncUser();
  }, [isLoaded, user, navigate]);

  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="w-[80%] max-w-md">
        <CardContent className="flex flex-col items-center gap-6">
          <Loader className="size-6 text-emerald-600 animate-spin" />
          <h1 className="text-xl font-sans font-bold">Logging you in</h1>
          <p className="text-sm">Redirecting...</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddUserToDb;

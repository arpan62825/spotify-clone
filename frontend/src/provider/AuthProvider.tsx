import axiosInstance from "@/lib/axios";
import { useAuth } from "@clerk/clerk-react";
import React, { useEffect, useState } from "react";
import { Loader } from "lucide-react";

const updateApiToken = (token: string | null) => {
  if (token) {
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common["Authorization"];
  }
};

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { getToken } = useAuth();
  const [loading, setLoading] = useState(true);

  //* take the token and update the fetch api Header
  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = await getToken();
        updateApiToken(token);
      } catch (error) {
        console.log(
          `An error occurred while trying to update the api token: ${error}`
        );
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, [getToken]);

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <Loader className="size-8 animate-spin text-emerald-500" />
      </div>
    );
  }

  return <div>{children}</div>;
};

export default AuthProvider;

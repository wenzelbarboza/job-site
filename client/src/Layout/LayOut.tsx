import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";
import { useEffect } from "react";
import { refreshAccessToken } from "../lib/auth";
import { useUserStore } from "../zustand/UserStore";
import { jwtDecode } from "jwt-decode";
import { payloadType } from "../types/type";
import { Toaster } from "../components/ui/toaster";
import MoonLoader from "react-spinners/MoonLoader";
//TODO fix grid layout
export const LayOut = () => {
  const userStore = useUserStore();

  useEffect(() => {
    refreshAccessToken()
      .then((data) => {
        userStore.setAccessToken(data.accessToken);
        const decoded = jwtDecode<payloadType>(data.accessToken);
        console.log("the access token fetched just now is: ", decoded);
        userStore.setUser({
          name: decoded.name,
          role: decoded.role ?? null,
          id: decoded.userId,
        });
        console.log("userStore", userStore);
      })

      .catch((error) => {
        console.error(error);
      })

      .finally(() => {
        userStore.setLoading(false);
      });
  }, []);

  return (
    <>
      <div className="">
        <div className="grid-background "></div>
        <main className="min-h-screen container flex flex-col">
          <div className="">
            <Header />
          </div>
          <div className=" border-green-400 flex flex-col flex-1">
            {userStore.loading ? <MoonLoader color={"#A9A9A9"} /> : <Outlet />}
          </div>
        </main>
        <div className="p-10 text-center bg-gray-800">footer</div>
        <Toaster />
      </div>
    </>
  );
};

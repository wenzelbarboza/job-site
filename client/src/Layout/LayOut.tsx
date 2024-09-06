import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";
import { useEffect } from "react";
import { refreshAccessToken } from "../lib/auth";
import { useUserStore } from "../zustand/UserStore";
import { jwtDecode } from "jwt-decode";
import { payloadType } from "../types/type";

//TODO fix grid layout
export const LayOut = () => {
  const userStore = useUserStore();
  useEffect(() => {
    refreshAccessToken()
      .then((data) => {
        userStore.setAccessToken(data.accessToken);
        userStore.setLoading(false);
        const decoded = jwtDecode<payloadType>(data.accessToken);
        console.log("the access token fetched just now is: ", decoded);
        userStore.setUser({
          name: decoded.name,
          role: decoded.role,
          id: decoded.userId,
        });
        console.log("userStore", userStore);
      })
      .catch((error) => {
        userStore.setLoading(false);
        console.error(error);
      });
    return () => {};
  }, []);
  return (
    <>
      {userStore.loading ? (
        <h1>Loading...</h1>
      ) : (
        <div className="">
          <div className="grid-background "></div>
          <main className="min-h-screen container flex flex-col">
            <div className="">
              <Header />
            </div>
            <div className=" border-green-400 flex flex-col flex-1">
              <Outlet />
            </div>
          </main>
          <div className="p-10 text-center bg-gray-800">footer</div>
        </div>
      )}
    </>
  );
};

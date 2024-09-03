import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";

//TODO fix grid layout
export const LayOut = () => {
  return (
    <>
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
    </>
  );
};

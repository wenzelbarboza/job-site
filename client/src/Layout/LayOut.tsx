import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";

//TODO fix grid layout
export const LayOut = () => {
  return (
    <>
      <div className="">
        <div className="grid-background "></div>
        <main className="min-h-screen container">
          <div className=" border-yellow-400 top-0 ">
            <Header />
          </div>
          <div className=" border-green-400 ">
            <Outlet />
          </div>
        </main>
        <div className="p-10 text-center bg-gray-800">footer</div>
      </div>
    </>
  );
};

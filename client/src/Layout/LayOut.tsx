import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";

// TODO fix grid layout
export const LayOut = () => {
  return (
    <>
      <div>
        <div className="grid-background border-4 border-green-300"></div>
        <main className="min-h-screen container">
          <Header />
          <Outlet />
        </main>
        <div className="p-10 text-center bg-gray-800 mt-10">footer</div>
      </div>
    </>
  );
};

import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useState } from "react";
import { LogIn } from "../pages/LogIn";
import { useUserStore } from "../zustand/UserStore";
import { logoutUser } from "../lib/auth";

export const Header = () => {
  const accessToken = useUserStore((state) => state.accessToken);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const setAccessToken = useUserStore((state) => state.setAccessToken);

  const handleLogout = async () => {
    try {
      await logoutUser();
      setAccessToken(null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <nav className="w-full py-4 flex items-center justify-between">
        <div className=" max-w-12">
          <Link to={"/"}>
            <img src="../../public/logo.png" className="h-full w-full" alt="" />
          </Link>
        </div>
        <div className="flex justify-between items-center gap-2  ">
          <Link to={""}>
            {accessToken ? (
              <Button onClick={handleLogout}>logout</Button>
            ) : (
              <Button onClick={() => setIsOpen((prev: boolean) => !prev)}>
                Login
              </Button>
            )}
          </Link>
          <LogIn isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
      </nav>
    </>
  );
};

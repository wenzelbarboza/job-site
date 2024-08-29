import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useState } from "react";
import { LogIn } from "../pages/LogIn";

export const Header = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <nav className="w-full py-4 flex items-center justify-between">
        <div className=" max-w-12">
          <Link to={"/"}>
            <img src="../../public/logo.png" className="h-full w-full" alt="" />
          </Link>
        </div>
        <div className="flex justify-between items-center gap-2  ml-10">
          <Link to={""}>
            <Button onClick={() => setIsOpen((prev: boolean) => !prev)}>
              sign up
            </Button>
          </Link>
          <LogIn isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
      </nav>
    </>
  );
};

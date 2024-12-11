import { Link, NavLink } from "react-router-dom";
import { Button } from "./ui/button";
import { useState } from "react";
import { LogIn } from "../pages/LogIn";
import { useUserStore } from "../zustand/UserStore";
import { logoutUser } from "../lib/auth";
import { PenBox } from "lucide-react";
import { role } from "../types/type";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { MdOutlineWorkOutline } from "react-icons/md";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { FaRegHeart } from "react-icons/fa";

export const Header = () => {
  const accessToken = useUserStore((state) => state.accessToken);
  const userStore = useUserStore();

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
            <img src="./logo.png" className="h-full w-full" alt="" />
          </Link>
        </div>
        <div className="flex justify-between items-center gap-2  ">
          {userStore.user?.role == role.recruiter && (
            <Link to="/post-job">
              <Button variant="destructive" className="rounded-full">
                <PenBox size={20} className="mr-2" />
                Post a Job
              </Button>
            </Link>
          )}
          {accessToken ? (
            <>
              <Button onClick={handleLogout}>logout</Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar>
                    <AvatarImage src="" />
                    <AvatarFallback className="bg-slate-700">
                      {userStore.user?.name[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" sideOffset={10}>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="pr-14" asChild>
                    <NavLink
                      to={"/my-jobs"}
                      className="flex gap-4 items-center"
                    >
                      <MdOutlineWorkOutline /> My Jobs
                    </NavLink>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <NavLink
                      to={"/saved-jobs"}
                      className="flex gap-4 items-center"
                    >
                      <FaRegHeart /> Saved Jobs
                    </NavLink>
                  </DropdownMenuItem>
                  <DropdownMenuItem>Team</DropdownMenuItem>
                  <DropdownMenuItem>Subscription</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Button onClick={() => setIsOpen((prev: boolean) => !prev)}>
              Login
            </Button>
          )}
          <LogIn isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
      </nav>
    </>
  );
};

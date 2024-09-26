import { useEffect } from "react";
import { useRoleMutate } from "../api/user.api";
import { Button } from "../components/ui/button";
import { useUserStore } from "../zustand/UserStore";
import { useNavigate } from "react-router-dom";
import { role } from "../types/type";

export const Onboarding = () => {
  const roleMutate = useRoleMutate();
  const userStore = useUserStore();
  const navigate = useNavigate();

  const handleRole = async (role: role) => {
    console.log("role inside handller: ", role);
    try {
      await roleMutate.mutateAsync({ id: userStore.user?.id as number, role });
      userStore.setRole(role);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (userStore.user?.role) {
      const route =
        userStore.user?.role == role.recruiter ? "/post-job" : "/jobs";
      navigate(route);
    }
  }, [userStore.user?.role]);

  return (
    <div className="flex flex-col items-center justify-center mt-40">
      <h1 className="font-extrabold text-7xl tracking-tighter sm:text-8xl">
        I am a...
      </h1>
      <div className="grid w-full grid-cols-2 gap-4 mt-16 md:px-40">
        <Button
          variant={"blue"}
          className="h-36 text-2xl"
          onClick={() => handleRole(role.condidate)}
        >
          Candidate
        </Button>
        <Button
          variant={"destructive"}
          className="h-36 text-2xl"
          onClick={() => handleRole(role.recruiter)}
        >
          Recruiter
        </Button>
      </div>
    </div>
  );
};

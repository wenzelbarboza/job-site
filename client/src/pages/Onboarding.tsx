import { Button } from "../components/ui/button";

enum role {
  CANDIDATE,
  RECRUITER,
}

export const Onboarding = () => {
  const handleRole = (role: role) => {
    if (role == 0) {
      console.log("candidate");
    }
    if (role == 1) {
      console.log("recruiter");
    }
  };
  return (
    <div className="flex flex-col items-center justify-center mt-32">
      <h1 className="font-extrabold text-7xl tracking-tighter sm:text-8xl">
        I am a...
      </h1>
      <div className="grid mt-16 w-full grid-cols-2 gap-4 md:px-40">
        <Button
          variant={"blue"}
          className="h-36 text-2xl"
          onClick={() => handleRole(role.CANDIDATE)}
        >
          Candidate
        </Button>
        <Button
          variant={"destructive"}
          className="h-36 text-2xl"
          onClick={() => handleRole(role.RECRUITER)}
        >
          Recruiter
        </Button>
      </div>
    </div>
  );
};

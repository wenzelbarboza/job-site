import CreatedApplication from "../components/CreatedApplication";
import CreatedJob from "../components/CreatedJob";
import { useUserStore } from "../zustand/UserStore";

export const MyJob = () => {
  const userStore = useUserStore();
  return (
    <>
      {userStore.user?.role == "candidate" ? (
        <h1 className="text-4xl">Candidate</h1>
      ) : (
        <h1 className="text-4xl">Recruiter</h1>
      )}
      {userStore.user?.role == "candidate" ? (
        <div>
          candidate
          <CreatedApplication />
        </div>
      ) : (
        <div>
          recruiter
          <CreatedJob />
        </div>
      )}

      <CreatedJob />
    </>
  );
};

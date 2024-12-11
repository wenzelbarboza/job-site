import { useGetUserAppplicaion } from "../api/applications.api";
import ApplicationCard from "./ApplicationCard";
import { useUserStore } from "../zustand/UserStore";

const CreatedApplication = () => {
  const { data, isLoading } = useGetUserAppplicaion();
  const userStore = useUserStore();
  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  return (
    <>
      <div>CreatedApplication</div>
      {/* {JSON.stringify(data)} */}
      {data?.data?.map((ele) => {
        return (
          <ApplicationCard
            key={ele.jobs?.id}
            {...ele.applications}
            name={userStore.user?.name || ""}
            isCandidate={userStore.user?.role == "candidate"}
            companyName={ele.companies?.name || ""}
            jobTitle={ele.jobs?.title || ""}
            //  refetchApplications={refetchApplications}
            isLoading={isLoading}
          />
        );
      })}
    </>
  );
};

// <ApplicationCard
//     key={application.id}
//     {...application}
//     isCandidate={isCandidate}
//     companyName={data.data?.companies?.name || ""}
//     jobTitle={data.data?.jobs.title || ""}
//     refetchApplications={refetchApplications}
//     isLoading={isLoading}
//   />

export default CreatedApplication;

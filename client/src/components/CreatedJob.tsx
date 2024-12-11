import React from "react";
import { useGetCreatedJobs } from "../api/jobs.api";
import JobCard from "./JobCard";

const CreatedJob = () => {
  const { data, refetch } = useGetCreatedJobs();

  console.log("hello");
  return (
    <>
      <h1>createdJob</h1>
      {data?.data?.map((ele) => (
        <JobCard
          job={ele}
          key={ele.job.id}
          handleRefetch={() => refetch()}
          isMyJob={true}
        />
      ))}
    </>
  );
};

export default CreatedJob;

// export interface JobsData {
//   job: Job;
//   savedJobId: any;
//   companyName: string;
//   companyLogo: string;
// }

// export interface Job {
//   id: number;
//   createdAt: string;
//   recruiterId: number;
//   title: string;
//   companyId: number;
//   description: string;
//   location: string;
//   requirements: string;
//   isOpen: boolean;
// }

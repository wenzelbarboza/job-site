import { useState } from "react";
import { useGetJobsQuerry } from "../api/jobs.api";
import MoonLoader from "react-spinners/MoonLoader";
import JobCard from "../components/JobCard";

export type JobFilter = {
  location: string | undefined;
  company_id: string | undefined;
  searchQuery: string | undefined;
};

export const JobListing = () => {
  const [jobsFilter, setJobsFilter] = useState<JobFilter>({
    location: undefined,
    company_id: undefined,
    searchQuery: undefined,
  });

  const [temporaryFilter, setTemporaryFIlter] = useState<JobFilter>({
    location: undefined,
    company_id: undefined,
    searchQuery: undefined,
  });

  const handelSubmit = () => {
    setJobsFilter(temporaryFilter);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTemporaryFIlter((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const { data, isLoading, isError, error, refetch, isRefetching } =
    useGetJobsQuerry(jobsFilter);
  console.log("this is jobs data", data);

  const handleRefetch = () => {
    console.log("refetch clicked");
    refetch();
  };

  // data?.data[0].data.
  // TODO
  // improve error handling code
  if (isError) {
    console.error(error);
    return (
      <h1>
        some error occured check in console and also write better error handling
        code
      </h1>
    );
  }

  return (
    <>
      {isLoading ? (
        <MoonLoader />
      ) : (
        <>
          <section>
            <div className="flex gap-2 flex-row">
              <input
                type="text"
                value={temporaryFilter.searchQuery}
                name="searchQuery"
                onChange={handleChange}
                placeholder="search"
              />
              <input
                type="text"
                value={jobsFilter.location}
                name="location"
                onChange={handleChange}
                placeholder="location"
              />
            </div>
            <input type="submit" onSubmit={handelSubmit} />
          </section>
          <section>
            <h1 className="text-xl">Latest Jobs</h1>
            {data?.data != undefined && data?.data.length > 0 ? (
              data?.data?.map((job) => (
                <JobCard
                  job={job}
                  handleRefetch={handleRefetch}
                  isRefetching={isRefetching}
                />
              ))
            ) : (
              <h1>no data found....</h1>
            )}
          </section>
        </>
      )}
    </>
  );
};

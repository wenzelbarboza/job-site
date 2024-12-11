import { useGetSavedQuery } from "../api/jobs.api";
import JobCard from "../components/JobCard";

export const SavedJobs = () => {
  const { data, isLoading, isError, refetch, isFetching } = useGetSavedQuery();

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <div>
        <h1>Saved Jobs</h1>
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data?.data?.map((item) => {
            const jobProp = {
              job: item.jobs,
              savedJobId: 1,
              companyName: item.companies.name,
              companyLogo: item.companies.logoUrl,
            };
            return (
              <JobCard
                handleRefetch={() => refetch()}
                isRefetching={isFetching}
                job={jobProp}
                key={item.jobs.id}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

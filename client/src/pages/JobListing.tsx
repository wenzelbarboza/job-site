import { useState } from "react";
import { useGetJobsQuery } from "../api/jobs.api";
import MoonLoader from "react-spinners/MoonLoader";
import JobCard from "../components/JobCard";
import { Button } from "../components/ui/button";
import { useGetCompaniesQuerry } from "../api/companies.api";
import { State } from "country-state-city";

export type JobFilter = {
  location: string;
  company_id: string;
  searchQuery: string;
};

export const JobListing = () => {
  const { data: companiesRes } = useGetCompaniesQuerry();
  console.log("companies are: ", companiesRes);

  const [jobsFilter, setJobsFilter] = useState<JobFilter>({
    location: "",
    company_id: "",
    searchQuery: "",
  });

  console.log("job filter is: ", jobsFilter);

  const handelSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    setJobsFilter({
      company_id: formData.get("company_id") as string,
      location: formData.get("location") as string,
      searchQuery: formData.get("searchQuery") as string,
    });

    console.log("companies id: ", formData.get("company_id"));
    console.log("form data entries are: ", [...formData.entries()]);
  };

  const { data, isLoading, isError, error, refetch, isRefetching } =
    useGetJobsQuery(jobsFilter);
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
      <section>
        <h1 className="text-6xl sm:text-7xl font-extrabold text-center pb-8 gradiet-title">
          Latest Jobs
        </h1>
      </section>
      {isLoading ? (
        <MoonLoader />
      ) : (
        <>
          <section className="pb-8 w-full">
            <form
              onSubmit={handelSubmit}
              className="flex gap-2 flex-col w-full flex-1"
            >
              <div className="flex flex-1 gap-3">
                <input
                  type="text"
                  name="searchQuery"
                  placeholder="Search job by title...."
                  className="text-black flex-1"
                />
                <Button type="submit">Search</Button>
              </div>
              <div className="flex flex-1 flex-col gap-1">
                <select name="company_id">
                  <option value="">select</option>
                  {State.getStatesOfCountry("IN").map(({ name }) => {
                    return (
                      <option key={name} value={name}>
                        {name}
                      </option>
                    );
                  })}
                </select>
                <select name="company_id">
                  <option value="">select</option>
                  {companiesRes?.data?.map((company) => (
                    <option value={company.id}>{company.name}</option>
                  ))}
                </select>
              </div>
            </form>
          </section>
          <section>
            {data?.data != undefined && data?.data.length > 0 ? (
              <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {data?.data?.map((job) => (
                  <JobCard
                    job={job}
                    handleRefetch={handleRefetch}
                    isRefetching={isRefetching}
                    key={job.job.id}
                  />
                ))}
              </div>
            ) : (
              <h1>no data found....</h1>
            )}
          </section>
        </>
      )}
    </>
  );
};

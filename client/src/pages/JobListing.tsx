import { useState } from "react";
import { useGetJobsQuery } from "../api/jobs.api";
import MoonLoader from "react-spinners/MoonLoader";
import JobCard from "../components/JobCard";
import { Button } from "../components/ui/button";
import { useGetCompaniesQuerry } from "../api/companies.api";
import { State } from "country-state-city";
import { Input } from "../components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

export type JobFilter = {
  location: string;
  company_id: string;
  searchQuery: string;
};

export const JobListing = () => {
  const { data: companiesRes } = useGetCompaniesQuerry();
  console.log("companies are: ", companiesRes);

  const [tempLocation, setTempLocation] = useState("");
  const [tempCompanyId, setTempCompanyId] = useState("");

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
      searchQuery: formData.get("searchQuery") as string,
      company_id: tempCompanyId,
      location: tempLocation,
    });
    // company_id: formData.get("company_id") as string,
    // location: formData.get("location") as string,

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

  const handleClearFiter = () => {
    setTempCompanyId("");
    setTempLocation("");
  };

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
              <div className="flex flex-1 gap-1">
                <Input
                  type="text"
                  name="searchQuery"
                  placeholder="Search job by title...."
                  className="text-black flex-1"
                />
                <Button type="submit" variant="blue">
                  Search
                </Button>
              </div>
              <div className="flex flex-1 flex-col sm:flex-row gap-1">
                <Select
                  value={tempLocation}
                  onValueChange={(value) => setTempLocation(value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="select location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {State.getStatesOfCountry("IN").map(({ name }) => {
                        return (
                          <SelectItem key={name} value={name}>
                            {name}
                          </SelectItem>
                        );
                      })}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <Select
                  value={tempCompanyId}
                  onValueChange={(value) => setTempCompanyId(value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="select company" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {companiesRes?.data?.map((company) => (
                        <SelectItem value={String(company.id)}>
                          {company.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <Button
                  onClick={handleClearFiter}
                  className=" sm:w-1/2"
                  variant="destructive"
                >
                  clear filter
                </Button>
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

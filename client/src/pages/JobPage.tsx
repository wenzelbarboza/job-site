import { useParams } from "react-router-dom";
import {
  useGetJobApplicaionsQuerry,
  useGetSingleJobQuery,
  useUpdateStatusMutation,
} from "../api/jobs.api";
import { DoorClosed, DoorOpen, PinIcon } from "lucide-react";
import MDEditor from "@uiw/react-md-editor";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { useEffect, useState } from "react";
import { useUserStore } from "../zustand/UserStore";
import JobDrawer from "../components/JobDrawer";
import ApplicationCard from "../components/ApplicationCard";

export const JobPage = () => {
  const userId = useUserStore((value) => value.user?.id);
  const { id } = useParams();
  const jobId = Number(id);
  const { mutateAsync } = useUpdateStatusMutation();
  console.log("id from params is: ", id);

  const { data, isLoading, isError, refetch } = useGetSingleJobQuery({
    jobId: id as unknown as number,
  });
  const didApply = !!data?.data?.application?.candidateId;

  const {
    data: applicationData,
    error: applicationsError,
    refetch: applicationsRefetch,
  } = useGetJobApplicaionsQuerry({
    jobId,
  });
  let isCandidate = true;
  const refetchApplications = async () => {
    await applicationsRefetch();
  };

  if (!isLoading && !isError) {
    isCandidate = data?.data?.jobs.recruiterId != userId;
  }

  console.log("list of all the applicants: ", applicationData);

  const [status, setStatus] = useState<string>("closed");

  useEffect(() => {
    if (!isLoading && !isError) {
      setStatus(data?.data?.jobs ? "open" : "closed");
    }
  }, [isLoading, isError]);

  const handelStatusUpdate = async (value: string) => {
    setStatus(value);
    await mutateAsync({
      jobId: Number(id),
      status: status == "open" ? true : false,
    });
  };

  if (isLoading) {
    return <h1>loading...</h1>;
  }

  if (isError) {
    return <h1>Error in fetching data....</h1>;
  }

  if (data?.data == undefined) {
    return <h1>No data found.</h1>;
  }

  const HandleRefetch = () => {
    refetch();
  };

  // TODO
  // - update job status when userID == RecruiterId

  return (
    <>
      <div className="flex-1 flex flex-col gap-8 mb-6">
        <div className="flex flex-col-reverse md:flex-row gap-6 justify-between items-center mt-6">
          <h1 className="font-bold text-4xl md:text-6xl ">
            {data.data.jobs.title}
          </h1>
          <div>
            <img
              src={data.data.companies?.logoUrl}
              alt={`${data.data.companies?.name} image`}
              className="h-16"
            />
          </div>
        </div>
        <div className="flex justify-between ">
          <div className="flex gap-2">
            <PinIcon />
            {data.data.jobs.location}
          </div>
          <div className="flex gap-2">
            {data.data.jobs.isOpen ? (
              <>
                <DoorOpen /> open
              </>
            ) : (
              <>
                <DoorClosed /> closed
              </>
            )}
          </div>
        </div>
        <div>
          {data.data.jobs.recruiterId == userId ? (
            <Select
              value={status}
              onValueChange={(value) => handelStatusUpdate(value)}
            >
              <SelectTrigger>
                <SelectValue
                  placeholder={data.data.jobs.isOpen ? "open" : "closed"}
                />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value={"open"}>open</SelectItem>
                  <SelectItem value={"close"}>close</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          ) : (
            <></>
          )}
        </div>
        <h2 className="text-2xl md:text-3xl font-bold">About the job</h2>
        <p className="sm:text-lg">{data.data.jobs.description}</p>
        <h2 className="text-2xl md:text-3xl font-bold">
          What we are looking for
        </h2>
        <MDEditor.Markdown
          source={data.data.jobs.requirements}
          style={{ whiteSpace: "pre-wrap" }}
          className="bg-transparent sm:text-lg"
        />
        {data.data.jobs.recruiterId != userId &&
          (didApply ? (
            // TODO
            //display application details of this user
            <></>
          ) : (
            <JobDrawer
              job={data.data.jobs}
              applied={didApply}
              refetch={HandleRefetch}
              companyName={data.data.companies?.name || ""}
            />
          ))}
        {(applicationData?.data?.length || 0) > 0 && !isCandidate && (
          <div className="flex flex-col gap-4">
            <h2 className="text-xl">Applications</h2>
            {applicationData?.data?.map((application) => {
              return (
                <ApplicationCard
                  key={application.id}
                  {...application}
                  isCandidate={isCandidate}
                  companyName={data.data?.companies?.name || ""}
                  jobTitle={data.data?.jobs.title || ""}
                  refetchApplications={refetchApplications}
                />
              );
            })}
          </div>
        )}
        {/* {applicationData?.data?.map((application) => {
        return  <ApplicationCard key={application.id} {...application} isCandidate={isCandidate}  companyName={data.data?.companies?.name || "" } jobTitle={data.data?.jobs.title || ""}  refetchApplications={refetchApplications}  />
        })} */}
      </div>
    </>
  );
};

// <h1>{JSON.stringify(data.data)}</h1>

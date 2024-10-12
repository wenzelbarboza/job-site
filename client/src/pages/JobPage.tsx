import { useParams } from "react-router-dom";
import { useGetSingleJobQuery, useUpdateStatusMutation } from "../api/jobs.api";
import MoonLoader from "react-spinners/MoonLoader";
import { Briefcase, DoorClosed, DoorOpen, PinIcon } from "lucide-react";
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

export const JobPage = () => {
  const userId = useUserStore((value) => value.user?.id);
  const { id } = useParams();
  const { mutateAsync } = useUpdateStatusMutation();
  console.log("id from params is: ", id);

  const { data, isLoading, isError } = useGetSingleJobQuery({
    jobId: id as unknown as number,
  });

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

  if (isError || data?.data == undefined) {
    return <h1>Error in fetching data....</h1>;
  }

  // TODO
  // - update job status when userID == RecruiterId

  return (
    <>
      {isLoading ? (
        <MoonLoader className="" />
      ) : (
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
            <p className="sm:text-lg">
              <MDEditor.Markdown
                source={data.data.jobs.requirements}
                style={{ whiteSpace: "pre-wrap" }}
                className="bg-transparent sm:text-lg"
              />
            </p>
          </div>
        </>
      )}
    </>
  );
};

// <h1>{JSON.stringify(data.data)}</h1>

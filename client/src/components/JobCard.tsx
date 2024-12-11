import { JobsData } from "../types/api.types";
import { FaHeart, FaTrash } from "react-icons/fa";
import { useDeleteJobMutation, useUpdateSaved } from "../api/jobs.api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { PinIcon } from "lucide-react";
import { Button } from "./ui/button";

type Props = {
  job: JobsData;
  handleRefetch?: () => void;
  isRefetching?: boolean;
  isMyJob?: boolean;
};

const JobCard = ({
  job,
  handleRefetch,
  isRefetching,
  isMyJob = false,
}: Props) => {
  const navigate = useNavigate();

  console.log("card rerender");
  const [disabled, setDisabled] = useState(false);
  const [isSaved, setIsSaved] = useState(!!job.savedJobId);
  const { mutateAsync } = useUpdateSaved();
  const { mutateAsync: deleteMutateAsync } = useDeleteJobMutation();

  const handelUpdateSaved = async () => {
    try {
      setDisabled(true);
      setIsSaved((prevState) => !prevState);
      await mutateAsync({ isSaved: !!job.savedJobId, jobsId: job.job.id });
      if (handleRefetch) handleRefetch();
      setDisabled(false);
    } catch (error) {
      console.log(error);
      setIsSaved((prevState) => !prevState);
    }
  };
  // useEffect(() => {
  //   console.log(disabled);
  // }, [disabled]);

  useEffect(() => {
    console.log("mount");
    return () => {
      console.log("unmount");
    };
  }, []);

  const navigationHandler = (id: number) => {
    navigate(`/job/${id}`);
  };

  const handleJobDelete = async () => {
    try {
      await deleteMutateAsync({ jobId: job.job.id });
      if (handleRefetch) handleRefetch();
    } catch (error: any) {
      console.error(error);
    }
  };

  return (
    <>
      <Card className="flex flex-col">
        <CardHeader>
          <div className="flex justify-between items-center w-full">
            <CardTitle>{job.job.title}</CardTitle>
            {isMyJob && (
              <FaTrash
                className="text-red-600 cursor-pointer"
                onClick={handleJobDelete}
              />
            )}
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 flex-1">
          <div className="flex justify-between w-full">
            <img src={job.companyLogo} alt={job.companyName} className="h-6" />
            <span className="flex gap-1">
              <PinIcon />
              {job.job.location}
            </span>
          </div>
          <hr />
          <div>{job.job.description.slice(0, 50)}...</div>
          {/* <div>{JSON.stringify(job)}</div> */}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            onClick={() => navigationHandler(job.job.id)}
            className="w-full"
            variant="secondary"
          >
            Go to page
          </Button>
          <button
            disabled={disabled || isRefetching}
            onClick={handelUpdateSaved}
            className="ml-4"
          >
            <FaHeart fill={isSaved ? "red" : "white"} />
          </button>
        </CardFooter>
      </Card>
    </>
  );
};

export default JobCard;

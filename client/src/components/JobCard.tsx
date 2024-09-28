import { JobsData } from "../types/api.types";
import { FaHeart } from "react-icons/fa";
import { useUpdateSaved } from "../api/jobs.api";
import { useEffect, useState } from "react";
type Props = {
  job: JobsData;
  handleRefetch: () => void;
  isRefetching: boolean;
};
const JobCard = ({ job, handleRefetch, isRefetching }: Props) => {
  console.log("card rerender");
  const [disabled, setDisabled] = useState(false);
  const [isSaved, setIsSaved] = useState(!!job.savedJobId);
  const { mutateAsync } = useUpdateSaved();

  const handelUpdateSaved = async () => {
    try {
      setDisabled(true);
      setIsSaved((prevState) => !prevState);
      await mutateAsync({ isSaved: job.savedJobId, jobsId: job.job.id });
      handleRefetch();
      setDisabled(false);
    } catch (error) {
      console.log(error);
      setIsSaved((prevState) => !prevState);
    }
  };
  useEffect(() => {
    console.log(disabled);
  }, [disabled]);

  useEffect(() => {
    console.log("mount");
    return () => {
      console.log("unmount");
    };
  }, []);

  return (
    <>
      <div>{JSON.stringify(job)}</div>
      <button disabled={disabled || isRefetching} onClick={handelUpdateSaved}>
        <FaHeart fill={isSaved ? "red" : "white"} />
      </button>
      <hr />
    </>
  );
};

export default JobCard;

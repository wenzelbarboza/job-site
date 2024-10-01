import { useParams } from "react-router-dom";
import { useGetSingleJobQuery, useUpdateStatusMutation } from "../api/jobs.api";
import MoonLoader from "react-spinners/MoonLoader";

export const JobPage = () => {
  const { id } = useParams();
  // const updateStatus = useUpdateStatusMutation ();
  console.log("id from params is: ", id);

  const { data, isLoading, isError } = useGetSingleJobQuery({
    jobId: id as unknown as number,
  });

  // const handelStatusUpdate()=>{

  // }

  if (isError || data?.data == undefined) {
    return <h1>Error in fetching data....</h1>;
  }

  // TODO
  // - update job status when userID == RecruiterId

  return <>{isLoading ? <MoonLoader /> : JSON.stringify(data?.data[0])}</>;
};

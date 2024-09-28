import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import axiosInstance from "../lib/utils";
import { apiResponeType, JobsData } from "../types/api.types";

const userUrl = import.meta.env.VITE_BASE_URL + "/api/v1/jobs";

export type getJobs = {
  location: string;
  company_id: string;
  searchQuery: string;
};
export const useGetJobsQuerry = (data: getJobs) => {
  const handleQuerry = async (data: getJobs) => {
    const res: AxiosResponse<apiResponeType<Array<JobsData>>> =
      await axiosInstance.post(`${userUrl}/get-jobs`, data);
    return res.data;
  };

  return useQuery({
    queryKey: ["search", data],
    queryFn: () => handleQuerry(data),
  });
};

type UpdateSaved = { isSaved: number; jobsId: number };

export const useUpdateSaved = () => {
  const handleMutation = async (data: UpdateSaved) => {
    const res: AxiosResponse<apiResponeType> = await axiosInstance.post(
      `${userUrl}/update-saved`,
      data
    );
    return res.data;
  };

  return useMutation({
    mutationKey: ["update-saved"],
    mutationFn: (data: UpdateSaved) => handleMutation(data),
  });
};

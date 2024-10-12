import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import axiosInstance from "../lib/utils";
import { apiResponeType, JobData, JobsData } from "../types/api.types";

const userUrl = import.meta.env.VITE_BASE_URL + "/api/v1/jobs";

export type getJobs = {
  location: string;
  company_id: string;
  searchQuery: string;
};
export const useGetJobsQuery = (data: getJobs) => {
  const handleQuery = async (data: getJobs) => {
    const res: AxiosResponse<apiResponeType<Array<JobsData>>> =
      await axiosInstance.post(`${userUrl}/get-jobs`, data);
    return res.data;
  };

  return useQuery({
    queryKey: ["search", data],
    queryFn: () => handleQuery(data),
  });
};

type UpdateSaved = { isSaved: boolean; jobsId: number };

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

type SingleJob = {
  jobId: number;
};

export const useGetSingleJobQuery = (data: SingleJob) => {
  const handleQuery = async (data: SingleJob) => {
    const res: AxiosResponse<apiResponeType<JobData>> =
      await axiosInstance.post(`${userUrl}/get-job`, data);
    return res.data;
  };

  return useQuery({
    queryKey: ["single-job", data],
    queryFn: () => handleQuery(data),
  });
};

//types
type UpdateStatus = {
  jobId: number;
  status: boolean;
};

export const useUpdateStatusMutation = () => {
  const handleQuery = async (data: UpdateStatus) => {
    const res: AxiosResponse<apiResponeType> = await axiosInstance.post(
      `${userUrl}/update-status`,
      data
    );
    return res.data;
  };

  return useMutation({
    mutationKey: ["update-status"],
    mutationFn: handleQuery,
  });
};

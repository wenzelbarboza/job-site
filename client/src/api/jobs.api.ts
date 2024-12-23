import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import axiosInstance from "../lib/utils";
import {
  apiResponeType,
  JobApplicationsType,
  JobData,
  JobsData,
  SavedJobsType,
} from "../types/api.types";

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

type GetJobApplication = {
  jobId: number;
};
export const useGetJobApplicaionsQuerry = (data: GetJobApplication) => {
  const handleQuery = async (data: GetJobApplication) => {
    const res: AxiosResponse<apiResponeType<JobApplicationsType>> =
      await axiosInstance.post(`${userUrl}/get-job-applications`, data);
    return res.data;
  };

  return useQuery({
    queryKey: ["get-job-applications", data],
    queryFn: () => handleQuery(data),
  });
};

type CreateJob = {
  title: string;
  companyId: string | number;
  description: string;
  location: string;
  requirements: string;
};

export const useCreateJobMutation = () => {
  const handleQuery = async (data: CreateJob) => {
    data.companyId = Number(data.companyId);
    const res: AxiosResponse<apiResponeType> = await axiosInstance.post(
      `${userUrl}/create-job`,
      data
    );
    return res.data;
  };
  return useMutation({
    mutationKey: ["create-job"],
    mutationFn: handleQuery,
  });
};

export const useGetSavedQuery = () => {
  const handleQuery = async () => {
    const res: AxiosResponse<apiResponeType<Array<SavedJobsType>>> =
      await axiosInstance.post(`${userUrl}/get-saved`);
    return res.data;
  };

  return useQuery({
    queryKey: ["get-saved"],
    queryFn: () => handleQuery(),
  });
};

// working
export const useGetCreatedJobs = () => {
  const handleQuery = async () => {
    const res: AxiosResponse<apiResponeType<Array<JobsData>>> =
      await axiosInstance.post(`${userUrl}/get-created-jobs`);
    return res.data;
  };

  return useQuery({
    queryKey: ["created-jobs"],
    queryFn: () => handleQuery(),
  });
};

type DeleteJob = {
  jobId: number;
};

export const useDeleteJobMutation = () => {
  const handelMutation = async (data: DeleteJob) => {
    const res: AxiosResponse<apiResponeType> = await axiosInstance.post(
      `${userUrl}/create-job`,
      data
    );
    return res.data;
  };
  return useMutation({
    mutationKey: ["delete-job"],
    mutationFn: handelMutation,
  });
};

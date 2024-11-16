import { AxiosResponse } from "axios";
import { apiResponeType } from "../types/api.types";
import axiosInstance from "../lib/utils";
import {QueryClient, useMutation} from "@tanstack/react-query";

const userUrl = import.meta.env.VITE_BASE_URL + "/api/v1/application";
const queryClient = new QueryClient();

export const useApplyToJobMutation = () => {
  const handleMutation = async (data: FormData) => {
    console.log("formData is: ", data);
    const res: AxiosResponse<apiResponeType> = await axiosInstance.post(
      `${userUrl}/apply`,
      data
    );
    return res.data;
  };

  return useMutation({
    mutationKey: ["apply-job"],
    mutationFn: handleMutation,
  });
};

type UpdateApplicationStatus = {
  status: string;
  applicationId: number;
  // status: "applied" | "interviewing" | "hired" | "rejected"
};

export const useUpdateApplicationStatusMutation = () => {
  const handleQuery = async (data: UpdateApplicationStatus ) => {
    const res: AxiosResponse<apiResponeType> = await axiosInstance.post(
        `${userUrl}/update-status`,
        data
    );
    return res.data;
  };

  const onSuccessHandler = async () => {
    await queryClient.invalidateQueries({queryKey:["get-job-applications"]})
  }

  return useMutation({
    mutationKey: ["update-application-status"],
    mutationFn: handleQuery,
    onSuccess: onSuccessHandler,
  });
};

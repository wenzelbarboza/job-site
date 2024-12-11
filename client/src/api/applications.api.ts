import { AxiosResponse } from "axios";
import { apiResponeType, UserApplicaions } from "../types/api.types";
import axiosInstance from "../lib/utils";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { useUserStore } from "../zustand/UserStore";

const userUrl = import.meta.env.VITE_BASE_URL + "/api/v1/application";
const queryClient = new QueryClient();

export const useApplyToJobMutation = () => {
  const accessToken = useUserStore((store) => store.accessToken);

  const handleMutation = async (data: FormData) => {
    console.log("formData is: ", data);
    console.log("token TOKEN: ", accessToken);
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
  const handleQuery = async (data: UpdateApplicationStatus) => {
    const res: AxiosResponse<apiResponeType> = await axiosInstance.post(
      `${userUrl}/update-status`,
      data
    );
    return res.data;
  };

  const onSuccessHandler = async () => {
    await queryClient.invalidateQueries({ queryKey: ["single-job"] });
  };

  return useMutation({
    mutationKey: ["update-application-status"],
    mutationFn: handleQuery,
    onSuccess: onSuccessHandler,
  });
};

export const useGetUserAppplicaion = () => {
  const handleQuery = async () => {
    const res: AxiosResponse<apiResponeType<Array<UserApplicaions>>> =
      await axiosInstance.post(`${userUrl}/user-application`);
    return res.data;
  };

  return useQuery({
    queryKey: ["user-applications"],
    queryFn: handleQuery,
  });
};

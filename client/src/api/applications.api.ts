import axios, { AxiosResponse } from "axios";
import { apiResponeType, applyToJobType } from "../types/api.types";
import axiosInstance from "../lib/utils";
import { useMutation } from "@tanstack/react-query";

const userUrl = import.meta.env.VITE_BASE_URL + "/api/v1/application";

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

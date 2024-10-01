import { AxiosResponse } from "axios";
import { apiResponeType } from "../types/api.types";
import axiosInstance from "../lib/utils";
import { useMutation } from "@tanstack/react-query";

const userUrl = import.meta.env.VITE_BASE_URL + "/api/v1/companie";

export interface CompaniesList {
  id: number;
  createdAt: string;
  name: string;
  logoUrl: string;
}
export const useApplyToJobMutation = () => {
  const handleMutation = async () => {
    const res: AxiosResponse<apiResponeType<Array<CompaniesList>>> =
      await axiosInstance.post(`${userUrl}/get-companies`);
    return res.data;
  };

  return useMutation({
    mutationKey: ["apply-job"],
    mutationFn: () => handleMutation(),
  });
};

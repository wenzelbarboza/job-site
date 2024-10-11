import { AxiosResponse } from "axios";
import { apiResponeType } from "../types/api.types";
import axiosInstance from "../lib/utils";
import { useQuery } from "@tanstack/react-query";

const userUrl = import.meta.env.VITE_BASE_URL + "/api/v1/company";

export interface CompaniesList {
  id: number;
  createdAt: string;
  name: string;
  logoUrl: string;
}
export const useGetCompaniesQuerry = () => {
  const handleQuerry = async () => {
    const res: AxiosResponse<apiResponeType<Array<CompaniesList>>> =
      await axiosInstance.post(`${userUrl}/get-company`);
    return res.data;
  };

  return useQuery({
    queryKey: ["companies"],
    queryFn: () => handleQuerry(),
  });
};

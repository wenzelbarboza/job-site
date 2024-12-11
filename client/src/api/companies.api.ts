import { AxiosResponse } from "axios";
import { apiResponeType } from "../types/api.types";
import axiosInstance from "../lib/utils";
import { useMutation, useQuery } from "@tanstack/react-query";

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

type CreateComapny = {
  formdata: FormData;
};

export const useCreateCompanyMutate = () => {
  const handelMutation = async (data: CreateComapny) => {
    console.log("data received inside querry mutate: ", data);
    const res: AxiosResponse<apiResponeType> = await axiosInstance.post(
      `${userUrl}/create-company`,
      data.formdata
    );
    return res.data;
  };

  return useMutation({
    mutationKey: ["create-companny"],
    mutationFn: handelMutation,
  });
};

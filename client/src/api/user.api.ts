import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../lib/auth";
import axiosInstance from "../lib/utils";
import { apiResponeType, loginType, signUpType } from "../types/api.types";
import { AxiosResponse } from "axios";

const userUrl = import.meta.env.VITE_BASE_URL + "/api/v1/user";

export const useLoginMutation = () => {
  const handelMutation = async ({ email, password }: loginType) => {
    return loginUser(email, password);
    // const res = await axiosInstance.post(`${userUrl}/login`, userData);
    // return res.data;
  };

  return useMutation({
    mutationKey: ["Login"],
    mutationFn: handelMutation,
  });
};

export const useSignUpMutation = () => {
  const handelMutation = async (signUpData: signUpType) => {
    const res: AxiosResponse<apiResponeType> = await axiosInstance.post(
      `${userUrl}/signup`,
      signUpData
    );
    return res.data;
  };

  return useMutation({
    mutationKey: ["signUp"],
    mutationFn: handelMutation,
  });
};

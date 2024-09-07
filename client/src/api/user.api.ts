import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../lib/auth";
import axiosInstance from "../lib/utils";
import {
  apiResponeType,
  loginType,
  roleApiType,
  signUpType,
} from "../types/api.types";
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

export const useRoleMutate = () => {
  const handelMutation = async (data: roleApiType) => {
    console.log("data received inside querry mutate: ", data);
    const res: AxiosResponse<apiResponeType> = await axiosInstance.post(
      `${userUrl}/role`,
      data
    );
    return res.data;
  };

  return useMutation({
    mutationKey: ["update role"],
    mutationFn: handelMutation,
  });
};

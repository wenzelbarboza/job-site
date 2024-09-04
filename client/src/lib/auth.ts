import { AxiosResponse } from "axios";
import axiosInstance from "./utils";
import { apiResponeType } from "../types/api.types";

export const loginUser = async (email: string, password: string) => {
  const response: AxiosResponse<{ accessToken: string }> =
    await axiosInstance.post("/user/login", { email, password });
  return response.data; // Contains accessToken
};

export const refreshAccessToken = async () => {
  const response: AxiosResponse<{ accessToken: string }> =
    await axiosInstance.post("/user/refresh");
  return response.data; // Contains new accessToken
};

export const logoutUser = async () => {
  await axiosInstance.post<apiResponeType>("/user/logout");
};

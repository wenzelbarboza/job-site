import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import axios from "axios";
import { refreshAccessToken } from "./auth";
import { logoutUser } from "./auth"; // Function to handle client-side logout

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

let isRefreshing = false;
let hasRetried = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: any) => void;
}> = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (token) {
      prom.resolve(token);
    } else {
      prom.reject(error);
    }
  });

  failedQueue = [];
};

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL + "/api/v1",
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log("inside interseptor");
    const originalRequest = error.config;
    console.log(originalRequest);

    console.log("status: ", error.response?.status);

    if (error.response?.status === 401 && !hasRetried) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers["Authorization"] = `Bearer ${token}`;
            return axiosInstance(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      hasRetried = true;
      isRefreshing = true;

      try {
        const { accessToken: newAccessToken } = await refreshAccessToken();
        axiosInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${newAccessToken}`;
        processQueue(null, newAccessToken);

        return axiosInstance(originalRequest);
      } catch (err) {
        processQueue(err, null);

        // If refresh token fails, log the user out
        await logoutUser(); // Clears client-side state and redirects to login
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }
    console.log("throwing error");
    hasRetried = false;

    return Promise.reject(error);
  }
);

export default axiosInstance;

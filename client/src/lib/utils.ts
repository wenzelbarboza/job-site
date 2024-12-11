import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import axios from "axios";
import { useUserStore } from "../zustand/UserStore";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// let isRefreshing = false;
// let hasRetried = false;
// let failedQueue: Array<{
//   resolve: (token: string) => void;
//   reject: (error: any) => void;
// }> = [];

// const processQueue = (error: any, token: string | null = null) => {
//   failedQueue.forEach((prom) => {
//     if (token) {
//       prom.resolve(token);
//     } else {
//       prom.reject(error);
//     }
//   });

//   failedQueue = [];
// };

// export const axiosInstance = axios.create({
//   baseURL: import.meta.env.VITE_BASE_URL + "/api/v1",
//   withCredentials: true,
// });

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     console.log("inside interseptor");
//     const originalRequest = error.config;
//     console.log(originalRequest);

//     console.log("status: ", error.response?.status);

//     if (error.response?.status === 401 && !hasRetried) {
//       if (isRefreshing) {
//         return new Promise((resolve, reject) => {
//           failedQueue.push({ resolve, reject });
//         })
//           .then((token) => {
//             originalRequest.headers["Authorization"] = `Bearer ${token}`;
//             return axiosInstance(originalRequest);
//           })
//           .catch((err) => {
//             return Promise.reject(err);
//           });
//       }

//       hasRetried = true;
//       isRefreshing = true;

//       try {
//         const { accessToken: newAccessToken } = await refreshAccessToken();
//         axiosInstance.defaults.headers.common[
//           "Authorization"
//         ] = `Bearer ${newAccessToken}`;
//         processQueue(null, newAccessToken);

//         return axiosInstance(originalRequest);
//       } catch (err) {
//         processQueue(err, null);

//         // If refresh token fails, log the user out
//         await logoutUser(); // Clears client-side state and redirects to login
//         return Promise.reject(err);
//       } finally {
//         isRefreshing = false;
//       }
//     }
//     console.log("throwing error");
//     hasRetried = false;

//     return Promise.reject(error);
//   }
// );

// export default axiosInstance;

let isRefreshing = false;
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

// Create Axios instance
export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL + "/api/v1",
  withCredentials: true,
});

// Request interceptor: attach accessToken
axiosInstance.interceptors.request.use(
  (config) => {
    console.log("inside request");
    const { accessToken } = useUserStore.getState(); // Get token from Zustand
    console.log("-------zustand token------:", accessToken);
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    console.log("---headers axios-----:,", config.headers.Authorization);
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: handle 401 errors and refresh token
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const { setAccessToken, setUser } = useUserStore.getState();

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers["Authorization"] = `Bearer ${token}`;
            return axiosInstance(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      isRefreshing = true;

      try {
        // Call your refresh token endpoint
        const { accessToken: newAccessToken } = await refreshAccessToken();

        // Update Zustand store with new token
        setAccessToken(newAccessToken);

        // Process queued requests
        processQueue(null, newAccessToken);

        // Retry the original request with new token
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (err) {
        processQueue(err, null);

        console.error("Token refresh failed:", err);

        // Log the user out on refresh failure
        setUser(null);
        setAccessToken(null);
        // window.location.href = "/login"; // Redirect to login
        // window.location.href = "/"; // Redirect to login
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

// Refresh token function
const refreshAccessToken = async () => {
  const response = await axiosInstance.post(
    "/user/refresh", // Your backend refresh endpoint
    {},
    { withCredentials: true } // Ensure cookies are sent with the request
  );
  return response.data; // Assuming response.data contains { accessToken }
};

export default axiosInstance;

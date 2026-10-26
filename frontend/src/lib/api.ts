import axios, { AxiosError } from "axios";

// Vite:  import.meta.env.VITE_API_URL
// Next:  process.env.NEXT_PUBLIC_API_URL
const baseURL = import.meta.env.VITE_API_URL;

export const api = axios.create({
  baseURL,
  withCredentials: true, // sends the auth cookie on every request
  timeout: 15000,
  headers: { "Content-Type": "application/json" },
});

export type ApiError = {
  status?: number;
  message: string;
  errors?: Record<string, string[]>; // field errors from the validators
};

api.interceptors.response.use(
  (res) => res,
  (error: AxiosError<any>) => {
    const status = error.response?.status;
    const data = error.response?.data;
    const url = error.config?.url ?? "";

    // Session expired: send the user to sign in
    // (skip the sign-in and /me calls so a failed login or first load doesn't loop)
    const isAuthCheck = url.includes("/auth/signin") || url.includes("/auth/me");
    if (status === 401 && !isAuthCheck && window.location.pathname !== "/signin") {
      window.location.href = "/signin";
    }

    const normalized: ApiError = {
      status,
      message:
        data?.message ??
        data?.title ??
        (error.code === "ECONNABORTED" ? "Request timed out" : "Something went wrong"),
      errors: data?.errors,
    };

    return Promise.reject(normalized);
  }
);
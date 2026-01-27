import axios, { AxiosError, AxiosInstance } from "axios";

export const baseURL = "https://api.the-perksapp.com";

const headers = {
  "Content-Type": "application/json",
};

const formDataHeaders = {
  "Content-Type": "multipart/form-data",
};

/**
 * Create an Axios instance with base URL and default headers
 */
export const API: AxiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 30000,
  headers: headers,
  withCredentials: true,
});

/**
 * Request Interceptor - Add auth token to all requests
 */
API.interceptors.request.use(
  (config) => {
    // Get token from localStorage
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("authToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Response Interceptor - Handle errors and token expiration
 */
API.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    // Handle 401 Unauthorized - token expired or invalid
    if (error?.response?.status === 401) {
      if (typeof window !== "undefined") {
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");
        // Redirect to login
        window.location.href = "/auth/login";
      }
    }

    // Handle other errors
    const errorMessage =
      (error?.response?.data as any)?.message ||
      error?.message ||
      "An error occurred";

    console.error("API Error:", {
      status: error?.response?.status,
      message: errorMessage,
      data: error?.response?.data,
    });

    return Promise.reject(error);
  }
);

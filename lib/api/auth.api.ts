import { API } from "./axios";

/**
 * Type definitions for authentication
 */
export interface User {
  id: number;
  name: string;
  email: string;
  role: "admin" | "user" | "store";
  [key: string]: any;
}

export interface SignInRequest {
  email: string;
  password: string;
  role: "admin" | "user" | "store";
}

export interface SignInResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
    token: string;
  };
}

export interface AuthError {
  message: string;
  status?: number;
}

/**
 * Authentication API service
 * Handles all auth-related API calls at production level
 */
export const authAPI = {
  /**
   * Sign in with email and password
   * @param credentials - Email, password, and role
   * @returns User and authentication token
   */
  signIn: async (credentials: SignInRequest): Promise<SignInResponse> => {
    try {
      const response = await API.post<SignInResponse>("/auth/signIn", {
        email: credentials.email,
        password: credentials.password,
        role: credentials.role,
      });

      // Store token and user data in localStorage for persistence
      if (response.data.data.token) {
        localStorage.setItem("authToken", response.data.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.data.user));
        // Store timestamp for token expiration tracking
        localStorage.setItem("authTokenTime", new Date().getTime().toString());
      }

      return response.data;
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Sign in failed. Please try again.";

      throw {
        message,
        status: error?.response?.status,
      } as AuthError;
    }
  },

  /**
   * Sign out user and clear local storage
   */
  signOut: async (): Promise<void> => {
    try {
      // Optional: Call sign out endpoint if available
      // await API.post("/auth/signOut");

      // Clear local storage
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
      localStorage.removeItem("authTokenTime");
    } catch (error: any) {
      console.error("Sign out error:", error);
      // Clear local storage anyway
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
      localStorage.removeItem("authTokenTime");
    }
  },

  /**
   * Get current user from localStorage
   */
  getCurrentUser: (): User | null => {
    if (typeof window !== "undefined") {
      const user = localStorage.getItem("user");
      return user ? JSON.parse(user) : null;
    }
    return null;
  },

  /**
   * Get auth token from localStorage
   */
  getToken: (): string | null => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("authToken");
    }
    return null;
  },

  /**
   * Check if user is authenticated
   */
  isAuthenticated: (): boolean => {
    if (typeof window !== "undefined") {
      return !!localStorage.getItem("authToken");
    }
    return false;
  },
};

// Keep legacy exports for backward compatibility
export const login = authAPI.signIn;
export const logout = authAPI.signOut;
export const getProfile = authAPI.getCurrentUser;
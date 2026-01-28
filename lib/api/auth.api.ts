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

export interface ChangePasswordRequest {
  password: string;
  newPassword: string;
}

export interface ChangePasswordResponse {
  success: boolean;
  message: string;
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
   * Sign out user - calls backend logout endpoint and clears local storage
   * @returns void
   */
  signOut: async (): Promise<void> => {
    try {
      // Call logout endpoint on backend
      await API.post("/auth/logout");
    } catch (error: any) {
      console.error("Logout API error:", error);
      // Continue with local logout even if API call fails
    } finally {
      // Always clear local storage
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
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

  /**
   * Change password
   * @param data - Current password and new password
   * @returns Success response
   */
  changePassword: async (data: ChangePasswordRequest): Promise<ChangePasswordResponse> => {
    try {
      const response = await API.post<ChangePasswordResponse>("/auth/changePassword", {
        password: data.password,
        newPassword: data.newPassword,
      });
      return response.data;
    } catch (error: any) {
      throw {
        message: error.response?.data?.message || "Failed to change password",
        status: error.response?.status || 500,
      };
    }
  },
};

// Keep legacy exports for backward compatibility
export const login = authAPI.signIn;
export const logout = authAPI.signOut;
export const getProfile = authAPI.getCurrentUser;
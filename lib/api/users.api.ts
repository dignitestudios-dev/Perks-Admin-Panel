import { API } from "./axios";

/**
 * User type definitions from backend
 * This matches the exact structure returned by the API
 */
export interface User {
  _id: string;
  name: string;
  username: string;
  profilePicture: string;
  uid: string;
  venmo: string;
  cashApp: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaginationData {
  itemsPerPage: number;
  currentPage: number;
  totalItems: number;
  totalPages: number;
}

export interface GetUsersResponse {
  success: boolean;
  message: string;
  data: User[];
  pagination: PaginationData;
}

export interface GetUsersParams {
  page?: number;
  limit?: number;
  search?: string;
}

/**
 * Users API service
 * Handles all user-related API calls
 */
export const usersAPI = {
  /**
   * Get all users with pagination and search
   * @param params - page, limit, and search query
   * @returns Users list with pagination info
   */
  getAll: async (params: GetUsersParams = {}): Promise<GetUsersResponse> => {
    try {
      const { page = 1, limit = 10, search = "" } = params;

      const response = await API.get<GetUsersResponse>("/users/all", {
        params: {
          page,
          limit,
          ...(search && { search }),
        },
      });

      return response.data;
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to fetch users";

      throw {
        message,
        status: error?.response?.status,
      };
    }
  },

  /**
   * Get single user by ID
   * @param userId - User ID
   * @returns User data
   */
  getById: async (userId: string): Promise<User> => {
    try {
      const response = await API.get<{ success: boolean; data: User }>(
        `/users/${userId}`
      );

      return response.data.data;
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to fetch user";

      throw {
        message,
        status: error?.response?.status,
      };
    }
  },

  /**
   * Delete user
   * @param userId - User ID to delete
   */
  delete: async (userId: string): Promise<void> => {
    try {
      await API.delete(`/users/${userId}`);
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to delete user";

      throw {
        message,
        status: error?.response?.status,
      };
    }
  },
};

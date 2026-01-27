import { API } from "./axios";

export interface BlockUserPayload {
  blocked: string; // userId to block/unblock
  block: boolean; // true to block, false to unblock
}

export interface BlockUserResponse {
  success: boolean;
  message: string;
}

/**
 * Block/Unblock User API service
 */
export const blockUserAPI = {
  /**
   * Block or unblock a user
   * @param payload - Contains userId and block status
   * @returns Response with success message
   */
  toggleBlock: async (payload: BlockUserPayload): Promise<BlockUserResponse> => {
    try {
      const response = await API.post<BlockUserResponse>("/users/blocked", payload);
      return response.data;
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to update user block status";

      throw {
        message,
        status: error?.response?.status,
      };
    }
  },
};

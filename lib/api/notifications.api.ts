import { API } from "./axios";

export interface Notification {
  _id: string;
  title: string;
  description: string;
  metaData: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

export interface CreateNotificationPayload {
  title: string;
  description: string;
}

export interface GetNotificationsParams {
  page?: number;
  limit?: number;
  filter?: string;
}

export interface NotificationsResponse {
  success: boolean;
  message: string;
  data: Notification[];
  pagination: {
    page: number;
    limit: number;
    totalPages: number;
    totalCount: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

export const NotificationAPI = {
  /**
   * Create a new notification
   */
  createNotification: async (payload: CreateNotificationPayload) => {
    const response = await API.post<{ success: boolean; message: string }>(
      "/notifications",
      payload
    );
    return response.data;
  },

  /**
   * Get all notifications with pagination
   */
  getAllNotifications: async (params: GetNotificationsParams = {}) => {
    const response = await API.get<NotificationsResponse>("/notifications/all", {
      params: {
        page: params.page || 1,
        limit: params.limit || 10,
        filter: params.filter || "all",
      },
    });
    return response.data;
  },
};

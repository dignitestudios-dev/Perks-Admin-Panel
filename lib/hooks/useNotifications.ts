import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  NotificationAPI,
  GetNotificationsParams,
  Notification,
  CreateNotificationPayload,
} from "@/lib/api/notifications.api";

/**
 * Hook to fetch all notifications with pagination
 */
export const useNotifications = (params: GetNotificationsParams = {}) => {
  return useQuery({
    queryKey: ["notifications", params.page, params.limit, params.filter],
    queryFn: () => NotificationAPI.getAllNotifications(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

/**
 * Hook to create a new notification
 */
export const useCreateNotification = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateNotificationPayload) =>
      NotificationAPI.createNotification(payload),
    onSuccess: () => {
      // Invalidate notifications query to refetch data
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
};

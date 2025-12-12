import { checkAndRefreshToken } from "@/app/api/auth/checkAndRefreshToken";
import { BASE_URL } from "../config/apiConfig";

export interface NotificationPayload {
  teamId?: string;
  hackathonId?: string;
}

export type NotificationType = "TEAM_INVITE" | "TEAM_JOIN_REQUEST" | "MESSAGE" | "SYSTEM";

export interface NotificationItem {
  id: string;
  toUserId: string;
  fromUserId: string;
  type: NotificationType;
  content: string;
  payload: NotificationPayload;
  isRead: boolean;
  createdAt: string;
}

export interface NotificationsResponse {
  notifications: NotificationItem[];
  total: number;
  page: number;
  limit: number;
}

export async function getNotifications(
  page: number = 1,
  limit: number = 10
): Promise<NotificationsResponse> {
  try {
    const token = await checkAndRefreshToken();

    if (!token) {
      throw new Error("No auth token found");
    }

    const url = `${BASE_URL}/notifications?page=${page}&limit=${limit}`;

    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    });

    if (!res.ok) {
      const errorBody = await res.json().catch(() => ({}));
      throw new Error(
        errorBody.message || `Failed to fetch notifications (${res.status})`
      );
    }

    return await res.json();
  } catch (error) {
    console.error("Error loading notifications:", error);
    throw error;
  }
}

export async function markNotificationAsRead(
  notificationId: string
): Promise<{ message: string; data?: any }> {
  try {
    const token = await checkAndRefreshToken();

    if (!token) {
      throw new Error("No auth token found");
    }

    const url = `${BASE_URL}/notifications/${notificationId}/mark-as-read`;

    const res = await fetch(url, {
      method: "PATCH",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    });

    if (!res.ok) {
      const errorBody = await res.json().catch(() => ({}));
      throw new Error(
        errorBody.message || `Failed to mark notification as read (${res.status})`
      );
    }

    return await res.json();
  } catch (error) {
    console.error("Error marking notification as read:", error);
    throw error;
  }
}

export async function markAllNotificationsAsRead(): Promise<{ message: string; notificationsCount?: number }> {
  try {
    const token = await checkAndRefreshToken();

    if (!token) {
      throw new Error("No auth token found");
    }

    const url = `${BASE_URL}/notifications/mark-all-as-read`;

    const res = await fetch(url, {
      method: "PATCH",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    });

    if (!res.ok) {
      const errorBody = await res.json().catch(() => ({}));
      throw new Error(
        errorBody.message || `Failed to mark all notifications as read (${res.status})`
      );
    }

    return await res.json();
  } catch (error) {
    console.error("Error marking all notifications as read:", error);
    throw error;
  }
}

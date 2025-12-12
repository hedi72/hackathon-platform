"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { 
  getNotifications, 
  NotificationsResponse, 
  markNotificationAsRead, 
  markAllNotificationsAsRead 
} from "@/src/api/notifications/getNotifications";
import { acceptTeamInvitation, declineTeamInvitation } from "../api/hackathon/inviteMemberToTeam";

export function useNotifications(initialPage: number = 1, initialLimit: number = 10) {
  const [notifications, setNotifications] = useState<NotificationsResponse["notifications"]>([]);
  const [page, setPage] = useState(initialPage);
  const [limit] = useState(initialLimit);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadNotifications = useCallback(
    async (customPage?: number) => {
      try {
        setLoading(true);
        setError(null);
        const p = customPage ?? page;
        const res = await getNotifications(p, limit);
        setNotifications(res.notifications);
        setTotal(res.total);
        setPage(res.page);
      } catch (err: any) {
        setError(err.message || "Failed to load notifications");
      } finally {
        setLoading(false);
      }
    },
    [page, limit]
  );

  // Load on mount
  useEffect(() => {
    loadNotifications();
  }, []);

  // ---------------------------
  // Helper actions
  // ---------------------------

  const markAsRead = useCallback(
    async (notificationId: string) => {
      try {
        await markNotificationAsRead(notificationId);
        setNotifications(prev =>
          prev.map(n => (n.id === notificationId ? { ...n, isRead: true } : n))
        );
      } catch (err) {
        console.error("Failed to mark notification as read:", err);
      }
    },
    []
  );

  const markAllAsRead = useCallback(
    async () => {
      try {
        await markAllNotificationsAsRead();
        setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
      } catch (err) {
        console.error("Failed to mark all notifications as read:", err);
      }
    },
    []
  );

  const acceptTeamInvite = useCallback(
    async (hackathonId: string, teamId: string, invitationId: string) => {
      try {
        return await acceptTeamInvitation(hackathonId, teamId, invitationId);
      } catch (err) {
        console.error("Failed to accept team invite:", err);
        throw err;
      }
    },
    []
  );

  const declineTeamInvite = useCallback(
    async (hackathonId: string, teamId: string, invitationId: string) => {
      try {
        return await declineTeamInvitation(hackathonId, teamId, invitationId);
      } catch (err) {
        console.error("Failed to decline team invite:", err);
        throw err;
      }
    },
    []
  );

  const hasUnreadNotifications = useMemo(
    () => notifications.some(n => !n.isRead),
    [notifications]
  );

  return {
    notifications,
    total,
    page,
    limit,
    loading,
    error,

    refresh: () => loadNotifications(),
    nextPage: () => loadNotifications(page + 1),
    prevPage: () => loadNotifications(page > 1 ? page - 1 : 1),

    markAsRead,
    markAllAsRead,
    acceptTeamInvite,
    declineTeamInvite,
    hasUnreadNotifications,
  };
}

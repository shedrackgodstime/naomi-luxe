import { useEffect, useState } from "react";
import { createClient } from "@/src/lib/supabase/client";

export interface Notification {
  id: string;
  userId: string;
  type: string;
  title: string;
  message: string;
  data?: Record<string, unknown>;
  status: "unread" | "read" | "archived";
  readAt?: string;
  createdAt: string;
}

export function useNotifications(userId: string) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (!userId) return;

    const supabase = createClient();

    // Set up real-time subscription for notifications
    const channel = supabase
      .channel(`notifications:${userId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "notifications",
          filter: `user_id=eq.${userId}`,
        },
        (payload: Record<string, unknown>) => {
          console.log("Notification received:", payload);

          if (payload.eventType === "INSERT") {
            const newNotification = payload.new as Notification;
            setNotifications((prev) => [newNotification, ...prev]);
            if (newNotification.status === "unread") {
              setUnreadCount((prev) => prev + 1);
            }
          } else if (payload.eventType === "UPDATE") {
            const updatedNotification = payload.new as Notification;
            setNotifications((prev) =>
              prev.map((notification) =>
                notification.id === updatedNotification.id
                  ? updatedNotification
                  : notification,
              ),
            );
            // Update unread count if status changed
            const oldNotification = payload.old as Notification;
            if (oldNotification.status !== updatedNotification.status) {
              if (
                updatedNotification.status === "read" &&
                oldNotification.status === "unread"
              ) {
                setUnreadCount((prev) => Math.max(0, prev - 1));
              } else if (
                updatedNotification.status === "unread" &&
                oldNotification.status === "read"
              ) {
                setUnreadCount((prev) => prev + 1);
              }
            }
          } else if (payload.eventType === "DELETE") {
            const deletedNotification = payload.old as Notification;
            const deletedId = deletedNotification.id;
            setNotifications((prev) => {
              const deletedNotification = prev.find((n) => n.id === deletedId);
              if (deletedNotification?.status === "unread") {
                setUnreadCount((prev) => Math.max(0, prev - 1));
              }
              return prev.filter(
                (notification) => notification.id !== deletedId,
              );
            });
          }
        },
      )
      .subscribe((status: string) => {
        console.log("Subscription status:", status);
        setIsConnected(status === "SUBSCRIBED");
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId]);

  return {
    notifications,
    unreadCount,
    isConnected,
    setNotifications,
    setUnreadCount,
  };
}

export function useNotificationPreferences(userId: string) {
  const [preferences, setPreferences] = useState<Record<
    string,
    unknown
  > | null>(null);
  const [loading, _setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    const supabase = createClient();

    // Set up real-time subscription for notification preferences
    const channel = supabase
      .channel(`notification_preferences:${userId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "notification_preferences",
          filter: `user_id=eq.${userId}`,
        },
        (payload: Record<string, unknown>) => {
          console.log("Preferences updated:", payload);
          if (
            payload.eventType === "INSERT" ||
            payload.eventType === "UPDATE"
          ) {
            setPreferences(payload.new as Record<string, unknown>);
          }
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId]);

  return {
    preferences,
    loading,
    setPreferences,
  };
}

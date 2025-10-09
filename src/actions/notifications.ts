"use server";

// Notification Server Actions
import { revalidatePath } from "next/cache";
import {
  archiveNotification,
  deleteNotification,
  getNotificationById,
  getNotificationPreferences,
  getNotificationsByUser,
  getUnreadNotificationsByUser,
  markAllNotificationsAsRead,
  markNotificationAsRead,
  updateNotificationPreferences,
} from "@/src/db/queries";
import { requireAuth } from "@/src/libs/auth";

export async function getUserNotificationsAction() {
  const user = await requireAuth();
  if (!user) {
    return { error: "Unauthorized: Please sign in" };
  }

  try {
    const notifications = await getNotificationsByUser(user.id);
    return { notifications };
  } catch (_error) {
    return { error: "Failed to fetch notifications" };
  }
}

export async function getUnreadNotificationsAction() {
  const user = await requireAuth();
  if (!user) {
    return { error: "Unauthorized: Please sign in" };
  }

  try {
    const notifications = await getUnreadNotificationsByUser(user.id);
    return { notifications };
  } catch (_error) {
    return { error: "Failed to fetch unread notifications" };
  }
}

export async function getNotificationByIdAction(id: string) {
  const user = await requireAuth();
  if (!user) {
    return { error: "Unauthorized: Please sign in" };
  }

  try {
    const notification = await getNotificationById(id);
    if (!notification) {
      return { error: "Notification not found" };
    }

    // Check if user owns this notification
    if (notification.userId !== user.id) {
      return { error: "Unauthorized: Access denied" };
    }

    return { notification };
  } catch (_error) {
    return { error: "Failed to fetch notification" };
  }
}

export async function markNotificationAsReadAction(id: string) {
  const user = await requireAuth();
  if (!user) {
    return { error: "Unauthorized: Please sign in" };
  }

  try {
    const notification = await getNotificationById(id);
    if (!notification) {
      return { error: "Notification not found" };
    }

    // Check if user owns this notification
    if (notification.userId !== user.id) {
      return { error: "Unauthorized: Access denied" };
    }

    const updated = await markNotificationAsRead(id);
    revalidatePath("/notifications");
    return { notification: updated };
  } catch (_error) {
    return { error: "Failed to mark notification as read" };
  }
}

export async function markAllNotificationsAsReadAction() {
  const user = await requireAuth();
  if (!user) {
    return { error: "Unauthorized: Please sign in" };
  }

  try {
    await markAllNotificationsAsRead(user.id);
    revalidatePath("/notifications");
    return { success: true, message: "All notifications marked as read" };
  } catch (_error) {
    return { error: "Failed to mark all notifications as read" };
  }
}

export async function archiveNotificationAction(id: string) {
  const user = await requireAuth();
  if (!user) {
    return { error: "Unauthorized: Please sign in" };
  }

  try {
    const notification = await getNotificationById(id);
    if (!notification) {
      return { error: "Notification not found" };
    }

    // Check if user owns this notification
    if (notification.userId !== user.id) {
      return { error: "Unauthorized: Access denied" };
    }

    const updated = await archiveNotification(id);
    revalidatePath("/notifications");
    return { notification: updated };
  } catch (_error) {
    return { error: "Failed to archive notification" };
  }
}

export async function deleteNotificationAction(id: string) {
  const user = await requireAuth();
  if (!user) {
    return { error: "Unauthorized: Please sign in" };
  }

  try {
    const notification = await getNotificationById(id);
    if (!notification) {
      return { error: "Notification not found" };
    }

    // Check if user owns this notification
    if (notification.userId !== user.id) {
      return { error: "Unauthorized: Access denied" };
    }

    await deleteNotification(id);
    revalidatePath("/notifications");
    return { success: true, message: "Notification deleted" };
  } catch (_error) {
    return { error: "Failed to delete notification" };
  }
}

export async function getNotificationPreferencesAction() {
  const user = await requireAuth();
  if (!user) {
    return { error: "Unauthorized: Please sign in" };
  }

  try {
    const preferences = await getNotificationPreferences(user.id);
    return { preferences };
  } catch (_error) {
    return { error: "Failed to fetch notification preferences" };
  }
}

export async function updateNotificationPreferencesAction(data: {
  emailNotifications?: {
    booking_updates?: boolean;
    order_updates?: boolean;
    promotions?: boolean;
    reminders?: boolean;
  };
  pushNotifications?: {
    booking_updates?: boolean;
    order_updates?: boolean;
    promotions?: boolean;
    reminders?: boolean;
  };
  smsNotifications?: {
    booking_updates?: boolean;
    order_updates?: boolean;
    promotions?: boolean;
    reminders?: boolean;
  };
}) {
  const user = await requireAuth();
  if (!user) {
    return { error: "Unauthorized: Please sign in" };
  }

  try {
    const preferences = await updateNotificationPreferences(user.id, data);
    revalidatePath("/settings/notifications");
    return { preferences, message: "Preferences updated successfully" };
  } catch (_error) {
    return { error: "Failed to update notification preferences" };
  }
}

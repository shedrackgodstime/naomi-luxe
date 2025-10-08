import { and, desc, eq, gte, lte } from "drizzle-orm";
import { db } from "../index";
import { notificationPreferences, notifications } from "../schema";

// Notification CRUD operations
export async function getAllNotifications() {
  return await db
    .select()
    .from(notifications)
    .orderBy(desc(notifications.createdAt));
}

export async function getNotificationById(id: string) {
  const result = await db
    .select()
    .from(notifications)
    .where(eq(notifications.id, id))
    .limit(1);
  return result[0] || null;
}

export async function getNotificationsByUser(userId: string) {
  return await db
    .select()
    .from(notifications)
    .where(eq(notifications.userId, userId))
    .orderBy(desc(notifications.createdAt));
}

export async function getUnreadNotificationsByUser(userId: string) {
  return await db
    .select()
    .from(notifications)
    .where(
      and(eq(notifications.userId, userId), eq(notifications.status, "unread")),
    )
    .orderBy(desc(notifications.createdAt));
}

export async function getNotificationsByType(
  userId: string,
  type:
    | "booking_confirmed"
    | "booking_cancelled"
    | "booking_reminder"
    | "order_confirmed"
    | "order_shipped"
    | "order_delivered"
    | "payment_success"
    | "payment_failed"
    | "new_product"
    | "sale_announcement"
    | "appointment_reminder"
    | "system_announcement",
) {
  return await db
    .select()
    .from(notifications)
    .where(and(eq(notifications.userId, userId), eq(notifications.type, type)))
    .orderBy(desc(notifications.createdAt));
}

export async function getNotificationsByDateRange(
  userId: string,
  startDate: string,
  endDate: string,
) {
  return await db
    .select()
    .from(notifications)
    .where(
      and(
        eq(notifications.userId, userId),
        gte(notifications.createdAt, new Date(startDate)),
        lte(notifications.createdAt, new Date(endDate)),
      ),
    )
    .orderBy(desc(notifications.createdAt));
}

export async function createNotification(data: {
  userId: string;
  type:
    | "booking_confirmed"
    | "booking_cancelled"
    | "booking_reminder"
    | "order_confirmed"
    | "order_shipped"
    | "order_delivered"
    | "payment_success"
    | "payment_failed"
    | "new_product"
    | "sale_announcement"
    | "appointment_reminder"
    | "system_announcement";
  title: string;
  message: string;
  data?: Record<string, unknown>;
}) {
  const result = await db.insert(notifications).values(data).returning();
  return result[0];
}

export async function markNotificationAsRead(id: string) {
  const result = await db
    .update(notifications)
    .set({ status: "read", readAt: new Date() })
    .where(eq(notifications.id, id))
    .returning();
  return result[0];
}

export async function markAllNotificationsAsRead(userId: string) {
  return await db
    .update(notifications)
    .set({ status: "read", readAt: new Date() })
    .where(
      and(eq(notifications.userId, userId), eq(notifications.status, "unread")),
    )
    .returning();
}

export async function archiveNotification(id: string) {
  const result = await db
    .update(notifications)
    .set({ status: "archived" })
    .where(eq(notifications.id, id))
    .returning();
  return result[0];
}

export async function deleteNotification(id: string) {
  return await db.delete(notifications).where(eq(notifications.id, id));
}

export async function getNotificationCount(userId: string) {
  const result = await db
    .select({ count: notifications.id })
    .from(notifications)
    .where(
      and(eq(notifications.userId, userId), eq(notifications.status, "unread")),
    );
  return result.length;
}

// Notification preferences
export async function getNotificationPreferences(userId: string) {
  const result = await db
    .select()
    .from(notificationPreferences)
    .where(eq(notificationPreferences.userId, userId))
    .limit(1);
  return result[0] || null;
}

export async function createNotificationPreferences(
  userId: string,
  preferences: {
    emailNotifications?: Record<string, boolean>;
    pushNotifications?: Record<string, boolean>;
    smsNotifications?: Record<string, boolean>;
  },
) {
  const result = await db
    .insert(notificationPreferences)
    .values({
      userId,
      ...preferences,
    })
    .returning();
  return result[0];
}

export async function updateNotificationPreferences(
  userId: string,
  preferences: {
    emailNotifications?: Record<string, boolean>;
    pushNotifications?: Record<string, boolean>;
    smsNotifications?: Record<string, boolean>;
  },
) {
  const result = await db
    .update(notificationPreferences)
    .set({ ...preferences, updatedAt: new Date() })
    .where(eq(notificationPreferences.userId, userId))
    .returning();
  return result[0];
}

// Bulk notification operations
export async function createBulkNotifications(
  notificationData: Array<{
    userId: string;
    type:
      | "booking_confirmed"
      | "booking_cancelled"
      | "booking_reminder"
      | "order_confirmed"
      | "order_shipped"
      | "order_delivered"
      | "payment_success"
      | "payment_failed"
      | "new_product"
      | "sale_announcement"
      | "appointment_reminder"
      | "system_announcement";
    title: string;
    message: string;
    data?: Record<string, unknown>;
  }>,
) {
  const result = await db
    .insert(notifications)
    .values(notificationData)
    .returning();
  return result;
}

export async function getNotificationsByStatus(
  userId: string,
  status: "unread" | "read" | "archived",
) {
  return await db
    .select()
    .from(notifications)
    .where(
      and(eq(notifications.userId, userId), eq(notifications.status, status)),
    )
    .orderBy(desc(notifications.createdAt));
}

import {
  archiveNotification,
  createNotification,
  deleteNotification,
  markAllNotificationsAsRead,
  markNotificationAsRead,
} from "@/src/db/queries/notifications";

export type NotificationType =
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

export interface NotificationData {
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  data?: Record<string, unknown>;
}

export interface BookingData {
  serviceName: string;
  date: string;
  time: string;
  [key: string]: unknown;
}

export interface OrderData {
  orderNumber: string;
  [key: string]: unknown;
}

export interface PaymentData {
  amount: string;
  [key: string]: unknown;
}

export interface ProductData {
  category: string;
  name: string;
  [key: string]: unknown;
}

export interface SaleData {
  title: string;
  description: string;
  [key: string]: unknown;
}

export interface AppointmentData {
  serviceName: string;
  [key: string]: unknown;
}

export interface AnnouncementData {
  title: string;
  message: string;
  [key: string]: unknown;
}

// Create a new notification
export async function createNotificationService(data: NotificationData) {
  return await createNotification(data);
}

// Mark notification as read
export async function markNotificationAsReadService(id: string) {
  return await markNotificationAsRead(id);
}

// Mark all notifications as read for a user
export async function markAllNotificationsAsReadService(userId: string) {
  return await markAllNotificationsAsRead(userId);
}

// Archive notification
export async function archiveNotificationService(id: string) {
  return await archiveNotification(id);
}

// Delete notification
export async function deleteNotificationService(id: string) {
  return await deleteNotification(id);
}

// Notification templates for common scenarios
export async function notifyBookingConfirmed(
  userId: string,
  bookingData: BookingData,
) {
  return await createNotificationService({
    userId,
    type: "booking_confirmed",
    title: "Booking Confirmed! 🎉",
    message: `Your appointment for ${bookingData.serviceName} on ${bookingData.date} at ${bookingData.time} has been confirmed.`,
    data: bookingData,
  });
}

export async function notifyBookingCancelled(
  userId: string,
  bookingData: BookingData,
) {
  return await createNotificationService({
    userId,
    type: "booking_cancelled",
    title: "Booking Cancelled",
    message: `Your appointment for ${bookingData.serviceName} on ${bookingData.date} has been cancelled.`,
    data: bookingData,
  });
}

export async function notifyBookingReminder(
  userId: string,
  bookingData: BookingData,
) {
  return await createNotificationService({
    userId,
    type: "booking_reminder",
    title: "Appointment Reminder ⏰",
    message: `Don't forget! You have an appointment for ${bookingData.serviceName} tomorrow at ${bookingData.time}.`,
    data: bookingData,
  });
}

export async function notifyOrderConfirmed(
  userId: string,
  orderData: OrderData,
) {
  return await createNotificationService({
    userId,
    type: "order_confirmed",
    title: "Order Confirmed! 📦",
    message: `Your order #${orderData.orderNumber} has been confirmed and is being processed.`,
    data: orderData,
  });
}

export async function notifyOrderShipped(userId: string, orderData: OrderData) {
  return await createNotificationService({
    userId,
    type: "order_shipped",
    title: "Order Shipped! 🚚",
    message: `Your order #${orderData.orderNumber} has been shipped and is on its way to you.`,
    data: orderData,
  });
}

export async function notifyOrderDelivered(
  userId: string,
  orderData: OrderData,
) {
  return await createNotificationService({
    userId,
    type: "order_delivered",
    title: "Order Delivered! ✅",
    message: `Your order #${orderData.orderNumber} has been delivered. Enjoy your new items!`,
    data: orderData,
  });
}

export async function notifyPaymentSuccess(
  userId: string,
  paymentData: PaymentData,
) {
  return await createNotificationService({
    userId,
    type: "payment_success",
    title: "Payment Successful! 💳",
    message: `Your payment of $${paymentData.amount} has been processed successfully.`,
    data: paymentData,
  });
}

export async function notifyPaymentFailed(
  userId: string,
  paymentData: PaymentData,
) {
  return await createNotificationService({
    userId,
    type: "payment_failed",
    title: "Payment Failed ❌",
    message: `Your payment of $${paymentData.amount} could not be processed. Please try again.`,
    data: paymentData,
  });
}

export async function notifyNewProduct(
  userId: string,
  productData: ProductData,
) {
  return await createNotificationService({
    userId,
    type: "new_product",
    title: "New Product Available! ✨",
    message: `Check out our new ${productData.category}: ${productData.name}`,
    data: productData,
  });
}

export async function notifySaleAnnouncement(
  userId: string,
  saleData: SaleData,
) {
  return await createNotificationService({
    userId,
    type: "sale_announcement",
    title: "Special Sale! 🎉",
    message: `${saleData.title}: ${saleData.description}`,
    data: saleData,
  });
}

export async function notifyAppointmentReminder(
  userId: string,
  appointmentData: AppointmentData,
) {
  return await createNotificationService({
    userId,
    type: "appointment_reminder",
    title: "Appointment Reminder ⏰",
    message: `Reminder: You have an appointment for ${appointmentData.serviceName} in 1 hour.`,
    data: appointmentData,
  });
}

export async function notifySystemAnnouncement(
  userId: string,
  announcementData: AnnouncementData,
) {
  return await createNotificationService({
    userId,
    type: "system_announcement",
    title: announcementData.title,
    message: announcementData.message,
    data: announcementData,
  });
}

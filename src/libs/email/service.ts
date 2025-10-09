"use server";

import { BookingConfirmedEmail } from "../../../emails/booking-confirmed";
import { OrderConfirmedEmail } from "../../../emails/order-confirmed";
import { PasswordResetEmail } from "../../../emails/password-reset";
import { WelcomeEmail } from "../../../emails/welcome";
// Email service - High-level email sending functions
import { sendEmailWithTemplate } from "./brevo";

/**
 * Send booking confirmation email
 */
export async function sendBookingConfirmationEmail(data: {
  to: string;
  customerName: string;
  serviceName: string;
  bookingDate: string;
  bookingTime: string;
  bookingId: string;
}) {
  return await sendEmailWithTemplate(
    data.to,
    `Booking Confirmed: ${data.serviceName}`,
    BookingConfirmedEmail({
      customerName: data.customerName,
      serviceName: data.serviceName,
      bookingDate: data.bookingDate,
      bookingTime: data.bookingTime,
      bookingId: data.bookingId,
    }),
  );
}

/**
 * Send order confirmation email
 */
export async function sendOrderConfirmationEmail(data: {
  to: string;
  customerName: string;
  orderNumber: string;
  orderDate: string;
  items: Array<{
    name: string;
    quantity: number;
    price: string;
  }>;
  subtotal: string;
  total: string;
  shippingAddress?: string;
}) {
  return await sendEmailWithTemplate(
    data.to,
    `Order Confirmed: #${data.orderNumber}`,
    OrderConfirmedEmail({
      customerName: data.customerName,
      orderNumber: data.orderNumber,
      orderDate: data.orderDate,
      items: data.items,
      subtotal: data.subtotal,
      total: data.total,
      shippingAddress: data.shippingAddress,
    }),
  );
}

/**
 * Send password reset email
 */
export async function sendPasswordResetEmail(data: {
  to: string;
  resetLink: string;
  expiresIn?: string;
}) {
  return await sendEmailWithTemplate(
    data.to,
    "Reset Your Password - Naomi Luxe",
    PasswordResetEmail({
      resetLink: data.resetLink,
      expiresIn: data.expiresIn,
    }),
  );
}

/**
 * Send welcome email
 */
export async function sendWelcomeEmail(data: {
  to: string;
  customerName: string;
}) {
  return await sendEmailWithTemplate(
    data.to,
    "Welcome to Naomi Luxe! ✨",
    WelcomeEmail({
      customerName: data.customerName,
    }),
  );
}

/**
 * Send booking reminder email
 */
export async function sendBookingReminderEmail(data: {
  to: string;
  customerName: string;
  serviceName: string;
  bookingDate: string;
  bookingTime: string;
}) {
  return await sendEmailWithTemplate(
    data.to,
    `Reminder: Your ${data.serviceName} appointment tomorrow`,
    BookingConfirmedEmail({
      customerName: data.customerName,
      serviceName: data.serviceName,
      bookingDate: data.bookingDate,
      bookingTime: data.bookingTime,
      bookingId: "",
    }),
  );
}

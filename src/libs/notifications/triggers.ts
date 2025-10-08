import { eq } from "drizzle-orm";
import { db } from "@/src/db";
import { bookings, orders, products } from "@/src/db/schema";
import {
  notifyBookingConfirmed,
  notifyNewProduct,
  notifyOrderConfirmed,
} from "./service";

// Database triggers for automatic notifications
export async function setupBookingNotificationTriggers() {
  // This would typically be set up as database triggers in PostgreSQL
  // For now, we'll create functions that can be called when events occur

  return {
    onBookingCreated: async (bookingId: string) => {
      // Get booking details
      const booking = await db
        .select()
        .from(bookings)
        .where(eq(bookings.id, bookingId))
        .limit(1);

      if (booking[0]) {
        // Send confirmation notification
        await notifyBookingConfirmed(booking[0].userId, {
          serviceName: "Service", // You'd get this from the service table
          date: booking[0].bookingDate,
          time: booking[0].bookingTime,
        });
      }
    },

    onOrderCreated: async (orderId: string) => {
      // Get order details
      const order = await db
        .select()
        .from(orders)
        .where(eq(orders.id, orderId))
        .limit(1);

      if (order[0]) {
        // Send confirmation notification
        await notifyOrderConfirmed(order[0].userId, {
          orderNumber: order[0].id,
        });
      }
    },

    onProductCreated: async (productId: string) => {
      // Get product details
      const product = await db
        .select()
        .from(products)
        .where(eq(products.id, productId))
        .limit(1);

      if (product[0]) {
        // Notify all users about new product (you'd need to get user list)
        // For now, this is a placeholder
        await notifyNewProduct("user-id", {
          category: product[0].category,
          name: product[0].name,
        });
      }
    },
  };
}

// Utility function to set up database triggers
export async function initializeNotificationTriggers() {
  const triggers = await setupBookingNotificationTriggers();
  return triggers;
}

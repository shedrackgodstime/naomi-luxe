import { relations } from "drizzle-orm";
import {
  date,
  integer,
  jsonb,
  numeric,
  pgEnum,
  pgTable,
  text,
  time,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

// Enums
export const productCategoryEnum = pgEnum("product_category", [
  "shoes",
  "clothes",
  "accessories",
]);
export const paymentStatusEnum = pgEnum("payment_status", [
  "pending",
  "paid",
  "failed",
  "refunded",
]);
export const bookingStatusEnum = pgEnum("booking_status", [
  "pending",
  "confirmed",
  "canceled",
  "completed",
]);
export const homepageSectionEnum = pgEnum("homepage_section", [
  "hero",
  "banner",
  "newsletter",
]);
export const notificationTypeEnum = pgEnum("notification_type", [
  "booking_confirmed",
  "booking_cancelled",
  "booking_reminder",
  "order_confirmed",
  "order_shipped",
  "order_delivered",
  "payment_success",
  "payment_failed",
  "new_product",
  "sale_announcement",
  "appointment_reminder",
  "system_announcement",
]);
export const notificationStatusEnum = pgEnum("notification_status", [
  "unread",
  "read",
  "archived",
]);

// Products table
export const products = pgTable("products", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  description: text("description"),
  price: numeric("price", { precision: 10, scale: 2 }).notNull(),
  category: productCategoryEnum("category").notNull(),
  stock: integer("stock").notNull().default(0),
  images: text("images").array(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

// Orders table
export const orders = pgTable("orders", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").notNull(), // References auth.users.id
  totalAmount: numeric("total_amount", { precision: 10, scale: 2 }).notNull(),
  paymentStatus: paymentStatusEnum("payment_status")
    .notNull()
    .default("pending"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

// Order items table
export const orderItems = pgTable("order_items", {
  id: uuid("id").primaryKey().defaultRandom(),
  orderId: uuid("order_id")
    .notNull()
    .references(() => orders.id, { onDelete: "cascade" }),
  productId: uuid("product_id")
    .notNull()
    .references(() => products.id, { onDelete: "cascade" }),
  quantity: integer("quantity").notNull(),
  unitPrice: numeric("unit_price", { precision: 10, scale: 2 }).notNull(),
});

// Services table
export const services = pgTable("services", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  description: text("description"),
  price: numeric("price", { precision: 10, scale: 2 }).notNull(),
  duration: integer("duration").notNull(), // in minutes
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

// Bookings table
export const bookings = pgTable("bookings", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").notNull(), // References auth.users.id
  serviceId: uuid("service_id")
    .notNull()
    .references(() => services.id, { onDelete: "cascade" }),
  bookingDate: date("booking_date").notNull(),
  bookingTime: time("booking_time").notNull(),
  status: bookingStatusEnum("status").notNull().default("pending"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

// Gallery table
export const gallery = pgTable("gallery", {
  id: uuid("id").primaryKey().defaultRandom(),
  imageUrl: text("image_url").notNull(),
  title: text("title").notNull(),
  description: text("description"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

// Testimonials table
export const testimonials = pgTable("testimonials", {
  id: uuid("id").primaryKey().defaultRandom(),
  author: text("author").notNull(),
  text: text("text").notNull(),
  rating: integer("rating").notNull(), // 1-5
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

// Homepage content table
export const homepageContent = pgTable("homepage_content", {
  id: uuid("id").primaryKey().defaultRandom(),
  section: homepageSectionEnum("section").notNull(),
  title: text("title").notNull(),
  content: jsonb("content"), // Flexible content structure
  imageUrl: text("image_url"),
});

// Notifications table
export const notifications = pgTable("notifications", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").notNull(), // References auth.users.id
  type: notificationTypeEnum("type").notNull(),
  title: text("title").notNull(),
  message: text("message").notNull(),
  data: jsonb("data"), // Additional notification data
  status: notificationStatusEnum("status").notNull().default("unread"),
  readAt: timestamp("read_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

// Notification preferences table
export const notificationPreferences = pgTable("notification_preferences", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").notNull(), // References auth.users.id
  emailNotifications: jsonb("email_notifications")
    .notNull()
    .default(
      '{"booking_updates": true, "order_updates": true, "promotions": true, "reminders": true}',
    ),
  pushNotifications: jsonb("push_notifications")
    .notNull()
    .default(
      '{"booking_updates": true, "order_updates": true, "promotions": false, "reminders": true}',
    ),
  smsNotifications: jsonb("sms_notifications")
    .notNull()
    .default(
      '{"booking_updates": false, "order_updates": false, "promotions": false, "reminders": true}',
    ),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

// Relations
export const ordersRelations = relations(orders, ({ many }) => ({
  orderItems: many(orderItems),
}));

export const orderItemsRelations = relations(orderItems, ({ one }) => ({
  order: one(orders, {
    fields: [orderItems.orderId],
    references: [orders.id],
  }),
  product: one(products, {
    fields: [orderItems.productId],
    references: [products.id],
  }),
}));

export const productsRelations = relations(products, ({ many }) => ({
  orderItems: many(orderItems),
}));

export const servicesRelations = relations(services, ({ many }) => ({
  bookings: many(bookings),
}));

export const bookingsRelations = relations(bookings, ({ one }) => ({
  service: one(services, {
    fields: [bookings.serviceId],
    references: [services.id],
  }),
}));

export const notificationsRelations = relations(notifications, () => ({
  // Notifications are linked to users via userId
}));

export const notificationPreferencesRelations = relations(
  notificationPreferences,
  () => ({
    // Notification preferences are linked to users via userId
  }),
);

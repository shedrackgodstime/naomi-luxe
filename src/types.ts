// src/types.ts

export type UserMetadata = {
  fullName: string;
  avatarUrl?: string;
  role: "user" | "admin";
  preferences?: {
    notifications?: boolean;
    newsletter?: boolean;
  };
};

// Database types
export type Product = {
  id: string;
  name: string;
  description: string | null;
  price: string;
  category: "shoes" | "clothes" | "accessories";
  stock: number;
  images: string[] | null;
  createdAt: Date;
};

export type Service = {
  id: string;
  name: string;
  description: string | null;
  price: string;
  duration: number;
  createdAt: Date;
};

export type Booking = {
  id: string;
  userId: string;
  serviceId: string;
  bookingDate: string;
  bookingTime: string;
  status: "pending" | "confirmed" | "canceled" | "completed";
  createdAt: Date;
};

export type Order = {
  id: string;
  userId: string;
  totalAmount: string;
  paymentStatus: "pending" | "paid" | "failed" | "refunded";
  createdAt: Date;
};

export type OrderItem = {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  unitPrice: string;
};

export type GalleryItem = {
  id: string;
  imageUrl: string;
  title: string;
  description: string | null;
  createdAt: Date;
};

export type Testimonial = {
  id: string;
  author: string;
  text: string;
  rating: number;
  createdAt: Date;
};

export type HomepageContent = {
  id: string;
  section: "hero" | "banner" | "newsletter";
  title: string;
  content: Record<string, unknown>;
  imageUrl: string | null;
};

export type Notification = {
  id: string;
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
  status: "unread" | "read" | "archived";
  readAt?: string;
  createdAt: string;
};

export type NotificationPreferences = {
  id: string;
  userId: string;
  emailNotifications: {
    booking_updates: boolean;
    order_updates: boolean;
    promotions: boolean;
    reminders: boolean;
  };
  pushNotifications: {
    booking_updates: boolean;
    order_updates: boolean;
    promotions: boolean;
    reminders: boolean;
  };
  smsNotifications: {
    booking_updates: boolean;
    order_updates: boolean;
    promotions: boolean;
    reminders: boolean;
  };
  createdAt: string;
  updatedAt: string;
};

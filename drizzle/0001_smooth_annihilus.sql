CREATE TYPE "public"."notification_status" AS ENUM('unread', 'read', 'archived');--> statement-breakpoint
CREATE TYPE "public"."notification_type" AS ENUM('booking_confirmed', 'booking_cancelled', 'booking_reminder', 'order_confirmed', 'order_shipped', 'order_delivered', 'payment_success', 'payment_failed', 'new_product', 'sale_announcement', 'appointment_reminder', 'system_announcement');--> statement-breakpoint
CREATE TABLE "notification_preferences" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"email_notifications" jsonb DEFAULT '{"booking_updates": true, "order_updates": true, "promotions": true, "reminders": true}' NOT NULL,
	"push_notifications" jsonb DEFAULT '{"booking_updates": true, "order_updates": true, "promotions": false, "reminders": true}' NOT NULL,
	"sms_notifications" jsonb DEFAULT '{"booking_updates": false, "order_updates": false, "promotions": false, "reminders": true}' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "notifications" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"type" "notification_type" NOT NULL,
	"title" text NOT NULL,
	"message" text NOT NULL,
	"data" jsonb,
	"status" "notification_status" DEFAULT 'unread' NOT NULL,
	"read_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);

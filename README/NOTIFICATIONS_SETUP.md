# 🔔 Notification System Setup Guide

This guide explains the comprehensive notification system implemented for Naomi Luxe using Supabase real-time features.

## 📋 What's Been Implemented

### ✅ **Database Schema**
- **`notifications`** table with full CRUD operations
- **`notification_preferences`** table for user preferences
- **Real-time subscriptions** for instant updates
- **Type-safe** notification system

### ✅ **Notification Types**
- **Booking**: Confirmed, Cancelled, Reminders
- **Orders**: Confirmed, Shipped, Delivered
- **Payments**: Success, Failed
- **Products**: New products, Sales
- **System**: Announcements, Reminders

### ✅ **Components**
- **NotificationBell** - Real-time notification indicator
- **NotificationDropdown** - Full notification management
- **NotificationPreferences** - User preference settings

### ✅ **Real-time Features**
- **Live updates** when notifications are created
- **Instant status changes** (read/unread/archived)
- **Connection status** indicators
- **Automatic UI updates**

## 🗄️ Database Schema

### Notifications Table
```sql
CREATE TABLE notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  type notification_type NOT NULL,
  title text NOT NULL,
  message text NOT NULL,
  data jsonb,
  status notification_status DEFAULT 'unread',
  read_at timestamp with time zone,
  created_at timestamp with time zone DEFAULT now()
);
```

### Notification Preferences Table
```sql
CREATE TABLE notification_preferences (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  email_notifications jsonb DEFAULT '{"booking_updates": true, "order_updates": true, "promotions": true, "reminders": true}',
  push_notifications jsonb DEFAULT '{"booking_updates": true, "order_updates": true, "promotions": false, "reminders": true}',
  sms_notifications jsonb DEFAULT '{"booking_updates": false, "order_updates": false, "promotions": false, "reminders": true}',
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);
```

## 🚀 Usage Examples

### 1. Real-time Notifications Hook
```typescript
import { useNotifications } from "@/src/libs/notifications/realtime";

function MyComponent({ userId }: { userId: string }) {
  const { notifications, unreadCount, isConnected } = useNotifications(userId);
  
  return (
    <div>
      <p>Unread notifications: {unreadCount}</p>
      <p>Connection status: {isConnected ? "Connected" : "Disconnected"}</p>
    </div>
  );
}
```

### 2. Notification Bell Component
```typescript
import { NotificationBell } from "@/src/components/notifications/NotificationBell";

function Header({ userId }: { userId: string }) {
  return (
    <header>
      <NotificationBell userId={userId} />
    </header>
  );
}
```

### 3. Sending Notifications
```typescript
import { NotificationService } from "@/src/libs/notifications/service";

// Send booking confirmation
await NotificationService.notifyBookingConfirmed(userId, {
  serviceName: "Hair Cut",
  date: "2024-01-15",
  time: "14:30"
});

// Send order confirmation
await NotificationService.notifyOrderConfirmed(userId, {
  orderNumber: "ORD-123",
  totalAmount: 299.99
});
```

### 4. Notification Preferences
```typescript
import { NotificationPreferences } from "@/src/components/notifications/NotificationPreferences";

function SettingsPage({ userId }: { userId: string }) {
  return <NotificationPreferences userId={userId} />;
}
```

## 🔧 Real-time Setup

### Supabase Real-time Configuration
1. **Enable Row Level Security (RLS)** on notifications table
2. **Create policies** for user access
3. **Set up real-time subscriptions** in components

### RLS Policies Example
```sql
-- Users can only see their own notifications
CREATE POLICY "Users can view own notifications" ON notifications
  FOR SELECT USING (auth.uid() = user_id);

-- Users can insert their own notifications
CREATE POLICY "Users can insert own notifications" ON notifications
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can update their own notifications
CREATE POLICY "Users can update own notifications" ON notifications
  FOR UPDATE USING (auth.uid() = user_id);
```

## 📱 Notification Types & Templates

### Booking Notifications
- **Confirmed**: "Your appointment for [service] on [date] at [time] has been confirmed."
- **Cancelled**: "Your appointment for [service] on [date] has been cancelled."
- **Reminder**: "Don't forget! You have an appointment for [service] tomorrow at [time]."

### Order Notifications
- **Confirmed**: "Your order #[number] has been confirmed and is being processed."
- **Shipped**: "Your order #[number] has been shipped and is on its way."
- **Delivered**: "Your order #[number] has been delivered. Enjoy your new items!"

### Payment Notifications
- **Success**: "Your payment of $[amount] has been processed successfully."
- **Failed**: "Your payment of $[amount] could not be processed. Please try again."

## 🎨 UI Components

### NotificationBell
- Real-time unread count
- Connection status indicator
- Click to open dropdown

### NotificationDropdown
- List of notifications with icons
- Mark as read/archive/delete actions
- Time formatting (e.g., "2h ago")
- Color-coded by notification type

### NotificationPreferences
- Email, Push, SMS preferences
- Granular control per notification type
- Save/load user preferences

## 🔄 Real-time Events

### Subscription Setup
```typescript
const channel = supabase
  .channel(`notifications:${userId}`)
  .on('postgres_changes', {
    event: '*',
    schema: 'public',
    table: 'notifications',
    filter: `user_id=eq.${userId}`
  }, (payload) => {
    // Handle real-time updates
  })
  .subscribe();
```

### Event Types
- **INSERT**: New notification created
- **UPDATE**: Notification status changed
- **DELETE**: Notification removed

## 🚀 Advanced Features

### 1. Notification Triggers
Automatic notifications based on database events:
- Booking created → Confirmation notification
- Order created → Order confirmation
- Payment processed → Payment notification

### 2. Bulk Notifications
Send notifications to multiple users:
```typescript
await NotificationService.createBulkNotifications([
  { userId: "user1", type: "sale_announcement", title: "Sale!", message: "50% off everything!" },
  { userId: "user2", type: "sale_announcement", title: "Sale!", message: "50% off everything!" }
]);
```

### 3. Scheduled Notifications
- Appointment reminders (24h before)
- Payment reminders
- Marketing campaigns

## 📊 Analytics & Monitoring

### Notification Metrics
- Total notifications sent
- Read/unread rates
- User engagement
- Notification preferences

### Real-time Monitoring
- Connection status
- Failed deliveries
- User activity

## 🔒 Security & Privacy

### Data Protection
- User data isolation via RLS
- Secure notification delivery
- Preference-based filtering

### Access Control
- Users can only see their notifications
- Admin access for system notifications
- Granular permission controls

## 🚀 Next Steps

1. **Set up Supabase project** with real-time enabled
2. **Configure RLS policies** for notifications
3. **Test real-time subscriptions** in development
4. **Implement notification triggers** for automatic sending
5. **Add email/SMS integrations** for external notifications

## 📚 Resources

- [Supabase Real-time Documentation](https://supabase.com/docs/guides/realtime)
- [PostgreSQL Triggers](https://www.postgresql.org/docs/current/triggers.html)
- [Row Level Security](https://www.postgresql.org/docs/current/ddl-rowsecurity.html)

The notification system is now ready for development with full real-time capabilities!

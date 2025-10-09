# Email Module - Quick Reference

## Import Email Functions

```typescript
import {
  // High-level functions
  sendBookingConfirmationEmail,
  sendOrderConfirmationEmail,
  sendPasswordResetEmail,
  sendWelcomeEmail,
  sendBookingReminderEmail,
  
  // Low-level functions
  sendEmail,
  sendEmailWithTemplate,
  sendBulkEmail,
} from "@/src/libs/email";
```

## Quick Examples

### Send Booking Confirmation
```typescript
await sendBookingConfirmationEmail({
  to: "customer@example.com",
  customerName: "John Doe",
  serviceName: "Hair Styling",
  bookingDate: "Jan 15, 2024",
  bookingTime: "2:30 PM",
  bookingId: "booking-123",
});
```

### Send Order Confirmation
```typescript
await sendOrderConfirmationEmail({
  to: "customer@example.com",
  customerName: "Jane Doe",
  orderNumber: "ORD-12345",
  orderDate: "Jan 10, 2024",
  items: [
    { name: "Shoes", quantity: 1, price: "₦45,000" },
  ],
  subtotal: "₦45,000",
  total: "₦45,000",
});
```

### Send Welcome Email
```typescript
await sendWelcomeEmail({
  to: "newuser@example.com",
  customerName: "John Doe",
});
```

### Send Password Reset
```typescript
await sendPasswordResetEmail({
  to: "user@example.com",
  resetLink: "https://naomi-luxe.com/reset?token=abc",
  expiresIn: "1 hour",
});
```

## Email Templates

All templates are in `/emails/` directory:
- `booking-confirmed.tsx`
- `booking-reminder.tsx`
- `order-confirmed.tsx`
- `order-shipped.tsx`
- `password-reset.tsx`
- `welcome.tsx`

## Preview Emails

```bash
npm run email:dev
```

Opens preview at `http://localhost:3000`

## Environment Variables

```env
BREVO_API_KEY=your_api_key
EMAIL_FROM=noreply@naomi-luxe.com
EMAIL_FROM_NAME=Naomi Luxe
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## See Full Documentation

📖 [README/EMAIL_SETUP.md](../../../README/EMAIL_SETUP.md)

# 📧 Email System Setup Guide

Complete email system using **React Email** for templates and **Brevo API** for sending.

## 📋 What's Been Implemented

### ✅ Email Templates (React Email)
- **Booking Confirmed** - Appointment confirmation
- **Booking Reminder** - 24h before appointment
- **Order Confirmed** - Purchase confirmation with items
- **Order Shipped** - Shipping notification with tracking
- **Password Reset** - Secure password reset link
- **Welcome** - New user welcome email

### ✅ Email Service Layer
- **Brevo API integration** - Reliable email delivery
- **Template rendering** - React components to HTML
- **Bulk email support** - Send to multiple recipients
- **Error handling** - Graceful failure handling

### ✅ Automatic Email Triggers
- **Sign up** → Welcome email
- **Create booking** → Booking confirmation
- **Create order** → Order confirmation
- **Password reset** → Reset link email

### ✅ Brand Styling
- Luxury gold & black color scheme
- Responsive email design
- Professional layout with header/footer
- Mobile-friendly templates

---

## 📁 File Structure

```
emails/
├── components/
│   └── layout.tsx           # Shared email layout
├── booking-confirmed.tsx    # Booking confirmation
├── booking-reminder.tsx     # Appointment reminder
├── order-confirmed.tsx      # Order confirmation
├── order-shipped.tsx        # Shipping notification
├── password-reset.tsx       # Password reset
└── welcome.tsx              # Welcome email

src/libs/email/
├── brevo.ts                 # Brevo API client
├── service.ts               # High-level email functions
└── index.ts                 # Main exports
```

---

## 🚀 Usage Examples

### 1. Send Booking Confirmation

```typescript
import { sendBookingConfirmationEmail } from "@/src/libs/email";

await sendBookingConfirmationEmail({
  to: "customer@example.com",
  customerName: "John Doe",
  serviceName: "Hair Cut & Styling",
  bookingDate: "January 15, 2024",
  bookingTime: "2:30 PM",
  bookingId: "booking-123",
});
```

### 2. Send Order Confirmation

```typescript
import { sendOrderConfirmationEmail } from "@/src/libs/email";

await sendOrderConfirmationEmail({
  to: "customer@example.com",
  customerName: "Jane Doe",
  orderNumber: "ORD-12345",
  orderDate: "January 10, 2024",
  items: [
    { name: "Designer Shoes", quantity: 1, price: "₦45,000" },
    { name: "Handbag", quantity: 1, price: "₦30,000" },
  ],
  subtotal: "₦75,000",
  total: "₦75,000",
  shippingAddress: "123 Main St, Lagos, Nigeria",
});
```

### 3. Send Welcome Email

```typescript
import { sendWelcomeEmail } from "@/src/libs/email";

await sendWelcomeEmail({
  to: "newuser@example.com",
  customerName: "John Doe",
});
```

### 4. Send Password Reset

```typescript
import { sendPasswordResetEmail } from "@/src/libs/email";

await sendPasswordResetEmail({
  to: "user@example.com",
  resetLink: "https://naomi-luxe.com/auth/reset?token=abc123",
  expiresIn: "1 hour",
});
```

### 5. Send Booking Reminder

```typescript
import { sendBookingReminderEmail } from "@/src/libs/email";

await sendBookingReminderEmail({
  to: "customer@example.com",
  customerName: "John Doe",
  serviceName: "Hair Cut",
  bookingDate: "Tomorrow",
  bookingTime: "2:30 PM",
});
```

---

## 🎨 Email Templates

### Booking Confirmed Template

Features:
- Booking details (service, date, time, ID)
- View booking button
- Cancellation policy
- Professional styling

### Order Confirmed Template

Features:
- Order number and date
- Itemized list with quantities and prices
- Subtotal and total
- Shipping address
- Track order button

### Welcome Email Template

Features:
- Personalized greeting
- Platform benefits list
- Call-to-action button
- Brand introduction

### Password Reset Template

Features:
- Reset password button
- Expiration time
- Security notice
- Clear instructions

---

## 🔧 Brevo API Setup

### 1. Create Brevo Account

1. Go to [Brevo.com](https://www.brevo.com) (formerly Sendinblue)
2. Sign up for free account (300 emails/day free tier)
3. Verify your email

### 2. Get API Key

1. Go to **Settings → API Keys**
2. Create new API key
3. Copy the key

### 3. Configure Environment

Add to `.env.local`:

```env
BREVO_API_KEY=your_brevo_api_key_here
EMAIL_FROM=noreply@naomi-luxe.com
EMAIL_FROM_NAME=Naomi Luxe
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 4. Verify Sender Domain (Production)

For production:
1. Go to **Senders & IP → Domains**
2. Add your domain (naomi-luxe.com)
3. Add DNS records (SPF, DKIM, DMARC)
4. Verify domain

---

## 📧 Email Preview & Testing

### Preview Emails in Development

Run the email dev server:

```bash
npm run email:dev
```

This opens a browser at `http://localhost:3000` where you can:
- Preview all email templates
- Test with different data
- Check responsive design
- Copy HTML output

### Test Email Sending

Create a test file:

```typescript
// test-email.ts
import { sendWelcomeEmail } from "@/src/libs/email";

async function testEmail() {
  const result = await sendWelcomeEmail({
    to: "your-email@example.com",
    customerName: "Test User",
  });

  console.log(result);
}

testEmail();
```

Run with:
```bash
npx tsx test-email.ts
```

---

## 🔄 Automatic Email Triggers

Emails are automatically sent when:

### Sign Up
```typescript
// In signUpAction
await sendWelcomeEmail({
  to: user.email,
  customerName: user.fullName,
});
```

### Create Booking
```typescript
// In createBookingAction
await sendBookingConfirmationEmail({
  to: user.email,
  customerName: user.fullName,
  serviceName: service.name,
  bookingDate: data.bookingDate,
  bookingTime: data.bookingTime,
  bookingId: booking.id,
});
```

### Create Order
```typescript
// In createOrderAction
await sendOrderConfirmationEmail({
  to: user.email,
  customerName: user.fullName,
  orderNumber: order.id,
  orderDate: new Date().toLocaleDateString(),
  items: orderItems,
  subtotal: total,
  total: total,
});
```

---

## 🎯 Advanced Features

### Send Custom Email

```typescript
import { sendEmail } from "@/src/libs/email";

await sendEmail({
  to: "customer@example.com",
  subject: "Custom Subject",
  html: "<h1>Custom HTML</h1>",
  text: "Plain text version",
});
```

### Send Bulk Email

```typescript
import { sendBulkEmail } from "@/src/libs/email";

await sendBulkEmail(
  [
    { email: "user1@example.com", name: "User 1" },
    { email: "user2@example.com", name: "User 2" },
  ],
  "Newsletter Subject",
  "<h1>Newsletter Content</h1>",
  "Plain text version"
);
```

### Send with Custom Template

```typescript
import { sendEmailWithTemplate } from "@/src/libs/email";
import { MyCustomEmail } from "@/emails/my-custom-email";

await sendEmailWithTemplate(
  "customer@example.com",
  "Subject",
  MyCustomEmail({ prop1: "value1" })
);
```

---

## 🎨 Creating New Email Templates

### 1. Create Template File

```typescript
// emails/my-template.tsx
import * as React from "react";
import { Text, Button } from "@react-email/components";
import { EmailLayout } from "./components/layout";

interface MyTemplateProps {
  name: string;
  message: string;
}

export function MyTemplate({ name, message }: MyTemplateProps) {
  return (
    <EmailLayout previewText="Preview text here">
      <Text style={heading}>Hello {name}!</Text>
      <Text style={paragraph}>{message}</Text>
      <Button href="https://naomi-luxe.com">
        Visit Website
      </Button>
    </EmailLayout>
  );
}

const heading = {
  fontSize: "24px",
  fontWeight: "bold",
  color: "#000000",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "24px",
  color: "#333333",
};

export default MyTemplate;
```

### 2. Add to Email Service

```typescript
// src/libs/email/service.ts
import { MyTemplate } from "../../../emails/my-template";

export async function sendMyEmail(data: {
  to: string;
  name: string;
  message: string;
}) {
  return await sendEmailWithTemplate(
    data.to,
    "Email Subject",
    MyTemplate({
      name: data.name,
      message: data.message,
    })
  );
}
```

### 3. Export from Index

```typescript
// src/libs/email/index.ts
export { sendMyEmail } from "./service";
```

---

## 📊 Email Components Available

From `@react-email/components`:

- **Html** - Root HTML element
- **Head** - Email head section
- **Body** - Email body
- **Container** - Content container
- **Section** - Content section
- **Row** - Flex row
- **Column** - Flex column
- **Text** - Paragraph text
- **Heading** - Heading element
- **Button** - Call-to-action button
- **Link** - Hyperlink
- **Img** - Image element
- **Hr** - Horizontal rule
- **Preview** - Preview text

---

## 🔒 Security Best Practices

### 1. Never Expose API Key

```typescript
// ✅ Good - Server-side only
const apiKey = process.env.BREVO_API_KEY;

// ❌ Bad - Never do this
const apiKey = "xkeysib-abc123...";
```

### 2. Validate Email Addresses

```typescript
function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
```

### 3. Rate Limiting

Implement rate limiting for email sending to prevent abuse.

### 4. Unsubscribe Links

For marketing emails, always include unsubscribe links:

```typescript
<Link href={`${siteUrl}/unsubscribe?email=${email}`}>
  Unsubscribe
</Link>
```

---

## 📈 Brevo Features

### Free Tier
- 300 emails/day
- Unlimited contacts
- Email templates
- Real-time statistics

### Paid Plans
- Higher sending limits
- Advanced segmentation
- Marketing automation
- SMS campaigns

### Dashboard Features
- Email statistics
- Delivery reports
- Bounce management
- Contact management

---

## 🐛 Troubleshooting

### Email Not Sending

1. Check API key is correct
2. Verify sender email is configured in Brevo
3. Check Brevo dashboard for errors
4. Verify email address format

### Email in Spam

1. Verify sender domain (SPF, DKIM, DMARC)
2. Use professional content
3. Avoid spam trigger words
4. Include unsubscribe link

### Template Not Rendering

1. Check React Email syntax
2. Verify all imports
3. Test with `npm run email:dev`
4. Check console for errors

---

## 🚀 Next Steps

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Configure Brevo**
   - Create account
   - Get API key
   - Add to `.env.local`

3. **Test emails**
   ```bash
   npm run email:dev
   ```

4. **Verify sender domain** (production)

5. **Monitor delivery** in Brevo dashboard

---

## 📚 Resources

- [React Email Documentation](https://react.email/docs/introduction)
- [Brevo API Documentation](https://developers.brevo.com/)
- [Email Best Practices](https://www.brevo.com/blog/email-best-practices/)

---

**Email system is now fully functional! 📧✨**

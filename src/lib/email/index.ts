// Email module - Main exports

// Brevo API functions
export { sendBulkEmail, sendEmail, sendEmailWithTemplate } from "./brevo";

// High-level email service functions
export {
  sendBookingConfirmationEmail,
  sendBookingReminderEmail,
  sendOrderConfirmationEmail,
  sendPasswordResetEmail,
  sendWelcomeEmail,
} from "./service";

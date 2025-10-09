import { Button, Section, Text } from "@react-email/components";
import { EmailLayout } from "./components/layout";

interface BookingReminderEmailProps {
  customerName: string;
  serviceName: string;
  bookingDate: string;
  bookingTime: string;
  bookingId: string;
}

export function BookingReminderEmail({
  customerName,
  serviceName,
  bookingDate,
  bookingTime,
  bookingId,
}: BookingReminderEmailProps) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://naomi-luxe.com";

  return (
    <EmailLayout previewText={`Reminder: ${serviceName} appointment tomorrow`}>
      <Text style={heading}>Appointment Reminder ⏰</Text>

      <Text style={paragraph}>Hi {customerName},</Text>

      <Text style={paragraph}>
        This is a friendly reminder about your upcoming appointment at Naomi
        Luxe!
      </Text>

      <Section style={detailsBox}>
        <Text style={detailsTitle}>Appointment Details</Text>
        <Text style={detailsRow}>
          <strong>Service:</strong> {serviceName}
        </Text>
        <Text style={detailsRow}>
          <strong>Date:</strong> {bookingDate}
        </Text>
        <Text style={detailsRow}>
          <strong>Time:</strong> {bookingTime}
        </Text>
      </Section>

      <Text style={paragraph}>
        <strong>Important reminders:</strong>
      </Text>

      <ul style={list}>
        <li style={listItem}>Please arrive 10 minutes early</li>
        <li style={listItem}>Bring any relevant items for your service</li>
        <li style={listItem}>
          To reschedule, contact us at least 24 hours in advance
        </li>
      </ul>

      <Section style={buttonContainer}>
        <Button style={button} href={`${siteUrl}/bookings/${bookingId}`}>
          View Booking
        </Button>
      </Section>

      <Text style={paragraph}>
        We look forward to seeing you!
        <br />
        <strong>The Naomi Luxe Team</strong>
      </Text>
    </EmailLayout>
  );
}

// Styles
const heading = {
  fontSize: "24px",
  fontWeight: "bold",
  color: "#000000",
  margin: "0 0 20px",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "24px",
  color: "#333333",
  margin: "0 0 16px",
};

const detailsBox = {
  backgroundColor: "#f8f8f8",
  borderRadius: "8px",
  padding: "20px",
  margin: "20px 0",
};

const detailsTitle = {
  fontSize: "18px",
  fontWeight: "bold",
  color: "#000000",
  margin: "0 0 12px",
};

const detailsRow = {
  fontSize: "14px",
  lineHeight: "20px",
  color: "#333333",
  margin: "8px 0",
};

const list = {
  fontSize: "16px",
  lineHeight: "24px",
  color: "#333333",
  margin: "0 0 16px",
  paddingLeft: "20px",
};

const listItem = {
  margin: "8px 0",
};

const buttonContainer = {
  textAlign: "center" as const,
  margin: "24px 0",
};

const button = {
  backgroundColor: "#d4af37",
  borderRadius: "4px",
  color: "#000000",
  fontSize: "16px",
  fontWeight: "bold",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "inline-block",
  padding: "12px 32px",
};

export default BookingReminderEmail;

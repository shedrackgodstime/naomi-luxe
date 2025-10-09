import { Button, Section, Text } from "@react-email/components";
import { EmailLayout } from "./components/layout";

interface BookingConfirmedEmailProps {
  customerName: string;
  serviceName: string;
  bookingDate: string;
  bookingTime: string;
  bookingId: string;
}

export function BookingConfirmedEmail({
  customerName,
  serviceName,
  bookingDate,
  bookingTime,
  bookingId,
}: BookingConfirmedEmailProps) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://naomi-luxe.com";

  return (
    <EmailLayout previewText={`Your booking for ${serviceName} is confirmed!`}>
      <Text style={heading}>Booking Confirmed! 🎉</Text>

      <Text style={paragraph}>Hi {customerName},</Text>

      <Text style={paragraph}>
        Great news! Your booking has been confirmed. We're excited to see you!
      </Text>

      <Section style={detailsBox}>
        <Text style={detailsTitle}>Booking Details</Text>
        <Text style={detailsRow}>
          <strong>Service:</strong> {serviceName}
        </Text>
        <Text style={detailsRow}>
          <strong>Date:</strong> {bookingDate}
        </Text>
        <Text style={detailsRow}>
          <strong>Time:</strong> {bookingTime}
        </Text>
        <Text style={detailsRow}>
          <strong>Booking ID:</strong> {bookingId}
        </Text>
      </Section>

      <Section style={buttonContainer}>
        <Button style={button} href={`${siteUrl}/bookings/${bookingId}`}>
          View Booking Details
        </Button>
      </Section>

      <Text style={paragraph}>
        Please arrive 10 minutes before your appointment time. If you need to
        reschedule or cancel, please contact us at least 24 hours in advance.
      </Text>

      <Text style={paragraph}>
        Looking forward to pampering you!
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

export default BookingConfirmedEmail;

import { Button, Section, Text } from "@react-email/components";
import { EmailLayout } from "./components/layout";

interface OrderShippedEmailProps {
  customerName: string;
  orderNumber: string;
  trackingNumber?: string;
  trackingUrl?: string;
  estimatedDelivery?: string;
}

export function OrderShippedEmail({
  customerName,
  orderNumber,
  trackingNumber,
  trackingUrl,
  estimatedDelivery,
}: OrderShippedEmailProps) {
  return (
    <EmailLayout previewText={`Order ${orderNumber} has shipped!`}>
      <Text style={heading}>Your Order Has Shipped! 🚚</Text>

      <Text style={paragraph}>Hi {customerName},</Text>

      <Text style={paragraph}>
        Great news! Your order has been shipped and is on its way to you.
      </Text>

      <Section style={detailsBox}>
        <Text style={detailsTitle}>Shipping Details</Text>
        <Text style={detailsRow}>
          <strong>Order Number:</strong> {orderNumber}
        </Text>
        {trackingNumber && (
          <Text style={detailsRow}>
            <strong>Tracking Number:</strong> {trackingNumber}
          </Text>
        )}
        {estimatedDelivery && (
          <Text style={detailsRow}>
            <strong>Estimated Delivery:</strong> {estimatedDelivery}
          </Text>
        )}
      </Section>

      {trackingUrl && (
        <Section style={buttonContainer}>
          <Button style={button} href={trackingUrl}>
            Track Your Package
          </Button>
        </Section>
      )}

      <Text style={paragraph}>
        You'll receive another email once your order has been delivered.
      </Text>

      <Text style={paragraph}>
        Thank you for shopping with Naomi Luxe!
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

export default OrderShippedEmail;

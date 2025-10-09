import { Button, Section, Text } from "@react-email/components";
import { EmailLayout } from "./components/layout";

interface WelcomeEmailProps {
  customerName: string;
}

export function WelcomeEmail({ customerName }: WelcomeEmailProps) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://naomi-luxe.com";

  return (
    <EmailLayout previewText="Welcome to Naomi Luxe!">
      <Text style={heading}>Welcome to Naomi Luxe! ✨</Text>

      <Text style={paragraph}>Hi {customerName},</Text>

      <Text style={paragraph}>
        Thank you for joining Naomi Luxe! We're thrilled to have you as part of
        our luxury beauty and fashion community.
      </Text>

      <Text style={paragraph}>
        At Naomi Luxe, we're dedicated to providing you with:
      </Text>

      <ul style={list}>
        <li style={listItem}>Premium beauty services</li>
        <li style={listItem}>Exclusive fashion collections</li>
        <li style={listItem}>Personalized styling consultations</li>
        <li style={listItem}>Members-only offers and events</li>
      </ul>

      <Section style={buttonContainer}>
        <Button style={button} href={`${siteUrl}/shop`}>
          Start Shopping
        </Button>
      </Section>

      <Text style={paragraph}>
        Need help getting started? Our team is here to assist you. Feel free to
        reach out anytime!
      </Text>

      <Text style={paragraph}>
        Welcome aboard!
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
  margin: "32px 0",
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

export default WelcomeEmail;

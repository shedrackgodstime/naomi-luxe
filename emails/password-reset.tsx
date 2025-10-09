import { Button, Section, Text } from "@react-email/components";
import { EmailLayout } from "./components/layout";

interface PasswordResetEmailProps {
  resetLink: string;
  expiresIn?: string;
}

export function PasswordResetEmail({
  resetLink,
  expiresIn = "1 hour",
}: PasswordResetEmailProps) {
  return (
    <EmailLayout previewText="Reset your Naomi Luxe password">
      <Text style={heading}>Reset Your Password 🔐</Text>

      <Text style={paragraph}>
        We received a request to reset your password for your Naomi Luxe
        account.
      </Text>

      <Text style={paragraph}>
        Click the button below to create a new password:
      </Text>

      <Section style={buttonContainer}>
        <Button style={button} href={resetLink}>
          Reset Password
        </Button>
      </Section>

      <Text style={paragraph}>
        This link will expire in <strong>{expiresIn}</strong>.
      </Text>

      <Text style={paragraph}>
        If you didn't request a password reset, you can safely ignore this
        email. Your password will not be changed.
      </Text>

      <Text style={paragraph}>
        For security reasons, please don't share this email with anyone.
      </Text>

      <Text style={paragraph}>
        Best regards,
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

export default PasswordResetEmail;

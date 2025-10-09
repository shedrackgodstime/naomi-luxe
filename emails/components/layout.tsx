import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Link,
  Section,
  Text,
} from "@react-email/components";
import type * as React from "react";

interface EmailLayoutProps {
  children: React.ReactNode;
  previewText?: string;
}

export function EmailLayout({ children, previewText }: EmailLayoutProps) {
  return (
    <Html>
      <Head />
      {previewText && (
        <div
          style={{
            display: "none",
            overflow: "hidden",
            lineHeight: "1px",
            opacity: 0,
            maxHeight: 0,
            maxWidth: 0,
          }}
        >
          {previewText}
        </div>
      )}
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Text style={logo}>✨ Naomi Luxe</Text>
            <Text style={tagline}>Luxury Beauty & Fashion</Text>
          </Section>

          {/* Content */}
          <Section style={content}>{children}</Section>

          {/* Footer */}
          <Section style={footer}>
            <Hr style={hr} />
            <Text style={footerText}>
              <strong>Naomi Luxe</strong>
              <br />
              123 Elegance Avenue, Lagos, Nigeria
              <br />
              +234-800-000-0000
            </Text>
            <Text style={footerLinks}>
              <Link href="https://naomi-luxe.com" style={link}>
                Website
              </Link>
              {" • "}
              <Link href="https://instagram.com/naomi.luxe" style={link}>
                Instagram
              </Link>
              {" • "}
              <Link href="https://wa.me/2348000000000" style={link}>
                WhatsApp
              </Link>
            </Text>
            <Text style={footerText}>
              © 2024 Naomi Luxe. All rights reserved.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

// Styles
const main = {
  backgroundColor: "#f6f6f6",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
  maxWidth: "600px",
};

const header = {
  padding: "32px 20px",
  textAlign: "center" as const,
  backgroundColor: "#000000",
};

const logo = {
  fontSize: "32px",
  fontWeight: "bold",
  color: "#ffffff",
  margin: "0 0 8px",
};

const tagline = {
  fontSize: "14px",
  color: "#d4af37",
  margin: 0,
  letterSpacing: "2px",
  textTransform: "uppercase" as const,
};

const content = {
  padding: "32px 20px",
};

const footer = {
  padding: "0 20px",
};

const hr = {
  borderColor: "#e6e6e6",
  margin: "20px 0",
};

const footerText = {
  color: "#8898aa",
  fontSize: "12px",
  lineHeight: "16px",
  textAlign: "center" as const,
  margin: "8px 0",
};

const footerLinks = {
  color: "#8898aa",
  fontSize: "12px",
  textAlign: "center" as const,
  margin: "8px 0",
};

const link = {
  color: "#d4af37",
  textDecoration: "none",
};

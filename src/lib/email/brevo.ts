// Brevo (formerly Sendinblue) email service
import { render } from "@react-email/render";

interface SendEmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  from?: {
    email: string;
    name: string;
  };
}

interface BrevoResponse {
  success: boolean;
  messageId?: string;
  error?: string;
}

/**
 * Send email using Brevo API
 */
export async function sendEmail(
  options: SendEmailOptions,
): Promise<BrevoResponse> {
  try {
    const apiKey = process.env.BREVO_API_KEY;
    if (!apiKey) {
      return {
        success: false,
        error: "BREVO_API_KEY is not configured",
      };
    }

    const from = options.from || {
      email: process.env.EMAIL_FROM || "noreply@naomi-luxe.com",
      name: process.env.EMAIL_FROM_NAME || "Naomi Luxe",
    };

    // Convert to array if single email
    const toArray = Array.isArray(options.to) ? options.to : [options.to];

    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": apiKey,
      },
      body: JSON.stringify({
        sender: from,
        to: toArray.map((email) => ({ email })),
        subject: options.subject,
        htmlContent: options.html,
        textContent: options.text,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      return {
        success: false,
        error: error.message || "Failed to send email",
      };
    }

    const data = await response.json();

    return {
      success: true,
      messageId: data.messageId,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Send email with React Email template
 */
export async function sendEmailWithTemplate(
  to: string | string[],
  subject: string,
  template: React.ReactElement,
): Promise<BrevoResponse> {
  try {
    const html = await render(template);
    const text = await render(template, { plainText: true });

    return await sendEmail({
      to,
      subject,
      html,
      text,
    });
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Template render failed",
    };
  }
}

/**
 * Send bulk emails (up to 500 recipients)
 */
export async function sendBulkEmail(
  recipients: Array<{ email: string; name?: string }>,
  subject: string,
  html: string,
  text?: string,
): Promise<BrevoResponse> {
  try {
    const apiKey = process.env.BREVO_API_KEY;
    if (!apiKey) {
      return {
        success: false,
        error: "BREVO_API_KEY is not configured",
      };
    }

    const from = {
      email: process.env.EMAIL_FROM || "noreply@naomi-luxe.com",
      name: process.env.EMAIL_FROM_NAME || "Naomi Luxe",
    };

    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": apiKey,
      },
      body: JSON.stringify({
        sender: from,
        to: recipients,
        subject,
        htmlContent: html,
        textContent: text,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      return {
        success: false,
        error: error.message || "Failed to send bulk email",
      };
    }

    const data = await response.json();

    return {
      success: true,
      messageId: data.messageId,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

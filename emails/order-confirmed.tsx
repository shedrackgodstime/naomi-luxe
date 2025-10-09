import { Button, Column, Row, Section, Text } from "@react-email/components";
import { EmailLayout } from "./components/layout";

interface OrderItem {
  name: string;
  quantity: number;
  price: string;
}

interface OrderConfirmedEmailProps {
  customerName: string;
  orderNumber: string;
  orderDate: string;
  items: OrderItem[];
  subtotal: string;
  total: string;
  shippingAddress?: string;
}

export function OrderConfirmedEmail({
  customerName,
  orderNumber,
  orderDate,
  items,
  subtotal,
  total,
  shippingAddress,
}: OrderConfirmedEmailProps) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://naomi-luxe.com";

  return (
    <EmailLayout previewText={`Order ${orderNumber} confirmed!`}>
      <Text style={heading}>Order Confirmed! 📦</Text>

      <Text style={paragraph}>Hi {customerName},</Text>

      <Text style={paragraph}>
        Thank you for your order! We've received your payment and are preparing
        your items for shipment.
      </Text>

      <Section style={detailsBox}>
        <Text style={detailsTitle}>Order Details</Text>
        <Text style={detailsRow}>
          <strong>Order Number:</strong> {orderNumber}
        </Text>
        <Text style={detailsRow}>
          <strong>Order Date:</strong> {orderDate}
        </Text>
        {shippingAddress && (
          <Text style={detailsRow}>
            <strong>Shipping Address:</strong>
            <br />
            {shippingAddress}
          </Text>
        )}
      </Section>

      <Section style={itemsBox}>
        <Text style={detailsTitle}>Items Ordered</Text>
        {items.map((item) => (
          <Row key={item.name} style={itemRow}>
            <Column style={itemName}>
              {item.name} × {item.quantity}
            </Column>
            <Column style={itemPrice}>{item.price}</Column>
          </Row>
        ))}
        <div style={divider} />
        <Row style={totalRow}>
          <Column>Subtotal</Column>
          <Column style={itemPrice}>{subtotal}</Column>
        </Row>
        <Row style={totalRow}>
          <Column style={totalLabel}>
            <strong>Total</strong>
          </Column>
          <Column style={totalAmount}>
            <strong>{total}</strong>
          </Column>
        </Row>
      </Section>

      <Section style={buttonContainer}>
        <Button style={button} href={`${siteUrl}/orders/${orderNumber}`}>
          Track Your Order
        </Button>
      </Section>

      <Text style={paragraph}>
        You'll receive another email with tracking information once your order
        ships.
      </Text>

      <Text style={paragraph}>
        Thank you for shopping with us!
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

const itemsBox = {
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

const itemRow = {
  padding: "12px 0",
};

const itemName = {
  fontSize: "14px",
  color: "#333333",
};

const itemPrice = {
  fontSize: "14px",
  color: "#333333",
  textAlign: "right" as const,
};

const divider = {
  borderTop: "1px solid #e6e6e6",
  margin: "16px 0",
};

const totalRow = {
  padding: "8px 0",
};

const totalLabel = {
  fontSize: "16px",
  color: "#000000",
};

const totalAmount = {
  fontSize: "16px",
  color: "#000000",
  textAlign: "right" as const,
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

export default OrderConfirmedEmail;

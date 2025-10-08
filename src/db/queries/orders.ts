import { desc, eq } from "drizzle-orm";
import { db } from "../index";
import { orderItems, orders, products } from "../schema";

export async function getAllOrders() {
  return await db.select().from(orders).orderBy(desc(orders.createdAt));
}

export async function getOrderById(id: string) {
  const result = await db
    .select()
    .from(orders)
    .where(eq(orders.id, id))
    .limit(1);
  return result[0] || null;
}

export async function getOrdersByUser(userId: string) {
  return await db
    .select()
    .from(orders)
    .where(eq(orders.userId, userId))
    .orderBy(desc(orders.createdAt));
}

export async function getOrderWithItems(orderId: string) {
  const orderResult = await db
    .select()
    .from(orders)
    .where(eq(orders.id, orderId))
    .limit(1);
  if (!orderResult[0]) return null;

  const itemsResult = await db
    .select({
      id: orderItems.id,
      quantity: orderItems.quantity,
      unitPrice: orderItems.unitPrice,
      product: {
        id: products.id,
        name: products.name,
        description: products.description,
        price: products.price,
        category: products.category,
        images: products.images,
      },
    })
    .from(orderItems)
    .leftJoin(products, eq(orderItems.productId, products.id))
    .where(eq(orderItems.orderId, orderId));

  return {
    ...orderResult[0],
    items: itemsResult,
  };
}

export async function createOrder(data: {
  userId: string;
  totalAmount: string;
  paymentStatus?: "pending" | "paid" | "failed" | "refunded";
}) {
  const result = await db.insert(orders).values(data).returning();
  return result[0];
}

export async function addOrderItem(data: {
  orderId: string;
  productId: string;
  quantity: number;
  unitPrice: string;
}) {
  const result = await db.insert(orderItems).values(data).returning();
  return result[0];
}

export async function updateOrderPaymentStatus(
  id: string,
  paymentStatus: "pending" | "paid" | "failed" | "refunded",
) {
  const result = await db
    .update(orders)
    .set({ paymentStatus })
    .where(eq(orders.id, id))
    .returning();
  return result[0];
}

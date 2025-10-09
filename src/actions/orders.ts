"use server";

// Order Server Actions
import { revalidatePath } from "next/cache";
import {
  addOrderItem,
  createOrder,
  getAllOrders,
  getOrderById,
  getOrdersByUser,
  getOrderWithItems,
  getProductById,
  updateOrderPaymentStatus,
} from "@/src/db/queries";
import { requireAdmin, requireAuth } from "@/src/lib/auth";
import { sendOrderConfirmationEmail } from "@/src/lib/email";

export async function getOrdersAction() {
  const admin = await requireAdmin();
  if (!admin) {
    return { error: "Unauthorized: Admin access required" };
  }

  try {
    const orders = await getAllOrders();
    return { orders };
  } catch (_error) {
    return { error: "Failed to fetch orders" };
  }
}

export async function getOrderByIdAction(id: string) {
  const user = await requireAuth();
  if (!user) {
    return { error: "Unauthorized: Please sign in" };
  }

  try {
    const order = await getOrderById(id);
    if (!order) {
      return { error: "Order not found" };
    }

    // Check if user owns this order or is admin
    if (order.userId !== user.id && user.role !== "admin") {
      return { error: "Unauthorized: Access denied" };
    }

    return { order };
  } catch (_error) {
    return { error: "Failed to fetch order" };
  }
}

export async function getOrderWithItemsAction(id: string) {
  const user = await requireAuth();
  if (!user) {
    return { error: "Unauthorized: Please sign in" };
  }

  try {
    const order = await getOrderWithItems(id);
    if (!order) {
      return { error: "Order not found" };
    }

    // Check if user owns this order or is admin
    if (order.userId !== user.id && user.role !== "admin") {
      return { error: "Unauthorized: Access denied" };
    }

    return { order };
  } catch (_error) {
    return { error: "Failed to fetch order" };
  }
}

export async function getUserOrdersAction() {
  const user = await requireAuth();
  if (!user) {
    return { error: "Unauthorized: Please sign in" };
  }

  try {
    const orders = await getOrdersByUser(user.id);
    return { orders };
  } catch (_error) {
    return { error: "Failed to fetch orders" };
  }
}

export async function createOrderAction(data: {
  items: Array<{
    productId: string;
    quantity: number;
    unitPrice: string | number;
  }>;
  totalAmount: string | number;
}) {
  const user = await requireAuth();
  if (!user) {
    return { error: "Unauthorized: Please sign in" };
  }

  try {
    // Create order
    const order = await createOrder({
      userId: user.id,
      totalAmount: String(data.totalAmount),
      paymentStatus: "pending",
    });

    // Add order items and get product details
    const itemsWithDetails = [];
    for (const item of data.items) {
      await addOrderItem({
        orderId: order.id,
        productId: item.productId,
        quantity: item.quantity,
        unitPrice: String(item.unitPrice),
      });

      // Get product details for email
      const product = await getProductById(item.productId);
      if (product) {
        itemsWithDetails.push({
          name: product.name,
          quantity: item.quantity,
          price: `₦${(Number(item.unitPrice) * item.quantity).toFixed(2)}`,
        });
      }
    }

    // Send order confirmation email
    if (user.email && itemsWithDetails.length > 0) {
      await sendOrderConfirmationEmail({
        to: user.email,
        customerName: user.fullName || user.email,
        orderNumber: order.id.substring(0, 8).toUpperCase(),
        orderDate: new Date().toLocaleDateString(),
        items: itemsWithDetails,
        subtotal: `₦${data.totalAmount}`,
        total: `₦${data.totalAmount}`,
      });
    }

    revalidatePath("/orders");
    revalidatePath("/admin/orders");
    return { order, message: "Order created successfully" };
  } catch (_error) {
    return { error: "Failed to create order" };
  }
}

export async function updateOrderStatusAction(
  id: string,
  status: "pending" | "paid" | "failed" | "refunded",
) {
  const admin = await requireAdmin();
  if (!admin) {
    return { error: "Unauthorized: Admin access required" };
  }

  try {
    const order = await updateOrderPaymentStatus(id, status);
    if (!order) {
      return { error: "Order not found" };
    }

    revalidatePath("/orders");
    revalidatePath("/admin/orders");
    return { order, message: `Order status updated to ${status}` };
  } catch (_error) {
    return { error: "Failed to update order status" };
  }
}

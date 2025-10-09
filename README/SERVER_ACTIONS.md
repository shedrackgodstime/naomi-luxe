# 🚀 Server Actions Guide

Complete guide to using Server Actions in Naomi Luxe. **No API routes needed!**

## 📋 What Are Server Actions?

Server Actions are Next.js 15 functions that run on the server and can be called directly from client or server components. They use the `"use server"` directive and provide:

- ✅ **No API routes needed** - Direct server-side execution
- ✅ **Type-safe** - Full TypeScript support
- ✅ **Progressive enhancement** - Works without JavaScript
- ✅ **Automatic revalidation** - Built-in cache invalidation
- ✅ **Security** - Server-side authentication checks

---

## 📁 File Structure

```
src/actions/
├── auth.ts           # Authentication actions
├── products.ts       # Product CRUD
├── bookings.ts       # Booking management
├── orders.ts         # Order management
├── services.ts       # Service CRUD
├── gallery.ts        # Gallery management
├── testimonials.ts   # Testimonial CRUD
├── notifications.ts  # Notification management
├── admin.ts          # Admin user management
├── homepage.ts       # Homepage content
├── index.ts          # Main exports
└── README.md         # Quick reference
```

---

## 🎯 Usage Patterns

### 1. Server Components (Recommended)

Fetch data directly in server components:

```typescript
import { getProductsAction } from "@/src/actions";

export default async function ShopPage() {
  const { products, error } = await getProductsAction();
  
  if (error) {
    return <div>Error: {error}</div>;
  }
  
  return (
    <div className="grid grid-cols-3 gap-4">
      {products?.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
```

### 2. Form Actions (Progressive Enhancement)

Use with forms for automatic submission handling:

```typescript
"use client";

import { signInAction } from "@/src/actions";
import { useFormState } from "react-dom";
import { useFormStatus } from "react-dom";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending}>
      {pending ? "Signing in..." : "Sign In"}
    </button>
  );
}

export function SignInForm() {
  const [state, formAction] = useFormState(signInAction, null);
  
  return (
    <form action={formAction}>
      <input name="email" type="email" required />
      <input name="password" type="password" required />
      <SubmitButton />
      {state?.error && <p className="text-red-500">{state.error}</p>}
    </form>
  );
}
```

### 3. Client Components with useTransition

For interactive actions without forms:

```typescript
"use client";

import { deleteProductAction } from "@/src/actions";
import { useTransition } from "react";
import { useRouter } from "next/navigation";

export function DeleteProductButton({ productId }: { productId: string }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  
  const handleDelete = () => {
    if (!confirm("Are you sure?")) return;
    
    startTransition(async () => {
      const result = await deleteProductAction(productId);
      
      if (result.error) {
        alert(result.error);
      } else {
        router.push("/admin/products");
      }
    });
  };
  
  return (
    <button 
      onClick={handleDelete} 
      disabled={isPending}
      className="btn-danger"
    >
      {isPending ? "Deleting..." : "Delete Product"}
    </button>
  );
}
```

### 4. Optimistic Updates

Update UI immediately, then sync with server:

```typescript
"use client";

import { markNotificationAsReadAction } from "@/src/actions";
import { useOptimistic } from "react";

export function NotificationList({ notifications }) {
  const [optimisticNotifications, markAsRead] = useOptimistic(
    notifications,
    (state, id: string) => 
      state.map(n => n.id === id ? { ...n, status: "read" } : n)
  );
  
  const handleMarkAsRead = async (id: string) => {
    markAsRead(id);
    await markNotificationAsReadAction(id);
  };
  
  return (
    <div>
      {optimisticNotifications.map(notification => (
        <div key={notification.id}>
          <p>{notification.message}</p>
          {notification.status === "unread" && (
            <button onClick={() => handleMarkAsRead(notification.id)}>
              Mark as Read
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
```

---

## 🔐 Authentication & Authorization

All actions automatically handle auth:

### Public Actions (No Auth Required)
```typescript
// Anyone can call these
getProductsAction()
getServicesAction()
getGalleryItemsAction()
getTestimonialsAction()
```

### User Actions (Auth Required)
```typescript
// Requires authenticated user
createBookingAction(data)
getUserBookingsAction()
createOrderAction(data)
updateProfileAction(data)
```

### Admin Actions (Admin Role Required)
```typescript
// Requires admin role
createProductAction(data)
updateUserRoleAction(userId, role)
deleteUserAction(userId)
```

### How It Works

```typescript
// Inside action
const user = await requireAuth();
if (!user) {
  return { error: "Unauthorized: Please sign in" };
}

// For admin-only
const admin = await requireAdmin();
if (!admin) {
  return { error: "Unauthorized: Admin access required" };
}
```

---

## 📊 Complete Action Reference

### 🔐 Auth Actions

```typescript
import {
  signUpAction,
  signInAction,
  signOutAction,
  getCurrentUserAction,
  updateProfileAction,
  requestPasswordResetAction,
  updatePasswordAction,
} from "@/src/actions";

// Sign up
await signUpAction({
  email: "user@example.com",
  password: "password123",
  fullName: "John Doe",
  phoneNumber: "+234-800-000-0000",
});

// Sign in
await signInAction({
  email: "user@example.com",
  password: "password123",
});

// Sign out
await signOutAction();

// Get current user
const { user } = await getCurrentUserAction();

// Update profile
await updateProfileAction({
  fullName: "Jane Doe",
  phoneNumber: "+234-800-111-1111",
});

// Request password reset
await requestPasswordResetAction({
  email: "user@example.com",
});

// Update password
await updatePasswordAction({
  newPassword: "newPassword123",
});
```

### 🛍️ Product Actions

```typescript
import {
  getProductsAction,
  getProductByIdAction,
  getProductsByCategoryAction,
  createProductAction,
  updateProductAction,
  deleteProductAction,
} from "@/src/actions";

// Get all products
const { products } = await getProductsAction();

// Get single product
const { product } = await getProductByIdAction("product-id");

// Get by category
const { products } = await getProductsByCategoryAction("shoes");

// Create product (admin)
await createProductAction({
  name: "Designer Shoes",
  description: "Luxury footwear",
  price: 299.99,
  category: "shoes",
  stock: 10,
  images: ["url1", "url2"],
});

// Update product (admin)
await updateProductAction("product-id", {
  price: 249.99,
  stock: 15,
});

// Delete product (admin)
await deleteProductAction("product-id");
```

### 📅 Booking Actions

```typescript
import {
  getUserBookingsAction,
  createBookingAction,
  cancelBookingAction,
} from "@/src/actions";

// Get user's bookings
const { bookings } = await getUserBookingsAction();

// Create booking
await createBookingAction({
  serviceId: "service-id",
  bookingDate: "2024-01-15",
  bookingTime: "14:30",
});

// Cancel booking
await cancelBookingAction("booking-id");
```

### 📦 Order Actions

```typescript
import {
  getUserOrdersAction,
  createOrderAction,
  getOrderWithItemsAction,
} from "@/src/actions";

// Get user's orders
const { orders } = await getUserOrdersAction();

// Create order
await createOrderAction({
  items: [
    {
      productId: "product-id",
      quantity: 2,
      unitPrice: 299.99,
    },
  ],
  totalAmount: 599.98,
});

// Get order with items
const { order } = await getOrderWithItemsAction("order-id");
```

### 🔔 Notification Actions

```typescript
import {
  getUserNotificationsAction,
  getUnreadNotificationsAction,
  markNotificationAsReadAction,
  markAllNotificationsAsReadAction,
} from "@/src/actions";

// Get all notifications
const { notifications } = await getUserNotificationsAction();

// Get unread only
const { notifications } = await getUnreadNotificationsAction();

// Mark as read
await markNotificationAsReadAction("notification-id");

// Mark all as read
await markAllNotificationsAsReadAction();
```

---

## ⚡ Performance Optimization

### Automatic Revalidation

Actions automatically revalidate affected paths:

```typescript
export async function createProductAction(data) {
  // ... create product
  
  revalidatePath("/shop");           // Revalidate shop page
  revalidatePath("/admin/products"); // Revalidate admin page
  
  return { product };
}
```

### Selective Revalidation

Only revalidate what changed:

```typescript
export async function updateProductAction(id, data) {
  // ... update product
  
  revalidatePath(`/shop/products/${id}`); // Specific product page
  revalidatePath("/shop");                 // Product listing
  
  return { product };
}
```

---

## 🎨 UI Patterns

### Loading States

```typescript
"use client";

import { useFormStatus } from "react-dom";

export function SubmitButton() {
  const { pending } = useFormStatus();
  
  return (
    <button type="submit" disabled={pending}>
      {pending ? (
        <>
          <Spinner />
          Processing...
        </>
      ) : (
        "Submit"
      )}
    </button>
  );
}
```

### Error Handling

```typescript
"use client";

import { useFormState } from "react-dom";
import { createBookingAction } from "@/src/actions";

export function BookingForm() {
  const [state, formAction] = useFormState(createBookingAction, null);
  
  return (
    <form action={formAction}>
      {/* form fields */}
      
      {state?.error && (
        <div className="bg-red-50 text-red-600 p-4 rounded">
          {state.error}
        </div>
      )}
      
      {state?.message && (
        <div className="bg-green-50 text-green-600 p-4 rounded">
          {state.message}
        </div>
      )}
      
      <button type="submit">Book Now</button>
    </form>
  );
}
```

### Success Redirects

```typescript
"use server";

import { redirect } from "next/navigation";

export async function createProductAction(data) {
  // ... create product
  
  revalidatePath("/shop");
  redirect("/admin/products"); // Redirect after success
}
```

---

## 🔒 Security Best Practices

### 1. Always Validate Input

```typescript
"use server";

export async function createProductAction(data) {
  // Validate on server
  if (!data.name || data.name.length < 3) {
    return { error: "Product name must be at least 3 characters" };
  }
  
  if (data.price <= 0) {
    return { error: "Price must be greater than 0" };
  }
  
  // ... proceed with creation
}
```

### 2. Check Authorization

```typescript
"use server";

export async function deleteProductAction(id: string) {
  const admin = await requireAdmin();
  if (!admin) {
    return { error: "Unauthorized: Admin access required" };
  }
  
  // ... proceed with deletion
}
```

### 3. Verify Resource Ownership

```typescript
"use server";

export async function cancelBookingAction(id: string) {
  const user = await requireAuth();
  if (!user) {
    return { error: "Unauthorized" };
  }
  
  const booking = await getBookingById(id);
  
  // Check ownership
  if (booking.userId !== user.id && user.role !== "admin") {
    return { error: "Unauthorized: Access denied" };
  }
  
  // ... proceed with cancellation
}
```

---

## 🚀 Next Steps

1. **Start building UI** - Use these actions in your components
2. **Add validation** - Consider Zod schemas for input validation
3. **Add file uploads** - Integrate Supabase Storage
4. **Add payments** - Integrate Stripe/Paystack
5. **Add emails** - Send notifications via Resend

---

## 📚 Resources

- [Next.js Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations)
- [React useFormState](https://react.dev/reference/react-dom/hooks/useFormState)
- [React useOptimistic](https://react.dev/reference/react/useOptimistic)

---

**Server Actions are now fully set up! Start building your frontend! 🎉**

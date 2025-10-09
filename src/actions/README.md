# Server Actions - Quick Reference

All server actions use `"use server"` directive. No API routes needed!

## Import Actions

```typescript
import {
  // Auth
  signUpAction,
  signInAction,
  signOutAction,
  updateProfileAction,
  
  // Products
  getProductsAction,
  createProductAction,
  
  // Bookings
  createBookingAction,
  getUserBookingsAction,
  
  // Orders
  createOrderAction,
  getUserOrdersAction,
  
  // Services
  getServicesAction,
  
  // Gallery
  getGalleryItemsAction,
  
  // Notifications
  getUserNotificationsAction,
  markNotificationAsReadAction,
} from "@/src/actions";
```

## Usage in Forms

### Sign Up Form
```typescript
"use client";

import { signUpAction } from "@/src/actions";
import { useFormState } from "react-dom";

export function SignUpForm() {
  const [state, formAction] = useFormState(signUpAction, null);
  
  return (
    <form action={formAction}>
      <input name="email" type="email" required />
      <input name="password" type="password" required />
      <input name="fullName" />
      <button type="submit">Sign Up</button>
      {state?.error && <p>{state.error}</p>}
    </form>
  );
}
```

### Create Booking Form
```typescript
"use client";

import { createBookingAction } from "@/src/actions";
import { useFormState } from "react-dom";

export function BookingForm({ serviceId }: { serviceId: string }) {
  const [state, formAction] = useFormState(createBookingAction, null);
  
  return (
    <form action={formAction}>
      <input type="hidden" name="serviceId" value={serviceId} />
      <input name="bookingDate" type="date" required />
      <input name="bookingTime" type="time" required />
      <button type="submit">Book Now</button>
      {state?.error && <p>{state.error}</p>}
      {state?.message && <p>{state.message}</p>}
    </form>
  );
}
```

## Usage in Server Components

### Fetch Products
```typescript
import { getProductsAction } from "@/src/actions";

export default async function ShopPage() {
  const { products, error } = await getProductsAction();
  
  if (error) return <div>Error: {error}</div>;
  
  return (
    <div>
      {products?.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
```

### Fetch User Bookings
```typescript
import { getUserBookingsAction } from "@/src/actions";

export default async function MyBookingsPage() {
  const { bookings, error } = await getUserBookingsAction();
  
  if (error) return <div>Error: {error}</div>;
  
  return (
    <div>
      {bookings?.map(booking => (
        <BookingCard key={booking.id} booking={booking} />
      ))}
    </div>
  );
}
```

## Usage with useTransition (Client Components)

```typescript
"use client";

import { deleteProductAction } from "@/src/actions";
import { useTransition } from "react";

export function DeleteButton({ productId }: { productId: string }) {
  const [isPending, startTransition] = useTransition();
  
  const handleDelete = () => {
    startTransition(async () => {
      const result = await deleteProductAction(productId);
      if (result.error) {
        alert(result.error);
      }
    });
  };
  
  return (
    <button onClick={handleDelete} disabled={isPending}>
      {isPending ? "Deleting..." : "Delete"}
    </button>
  );
}
```

## Action Categories

### 🔐 Auth Actions (`auth.ts`)
- `signUpAction` - Register new user
- `signInAction` - Login user
- `signOutAction` - Logout user
- `getCurrentUserAction` - Get current user
- `updateProfileAction` - Update user profile
- `requestPasswordResetAction` - Request password reset
- `updatePasswordAction` - Update password

### 🛍️ Product Actions (`products.ts`)
- `getProductsAction` - Get all products
- `getProductByIdAction` - Get single product
- `getProductsByCategoryAction` - Get products by category
- `createProductAction` - Create product (admin)
- `updateProductAction` - Update product (admin)
- `deleteProductAction` - Delete product (admin)

### 📅 Booking Actions (`bookings.ts`)
- `getBookingsAction` - Get all bookings (admin)
- `getBookingByIdAction` - Get single booking
- `getUserBookingsAction` - Get user's bookings
- `getBookingsByServiceAction` - Get bookings by service (admin)
- `createBookingAction` - Create booking
- `updateBookingStatusAction` - Update status (admin)
- `cancelBookingAction` - Cancel booking
- `deleteBookingAction` - Delete booking (admin)

### 📦 Order Actions (`orders.ts`)
- `getOrdersAction` - Get all orders (admin)
- `getOrderByIdAction` - Get single order
- `getOrderWithItemsAction` - Get order with items
- `getUserOrdersAction` - Get user's orders
- `createOrderAction` - Create order
- `updateOrderStatusAction` - Update order status (admin)

### 💇 Service Actions (`services.ts`)
- `getServicesAction` - Get all services
- `getServiceByIdAction` - Get single service
- `createServiceAction` - Create service (admin)
- `updateServiceAction` - Update service (admin)
- `deleteServiceAction` - Delete service (admin)

### 🖼️ Gallery Actions (`gallery.ts`)
- `getGalleryItemsAction` - Get all gallery items
- `getGalleryItemByIdAction` - Get single item
- `createGalleryItemAction` - Create item (admin)
- `updateGalleryItemAction` - Update item (admin)
- `deleteGalleryItemAction` - Delete item (admin)

### ⭐ Testimonial Actions (`testimonials.ts`)
- `getTestimonialsAction` - Get all testimonials
- `getTestimonialByIdAction` - Get single testimonial
- `createTestimonialAction` - Create testimonial (admin)
- `updateTestimonialAction` - Update testimonial (admin)
- `deleteTestimonialAction` - Delete testimonial (admin)

### 🔔 Notification Actions (`notifications.ts`)
- `getUserNotificationsAction` - Get user's notifications
- `getUnreadNotificationsAction` - Get unread notifications
- `getNotificationByIdAction` - Get single notification
- `markNotificationAsReadAction` - Mark as read
- `markAllNotificationsAsReadAction` - Mark all as read
- `archiveNotificationAction` - Archive notification
- `deleteNotificationAction` - Delete notification
- `getNotificationPreferencesAction` - Get preferences
- `updateNotificationPreferencesAction` - Update preferences

### 👑 Admin Actions (`admin.ts`)
- `createUserAction` - Create user (admin)
- `updateUserRoleAction` - Update user role (admin)
- `deleteUserAction` - Delete user (admin)
- `getUserByIdAction` - Get user by ID (admin)
- `listUsersAction` - List all users (admin)

### 🏠 Homepage Actions (`homepage.ts`)
- `getHomepageContentAction` - Get all content
- `getHomepageContentBySectionAction` - Get by section
- `createHomepageContentAction` - Create content (admin)
- `updateHomepageContentAction` - Update content (admin)
- `deleteHomepageContentAction` - Delete content (admin)

### 📁 Upload Actions (`upload.ts`)
- `uploadProductImageAction` - Upload product image (admin)
- `uploadProductImagesAction` - Upload multiple product images (admin)
- `uploadGalleryImageAction` - Upload gallery image (admin)
- `uploadAvatarAction` - Upload user avatar
- `deleteFileAction` - Delete file (admin)
- `deleteMultipleFilesAction` - Delete multiple files (admin)
- `deleteAvatarAction` - Delete own avatar

## Security

All actions automatically check authentication and authorization:
- **Public actions** - No auth required (get products, services, gallery)
- **User actions** - Require authentication (bookings, orders, profile)
- **Admin actions** - Require admin role (create/update/delete)

## Error Handling

All actions return consistent error format:
```typescript
{ error: "Error message" }
```

Or success format:
```typescript
{ data: {...}, message: "Success message" }
```

## Revalidation

Actions automatically revalidate relevant paths using `revalidatePath()`:
- Creating/updating products → revalidates `/shop` and `/admin/products`
- Creating bookings → revalidates `/bookings` and `/admin/bookings`
- Updating profile → revalidates `/profile`

## See Full Documentation

📖 [README/SERVER_ACTIONS.md](../../README/SERVER_ACTIONS.md) (coming soon)

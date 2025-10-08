# 📊 Naomi Luxe – Database & Storage Plan

This document defines the **database schema and storage structure** for Naomi Luxe.  
We are using **Supabase (Postgres, Auth, Storage)** as the backend.  

---

## 🔑 Authentication

We use **Supabase Auth**.  
No extra `profiles` table — instead, we extend user accounts with **metadata**:

- **user_metadata** → public info (editable by user)
  - `full_name`
  - `phone_number`

- **app_metadata** → system info (only set by admin)
  - `role` → `admin` or `customer`

---

## 🛍️ E-commerce Tables

### `products`
- `id` → UUID (PK)  
- `name` → text  
- `description` → text  
- `price` → numeric  
- `category` → enum (`shoes`, `clothes`, `accessories`)  
- `stock` → integer  
- `images` → array of text (Supabase Storage URLs)  
- `created_at` → timestamptz  

---

### `orders`
- `id` → UUID (PK)  
- `user_id` → UUID (FK → auth.users.id)  
- `total_amount` → numeric  
- `payment_status` → enum (`pending`, `paid`, `failed`, `refunded`)  
- `created_at` → timestamptz  

---

### `order_items`
- `id` → UUID (PK)  
- `order_id` → FK → `orders.id`  
- `product_id` → FK → `products.id`  
- `quantity` → integer  
- `unit_price` → numeric  

---

## 💇 Salon Services & Bookings

### `services`
- `id` → UUID (PK)  
- `name` → text  
- `description` → text  
- `price` → numeric  
- `duration` → integer (minutes)  
- `created_at` → timestamptz  

---

### `bookings`
- `id` → UUID (PK)  
- `user_id` → FK → auth.users.id  
- `service_id` → FK → services.id  
- `booking_date` → date  
- `booking_time` → time  
- `status` → enum (`pending`, `confirmed`, `canceled`, `completed`)  
- `created_at` → timestamptz  

---

## 🖼️ Content & Branding

### `gallery`
- `id` → UUID (PK)  
- `image_url` → text  
- `title` → text  
- `description` → text  
- `created_at` → timestamptz  

---

### `testimonials`
- `id` → UUID (PK)  
- `author` → text  
- `text` → text  
- `rating` → integer (1–5)  
- `created_at` → timestamptz  

---

### `homepage_content` (optional CMS-like table)
- `id` → UUID (PK)  
- `section` → enum (`hero`, `banner`, `newsletter`)  
- `title` → text  
- `content` → jsonb  
- `image_url` → text  

---

## 📂 Supabase Storage Buckets

- **products/** → product images  
- **gallery/** → salon portfolio images  
- **uploads/** → homepage banners & misc files  

Example structure:
```
/storage
   /products
       /uuid-product-1/img1.jpg
   /gallery
       /uuid-gallery-1.jpg
   /uploads
       /banner-uuid.jpg
```

---

## 🔒 Access Control (Policies)

- **Auth Users**
  - Can view their own orders & bookings.  
  - Can create new orders/bookings.  

- **Admins**
  - Full access to all tables & storage.  

- **Public**
  - Can view products, services, gallery, testimonials.  
  - Cannot modify anything.  

---

## ✅ Why This Works
- Uses Supabase Auth for identity & roles → no extra profile table needed.  
- Normalized database design → scalable for both shop & bookings.  
- Storage organized by feature → easy to manage.  
- Row-Level Security (RLS) ensures customers only see their own data.  

---



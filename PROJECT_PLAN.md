# Naomi Luxe – Project Plan (Supabase Version)

## 🌸 Project Overview
**Naomi Luxe** is a premium beauty and fashion platform for showcasing a **beauty salon brand**, while also selling **shoes, clothes, and accessories**. It will feature an integrated **booking system** for salon services.  

The site will act as a **portfolio + e-commerce store + booking portal**, built with a **luxury, modern, and responsive design**.

---

## 🎯 Project Goals
- **Brand Showcase**: Highlight Naomi’s salon works and fashion lifestyle.  
- **E-commerce**: Enable online sales of products.  
- **Bookings**: Allow clients to book salon services online.  
- **Admin Dashboard**: Manage products, bookings, and gallery.  
- **Scalable Setup**: Start with Supabase, with room to add or change services later.  

---

## 📑 Site Structure

### Public (Client-Facing)
- **Homepage**
  - Hero section with branding & CTA  
  - Featured services & products  
  - Testimonials & newsletter  

- **About**
  - Naomi’s story & salon overview  

- **Services & Booking**
  - List of services (with price & duration)  
  - Booking form with date/time picker  
  - Confirmation email  

- **Shop**
  - Categories (Shoes, Clothes, Accessories)  
  - Product listing & detail pages  
  - Cart + Checkout (Stripe or Paystack)  

- **Gallery**
  - Showcase portfolio (before/after works, salon images)  

- **Contact**
  - Contact form, salon location, WhatsApp link  

---

### Admin Dashboard
- **Login via Supabase Auth** (admin role required)  
- **Products Management** (CRUD)  
- **Bookings Management** (view, confirm/reject)  
- **Gallery Management** (upload/remove images via Supabase Storage)  
- **Content Management** (testimonials, homepage banners)  
- **Analytics** (basic sales/booking reports)  

---

## 📊 Database Schema (Supabase Postgres)

Supabase provides Postgres + APIs. Tables to define:

- **users** (Supabase-managed)  
  - id, email, name, role (`admin` or `customer`)  

- **products**  
  - id, name, description, price, category, stock, images (array of URLs)  

- **orders**  
  - id, user_id, total_amount, payment_status, created_at  

- **bookings**  
  - id, user_id, service, date, time, status, created_at  

- **services**  
  - id, name, description, price, duration  

- **gallery**  
  - id, image_url, title, description  

- **testimonials**  
  - id, author, text, rating  

---

## 📂 Storage (Supabase Buckets)
- `products` → product images  
- `gallery` → salon works/portfolio  
- `uploads` → admin uploads  

---

## 🔑 Authentication (Supabase Auth)
- **Customer Accounts**: signup/login to track orders & bookings.  
- **Admin Accounts**: role assigned via Supabase dashboard.  
- **Route Protection**: middleware checks Supabase session & role.  

---

## 🛠️ Tech Stack

- **Frontend**: Next.js 15 (App Router)  
- **Styling**: Tailwind CSS + shadcn/ui  
- **Database**: Supabase Postgres  
- **Auth**: Supabase Auth  
- **Storage**: Supabase Buckets  
- **Payments**: Stripe (global) / Paystack (Nigeria)  
- **Email**: Resend for transactional emails  
- **Deployment**: Vercel  

---

## 🎨 Design System
- **Brand Identity**: luxury, minimal, elegant.  
- **Colors**: gold, black, cream, white.  
- **Typography**: serif (headings), sans-serif (body).  
- **Components**: built with shadcn/ui → Navbar, Footer, Cards, Tables, Modal, Form.  

---

## 🚀 Roadmap

**Phase 1 – Setup (Week 1–2)**  
- Configure Next.js + Tailwind + shadcn/ui  
- Setup Supabase project (auth, db, storage)  
- Build Home, About, Services, Contact  

**Phase 2 – Shop (Week 3–4)**  
- Create product schema in Supabase  
- Implement product listing & detail pages  
- Cart + Checkout flow with Stripe/Paystack  

**Phase 3 – Booking System (Week 5)**  
- Create services & bookings tables  
- Build booking form + Supabase insert  
- Send confirmation emails  

**Phase 4 – Admin Dashboard (Week 6)**  
- Admin login with Supabase Auth  
- CRUD for products, bookings, gallery  
- Secure APIs with role-based access  

**Phase 5 – Final Polish & Launch (Week 7–8)**  
- Responsive design, SEO  
- Analytics & monitoring  
- Deploy on Vercel  

---

## ✅ Deliverables
1. **Public site** with salon portfolio, e-commerce, and booking.  
2. **Admin dashboard** with full management features.  
3. **Supabase-powered auth, db, and storage** integrated with Next.js.  
4. **Luxury UI/UX** design.  
5. **Production deployment** on Vercel.  

---

## 👩‍💻 Contributors
- **Lead Developer**: Kristency  
- **Client**: Naomi (Naomi Luxe Brand)  

---

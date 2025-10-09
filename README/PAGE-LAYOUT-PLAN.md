# 🪄 Naomi Luxe – Full Page & Layout Design Plan

## 🌐 Root Layout (`app/layout.tsx`)
**Purpose:** Global wrapper for every page.  
**Visual Style:**  
- Smooth fade-in page transitions.  
- Global background color → soft cream or white.  
- Font family and theme provider applied here.  
- No visible header/footer (delegated to child layouts).  
- Integrates:
  - `<Toaster />` (bottom right, gold accent)
  - `<ThemeProvider />` (light/dark)
  - `<SupabaseProvider />`  

> 🎨 *The root layout sets the tone — luxury minimalism with calm motion and gentle shadows.*

---

## 🌸 (site) Layout (`app/(site)/layout.tsx`)
**Purpose:** Structure for the public website.  
**Look & Feel:**
- **Header:**  
  - Sticky top navigation bar, translucent glassmorphism background.  
  - Logo on the left (`Naomi Luxe` in serif gold text).  
  - Links on right: Home, About, Services, Shop, Gallery, Contact.  
  - “Book Now” button in gold or cream tone.  
  - Responsive hamburger menu for mobile.
- **Footer:**  
  - Dark background with gold text.  
  - Quick links, contact info, social media icons.  
  - Copyright line & tagline “Elegance Beyond Beauty”.
- **Body:**  
  - Smooth scroll behavior.  
  - Section spacing uses `py-24` for luxury breathing room.  
  - Subtle parallax hero backgrounds.  
  - Uses shadcn Cards, Buttons, and Image components for a cohesive premium look.

---

## 🏠 Homepage (`app/(site)/page.tsx`)
**Sections:**  
1. **Hero:**  
   - Full-screen banner with Naomi’s salon image/video background.  
   - Overlay gradient (black → transparent).  
   - Large headline: *“Redefining Beauty with Elegance”*.  
   - CTA buttons: “Book a Session” & “Explore Shop”.  

2. **Featured Services:**  
   - 3–4 cards with service names, short descriptions, and “Book Now” buttons.  
   - Soft cream background with floating effect on hover.

3. **Featured Products:**  
   - Carousel or grid of best-selling items.  
   - Uses shadcn `Card` with image, title, price, and hover zoom.

4. **Testimonials:**  
   - Horizontal scroll cards or grid with client photos and quotes.  
   - Subtle background pattern or texture.

5. **Newsletter / CTA:**  
   - Simple centered input + button (“Stay in Touch”).  
   - Gold accent button, clean white background.

---

## 💇 Services Page (`app/(site)/services/page.tsx`)
- Grid layout of all services.  
- Each service card shows:
  - Image, name, duration, price, and “Book Now”.  
- Elegant gold borders, hover lift effect.  
- Optional filters (hair, nails, makeup).

---

## 🗓️ Booking Page (`app/(site)/bookings/page.tsx`)
- Clean, centered booking form built with shadcn form components.  
- Step-by-step flow (service → date → time → confirm).  
- Confirmation modal on success.  
- Gentle animated success checkmark.  
- Background: soft gold gradient or salon image faded 10% opacity.

---

## 🛍️ Shop (`app/(site)/shop/layout.tsx`)
- Optional left sidebar with filters (category, price, size).  
- Product grid with `Card` components.  
- Hover reveals “Add to Cart”.  
- Smooth “Add to Cart” animations.  
- Sticky floating cart button on mobile.

**Product Detail Page (`app/(site)/shop/[productId]/page.tsx`)**
- Large product image carousel.  
- Right side → name, price, description, add to cart button.  
- “You may also like” section at bottom.

---

## 🖼️ Gallery Page (`app/(site)/gallery/page.tsx`)
- Masonry grid or 3-column responsive layout.  
- Hover → zoom + title overlay.  
- Modal lightbox when clicked.  
- Slight fade transitions between images.

---

## 💌 Contact Page (`app/(site)/contact/page.tsx`)
- Two-column layout:
  - Left: contact form (name, email, message).  
  - Right: map or salon photo, phone, WhatsApp button.  
- Footer-style colors.  
- “Send Message” button in gold with hover ripple.

---

## 🔐 Auth Layout (`app/auth/layout.tsx`)
**Look & Feel:**
- Minimal, centered card (max-width 400px).  
- Soft shadow, rounded corners (`rounded-2xl`).  
- Background gradient (cream → gold).  
- Small logo above form.  
- Form fields with icons.  
- Link to switch between login/register.  
- Success/error toasts styled with brand colors.

---

## 🧭 Admin Layout (`app/admin/layout.tsx`)
**Structure:**
- Sidebar (left) → vertical nav with icons.  
- Topbar (right) → user info, logout, dark/light toggle.  
- Main content → scrollable area with padding.

**Visual Style:**
- Neutral light or dark theme (toggle supported).  
- Accent color → gold highlights (buttons, links).  
- Cards for dashboard stats (`Total Sales`, `Bookings`, `Inventory`).  
- Tables use shadcn `Table` with alternating row background.  
- Consistent spacing and motion for all CRUD actions.

**Pages:**
- `/admin` → dashboard overview stats.  
- `/admin/products` → table + “Add Product” modal.  
- `/admin/bookings` → sortable table.  
- `/admin/gallery` → upload area grid.  
- `/admin/testimonials` → CRUD simple list.  
- `/admin/settings` → manage branding, content text, or integrations.

---

## ✨ Global Styling Traits

| Trait | Description |
|-------|--------------|
| **Color Palette** | Gold, black, cream, white, soft gray |
| **Typography** | Serif for headings, Sans-serif for body |
| **Buttons** | Rounded-lg, medium padding, subtle shadow |
| **Animations** | Framer Motion for fade-in and hover scaling |
| **Forms** | Transparent background, gold underline focus |
| **Cards** | Soft shadow, border radius 2xl, hover lift |
| **Spacing** | Luxurious (large margins/padding), minimalist composition |
| **Responsive** | Mobile-first, stacked sections, hidden sidebar on small screens |

---

## 🎬 Transitions & Microinteractions
- Hero text fade and slide in from bottom.  
- Buttons ripple or glow on hover.  
- Section reveal animations when scrolling.  
- Modal open/close with spring motion.  
- Cart badge bounce when item added.  

---

## 🧱 Layout Hierarchy Summary

| Layout | Contains | Purpose |
|---------|-----------|----------|
| Root | Providers, theme, global CSS | Base shell |
| (site) | Header, Footer | Public pages |
| Auth | Centered card | Login, Register |
| Admin | Sidebar, Topbar | Admin dashboard |

---

## 🧭 Navigation Flow

| Section | URL Path | Layout | Description |
|----------|-----------|---------|-------------|
| Homepage | `/` | (site) | Hero, featured products/services |
| About | `/about` | (site) | Brand story |
| Services | `/services` | (site) | List of services |
| Booking | `/bookings` | (site) | Booking form |
| Shop | `/shop` | (site) + shop layout | Product listing |
| Product Detail | `/shop/[id]` | (site) | Single product |
| Gallery | `/gallery` | (site) | Portfolio images |
| Contact | `/contact` | (site) | Contact form, map |
| Login | `/auth/login` | auth | Login page |
| Register | `/auth/register` | auth | Registration |
| Admin Dashboard | `/admin` | admin | Overview panel |

---

## ✅ Component Organization

```
src/components/
│
├── ui/                       # shadcn/ui components
│   ├── button.tsx
│   ├── input.tsx
│   ├── card.tsx
│   ├── ...
│
├── layout/
│   ├── header.tsx
│   ├── footer.tsx
│   ├── sidebar.tsx
│   ├── topbar.tsx
│
├── forms/
│   ├── login-form.tsx
│   ├── register-form.tsx
│   ├── booking-form.tsx
│   ├── product-form.tsx
│
├── shop/
│   ├── product-card.tsx
│   ├── product-list.tsx
│   ├── cart-summary.tsx
│
├── admin/
│   ├── dashboard-stats.tsx
│   ├── table.tsx
│   ├── chart.tsx
│
├── gallery/
│   ├── gallery-grid.tsx
│   ├── gallery-item.tsx
│
└── shared/
    ├── section-title.tsx
    ├── loader.tsx
    ├── empty-state.tsx
```

---

## 🪄 Final Notes
- No `/api` routes — all database calls via Supabase client.
- Strong RLS for `/admin` routes.
- Animations should feel smooth, luxurious, not flashy.
- All components follow Naomi Luxe brand guidelines from DESIGN-SYSTEM.md.
# 🎨 Naomi Luxe – Design & Styling Plan

## 🌸 Brand Identity
Naomi Luxe is a **modern beauty & fashion brand** — elegant, luxurious, but approachable.  
The design must feel **high-end**, **feminine**, and **tastefully minimal** (think “Chanel meets modern African fashion”).

**Keywords:** Elegant · Luxurious · Confident · Clean · Bold

---

## 🧭 Design Direction
| Area | Description |
|------|--------------|
| **Mood** | Calm luxury — neutral tones, light gold accents, soft contrasts. |
| **Vibe** | Modern beauty salon meets high-end boutique. |
| **Design Style** | Editorial & minimalist — large images, clean typography, generous spacing. |
| **Target Audience** | Women (18–45), beauty & fashion enthusiasts, upscale clients. |

---

## 🎨 Color Palette
| Role | Color | Notes |
|------|--------|-------|
| **Primary** | `#C6A664` (soft gold) | Represents luxury and elegance. |
| **Secondary** | `#000000` (black) | For contrast, headings, and buttons. |
| **Background** | `#FAFAF8` (off-white) | Clean, premium background tone. |
| **Accent** | `#E2D4B7` (beige/gold tint) | Used subtly in sections & cards. |
| **Text Primary** | `#111111` | Strong contrast on light backgrounds. |
| **Text Muted** | `#666666` | For descriptions, secondary info. |

💡 Use gradients of gold (soft shimmer) for buttons and subtle hover effects.

---

## 🖋️ Typography
| Use | Font | Example |
|------|-------|---------|
| **Headings** | “**Playfair Display**” (serif) | Elegant, luxurious titles. |
| **Body** | “**Inter**” or “Satoshi” (sans-serif) | Clean, modern readability. |
| **Accent Text** | “**Great Vibes**” (optional for signature sections) | Adds femininity. |

💡 Tailwind config:
```js
fontFamily: {
  heading: ['Playfair Display', 'serif'],
  body: ['Inter', 'sans-serif'],
}
```

---

## 🧱 UI Components (shadcn/ui + Tailwind)
| Component | Style Direction |
|------------|----------------|
| **Navbar** | Transparent over hero, solid background after scroll, gold underline hover. |
| **Hero Section** | Full-width image/video banner with centered text + CTA button. |
| **Buttons** | Rounded-2xl, gold background, black text. Hover: black background + gold text. |
| **Cards** | Soft shadow (`shadow-md`), rounded-2xl, hover lift (`hover:-translate-y-1`). |
| **Forms** | Minimal with floating labels, soft borders, gold focus rings. |
| **Product Grid** | 3-column on desktop, 1–2 on mobile, even white spacing. |
| **Booking Calendar** | Clean card layout with light gold accent highlights. |
| **Admin Dashboard** | Neutral tones, gray background, black text, consistent shadcn components. |

---

## 📱 Layout & Responsiveness
- **Container width:** `max-w-7xl mx-auto px-4`  
- **Mobile-first:** stack content vertically with generous padding.  
- **Breakpoints:**  
  - sm → single column  
  - md → split layout (image left, text right)  
  - lg → grid-based (shop/gallery)

💡 Always leave *breathing room*. Naomi Luxe should *feel* like luxury through whitespace.

---

## 🪞 Page-by-Page Visual Plan

### **Home**
- Hero section (model/salon banner, gold overlay text)
- About snippet (portrait + description)
- Featured products (3–4)
- Featured services
- Testimonials carousel
- Newsletter CTA (beige background)
- Footer with gold accents

### **Shop**
- Clean grid, large product cards.
- Filter by category (shoes, clothes, accessories).
- On hover → show second image or “Quick View”.
- Product page:  
  - Left → big image carousel  
  - Right → name, price, add-to-cart, description.

### **Booking**
- Step-by-step flow:  
  1. Choose service  
  2. Pick date & time  
  3. Confirm details  
- Light beige background with gold highlights.
- Confirmation screen → elegant success message.

### **Gallery**
- Masonry grid with hover fade-in captions.
- Optional before/after toggle for salon works.

### **Admin**
- shadcn dashboard UI: sidebar navigation, clean cards, stats summary.
- No gold — keep muted gray tones for professionalism.

---

## 🧩 Microinteractions & Animations
- **Framer Motion** for soft fade-in + slide-up animations.  
- **Hover effects:** subtle lifts, gold shimmer transitions.  
- **Scroll effects:** fade-in sections as user scrolls.  
- **Button press:** tactile shrink with ease-out.

---

## 🖼️ Image Style Guidelines
- **Photography:** high-quality, soft lighting, minimal background clutter.  
- **Product shots:** clean white/light gray backgrounds.  
- **Salon works:** warm tones, focus on detail (before/after optional).  
- **Aspect ratio:**  
  - Hero: 16:9  
  - Product: 1:1  
  - Gallery: variable (masonry layout).

---

## 🔍 UX Principles
- Prioritize **clarity** → fewer words, more visuals.  
- Highlight **booking and shopping CTAs** clearly.  
- Ensure **fast-loading** images (optimized & lazy-loaded).  
- Keep **navigation minimal** — max 6 main links.  
- Maintain **consistency** — one button style, one card layout theme.

---

## 🧠 Accessibility & SEO
- All colors meet contrast ratio for readability.  
- Semantic HTML + aria labels for all interactive elements.  
- SEO-optimized headings, alt text, and meta tags.  
- Responsive and mobile-first by design.

---

## ✅ Deliverables
1. Tailwind + shadcn theme configuration.  
2. Global CSS variables (colors, fonts).  
3. Reusable components styled consistently.  
4. Design mockup alignment (if needed, Figma sync).  
5. Final responsive breakpoints & page templates.

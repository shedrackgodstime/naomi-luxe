# 🌸 Naomi Luxe

> **Premium Beauty & Fashion Platform** - A luxury beauty salon and e-commerce platform combining salon services, fashion retail, and online booking.

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Backend-green?style=flat-square&logo=supabase)](https://supabase.com/)
[![Drizzle ORM](https://img.shields.io/badge/Drizzle-ORM-orange?style=flat-square)](https://orm.drizzle.team/)

## 🎯 Project Overview

**Naomi Luxe** is a comprehensive platform that serves as:

- **🏪 E-commerce Store** - Sell shoes, clothes, and accessories
- **💇 Beauty Salon Portfolio** - Showcase salon works and services  
- **📅 Booking System** - Online appointment scheduling
- **👑 Admin Dashboard** - Content and order management

Built with modern web technologies and designed for luxury clientele seeking premium beauty services and fashion items.

## ✨ Features

### 🛍️ E-commerce
- **Product Catalog** - Shoes, clothes, and accessories
- **Shopping Cart** - Seamless shopping experience
- **Order Management** - Track orders and payments
- **Inventory Management** - Stock tracking and updates

### 💇 Salon Services
- **Service Booking** - Online appointment scheduling
- **Portfolio Gallery** - Showcase salon works
- **Service Management** - Pricing and duration tracking
- **Booking Calendar** - Available time slots

### 🔔 Advanced Notifications
- **Real-time Updates** - Instant notification delivery
- **Multi-channel** - Email, push, and SMS notifications
- **User Preferences** - Granular notification control
- **Smart Templates** - Pre-built notification messages

### 👑 Admin Dashboard
- **Content Management** - Products, services, gallery
- **Order Processing** - Manage orders and payments
- **Booking Management** - Appointment scheduling
- **Analytics** - Sales and booking reports

## 🚀 Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - Modern UI components

### Backend
- **Supabase** - Backend-as-a-Service
  - **PostgreSQL** - Database
  - **Auth** - Authentication & authorization
  - **Storage** - File storage
  - **Real-time** - Live updates
- **Drizzle ORM** - Type-safe database operations

### Development
- **Biome** - Linting and formatting
- **Drizzle Kit** - Database migrations
- **Turbopack** - Fast development builds

## 📁 Project Structure

```
naomi-luxe/
├── 📁 app/                    # Next.js App Router
│   ├── 📁 (site)/            # Public site routes
│   ├── 📁 admin/             # Admin dashboard
│   └── 📁 shop/              # E-commerce routes
├── 📁 src/
│   ├── 📁 db/                # Database layer
│   │   ├── schema.ts         # Database schema
│   │   └── 📁 queries/       # Database operations
│   ├── 📁 libs/              # Core libraries
│   │   ├── 📁 supabase/      # Supabase integration
│   │   └── 📁 notifications/ # Notification system
│   ├── 📁 config/            # App configuration
│   └── 📁 types.ts           # TypeScript definitions
├── 📁 README/                # Detailed documentation
└── 📁 drizzle/              # Database migrations
```

## 🛠️ Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, pnpm, or bun
- Supabase account

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd naomi-luxe
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Environment Setup**
   ```bash
   cp env.example .env.local
   ```
   
   Fill in your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
   NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   DATABASE_URL=postgresql://postgres:[password]@db.[project-ref].supabase.co:5432/postgres
   ```

4. **Database Setup**
   ```bash
   # Push schema to database
   npm run db:push
   
   # Or generate migrations
   npm run db:generate
   npm run db:migrate
   ```

5. **Start Development Server**
   ```bash
   npm run dev
   ```

6. **Open in Browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📚 Documentation

This project includes comprehensive documentation in the `README/` directory:

### 📋 Core Documentation
- **[PROJECT_PLAN.md](./README/PROJECT_PLAN.md)** - Complete project overview and roadmap
- **[DATABASE-PLAN.md](./README/DATABASE-PLAN.md)** - Database schema and storage structure
- **[AUTH_SETUP.md](./README/AUTH_SETUP.md)** - Complete authentication system guide
- **[SERVER_ACTIONS.md](./README/SERVER_ACTIONS.md)** - Server Actions guide (no API routes!)
- **[STORAGE_SETUP.md](./README/STORAGE_SETUP.md)** - File upload & storage system
- **[EMAIL_SETUP.md](./README/EMAIL_SETUP.md)** - Email system with React Email & Brevo
- **[NOTIFICATIONS_SETUP.md](./README/NOTIFICATIONS_SETUP.md)** - Advanced notification system guide
- **[DRIZZLE_SETUP.md](./README/DRIZZLE_SETUP.md)** - Database ORM setup and usage

### 🔧 Development Guides
- **Database Schema** - Complete table definitions and relationships
- **Notification System** - Real-time notification implementation
- **Authentication** - Supabase Auth integration
- **API Design** - Type-safe database operations

## 🎨 Design System

### Brand Identity
- **Colors**: Gold, black, cream, white
- **Typography**: Serif headings, sans-serif body
- **Style**: Luxury, minimal, elegant
- **Target**: Premium clientele

### UI Components
Built with shadcn/ui for consistent, accessible components:
- Navigation, Cards, Tables, Modals
- Forms, Buttons, Inputs
- Responsive design patterns

## 🚀 Development Scripts

```bash
# Development
npm run dev          # Start development server with Turbopack
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run Biome linter
npm run format       # Format code with Biome

# Database
npm run db:generate  # Generate migrations
npm run db:migrate   # Run migrations
npm run db:push      # Push schema to database
npm run db:studio    # Open Drizzle Studio
```

## 🗄️ Database Schema

### Core Tables
- **products** - E-commerce inventory
- **orders** - Purchase transactions
- **order_items** - Order line items
- **services** - Salon services
- **bookings** - Appointment scheduling
- **gallery** - Portfolio images
- **testimonials** - Customer reviews
- **notifications** - Real-time notifications
- **homepage_content** - CMS content

### Key Features
- **Type Safety** - Full TypeScript integration
- **Relationships** - Proper foreign key constraints
- **Real-time** - Supabase real-time subscriptions
- **Security** - Row Level Security (RLS) policies

## 🔔 Notification System

### Features
- **12 Notification Types** - Booking, Order, Payment, Product, System
- **Real-time Delivery** - Instant notification updates
- **User Preferences** - Granular notification control
- **Template System** - Pre-built notification messages
- **Multi-channel** - Email, push, and SMS support

### Usage
```typescript
import { NotificationService } from "@/src/libs/notifications/service";

// Send booking confirmation
await NotificationService.notifyBookingConfirmed(userId, {
  serviceName: "Hair Cut",
  date: "2024-01-15",
  time: "14:30"
});
```

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Environment Variables
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_anon_key
NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
DATABASE_URL=your_database_url
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is private and proprietary to Naomi Luxe.

## 👥 Team

- **Lead Developer**: Kristency
- **Client**: Naomi (Naomi Luxe Brand)

## 📞 Support

For support and questions:
- **Email**: info@naomi-luxe.com
- **Phone**: +234-800-000-0000
- **Address**: 123 Elegance Avenue, Lagos, Nigeria

---

**Built with ❤️ for luxury beauty and fashion**
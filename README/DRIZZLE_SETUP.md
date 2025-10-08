# 🗄️ Drizzle ORM Setup Guide

This guide explains how to set up and use Drizzle ORM with Supabase for the Naomi Luxe project.

## 📋 What's Been Set Up

### ✅ Database Schema
- **Products** - E-commerce inventory
- **Orders & Order Items** - Purchase transactions
- **Services** - Salon services
- **Bookings** - Appointment scheduling
- **Gallery** - Portfolio images
- **Testimonials** - Customer reviews
- **Homepage Content** - CMS-like content management

### ✅ Query Functions
- Complete CRUD operations for all tables
- Type-safe database queries
- Optimized joins and relationships

### ✅ Configuration Files
- `drizzle.config.ts` - Drizzle configuration
- Database connection utilities
- TypeScript types for all entities

## 🚀 Getting Started

### 1. Environment Setup

Copy the example environment file:
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

### 2. Database Setup

Push the schema to your Supabase database:
```bash
npm run db:push
```

### 3. Generate Migrations (Optional)
```bash
npm run db:generate
```

### 4. Open Drizzle Studio
```bash
npm run db:studio
```

## 📁 File Structure

```
src/db/
├── schema.ts          # Database schema definitions
├── index.ts           # Database connection
├── queries/           # Query functions
│   ├── products.ts
│   ├── orders.ts
│   ├── services.ts
│   ├── bookings.ts
│   ├── gallery.ts
│   ├── testimonials.ts
│   ├── homepage.ts
│   └── index.ts
└── migrations/        # Migration files
    └── README.md
```

## 🔧 Usage Examples

### Products
```typescript
import { getAllProducts, createProduct } from "@/src/db/queries";

// Get all products
const products = await getAllProducts();

// Create a new product
const newProduct = await createProduct({
  name: "Designer Shoes",
  description: "Luxury designer shoes",
  price: 299.99,
  category: "shoes",
  stock: 10,
  images: ["https://example.com/shoe1.jpg"]
});
```

### Bookings
```typescript
import { createBooking, getBookingsByUser } from "@/src/db/queries";

// Create a booking
const booking = await createBooking({
  userId: "user-uuid",
  serviceId: "service-uuid",
  bookingDate: "2024-01-15",
  bookingTime: "14:30",
  status: "pending"
});

// Get user bookings
const userBookings = await getBookingsByUser("user-uuid");
```

### Orders
```typescript
import { createOrder, addOrderItem, getOrderWithItems } from "@/src/db/queries";

// Create an order
const order = await createOrder({
  userId: "user-uuid",
  totalAmount: 299.99,
  paymentStatus: "pending"
});

// Add items to order
await addOrderItem({
  orderId: order.id,
  productId: "product-uuid",
  quantity: 1,
  unitPrice: 299.99
});

// Get order with items
const orderWithItems = await getOrderWithItems(order.id);
```

## 🎯 Key Features

### Type Safety
All queries are fully typed with TypeScript, providing:
- Autocomplete for table fields
- Compile-time error checking
- IntelliSense support

### Relationships
Proper foreign key relationships:
- Orders → Order Items
- Services → Bookings
- Products → Order Items

### Query Optimization
- Efficient joins
- Proper indexing
- Optimized select statements

## 🔒 Security

The database uses Supabase's Row Level Security (RLS) policies:
- Users can only access their own data
- Admins have full access
- Public can view products/services/gallery

## 📊 Database Schema

### Products Table
- `id` (UUID, Primary Key)
- `name` (Text)
- `description` (Text, Nullable)
- `price` (Numeric)
- `category` (Enum: shoes, clothes, accessories)
- `stock` (Integer)
- `images` (Text Array)
- `created_at` (Timestamp)

### Orders Table
- `id` (UUID, Primary Key)
- `user_id` (UUID, Foreign Key to auth.users)
- `total_amount` (Numeric)
- `payment_status` (Enum: pending, paid, failed, refunded)
- `created_at` (Timestamp)

### Services Table
- `id` (UUID, Primary Key)
- `name` (Text)
- `description` (Text, Nullable)
- `price` (Numeric)
- `duration` (Integer, minutes)
- `created_at` (Timestamp)

### Bookings Table
- `id` (UUID, Primary Key)
- `user_id` (UUID, Foreign Key to auth.users)
- `service_id` (UUID, Foreign Key to services)
- `booking_date` (Date)
- `booking_time` (Time)
- `status` (Enum: pending, confirmed, canceled, completed)
- `created_at` (Timestamp)

## 🚀 Next Steps

1. Set up your Supabase project
2. Configure environment variables
3. Run `npm run db:push` to create tables
4. Start building your application with type-safe database queries!

## 📚 Resources

- [Drizzle ORM Documentation](https://orm.drizzle.team/)
- [Supabase Documentation](https://supabase.com/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)

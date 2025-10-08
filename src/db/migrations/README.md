# Database Migrations

This directory contains Drizzle database migrations for the Naomi Luxe project.

## Commands

- `npm run db:generate` - Generate new migration files
- `npm run db:migrate` - Run pending migrations
- `npm run db:push` - Push schema changes directly to database
- `npm run db:studio` - Open Drizzle Studio for database management

## Setup

1. Set up your `.env` file with the `DATABASE_URL`
2. Run `npm run db:push` to create the initial schema
3. Use `npm run db:generate` for future schema changes

## Schema

The database schema includes:
- Products (e-commerce)
- Orders & Order Items
- Services (salon services)
- Bookings
- Gallery (portfolio)
- Testimonials
- Homepage Content

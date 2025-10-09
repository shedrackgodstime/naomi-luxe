# ✅ Backend Setup Checklist

Complete checklist for setting up the Naomi Luxe backend before frontend development.

## 🎯 Prerequisites

### 1. Install Dependencies

```bash
npm install
```

This installs:
- Next.js 15, React 19, TypeScript
- Supabase client & SSR
- Drizzle ORM
- React Email components
- Tailwind CSS, shadcn/ui
- Lucide icons

---

## 🗄️ Database Setup

### 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Create new project
3. Wait for database to provision
4. Copy project URL and API keys

### 2. Configure Environment Variables

Create `.env.local`:

```env
# Site
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=eyJhbGc...
NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...

# Database
DATABASE_URL=postgresql://postgres:[password]@db.xxxxx.supabase.co:5432/postgres

# Email (Brevo)
BREVO_API_KEY=xkeysib-xxxxx
EMAIL_FROM=noreply@naomi-luxe.com
EMAIL_FROM_NAME=Naomi Luxe

# Payments (optional for now)
STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx
STRIPE_SECRET_KEY=sk_test_xxxxx
PAYSTACK_PUBLIC_KEY=pk_test_xxxxx
PAYSTACK_SECRET_KEY=sk_test_xxxxx
```

### 3. Push Database Schema

```bash
npm run db:push
```

This creates all tables:
- products, orders, order_items
- services, bookings
- gallery, testimonials
- homepage_content
- notifications, notification_preferences

### 4. Verify in Drizzle Studio

```bash
npm run db:studio
```

Opens at `http://localhost:4983` - verify all tables exist.

---

## 🔐 Authentication Setup

### 1. Enable Email Auth in Supabase

1. Go to **Authentication → Providers**
2. Enable **Email** provider
3. Configure email templates (optional)

### 2. Configure Email Templates (Optional)

In Supabase Dashboard → **Authentication → Email Templates**:
- Confirmation email
- Password reset
- Email change

### 3. Test Auth

Auth is ready to use! No additional setup needed.

---

## 📁 Storage Setup

### 1. Create Storage Buckets

In Supabase Dashboard → **Storage**:

Create these buckets (all public):
- `products`
- `gallery`
- `avatars`
- `uploads`

### 2. Set Bucket Policies

For each bucket, add policies:

```sql
-- Public read
CREATE POLICY "Public read access" ON storage.objects
  FOR SELECT USING (bucket_id = 'products');

-- Authenticated upload
CREATE POLICY "Authenticated upload" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'products' AND
    auth.role() = 'authenticated'
  );

-- Admin delete
CREATE POLICY "Admin delete" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'products' AND
    (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
  );
```

Repeat for: `gallery`, `avatars`, `uploads`

---

## 📧 Email Setup

### 1. Create Brevo Account

1. Go to [brevo.com](https://www.brevo.com)
2. Sign up (free tier: 300 emails/day)
3. Verify your email

### 2. Get API Key

1. Go to **Settings → API Keys**
2. Create new API key
3. Copy and add to `.env.local`

### 3. Configure Sender

1. Go to **Senders & IP**
2. Add sender email: `noreply@naomi-luxe.com`
3. Verify email address

### 4. Test Email Preview

```bash
npm run email:dev
```

Opens at `http://localhost:3000` - preview all templates

### 5. Test Email Sending (Optional)

Send a test email to yourself to verify setup.

---

## 🔒 Row Level Security (RLS)

### 1. Enable RLS on All Tables

In Supabase SQL Editor, run for each table:

```sql
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE homepage_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE notification_preferences ENABLE ROW LEVEL SECURITY;
```

### 2. Create Policies

#### Public Read (Products, Services, Gallery, Testimonials)

```sql
-- Products
CREATE POLICY "Public read products" ON products
  FOR SELECT USING (true);

-- Services
CREATE POLICY "Public read services" ON services
  FOR SELECT USING (true);

-- Gallery
CREATE POLICY "Public read gallery" ON gallery
  FOR SELECT USING (true);

-- Testimonials
CREATE POLICY "Public read testimonials" ON testimonials
  FOR SELECT USING (true);
```

#### User-Owned Data (Orders, Bookings, Notifications)

```sql
-- Orders - users can view their own
CREATE POLICY "Users view own orders" ON orders
  FOR SELECT USING (auth.uid() = user_id);

-- Bookings - users can view their own
CREATE POLICY "Users view own bookings" ON bookings
  FOR SELECT USING (auth.uid() = user_id);

-- Notifications - users can view their own
CREATE POLICY "Users view own notifications" ON notifications
  FOR SELECT USING (auth.uid() = user_id);
```

#### Admin Full Access

```sql
-- Admins can do everything
CREATE POLICY "Admin full access products" ON products
  FOR ALL USING (
    (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
  );

-- Repeat for all tables
```

---

## 👑 Create Admin User

### Option 1: Via Supabase Dashboard

1. Go to **Authentication → Users**
2. Create new user
3. After creation, click on user
4. Go to **Raw User Meta Data**
5. Add to `app_metadata`:
   ```json
   {
     "role": "admin"
   }
   ```

### Option 2: Via SQL

```sql
-- Update existing user to admin
UPDATE auth.users
SET raw_app_meta_data = raw_app_meta_data || '{"role": "admin"}'::jsonb
WHERE email = 'admin@naomi-luxe.com';
```

---

## ✅ Verification Checklist

### Database
- [ ] All 10 tables created
- [ ] RLS enabled on all tables
- [ ] Policies created
- [ ] Can view in Drizzle Studio

### Authentication
- [ ] Email auth enabled
- [ ] Can sign up test user
- [ ] Can sign in
- [ ] Admin user created

### Storage
- [ ] 4 buckets created (products, gallery, avatars, uploads)
- [ ] Buckets are public
- [ ] Policies configured
- [ ] Can upload test file

### Email
- [ ] Brevo account created
- [ ] API key configured
- [ ] Sender email verified
- [ ] Email preview works (`npm run email:dev`)
- [ ] Test email sent successfully

### Development
- [ ] Dependencies installed
- [ ] Environment variables set
- [ ] Dev server runs (`npm run dev`)
- [ ] No TypeScript errors
- [ ] No linting errors

---

## 🚀 Start Development

Once all checks pass:

```bash
npm run dev
```

Visit `http://localhost:3000`

---

## 📊 What's Ready

### ✅ Backend (100% Complete)
- Authentication system
- Database with Drizzle ORM
- Server Actions (no API routes!)
- File upload system
- Email system
- Notification system

### 🚧 Frontend (Ready to Build)
- Auth pages (signin, signup, reset)
- Public pages (home, shop, services, gallery)
- User pages (bookings, orders, profile)
- Admin dashboard

---

## 🆘 Troubleshooting

### Database Connection Error
- Check `DATABASE_URL` format
- Verify Supabase project is active
- Check password is correct

### Auth Not Working
- Verify Supabase URL and keys
- Check email auth is enabled
- Clear browser cookies

### Upload Fails
- Verify buckets exist
- Check bucket policies
- Verify file size/type

### Email Not Sending
- Verify Brevo API key
- Check sender email is verified
- Check Brevo dashboard for errors

---

## 📚 Next Steps

1. **Complete this checklist**
2. **Start building frontend UI**
3. **Test all features**
4. **Add payment integration** (optional)
5. **Deploy to production**

---

**Backend is ready! Start building the frontend! 🎉**

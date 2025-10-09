# 🔐 Authentication System Setup Guide

Complete authentication backend for Naomi Luxe using Supabase Auth with role-based access control.

## 📋 What's Been Implemented

### ✅ Core Authentication
- **Sign Up** - User registration with metadata
- **Sign In** - Email/password authentication
- **Sign Out** - Session termination
- **Get Current User** - Retrieve authenticated user

### ✅ Password Management
- **Request Password Reset** - Email-based password recovery
- **Update Password** - Change user password

### ✅ Profile Management
- **Update Profile** - Modify user metadata (name, phone, avatar)
- **Get Profile** - Retrieve user profile information

### ✅ Admin Functions
- **Create User as Admin** - Admin-only user creation
- **Update User Role** - Change user roles (admin/customer)
- **Delete User** - Remove user accounts
- **Get User by ID** - Fetch specific user details
- **List Users** - Paginated user listing

### ✅ Role-Based Access Control (RBAC)
- **Check User Role** - Verify user's role
- **Is Admin** - Check if user is admin
- **Is Customer** - Check if user is customer
- **Require Auth** - Enforce authentication
- **Require Admin** - Enforce admin role
- **Require Customer** - Enforce customer role
- **Has Role** - Check specific role
- **Has Any Role** - Check multiple roles
- **Can Access Resource** - Resource ownership check

### ✅ Session Management
- **Get Session** - Retrieve current session
- **Refresh Session** - Renew access token
- **Is Session Valid** - Check session validity
- **Get Access Token** - Extract access token

### ✅ Middleware Protection
- **Protected Routes** - Auto-redirect unauthenticated users
- **Auth Routes** - Redirect authenticated users away from login
- **Admin Routes** - Enforce admin-only access

---

## 📁 File Structure

```
src/libs/auth/
├── types.ts           # TypeScript types and interfaces
├── service.ts         # Core auth functions (signup, signin, signout)
├── password.ts        # Password management
├── profile.ts         # Profile management
├── admin.ts           # Admin-only functions
├── rbac.ts            # Role-based access control
├── session.ts         # Session management
└── index.ts           # Main exports

src/libs/supabase/
├── client.ts          # Browser client
├── server.ts          # Server client
├── middleware.ts      # Route protection (UPDATED)
└── admin.ts           # Admin client
```

---

## 🚀 Usage Examples

### 1. Sign Up a New User

```typescript
import { signUp } from "@/src/libs/auth";

const result = await signUp({
  email: "user@example.com",
  password: "securePassword123",
  fullName: "John Doe",
  phoneNumber: "+234-800-000-0000",
});

if (result.success) {
  console.log("User created:", result.data);
} else {
  console.error("Error:", result.error.message);
}
```

### 2. Sign In

```typescript
import { signIn } from "@/src/libs/auth";

const result = await signIn({
  email: "user@example.com",
  password: "securePassword123",
});

if (result.success) {
  console.log("Logged in:", result.data);
  // Redirect to dashboard
} else {
  console.error("Invalid credentials:", result.error.message);
}
```

### 3. Get Current User

```typescript
import { getCurrentUser } from "@/src/libs/auth";

const result = await getCurrentUser();

if (result.success) {
  console.log("Current user:", result.data);
  console.log("Role:", result.data.role);
} else {
  console.log("Not authenticated");
}
```

### 4. Update Profile

```typescript
import { updateProfile } from "@/src/libs/auth";

const result = await updateProfile({
  fullName: "Jane Doe",
  phoneNumber: "+234-800-111-1111",
  avatarUrl: "https://example.com/avatar.jpg",
});

if (result.success) {
  console.log("Profile updated:", result.data);
}
```

### 5. Password Reset

```typescript
import { requestPasswordReset } from "@/src/libs/auth";

const result = await requestPasswordReset({
  email: "user@example.com",
});

if (result.success) {
  console.log("Password reset email sent");
}
```

### 6. Check User Role (Server Component)

```typescript
import { requireAuth, requireAdmin } from "@/src/libs/auth";

// In a server component or API route
export default async function AdminPage() {
  const user = await requireAdmin();
  
  if (!user) {
    redirect("/auth/signin");
  }
  
  return <div>Welcome Admin: {user.fullName}</div>;
}
```

### 7. Role-Based Access Control

```typescript
import { isAdmin, hasRole, canAccessResource } from "@/src/libs/auth";

// Check if current user is admin
const adminStatus = await isAdmin();

// Check if user has specific role
const user = await getCurrentUser();
if (user.success && hasRole(user.data, "admin")) {
  // Admin-only logic
}

// Check resource ownership
const canEdit = canAccessResource(user.data, resourceOwnerId);
```

### 8. Admin Functions

```typescript
import { createUserAsAdmin, updateUserRole, listUsers } from "@/src/libs/auth";

// Create user as admin
const result = await createUserAsAdmin(
  "newuser@example.com",
  "password123",
  "customer",
  {
    fullName: "New Customer",
    phoneNumber: "+234-800-222-2222",
  }
);

// Update user role
await updateUserRole(userId, "admin");

// List all users
const usersResult = await listUsers(1, 50);
if (usersResult.success) {
  console.log("Users:", usersResult.data.users);
}
```

### 9. Session Management

```typescript
import { getSession, refreshSession, isSessionValid } from "@/src/libs/auth";

// Get current session
const sessionResult = await getSession();
if (sessionResult.success) {
  console.log("Access token:", sessionResult.data.accessToken);
  console.log("Expires at:", sessionResult.data.expiresAt);
}

// Check if session is valid
const isValid = await isSessionValid();

// Refresh session
const refreshResult = await refreshSession();
```

---

## 🔒 User Roles

### Customer (Default)
- Can view products and services
- Can place orders
- Can book appointments
- Can manage own profile
- Can view own orders and bookings

### Admin
- All customer permissions
- Can manage products
- Can manage services
- Can manage bookings
- Can manage orders
- Can manage gallery
- Can manage testimonials
- Can manage users
- Can access admin dashboard

---

## 🛡️ Middleware Protection

The middleware automatically protects routes:

### Protected Routes (Require Authentication)
- `/admin/*` - Admin dashboard (admin role only)
- `/dashboard/*` - User dashboard
- `/profile/*` - User profile

### Auth Routes (Redirect if Authenticated)
- `/auth/signin` - Sign in page
- `/auth/signup` - Sign up page

### Configuration

Update protected routes in `src/libs/supabase/middleware.ts`:

```typescript
const protectedRoutes = ['/admin', '/dashboard', '/profile']
const authRoutes = ['/auth/signin', '/auth/signup']
```

---

## 🎯 Type Safety

All auth functions return `AuthResult<T>`:

```typescript
type AuthResult<T> =
  | { success: true; data: T }
  | { success: false; error: AuthError };
```

This ensures type-safe error handling:

```typescript
const result = await signIn(credentials);

if (result.success) {
  // TypeScript knows result.data is UserProfile
  console.log(result.data.email);
} else {
  // TypeScript knows result.error is AuthError
  console.error(result.error.type, result.error.message);
}
```

---

## 🔑 Environment Variables

Required in `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

---

## 🗄️ Supabase Setup

### 1. User Metadata Structure

**user_metadata** (editable by user):
```json
{
  "full_name": "John Doe",
  "phone_number": "+234-800-000-0000",
  "avatar_url": "https://example.com/avatar.jpg"
}
```

**app_metadata** (admin-only):
```json
{
  "role": "admin"
}
```

### 2. Default Role

New users are assigned `customer` role by default. Only admins can create users with `admin` role.

### 3. Email Confirmation

Configure email templates in Supabase Dashboard:
- Confirmation email
- Password reset email
- Email change confirmation

---

## 🚀 API Routes Examples

### Sign Up API Route

```typescript
// app/api/auth/signup/route.ts
import { signUp } from "@/src/libs/auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const result = await signUp(body);
  
  if (result.success) {
    return NextResponse.json(result.data);
  }
  
  return NextResponse.json(
    { error: result.error.message },
    { status: 400 }
  );
}
```

### Protected API Route

```typescript
// app/api/admin/users/route.ts
import { requireAdmin, listUsers } from "@/src/libs/auth";
import { NextResponse } from "next/server";

export async function GET() {
  const admin = await requireAdmin();
  
  if (!admin) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }
  
  const result = await listUsers();
  
  if (result.success) {
    return NextResponse.json(result.data);
  }
  
  return NextResponse.json(
    { error: result.error.message },
    { status: 500 }
  );
}
```

---

## 🔐 Security Best Practices

### 1. Never Expose Service Role Key
- Only use in server-side code
- Never send to client
- Store in environment variables

### 2. Use Row Level Security (RLS)
Configure RLS policies in Supabase for all tables:

```sql
-- Users can only view their own data
CREATE POLICY "Users can view own data" ON orders
  FOR SELECT USING (auth.uid() = user_id);

-- Admins can view all data
CREATE POLICY "Admins can view all data" ON orders
  FOR SELECT USING (
    (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
  );
```

### 3. Validate Input
Always validate user input before processing:

```typescript
import { z } from "zod";

const signUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  fullName: z.string().optional(),
});

const validated = signUpSchema.parse(input);
```

### 4. Rate Limiting
Implement rate limiting for auth endpoints to prevent brute force attacks.

---

## 📊 Error Handling

All auth functions return standardized errors:

```typescript
type AuthErrorType =
  | "invalid_credentials"
  | "user_not_found"
  | "email_already_exists"
  | "weak_password"
  | "invalid_token"
  | "session_expired"
  | "unauthorized"
  | "forbidden"
  | "unknown_error";
```

Handle errors gracefully:

```typescript
const result = await signIn(credentials);

if (!result.success) {
  switch (result.error.type) {
    case "invalid_credentials":
      return "Invalid email or password";
    case "session_expired":
      return "Your session has expired. Please sign in again.";
    default:
      return "An error occurred. Please try again.";
  }
}
```

---

## ✅ Next Steps

1. **Set up Supabase project** with email auth enabled
2. **Configure email templates** in Supabase dashboard
3. **Set environment variables** in `.env.local`
4. **Create auth UI pages** (signin, signup, reset password)
5. **Test authentication flow** in development
6. **Configure RLS policies** for database tables
7. **Add rate limiting** for production
8. **Set up monitoring** for auth events

---

## 📚 Resources

- [Supabase Auth Documentation](https://supabase.com/docs/guides/auth)
- [Next.js Authentication](https://nextjs.org/docs/authentication)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)

---

**Authentication backend is now fully set up and ready for frontend integration!** 🎉

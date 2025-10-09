# Auth Module Quick Reference

## Import Everything

```typescript
import {
  // Core auth
  signUp,
  signIn,
  signOut,
  getCurrentUser,
  
  // Password
  requestPasswordReset,
  updatePassword,
  
  // Profile
  updateProfile,
  getProfile,
  
  // Admin
  createUserAsAdmin,
  updateUserRole,
  deleteUser,
  getUserById,
  listUsers,
  
  // RBAC
  requireAuth,
  requireAdmin,
  isAdmin,
  hasRole,
  canAccessResource,
  
  // Session
  getSession,
  refreshSession,
  isSessionValid,
  
  // Types
  type UserProfile,
  type AuthResult,
  type UserRole,
} from "@/src/libs/auth";
```

## Quick Examples

### Sign Up
```typescript
const result = await signUp({
  email: "user@example.com",
  password: "password123",
  fullName: "John Doe",
});
```

### Sign In
```typescript
const result = await signIn({
  email: "user@example.com",
  password: "password123",
});
```

### Get Current User
```typescript
const result = await getCurrentUser();
if (result.success) {
  console.log(result.data.email, result.data.role);
}
```

### Protect Server Component
```typescript
export default async function ProtectedPage() {
  const user = await requireAuth();
  if (!user) redirect("/auth/signin");
  
  return <div>Hello {user.fullName}</div>;
}
```

### Admin-Only Page
```typescript
export default async function AdminPage() {
  const admin = await requireAdmin();
  if (!admin) redirect("/");
  
  return <div>Admin Dashboard</div>;
}
```

## File Structure

- `types.ts` - All TypeScript types
- `service.ts` - Core auth (signup, signin, signout)
- `password.ts` - Password management
- `profile.ts` - Profile updates
- `admin.ts` - Admin functions
- `rbac.ts` - Role-based access control
- `session.ts` - Session management
- `index.ts` - Main exports

## See Full Documentation

📖 [README/AUTH_SETUP.md](../../../README/AUTH_SETUP.md)

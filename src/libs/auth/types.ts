// Auth types and interfaces for Naomi Luxe

import type { User } from "@supabase/supabase-js";

// User roles
export type UserRole = "admin" | "customer";

// Extended user metadata
export interface UserMetadata {
  full_name?: string;
  phone_number?: string;
  avatar_url?: string;
  role?: UserRole;
}

// App metadata (admin-only, set by system)
export interface AppMetadata {
  role: UserRole;
  created_by?: string;
  updated_at?: string;
}

// Complete user profile
export interface UserProfile {
  id: string;
  email: string;
  role: UserRole;
  fullName?: string;
  phoneNumber?: string;
  avatarUrl?: string;
  emailVerified: boolean;
  createdAt: string;
  lastSignIn?: string;
}

// Auth session
export interface AuthSession {
  user: UserProfile;
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
}

// Sign up data
export interface SignUpData {
  email: string;
  password: string;
  fullName?: string;
  phoneNumber?: string;
  role?: UserRole; // Only settable by admin
}

// Sign in data
export interface SignInData {
  email: string;
  password: string;
}

// Update profile data
export interface UpdateProfileData {
  fullName?: string;
  phoneNumber?: string;
  avatarUrl?: string;
}

// Password reset data
export interface PasswordResetData {
  email: string;
}

// Password update data
export interface PasswordUpdateData {
  newPassword: string;
}

// Auth error types
export type AuthErrorType =
  | "invalid_credentials"
  | "user_not_found"
  | "email_already_exists"
  | "weak_password"
  | "invalid_token"
  | "session_expired"
  | "unauthorized"
  | "forbidden"
  | "unknown_error";

// Auth error
export interface AuthError {
  type: AuthErrorType;
  message: string;
  details?: unknown;
}

// Auth result
export type AuthResult<T> =
  | { success: true; data: T }
  | { success: false; error: AuthError };

// Helper to convert Supabase User to UserProfile
export function userToProfile(user: User): UserProfile {
  const metadata = user.user_metadata as UserMetadata;
  const appMetadata = user.app_metadata as AppMetadata;

  return {
    id: user.id,
    email: user.email || "",
    role: appMetadata?.role || "customer",
    fullName: metadata?.full_name,
    phoneNumber: metadata?.phone_number,
    avatarUrl: metadata?.avatar_url,
    emailVerified: !!user.email_confirmed_at,
    createdAt: user.created_at,
    lastSignIn: user.last_sign_in_at || undefined,
  };
}

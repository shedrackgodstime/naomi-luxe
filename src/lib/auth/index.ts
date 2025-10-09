// Auth module - Main exports
// Central export point for all authentication functionality

// Admin functions
export {
  createUserAsAdmin,
  deleteUser,
  getUserById,
  listUsers,
  updateUserRole,
} from "./admin";
// Password management
export { requestPasswordReset, updatePassword } from "./password";
// Profile management
export { getProfile, updateProfile } from "./profile";
// RBAC utilities
export {
  canAccessResource,
  checkUserRole,
  hasAnyRole,
  hasRole,
  isAdmin,
  isCustomer,
  requireAdmin,
  requireAuth,
  requireCustomer,
} from "./rbac";
// Core auth functions
export { getCurrentUser, signIn, signOut, signUp } from "./service";
// Session management
export {
  getAccessToken,
  getSession,
  isSessionValid,
  refreshSession,
} from "./session";
// Types
export type {
  AppMetadata,
  AuthError,
  AuthErrorType,
  AuthResult,
  AuthSession,
  PasswordResetData,
  PasswordUpdateData,
  SignInData,
  SignUpData,
  UpdateProfileData,
  UserMetadata,
  UserProfile,
  UserRole,
} from "./types";

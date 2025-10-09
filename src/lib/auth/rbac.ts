// Role-Based Access Control (RBAC) utilities
import { createClient } from "@/src/lib/supabase/server";
import type { UserProfile, UserRole } from "./types";
import { userToProfile as convertUser } from "./types";

export async function checkUserRole(): Promise<UserRole | null> {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return null;

    const profile = convertUser(user);
    return profile.role;
  } catch {
    return null;
  }
}

export async function isAdmin(): Promise<boolean> {
  const role = await checkUserRole();
  return role === "admin";
}

export async function isCustomer(): Promise<boolean> {
  const role = await checkUserRole();
  return role === "customer";
}

export async function requireAuth(): Promise<UserProfile | null> {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return null;

    return convertUser(user);
  } catch {
    return null;
  }
}

export async function requireAdmin(): Promise<UserProfile | null> {
  const user = await requireAuth();
  if (!user || user.role !== "admin") return null;
  return user;
}

export async function requireCustomer(): Promise<UserProfile | null> {
  const user = await requireAuth();
  if (!user || user.role !== "customer") return null;
  return user;
}

export function hasRole(user: UserProfile | null, role: UserRole): boolean {
  return user?.role === role;
}

export function hasAnyRole(
  user: UserProfile | null,
  roles: UserRole[],
): boolean {
  return user ? roles.includes(user.role) : false;
}

export function canAccessResource(
  user: UserProfile | null,
  resourceOwnerId: string,
): boolean {
  if (!user) return false;
  if (user.role === "admin") return true;
  return user.id === resourceOwnerId;
}

"use server";

// Admin Server Actions
import { revalidatePath } from "next/cache";
import type { UserRole } from "@/src/lib/auth";
import {
  createUserAsAdmin,
  deleteUser,
  getUserById,
  listUsers,
  requireAdmin,
  updateUserRole,
} from "@/src/lib/auth";

export async function createUserAction(data: {
  email: string;
  password: string;
  role?: UserRole;
  fullName?: string;
  phoneNumber?: string;
}) {
  const admin = await requireAdmin();
  if (!admin) {
    return { error: "Unauthorized: Admin access required" };
  }

  const result = await createUserAsAdmin(
    data.email,
    data.password,
    data.role || "customer",
    {
      fullName: data.fullName,
      phoneNumber: data.phoneNumber,
    },
  );

  if (!result.success) {
    return { error: result.error.message };
  }

  revalidatePath("/admin/users");
  return { user: result.data, message: "User created successfully" };
}

export async function updateUserRoleAction(userId: string, role: UserRole) {
  const admin = await requireAdmin();
  if (!admin) {
    return { error: "Unauthorized: Admin access required" };
  }

  const result = await updateUserRole(userId, role);

  if (!result.success) {
    return { error: result.error.message };
  }

  revalidatePath("/admin/users");
  return { user: result.data, message: "User role updated successfully" };
}

export async function deleteUserAction(userId: string) {
  const admin = await requireAdmin();
  if (!admin) {
    return { error: "Unauthorized: Admin access required" };
  }

  const result = await deleteUser(userId);

  if (!result.success) {
    return { error: result.error.message };
  }

  revalidatePath("/admin/users");
  return { success: true, message: "User deleted successfully" };
}

export async function getUserByIdAction(userId: string) {
  const admin = await requireAdmin();
  if (!admin) {
    return { error: "Unauthorized: Admin access required" };
  }

  const result = await getUserById(userId);

  if (!result.success) {
    return { error: result.error.message };
  }

  return { user: result.data };
}

export async function listUsersAction(page = 1, perPage = 50) {
  const admin = await requireAdmin();
  if (!admin) {
    return { error: "Unauthorized: Admin access required" };
  }

  const result = await listUsers(page, perPage);

  if (!result.success) {
    return { error: result.error.message };
  }

  return { users: result.data.users, total: result.data.total };
}

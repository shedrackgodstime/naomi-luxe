"use server";

// Auth Server Actions
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type {
  PasswordResetData,
  PasswordUpdateData,
  SignInData,
  SignUpData,
  UpdateProfileData,
} from "@/src/libs/auth";
import {
  requestPasswordReset as authRequestPasswordReset,
  signIn as authSignIn,
  signOut as authSignOut,
  signUp as authSignUp,
  updatePassword as authUpdatePassword,
  updateProfile as authUpdateProfile,
  getCurrentUser,
} from "@/src/libs/auth";
import { sendWelcomeEmail } from "@/src/libs/email";

export async function signUpAction(data: SignUpData) {
  const result = await authSignUp(data);

  if (!result.success) {
    return { error: result.error.message };
  }

  // Send welcome email
  if (result.data.email) {
    await sendWelcomeEmail({
      to: result.data.email,
      customerName: result.data.fullName || result.data.email,
    });
  }

  revalidatePath("/");
  redirect("/");
}

export async function signInAction(data: SignInData) {
  const result = await authSignIn(data);

  if (!result.success) {
    return { error: result.error.message };
  }

  revalidatePath("/");
  redirect("/");
}

export async function signOutAction() {
  const result = await authSignOut();

  if (!result.success) {
    return { error: result.error.message };
  }

  revalidatePath("/");
  redirect("/");
}

export async function getCurrentUserAction() {
  const result = await getCurrentUser();

  if (!result.success) {
    return { error: result.error.message };
  }

  return { user: result.data };
}

export async function updateProfileAction(data: UpdateProfileData) {
  const result = await authUpdateProfile(data);

  if (!result.success) {
    return { error: result.error.message };
  }

  revalidatePath("/profile");
  return { user: result.data };
}

export async function requestPasswordResetAction(data: PasswordResetData) {
  const result = await authRequestPasswordReset(data);

  if (!result.success) {
    return { error: result.error.message };
  }

  return { success: true, message: "Password reset email sent" };
}

export async function updatePasswordAction(data: PasswordUpdateData) {
  const result = await authUpdatePassword(data);

  if (!result.success) {
    return { error: result.error.message };
  }

  return { success: true, message: "Password updated successfully" };
}

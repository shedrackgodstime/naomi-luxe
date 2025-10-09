// Password management functions
import { createClient } from "@/src/libs/supabase/server";
import type {
  AuthResult,
  PasswordResetData,
  PasswordUpdateData,
} from "./types";

export async function requestPasswordReset(
  data: PasswordResetData,
): Promise<AuthResult<void>> {
  try {
    const supabase = await createClient();

    const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/reset-password`,
    });

    if (error) {
      return {
        success: false,
        error: {
          type: "unknown_error",
          message: error.message,
          details: error,
        },
      };
    }

    return { success: true, data: undefined };
  } catch (error) {
    return {
      success: false,
      error: {
        type: "unknown_error",
        message: error instanceof Error ? error.message : "Unknown error",
        details: error,
      },
    };
  }
}

export async function updatePassword(
  data: PasswordUpdateData,
): Promise<AuthResult<void>> {
  try {
    const supabase = await createClient();

    const { error } = await supabase.auth.updateUser({
      password: data.newPassword,
    });

    if (error) {
      return {
        success: false,
        error: {
          type: error.message.includes("weak")
            ? "weak_password"
            : "unknown_error",
          message: error.message,
          details: error,
        },
      };
    }

    return { success: true, data: undefined };
  } catch (error) {
    return {
      success: false,
      error: {
        type: "unknown_error",
        message: error instanceof Error ? error.message : "Unknown error",
        details: error,
      },
    };
  }
}

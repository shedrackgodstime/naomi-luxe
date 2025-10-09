// User profile management functions
import { createClient } from "@/src/lib/supabase/server";
import type { AuthResult, UpdateProfileData, UserProfile } from "./types";
import { userToProfile as convertUser } from "./types";

export async function updateProfile(
  data: UpdateProfileData,
): Promise<AuthResult<UserProfile>> {
  try {
    const supabase = await createClient();

    const { data: userData, error } = await supabase.auth.updateUser({
      data: {
        full_name: data.fullName,
        phone_number: data.phoneNumber,
        avatar_url: data.avatarUrl,
      },
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

    if (!userData.user) {
      return {
        success: false,
        error: {
          type: "user_not_found",
          message: "User not found",
        },
      };
    }

    return {
      success: true,
      data: convertUser(userData.user),
    };
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

export async function getProfile(): Promise<AuthResult<UserProfile>> {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error) {
      return {
        success: false,
        error: {
          type: "session_expired",
          message: error.message,
          details: error,
        },
      };
    }

    if (!user) {
      return {
        success: false,
        error: {
          type: "user_not_found",
          message: "No user session found",
        },
      };
    }

    return {
      success: true,
      data: convertUser(user),
    };
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

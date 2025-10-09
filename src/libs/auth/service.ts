// Auth service - Part 1: Core authentication functions
import { createClient } from "@/src/libs/supabase/server";
import type { AuthResult, SignInData, SignUpData, UserProfile } from "./types";
import { userToProfile as convertUser } from "./types";

export async function signUp(
  data: SignUpData,
): Promise<AuthResult<UserProfile>> {
  try {
    const supabase = await createClient();

    const { data: authData, error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          full_name: data.fullName,
          phone_number: data.phoneNumber,
        },
      },
    });

    if (error) {
      return {
        success: false,
        error: {
          type: error.message.includes("already registered")
            ? "email_already_exists"
            : "unknown_error",
          message: error.message,
          details: error,
        },
      };
    }

    if (!authData.user) {
      return {
        success: false,
        error: {
          type: "unknown_error",
          message: "User creation failed",
        },
      };
    }

    return {
      success: true,
      data: convertUser(authData.user),
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

export async function signIn(
  data: SignInData,
): Promise<AuthResult<UserProfile>> {
  try {
    const supabase = await createClient();

    const { data: authData, error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (error) {
      return {
        success: false,
        error: {
          type: error.message.includes("Invalid login credentials")
            ? "invalid_credentials"
            : "unknown_error",
          message: error.message,
          details: error,
        },
      };
    }

    if (!authData.user) {
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
      data: convertUser(authData.user),
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

export async function signOut(): Promise<AuthResult<void>> {
  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.signOut();

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

export async function getCurrentUser(): Promise<AuthResult<UserProfile>> {
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

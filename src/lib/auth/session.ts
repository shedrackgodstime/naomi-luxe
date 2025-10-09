// Session management utilities
import { createClient } from "@/src/lib/supabase/server";
import type { AuthResult, AuthSession } from "./types";
import { userToProfile as convertUser } from "./types";

export async function getSession(): Promise<AuthResult<AuthSession>> {
  try {
    const supabase = await createClient();
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

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

    if (!session) {
      return {
        success: false,
        error: {
          type: "session_expired",
          message: "No active session",
        },
      };
    }

    return {
      success: true,
      data: {
        user: convertUser(session.user),
        accessToken: session.access_token,
        refreshToken: session.refresh_token,
        expiresAt: session.expires_at || 0,
      },
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

export async function refreshSession(): Promise<AuthResult<AuthSession>> {
  try {
    const supabase = await createClient();
    const {
      data: { session },
      error,
    } = await supabase.auth.refreshSession();

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

    if (!session) {
      return {
        success: false,
        error: {
          type: "session_expired",
          message: "Failed to refresh session",
        },
      };
    }

    return {
      success: true,
      data: {
        user: convertUser(session.user),
        accessToken: session.access_token,
        refreshToken: session.refresh_token,
        expiresAt: session.expires_at || 0,
      },
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

export async function isSessionValid(): Promise<boolean> {
  const result = await getSession();
  return result.success;
}

export async function getAccessToken(): Promise<string | null> {
  const result = await getSession();
  return result.success ? result.data.accessToken : null;
}

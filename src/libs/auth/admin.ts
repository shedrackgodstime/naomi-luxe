// Admin-only auth functions
import { adminAuthClient } from "@/src/libs/supabase/admin";
import type { AuthResult, UserProfile, UserRole } from "./types";
import { userToProfile as convertUser } from "./types";

export async function createUserAsAdmin(
  email: string,
  password: string,
  role: UserRole = "customer",
  metadata?: {
    fullName?: string;
    phoneNumber?: string;
  },
): Promise<AuthResult<UserProfile>> {
  try {
    const { data, error } = await adminAuthClient.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        full_name: metadata?.fullName,
        phone_number: metadata?.phoneNumber,
      },
      app_metadata: {
        role,
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

    if (!data.user) {
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
      data: convertUser(data.user),
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

export async function updateUserRole(
  userId: string,
  role: UserRole,
): Promise<AuthResult<UserProfile>> {
  try {
    const { data, error } = await adminAuthClient.updateUserById(userId, {
      app_metadata: { role },
    });

    if (error) {
      return {
        success: false,
        error: {
          type: "user_not_found",
          message: error.message,
          details: error,
        },
      };
    }

    if (!data.user) {
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
      data: convertUser(data.user),
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

export async function deleteUser(userId: string): Promise<AuthResult<void>> {
  try {
    const { error } = await adminAuthClient.deleteUser(userId);

    if (error) {
      return {
        success: false,
        error: {
          type: "user_not_found",
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

export async function getUserById(
  userId: string,
): Promise<AuthResult<UserProfile>> {
  try {
    const { data, error } = await adminAuthClient.getUserById(userId);

    if (error) {
      return {
        success: false,
        error: {
          type: "user_not_found",
          message: error.message,
          details: error,
        },
      };
    }

    if (!data.user) {
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
      data: convertUser(data.user),
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

export async function listUsers(
  page = 1,
  perPage = 50,
): Promise<AuthResult<{ users: UserProfile[]; total: number }>> {
  try {
    const { data, error } = await adminAuthClient.listUsers({
      page,
      perPage,
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

    return {
      success: true,
      data: {
        users: data.users.map(convertUser),
        total: data.users.length,
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

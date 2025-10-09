"use server";

// File Upload Server Actions
import { revalidatePath } from "next/cache";
import { requireAdmin, requireAuth } from "@/src/lib/auth";
import type { StorageBucket } from "@/src/lib/storage";
import {
  deleteFileServer,
  deleteMultipleFilesServer,
  uploadFileServer,
} from "@/src/lib/storage";

/**
 * Upload product image (admin only)
 */
export async function uploadProductImageAction(formData: FormData) {
  const admin = await requireAdmin();
  if (!admin) {
    return { error: "Unauthorized: Admin access required" };
  }

  try {
    const file = formData.get("file") as File;
    if (!file) {
      return { error: "No file provided" };
    }

    const result = await uploadFileServer(file, "products");

    if (!result.success) {
      return { error: result.error };
    }

    revalidatePath("/admin/products");
    return {
      success: true,
      url: result.url,
      path: result.path,
      message: "Image uploaded successfully",
    };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Upload failed",
    };
  }
}

/**
 * Upload multiple product images (admin only)
 */
export async function uploadProductImagesAction(formData: FormData) {
  const admin = await requireAdmin();
  if (!admin) {
    return { error: "Unauthorized: Admin access required" };
  }

  try {
    const files = formData.getAll("files") as File[];
    if (!files || files.length === 0) {
      return { error: "No files provided" };
    }

    const results = await Promise.all(
      files.map((file) => uploadFileServer(file, "products")),
    );

    const successful = results.filter((r) => r.success);
    const failed = results.filter((r) => !r.success);

    revalidatePath("/admin/products");

    return {
      success: true,
      uploaded: successful.map((r) => ({ url: r.url, path: r.path })),
      failed: failed.length,
      message: `${successful.length} images uploaded successfully`,
    };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Upload failed",
    };
  }
}

/**
 * Upload gallery image (admin only)
 */
export async function uploadGalleryImageAction(formData: FormData) {
  const admin = await requireAdmin();
  if (!admin) {
    return { error: "Unauthorized: Admin access required" };
  }

  try {
    const file = formData.get("file") as File;
    if (!file) {
      return { error: "No file provided" };
    }

    const result = await uploadFileServer(file, "gallery");

    if (!result.success) {
      return { error: result.error };
    }

    revalidatePath("/gallery");
    revalidatePath("/admin/gallery");
    return {
      success: true,
      url: result.url,
      path: result.path,
      message: "Gallery image uploaded successfully",
    };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Upload failed",
    };
  }
}

/**
 * Upload avatar (authenticated users)
 */
export async function uploadAvatarAction(formData: FormData) {
  const user = await requireAuth();
  if (!user) {
    return { error: "Unauthorized: Please sign in" };
  }

  try {
    const file = formData.get("file") as File;
    if (!file) {
      return { error: "No file provided" };
    }

    // Delete old avatar if exists
    // You can track the old avatar path in user metadata

    const result = await uploadFileServer(file, "avatars", user.id);

    if (!result.success) {
      return { error: result.error };
    }

    revalidatePath("/profile");
    return {
      success: true,
      url: result.url,
      path: result.path,
      message: "Avatar uploaded successfully",
    };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Upload failed",
    };
  }
}

/**
 * Delete file from storage (admin only)
 */
export async function deleteFileAction(bucket: StorageBucket, path: string) {
  const admin = await requireAdmin();
  if (!admin) {
    return { error: "Unauthorized: Admin access required" };
  }

  try {
    const result = await deleteFileServer(bucket, path);

    if (!result.success) {
      return { error: result.error };
    }

    revalidatePath("/admin");
    return { success: true, message: "File deleted successfully" };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Delete failed",
    };
  }
}

/**
 * Delete multiple files (admin only)
 */
export async function deleteMultipleFilesAction(
  bucket: StorageBucket,
  paths: string[],
) {
  const admin = await requireAdmin();
  if (!admin) {
    return { error: "Unauthorized: Admin access required" };
  }

  try {
    const result = await deleteMultipleFilesServer(bucket, paths);

    if (!result.success) {
      return { error: result.error };
    }

    revalidatePath("/admin");
    return {
      success: true,
      message: `${paths.length} files deleted successfully`,
    };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Delete failed",
    };
  }
}

/**
 * Delete user's own avatar
 */
export async function deleteAvatarAction(path: string) {
  const user = await requireAuth();
  if (!user) {
    return { error: "Unauthorized: Please sign in" };
  }

  try {
    // Verify the path belongs to the user
    if (!path.includes(user.id)) {
      return { error: "Unauthorized: Cannot delete this file" };
    }

    const result = await deleteFileServer("avatars", path);

    if (!result.success) {
      return { error: result.error };
    }

    revalidatePath("/profile");
    return { success: true, message: "Avatar deleted successfully" };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Delete failed",
    };
  }
}

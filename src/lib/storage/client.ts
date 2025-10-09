// Storage client utilities (browser-side)
import { createClient } from "@/src/lib/supabase/client";
import type {
  DeleteResult,
  StorageBucket,
  UploadOptions,
  UploadResult,
} from "./types";
import { generateFileName, validateFile } from "./types";

/**
 * Upload a file to Supabase Storage (client-side)
 */
export async function uploadFile(
  file: File,
  options: UploadOptions,
): Promise<UploadResult> {
  try {
    // Validate file
    const validation = validateFile(file, options.bucket);
    if (!validation.valid) {
      return {
        success: false,
        error: validation.error,
      };
    }

    const supabase = createClient();

    // Generate unique filename
    const fileName = generateFileName(file.name, options.path);
    const filePath = options.path ? `${options.path}/${fileName}` : fileName;

    // Upload file
    const { data, error } = await supabase.storage
      .from(options.bucket)
      .upload(filePath, file, {
        upsert: options.upsert || false,
        contentType: options.contentType || file.type,
      });

    if (error) {
      return {
        success: false,
        error: error.message,
      };
    }

    // Get public URL
    const {
      data: { publicUrl },
    } = supabase.storage.from(options.bucket).getPublicUrl(data.path);

    return {
      success: true,
      url: publicUrl,
      path: data.path,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Upload failed",
    };
  }
}

/**
 * Upload multiple files
 */
export async function uploadMultipleFiles(
  files: File[],
  options: UploadOptions,
): Promise<UploadResult[]> {
  const results = await Promise.all(
    files.map((file) => uploadFile(file, options)),
  );
  return results;
}

/**
 * Delete a file from storage
 */
export async function deleteFile(
  bucket: StorageBucket,
  path: string,
): Promise<DeleteResult> {
  try {
    const supabase = createClient();

    const { error } = await supabase.storage.from(bucket).remove([path]);

    if (error) {
      return {
        success: false,
        error: error.message,
      };
    }

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Delete failed",
    };
  }
}

/**
 * Delete multiple files
 */
export async function deleteMultipleFiles(
  bucket: StorageBucket,
  paths: string[],
): Promise<DeleteResult> {
  try {
    const supabase = createClient();

    const { error } = await supabase.storage.from(bucket).remove(paths);

    if (error) {
      return {
        success: false,
        error: error.message,
      };
    }

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Delete failed",
    };
  }
}

/**
 * Get public URL for a file
 */
export function getPublicUrl(bucket: StorageBucket, path: string): string {
  const supabase = createClient();
  const {
    data: { publicUrl },
  } = supabase.storage.from(bucket).getPublicUrl(path);
  return publicUrl;
}

/**
 * List files in a bucket path
 */
export async function listFiles(bucket: StorageBucket, path?: string) {
  try {
    const supabase = createClient();

    const { data, error } = await supabase.storage
      .from(bucket)
      .list(path || "", {
        limit: 100,
        sortBy: { column: "created_at", order: "desc" },
      });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, files: data };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "List failed",
    };
  }
}

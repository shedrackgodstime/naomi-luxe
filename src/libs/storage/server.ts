// Storage server utilities (server-side)
import { createClient } from "@/src/libs/supabase/server";
import type { DeleteResult, StorageBucket, UploadResult } from "./types";
import { generateFileName } from "./types";

/**
 * Upload a file to Supabase Storage (server-side)
 */
export async function uploadFileServer(
  file: File,
  bucket: StorageBucket,
  path?: string,
): Promise<UploadResult> {
  try {
    const supabase = await createClient();

    // Generate unique filename
    const fileName = generateFileName(file.name, path);
    const filePath = path ? `${path}/${fileName}` : fileName;

    // Convert File to ArrayBuffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload file
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(filePath, buffer, {
        contentType: file.type,
        upsert: false,
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
    } = supabase.storage.from(bucket).getPublicUrl(data.path);

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
 * Delete a file from storage (server-side)
 */
export async function deleteFileServer(
  bucket: StorageBucket,
  path: string,
): Promise<DeleteResult> {
  try {
    const supabase = await createClient();

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
 * Delete multiple files (server-side)
 */
export async function deleteMultipleFilesServer(
  bucket: StorageBucket,
  paths: string[],
): Promise<DeleteResult> {
  try {
    const supabase = await createClient();

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
 * Get public URL for a file (server-side)
 */
export async function getPublicUrlServer(
  bucket: StorageBucket,
  path: string,
): Promise<string> {
  const supabase = await createClient();
  const {
    data: { publicUrl },
  } = supabase.storage.from(bucket).getPublicUrl(path);
  return publicUrl;
}

/**
 * Move/rename a file
 */
export async function moveFile(
  bucket: StorageBucket,
  fromPath: string,
  toPath: string,
): Promise<DeleteResult> {
  try {
    const supabase = await createClient();

    const { error } = await supabase.storage
      .from(bucket)
      .move(fromPath, toPath);

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
      error: error instanceof Error ? error.message : "Move failed",
    };
  }
}

/**
 * Copy a file
 */
export async function copyFile(
  bucket: StorageBucket,
  fromPath: string,
  toPath: string,
): Promise<DeleteResult> {
  try {
    const supabase = await createClient();

    const { error } = await supabase.storage
      .from(bucket)
      .copy(fromPath, toPath);

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
      error: error instanceof Error ? error.message : "Copy failed",
    };
  }
}

// Storage types and interfaces

export type StorageBucket = "products" | "gallery" | "avatars" | "uploads";

export interface UploadOptions {
  bucket: StorageBucket;
  path?: string;
  upsert?: boolean;
  contentType?: string;
}

export interface UploadResult {
  success: boolean;
  url?: string;
  path?: string;
  error?: string;
}

export interface DeleteResult {
  success: boolean;
  error?: string;
}

export interface FileValidation {
  maxSize: number; // in bytes
  allowedTypes: string[];
  allowedExtensions: string[];
}

export const FILE_VALIDATIONS: Record<StorageBucket, FileValidation> = {
  products: {
    maxSize: 5 * 1024 * 1024, // 5MB
    allowedTypes: ["image/jpeg", "image/png", "image/webp", "image/jpg"],
    allowedExtensions: [".jpg", ".jpeg", ".png", ".webp"],
  },
  gallery: {
    maxSize: 10 * 1024 * 1024, // 10MB
    allowedTypes: ["image/jpeg", "image/png", "image/webp", "image/jpg"],
    allowedExtensions: [".jpg", ".jpeg", ".png", ".webp"],
  },
  avatars: {
    maxSize: 2 * 1024 * 1024, // 2MB
    allowedTypes: ["image/jpeg", "image/png", "image/webp", "image/jpg"],
    allowedExtensions: [".jpg", ".jpeg", ".png", ".webp"],
  },
  uploads: {
    maxSize: 10 * 1024 * 1024, // 10MB
    allowedTypes: [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/jpg",
      "application/pdf",
    ],
    allowedExtensions: [".jpg", ".jpeg", ".png", ".webp", ".pdf"],
  },
};

export function validateFile(
  file: File,
  bucket: StorageBucket,
): { valid: boolean; error?: string } {
  const validation = FILE_VALIDATIONS[bucket];

  // Check file size
  if (file.size > validation.maxSize) {
    return {
      valid: false,
      error: `File size exceeds ${validation.maxSize / 1024 / 1024}MB limit`,
    };
  }

  // Check file type
  if (!validation.allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: `File type ${file.type} is not allowed`,
    };
  }

  // Check file extension
  const extension = `.${file.name.split(".").pop()?.toLowerCase()}`;
  if (!validation.allowedExtensions.includes(extension)) {
    return {
      valid: false,
      error: `File extension ${extension} is not allowed`,
    };
  }

  return { valid: true };
}

export function generateFileName(
  originalName: string,
  prefix?: string,
): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 9);
  const extension = originalName.split(".").pop();
  const sanitized = originalName
    .split(".")[0]
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "-");

  if (prefix) {
    return `${prefix}-${sanitized}-${timestamp}-${random}.${extension}`;
  }

  return `${sanitized}-${timestamp}-${random}.${extension}`;
}

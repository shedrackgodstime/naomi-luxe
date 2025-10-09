// Storage module - Main exports

// Client-side functions (for use in client components)
export {
  deleteFile,
  deleteMultipleFiles,
  getPublicUrl,
  listFiles,
  uploadFile,
  uploadMultipleFiles,
} from "./client";
// Server-side functions (for use in server actions)
export {
  copyFile,
  deleteFileServer,
  deleteMultipleFilesServer,
  getPublicUrlServer,
  moveFile,
  uploadFileServer,
} from "./server";
// Types
export type {
  DeleteResult,
  FileValidation,
  StorageBucket,
  UploadOptions,
  UploadResult,
} from "./types";
export { FILE_VALIDATIONS, generateFileName, validateFile } from "./types";

# Storage Module - Quick Reference

## Import Storage Functions

```typescript
import {
  // Client-side
  uploadFile,
  uploadMultipleFiles,
  deleteFile,
  getPublicUrl,
  
  // Server-side
  uploadFileServer,
  deleteFileServer,
  
  // Hooks
  useFileUpload,
  useMultipleFileUpload,
  useDropzone,
  
  // Types
  type StorageBucket,
  type UploadOptions,
  validateFile,
} from "@/src/libs/storage";
```

## Quick Examples

### Upload Single File (Client)
```typescript
const result = await uploadFile(file, {
  bucket: "products",
  path: "product-images",
});

if (result.success) {
  console.log("URL:", result.url);
}
```

### Upload with Hook
```typescript
const { uploading, upload, result } = useFileUpload();

await upload(file, { bucket: "avatars" });
```

### Drag & Drop
```typescript
const { isDragging, dragProps } = useDropzone({
  onDrop: (files) => {
    // Handle dropped files
  },
  accept: [".jpg", ".png"],
  maxFiles: 5,
});

return <div {...dragProps}>Drop files here</div>;
```

### Server Action Upload
```typescript
import { uploadProductImageAction } from "@/src/actions";

// In a form
<form action={uploadProductImageAction}>
  <input type="file" name="file" />
  <button type="submit">Upload</button>
</form>
```

## Storage Buckets

- **`products`** - Product images (5MB, images only)
- **`gallery`** - Portfolio images (10MB, images only)
- **`avatars`** - User avatars (2MB, images only)
- **`uploads`** - General files (10MB, images + PDFs)

## File Validation

```typescript
const validation = validateFile(file, "products");

if (!validation.valid) {
  console.error(validation.error);
}
```

## Get Public URL

```typescript
const url = getPublicUrl("products", "path/to/file.jpg");
```

## Delete File

```typescript
await deleteFile("products", "path/to/file.jpg");
```

## See Full Documentation

📖 [README/STORAGE_SETUP.md](../../../README/STORAGE_SETUP.md)

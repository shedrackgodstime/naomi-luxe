# 📁 File Upload & Storage System

Complete guide to file uploads and storage management using Supabase Storage.

## 📋 What's Been Implemented

### ✅ Storage Utilities
- **Client-side upload** - Browser file uploads
- **Server-side upload** - Server action uploads
- **File validation** - Size and type checking
- **Multiple uploads** - Batch file uploads
- **File deletion** - Remove files from storage
- **Public URLs** - Get shareable file links

### ✅ Storage Buckets
- **`products`** - Product images (5MB max, images only)
- **`gallery`** - Portfolio/gallery images (10MB max, images only)
- **`avatars`** - User profile pictures (2MB max, images only)
- **`uploads`** - General uploads (10MB max, images + PDFs)

### ✅ React Hooks
- **`useFileUpload`** - Single file upload hook
- **`useMultipleFileUpload`** - Multiple files upload hook
- **`useDropzone`** - Drag & drop functionality

### ✅ Server Actions
- Upload product images (admin)
- Upload gallery images (admin)
- Upload avatars (users)
- Delete files (admin/owner)

---

## 🗂️ File Structure

```
src/libs/storage/
├── types.ts          # Types, validation, file naming
├── client.ts         # Client-side upload functions
├── server.ts         # Server-side upload functions
├── hooks.ts          # React hooks for uploads
└── index.ts          # Main exports

src/actions/
└── upload.ts         # Upload server actions
```

---

## 🚀 Usage Examples

### 1. Client-Side Upload (Simple)

```typescript
"use client";

import { uploadFile } from "@/src/libs/storage";
import { useState } from "react";

export function ProductImageUpload() {
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);

    const result = await uploadFile(file, {
      bucket: "products",
      path: "product-images",
    });

    if (result.success) {
      setImageUrl(result.url!);
    } else {
      alert(result.error);
    }

    setUploading(false);
  };

  return (
    <div>
      <input type="file" onChange={handleUpload} accept="image/*" />
      {uploading && <p>Uploading...</p>}
      {imageUrl && <img src={imageUrl} alt="Uploaded" />}
    </div>
  );
}
```

### 2. Using React Hook

```typescript
"use client";

import { useFileUpload } from "@/src/libs/storage/hooks";

export function AvatarUpload() {
  const { uploading, error, result, upload, reset } = useFileUpload();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    await upload(file, {
      bucket: "avatars",
    });
  };

  return (
    <div>
      <input
        type="file"
        onChange={handleFileChange}
        accept="image/*"
        disabled={uploading}
      />
      
      {uploading && <p>Uploading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {result?.success && (
        <div>
          <p className="text-green-500">Upload successful!</p>
          <img src={result.url} alt="Avatar" className="w-20 h-20 rounded-full" />
        </div>
      )}
      
      <button onClick={reset}>Reset</button>
    </div>
  );
}
```

### 3. Multiple File Upload

```typescript
"use client";

import { useMultipleFileUpload } from "@/src/libs/storage/hooks";

export function GalleryUpload() {
  const { uploading, error, results, upload } = useMultipleFileUpload();

  const handleFilesChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    await upload(files, {
      bucket: "gallery",
    });
  };

  return (
    <div>
      <input
        type="file"
        multiple
        onChange={handleFilesChange}
        accept="image/*"
        disabled={uploading}
      />
      
      {uploading && <p>Uploading {results.length} files...</p>}
      {error && <p className="text-red-500">{error}</p>}
      
      <div className="grid grid-cols-3 gap-4">
        {results.map((result, index) => (
          <div key={index}>
            {result.success ? (
              <img src={result.url} alt={`Upload ${index}`} />
            ) : (
              <p className="text-red-500">Failed: {result.error}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
```

### 4. Drag & Drop Upload

```typescript
"use client";

import { useDropzone, useFileUpload } from "@/src/libs/storage/hooks";

export function DragDropUpload() {
  const { upload, uploading, result } = useFileUpload();
  
  const { isDragging, dragProps } = useDropzone({
    onDrop: async (files) => {
      if (files.length > 0) {
        await upload(files[0], { bucket: "products" });
      }
    },
    accept: [".jpg", ".jpeg", ".png", ".webp"],
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024, // 5MB
  });

  return (
    <div
      {...dragProps}
      className={`border-2 border-dashed p-8 rounded-lg ${
        isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"
      }`}
    >
      {uploading ? (
        <p>Uploading...</p>
      ) : (
        <p>Drag & drop an image here, or click to select</p>
      )}
      
      {result?.success && (
        <img src={result.url} alt="Uploaded" className="mt-4" />
      )}
    </div>
  );
}
```

### 5. Server Action Upload (Form)

```typescript
"use client";

import { uploadProductImageAction } from "@/src/actions";
import { useFormState, useFormStatus } from "react-dom";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending}>
      {pending ? "Uploading..." : "Upload"}
    </button>
  );
}

export function ProductImageForm() {
  const [state, formAction] = useFormState(uploadProductImageAction, null);

  return (
    <form action={formAction}>
      <input type="file" name="file" accept="image/*" required />
      <SubmitButton />
      
      {state?.error && <p className="text-red-500">{state.error}</p>}
      {state?.success && (
        <div>
          <p className="text-green-500">{state.message}</p>
          <img src={state.url} alt="Uploaded" />
        </div>
      )}
    </form>
  );
}
```

### 6. Delete File

```typescript
"use client";

import { deleteFile } from "@/src/libs/storage";

export function DeleteImageButton({ 
  bucket, 
  path 
}: { 
  bucket: "products" | "gallery" | "avatars"; 
  path: string;
}) {
  const handleDelete = async () => {
    if (!confirm("Are you sure?")) return;

    const result = await deleteFile(bucket, path);

    if (result.success) {
      alert("Deleted successfully");
    } else {
      alert(result.error);
    }
  };

  return (
    <button onClick={handleDelete} className="btn-danger">
      Delete
    </button>
  );
}
```

---

## 🔒 File Validation

### Automatic Validation

Files are automatically validated based on bucket:

```typescript
// Products bucket
{
  maxSize: 5MB,
  allowedTypes: ["image/jpeg", "image/png", "image/webp"],
  allowedExtensions: [".jpg", ".jpeg", ".png", ".webp"]
}

// Gallery bucket
{
  maxSize: 10MB,
  allowedTypes: ["image/jpeg", "image/png", "image/webp"],
  allowedExtensions: [".jpg", ".jpeg", ".png", ".webp"]
}

// Avatars bucket
{
  maxSize: 2MB,
  allowedTypes: ["image/jpeg", "image/png", "image/webp"],
  allowedExtensions: [".jpg", ".jpeg", ".png", ".webp"]
}
```

### Manual Validation

```typescript
import { validateFile } from "@/src/libs/storage";

const file = // ... get file
const validation = validateFile(file, "products");

if (!validation.valid) {
  console.error(validation.error);
}
```

---

## 📦 Storage Buckets Setup

### 1. Create Buckets in Supabase

Go to Supabase Dashboard → Storage → Create buckets:

- `products` - Public bucket
- `gallery` - Public bucket
- `avatars` - Public bucket
- `uploads` - Public bucket

### 2. Set Bucket Policies

Make buckets public for read access:

```sql
-- Allow public read access
CREATE POLICY "Public read access" ON storage.objects
  FOR SELECT USING (bucket_id = 'products');

-- Allow authenticated users to upload
CREATE POLICY "Authenticated upload" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'products' AND
    auth.role() = 'authenticated'
  );

-- Allow admins to delete
CREATE POLICY "Admin delete" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'products' AND
    (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
  );
```

Repeat for all buckets (`gallery`, `avatars`, `uploads`).

---

## 🎯 Server Actions Reference

### Upload Actions

```typescript
import {
  uploadProductImageAction,
  uploadProductImagesAction,
  uploadGalleryImageAction,
  uploadAvatarAction,
} from "@/src/actions";

// Upload single product image (admin)
const result = await uploadProductImageAction(formData);

// Upload multiple product images (admin)
const result = await uploadProductImagesAction(formData);

// Upload gallery image (admin)
const result = await uploadGalleryImageAction(formData);

// Upload avatar (user)
const result = await uploadAvatarAction(formData);
```

### Delete Actions

```typescript
import {
  deleteFileAction,
  deleteMultipleFilesAction,
  deleteAvatarAction,
} from "@/src/actions";

// Delete single file (admin)
await deleteFileAction("products", "path/to/file.jpg");

// Delete multiple files (admin)
await deleteMultipleFilesAction("products", [
  "path/file1.jpg",
  "path/file2.jpg",
]);

// Delete own avatar (user)
await deleteAvatarAction("avatars/user-id/avatar.jpg");
```

---

## 🔧 Advanced Features

### Get Public URL

```typescript
import { getPublicUrl } from "@/src/libs/storage";

const url = getPublicUrl("products", "path/to/image.jpg");
```

### List Files in Bucket

```typescript
import { listFiles } from "@/src/libs/storage";

const result = await listFiles("products", "product-images");

if (result.success) {
  console.log(result.files);
}
```

### Move/Rename File (Server-side)

```typescript
import { moveFile } from "@/src/libs/storage/server";

await moveFile(
  "products",
  "old-path/image.jpg",
  "new-path/image.jpg"
);
```

### Copy File (Server-side)

```typescript
import { copyFile } from "@/src/libs/storage/server";

await copyFile(
  "products",
  "source/image.jpg",
  "destination/image.jpg"
);
```

---

## 🎨 UI Component Examples

### Image Preview Component

```typescript
"use client";

import { useState } from "react";
import { uploadFile } from "@/src/libs/storage";

export function ImageUploadPreview() {
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Show preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Upload
    setUploading(true);
    const result = await uploadFile(file, { bucket: "products" });
    setUploading(false);

    if (!result.success) {
      alert(result.error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} accept="image/*" />
      
      {preview && (
        <div className="mt-4">
          <img src={preview} alt="Preview" className="max-w-xs" />
          {uploading && <p>Uploading...</p>}
        </div>
      )}
    </div>
  );
}
```

---

## 🔐 Security Best Practices

### 1. Always Validate Files
```typescript
const validation = validateFile(file, bucket);
if (!validation.valid) {
  return { error: validation.error };
}
```

### 2. Check User Permissions
```typescript
// Only admins can upload products
const admin = await requireAdmin();
if (!admin) {
  return { error: "Unauthorized" };
}
```

### 3. Verify File Ownership
```typescript
// Users can only delete their own avatars
if (!path.includes(user.id)) {
  return { error: "Unauthorized" };
}
```

### 4. Use Unique Filenames
```typescript
// Automatic unique naming
const fileName = generateFileName(file.name, "prefix");
// Result: prefix-filename-1234567890-abc123.jpg
```

---

## 📊 File Size Limits

- **Products**: 5MB per image
- **Gallery**: 10MB per image
- **Avatars**: 2MB per image
- **Uploads**: 10MB per file

To change limits, edit `src/libs/storage/types.ts`:

```typescript
export const FILE_VALIDATIONS: Record<StorageBucket, FileValidation> = {
  products: {
    maxSize: 5 * 1024 * 1024, // Change this
    // ...
  },
};
```

---

## ✅ Next Steps

1. **Create buckets in Supabase Dashboard**
2. **Set up bucket policies** (read/write permissions)
3. **Test uploads** in development
4. **Add image optimization** (optional - next.js Image component)
5. **Add progress indicators** for better UX
6. **Set up CDN** for production (Supabase handles this)

---

## 📚 Resources

- [Supabase Storage Documentation](https://supabase.com/docs/guides/storage)
- [Next.js File Uploads](https://nextjs.org/docs/app/building-your-application/routing/route-handlers#formdata)
- [React Dropzone](https://react-dropzone.js.org/)

---

**File upload system is now fully functional! 🎉**

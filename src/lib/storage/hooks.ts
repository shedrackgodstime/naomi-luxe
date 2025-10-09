"use client";

// React hooks for file uploads
import { useState } from "react";
import { uploadFile, uploadMultipleFiles } from "./client";
import type { UploadOptions, UploadResult } from "./types";

export interface UseUploadState {
  uploading: boolean;
  progress: number;
  error: string | null;
  result: UploadResult | null;
}

export interface UseMultipleUploadState {
  uploading: boolean;
  progress: number;
  error: string | null;
  results: UploadResult[];
}

/**
 * Hook for single file upload
 */
export function useFileUpload() {
  const [state, setState] = useState<UseUploadState>({
    uploading: false,
    progress: 0,
    error: null,
    result: null,
  });

  const upload = async (file: File, options: UploadOptions) => {
    setState({ uploading: true, progress: 0, error: null, result: null });

    try {
      const result = await uploadFile(file, options);

      if (!result.success) {
        setState({
          uploading: false,
          progress: 0,
          error: result.error || "Upload failed",
          result: null,
        });
        return result;
      }

      setState({
        uploading: false,
        progress: 100,
        error: null,
        result,
      });

      return result;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Upload failed";
      setState({
        uploading: false,
        progress: 0,
        error: errorMessage,
        result: null,
      });
      return { success: false, error: errorMessage };
    }
  };

  const reset = () => {
    setState({
      uploading: false,
      progress: 0,
      error: null,
      result: null,
    });
  };

  return { ...state, upload, reset };
}

/**
 * Hook for multiple file uploads
 */
export function useMultipleFileUpload() {
  const [state, setState] = useState<UseMultipleUploadState>({
    uploading: false,
    progress: 0,
    error: null,
    results: [],
  });

  const upload = async (files: File[], options: UploadOptions) => {
    setState({ uploading: true, progress: 0, error: null, results: [] });

    try {
      const results = await uploadMultipleFiles(files, options);

      const failed = results.filter((r) => !r.success);
      if (failed.length > 0) {
        setState({
          uploading: false,
          progress: 100,
          error: `${failed.length} files failed to upload`,
          results,
        });
        return results;
      }

      setState({
        uploading: false,
        progress: 100,
        error: null,
        results,
      });

      return results;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Upload failed";
      setState({
        uploading: false,
        progress: 0,
        error: errorMessage,
        results: [],
      });
      return [];
    }
  };

  const reset = () => {
    setState({
      uploading: false,
      progress: 0,
      error: null,
      results: [],
    });
  };

  return { ...state, upload, reset };
}

/**
 * Hook for drag and drop file upload
 */
export function useDropzone(options: {
  onDrop: (files: File[]) => void;
  accept?: string[];
  maxFiles?: number;
  maxSize?: number;
}) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);

    // Filter by accept types
    let filteredFiles = files;
    if (options.accept && options.accept.length > 0) {
      filteredFiles = files.filter((file) => {
        const extension = `.${file.name.split(".").pop()?.toLowerCase()}`;
        return (
          options.accept?.includes(extension) ||
          options.accept?.includes(file.type)
        );
      });
    }

    // Filter by max size
    if (options.maxSize) {
      filteredFiles = filteredFiles.filter(
        (file) => file.size <= (options.maxSize || Number.POSITIVE_INFINITY),
      );
    }

    // Limit number of files
    if (options.maxFiles) {
      filteredFiles = filteredFiles.slice(0, options.maxFiles);
    }

    options.onDrop(filteredFiles);
  };

  return {
    isDragging,
    dragProps: {
      onDragEnter: handleDragEnter,
      onDragLeave: handleDragLeave,
      onDragOver: handleDragOver,
      onDrop: handleDrop,
    },
  };
}

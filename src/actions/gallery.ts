"use server";

// Gallery Server Actions
import { revalidatePath } from "next/cache";
import {
  createGalleryItem,
  deleteGalleryItem,
  getAllGalleryItems,
  getGalleryItemById,
  updateGalleryItem,
} from "@/src/db/queries";
import { requireAdmin } from "@/src/libs/auth";

export async function getGalleryItemsAction() {
  try {
    const items = await getAllGalleryItems();
    return { items };
  } catch (_error) {
    return { error: "Failed to fetch gallery items" };
  }
}

export async function getGalleryItemByIdAction(id: string) {
  try {
    const item = await getGalleryItemById(id);
    if (!item) {
      return { error: "Gallery item not found" };
    }
    return { item };
  } catch (_error) {
    return { error: "Failed to fetch gallery item" };
  }
}

export async function createGalleryItemAction(data: {
  imageUrl: string;
  title: string;
  description?: string;
}) {
  const admin = await requireAdmin();
  if (!admin) {
    return { error: "Unauthorized: Admin access required" };
  }

  try {
    const item = await createGalleryItem(data);
    revalidatePath("/gallery");
    revalidatePath("/admin/gallery");
    return { item, message: "Gallery item created successfully" };
  } catch (_error) {
    return { error: "Failed to create gallery item" };
  }
}

export async function updateGalleryItemAction(
  id: string,
  data: {
    imageUrl?: string;
    title?: string;
    description?: string;
  },
) {
  const admin = await requireAdmin();
  if (!admin) {
    return { error: "Unauthorized: Admin access required" };
  }

  try {
    const item = await updateGalleryItem(id, data);
    if (!item) {
      return { error: "Gallery item not found" };
    }
    revalidatePath("/gallery");
    revalidatePath("/admin/gallery");
    return { item, message: "Gallery item updated successfully" };
  } catch (_error) {
    return { error: "Failed to update gallery item" };
  }
}

export async function deleteGalleryItemAction(id: string) {
  const admin = await requireAdmin();
  if (!admin) {
    return { error: "Unauthorized: Admin access required" };
  }

  try {
    await deleteGalleryItem(id);
    revalidatePath("/gallery");
    revalidatePath("/admin/gallery");
    return { success: true, message: "Gallery item deleted successfully" };
  } catch (_error) {
    return { error: "Failed to delete gallery item" };
  }
}

"use server";

// Homepage Content Server Actions
import { revalidatePath } from "next/cache";
import {
  createHomepageContent,
  deleteHomepageContent,
  getAllHomepageContent,
  getHomepageContentBySection,
  updateHomepageContent,
} from "@/src/db/queries";
import { requireAdmin } from "@/src/lib/auth";

export async function getHomepageContentAction() {
  try {
    const content = await getAllHomepageContent();
    return { content };
  } catch (_error) {
    return { error: "Failed to fetch homepage content" };
  }
}

export async function getHomepageContentBySectionAction(
  section: "hero" | "banner" | "newsletter",
) {
  try {
    const content = await getHomepageContentBySection(section);
    return { content };
  } catch (_error) {
    return { error: "Failed to fetch homepage content" };
  }
}

export async function createHomepageContentAction(data: {
  section: "hero" | "banner" | "newsletter";
  title: string;
  content?: Record<string, unknown>;
  imageUrl?: string;
}) {
  const admin = await requireAdmin();
  if (!admin) {
    return { error: "Unauthorized: Admin access required" };
  }

  try {
    const content = await createHomepageContent(data);
    revalidatePath("/");
    revalidatePath("/admin/homepage");
    return { content, message: "Homepage content created successfully" };
  } catch (_error) {
    return { error: "Failed to create homepage content" };
  }
}

export async function updateHomepageContentAction(
  id: string,
  data: {
    section?: "hero" | "banner" | "newsletter";
    title?: string;
    content?: Record<string, unknown>;
    imageUrl?: string;
  },
) {
  const admin = await requireAdmin();
  if (!admin) {
    return { error: "Unauthorized: Admin access required" };
  }

  try {
    const content = await updateHomepageContent(id, data);
    if (!content) {
      return { error: "Homepage content not found" };
    }
    revalidatePath("/");
    revalidatePath("/admin/homepage");
    return { content, message: "Homepage content updated successfully" };
  } catch (_error) {
    return { error: "Failed to update homepage content" };
  }
}

export async function deleteHomepageContentAction(id: string) {
  const admin = await requireAdmin();
  if (!admin) {
    return { error: "Unauthorized: Admin access required" };
  }

  try {
    await deleteHomepageContent(id);
    revalidatePath("/");
    revalidatePath("/admin/homepage");
    return { success: true, message: "Homepage content deleted successfully" };
  } catch (_error) {
    return { error: "Failed to delete homepage content" };
  }
}

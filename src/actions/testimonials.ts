"use server";

// Testimonial Server Actions
import { revalidatePath } from "next/cache";
import {
  createTestimonial,
  deleteTestimonial,
  getAllTestimonials,
  getTestimonialById,
  updateTestimonial,
} from "@/src/db/queries";
import { requireAdmin } from "@/src/lib/auth";

export async function getTestimonialsAction() {
  try {
    const testimonials = await getAllTestimonials();
    return { testimonials };
  } catch (_error) {
    return { error: "Failed to fetch testimonials" };
  }
}

export async function getTestimonialByIdAction(id: string) {
  try {
    const testimonial = await getTestimonialById(id);
    if (!testimonial) {
      return { error: "Testimonial not found" };
    }
    return { testimonial };
  } catch (_error) {
    return { error: "Failed to fetch testimonial" };
  }
}

export async function createTestimonialAction(data: {
  author: string;
  text: string;
  rating: number;
}) {
  const admin = await requireAdmin();
  if (!admin) {
    return { error: "Unauthorized: Admin access required" };
  }

  // Validate rating
  if (data.rating < 1 || data.rating > 5) {
    return { error: "Rating must be between 1 and 5" };
  }

  try {
    const testimonial = await createTestimonial(data);
    revalidatePath("/");
    revalidatePath("/admin/testimonials");
    return { testimonial, message: "Testimonial created successfully" };
  } catch (_error) {
    return { error: "Failed to create testimonial" };
  }
}

export async function updateTestimonialAction(
  id: string,
  data: {
    author?: string;
    text?: string;
    rating?: number;
  },
) {
  const admin = await requireAdmin();
  if (!admin) {
    return { error: "Unauthorized: Admin access required" };
  }

  // Validate rating if provided
  if (data.rating && (data.rating < 1 || data.rating > 5)) {
    return { error: "Rating must be between 1 and 5" };
  }

  try {
    const testimonial = await updateTestimonial(id, data);
    if (!testimonial) {
      return { error: "Testimonial not found" };
    }
    revalidatePath("/");
    revalidatePath("/admin/testimonials");
    return { testimonial, message: "Testimonial updated successfully" };
  } catch (_error) {
    return { error: "Failed to update testimonial" };
  }
}

export async function deleteTestimonialAction(id: string) {
  const admin = await requireAdmin();
  if (!admin) {
    return { error: "Unauthorized: Admin access required" };
  }

  try {
    await deleteTestimonial(id);
    revalidatePath("/");
    revalidatePath("/admin/testimonials");
    return { success: true, message: "Testimonial deleted successfully" };
  } catch (_error) {
    return { error: "Failed to delete testimonial" };
  }
}

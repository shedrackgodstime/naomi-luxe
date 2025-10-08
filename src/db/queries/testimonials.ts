import { desc, eq } from "drizzle-orm";
import { db } from "../index";
import { testimonials } from "../schema";

export async function getAllTestimonials() {
  return await db
    .select()
    .from(testimonials)
    .orderBy(desc(testimonials.createdAt));
}

export async function getTestimonialById(id: string) {
  const result = await db
    .select()
    .from(testimonials)
    .where(eq(testimonials.id, id))
    .limit(1);
  return result[0] || null;
}

export async function getTestimonialsByRating(rating: number) {
  return await db
    .select()
    .from(testimonials)
    .where(eq(testimonials.rating, rating))
    .orderBy(desc(testimonials.createdAt));
}

export async function createTestimonial(data: {
  author: string;
  text: string;
  rating: number;
}) {
  const result = await db.insert(testimonials).values(data).returning();
  return result[0];
}

export async function updateTestimonial(
  id: string,
  data: Partial<typeof testimonials.$inferInsert>,
) {
  const result = await db
    .update(testimonials)
    .set(data)
    .where(eq(testimonials.id, id))
    .returning();
  return result[0];
}

export async function deleteTestimonial(id: string) {
  return await db.delete(testimonials).where(eq(testimonials.id, id));
}

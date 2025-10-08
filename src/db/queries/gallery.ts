import { desc, eq } from "drizzle-orm";
import { db } from "../index";
import { gallery } from "../schema";

export async function getAllGalleryItems() {
  return await db.select().from(gallery).orderBy(desc(gallery.createdAt));
}

export async function getGalleryItemById(id: string) {
  const result = await db
    .select()
    .from(gallery)
    .where(eq(gallery.id, id))
    .limit(1);
  return result[0] || null;
}

export async function createGalleryItem(data: {
  imageUrl: string;
  title: string;
  description?: string;
}) {
  const result = await db.insert(gallery).values(data).returning();
  return result[0];
}

export async function updateGalleryItem(
  id: string,
  data: Partial<typeof gallery.$inferInsert>,
) {
  const result = await db
    .update(gallery)
    .set(data)
    .where(eq(gallery.id, id))
    .returning();
  return result[0];
}

export async function deleteGalleryItem(id: string) {
  return await db.delete(gallery).where(eq(gallery.id, id));
}

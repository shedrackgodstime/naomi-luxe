import { eq } from "drizzle-orm";
import { db } from "../index";
import { homepageContent } from "../schema";

export async function getHomepageContentBySection(
  section: "hero" | "banner" | "newsletter",
) {
  const result = await db
    .select()
    .from(homepageContent)
    .where(eq(homepageContent.section, section))
    .limit(1);
  return result[0] || null;
}

export async function getAllHomepageContent() {
  return await db.select().from(homepageContent);
}

export async function createHomepageContent(data: {
  section: "hero" | "banner" | "newsletter";
  title: string;
  content?: Record<string, unknown>;
  imageUrl?: string;
}) {
  const result = await db.insert(homepageContent).values(data).returning();
  return result[0];
}

export async function updateHomepageContent(
  id: string,
  data: Partial<typeof homepageContent.$inferInsert>,
) {
  const result = await db
    .update(homepageContent)
    .set(data)
    .where(eq(homepageContent.id, id))
    .returning();
  return result[0];
}

export async function deleteHomepageContent(id: string) {
  return await db.delete(homepageContent).where(eq(homepageContent.id, id));
}

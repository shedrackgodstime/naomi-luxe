import { desc, eq } from "drizzle-orm";
import { db } from "../index";
import { services } from "../schema";

export async function getAllServices() {
  return await db.select().from(services).orderBy(desc(services.createdAt));
}

export async function getServiceById(id: string) {
  const result = await db
    .select()
    .from(services)
    .where(eq(services.id, id))
    .limit(1);
  return result[0] || null;
}

export async function createService(data: {
  name: string;
  description?: string;
  price: string;
  duration: number;
}) {
  const result = await db.insert(services).values(data).returning();
  return result[0];
}

export async function updateService(
  id: string,
  data: Partial<typeof services.$inferInsert>,
) {
  const result = await db
    .update(services)
    .set(data)
    .where(eq(services.id, id))
    .returning();
  return result[0];
}

export async function deleteService(id: string) {
  return await db.delete(services).where(eq(services.id, id));
}

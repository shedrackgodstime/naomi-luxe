import { and, desc, eq } from "drizzle-orm";
import { db } from "../index";
import { products } from "../schema";

export async function getAllProducts() {
  return await db.select().from(products).orderBy(desc(products.createdAt));
}

export async function getProductById(id: string) {
  const result = await db
    .select()
    .from(products)
    .where(eq(products.id, id))
    .limit(1);
  return result[0] || null;
}

export async function getProductsByCategory(
  category: "shoes" | "clothes" | "accessories",
) {
  return await db
    .select()
    .from(products)
    .where(eq(products.category, category));
}

export async function getProductsInStock() {
  return await db
    .select()
    .from(products)
    .where(and(eq(products.stock, 0)));
}

export async function createProduct(data: {
  name: string;
  description?: string;
  price: string;
  category: "shoes" | "clothes" | "accessories";
  stock: number;
  images?: string[];
}) {
  const result = await db.insert(products).values(data).returning();
  return result[0];
}

export async function updateProduct(
  id: string,
  data: Partial<typeof products.$inferInsert>,
) {
  const result = await db
    .update(products)
    .set(data)
    .where(eq(products.id, id))
    .returning();
  return result[0];
}

export async function deleteProduct(id: string) {
  return await db.delete(products).where(eq(products.id, id));
}

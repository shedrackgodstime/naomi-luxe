"use server";

// Product Server Actions
import { revalidatePath } from "next/cache";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  getProductsByCategory,
  updateProduct,
} from "@/src/db/queries";
import { requireAdmin } from "@/src/lib/auth";

export async function getProductsAction() {
  try {
    const products = await getAllProducts();
    return { products };
  } catch (_error) {
    return { error: "Failed to fetch products" };
  }
}

export async function getProductByIdAction(id: string) {
  try {
    const product = await getProductById(id);
    if (!product) {
      return { error: "Product not found" };
    }
    return { product };
  } catch (_error) {
    return { error: "Failed to fetch product" };
  }
}

export async function getProductsByCategoryAction(
  category: "shoes" | "clothes" | "accessories",
) {
  try {
    const products = await getProductsByCategory(category);
    return { products };
  } catch (_error) {
    return { error: "Failed to fetch products" };
  }
}

export async function createProductAction(data: {
  name: string;
  description?: string;
  price: string | number;
  category: "shoes" | "clothes" | "accessories";
  stock: number;
  images?: string[];
}) {
  const admin = await requireAdmin();
  if (!admin) {
    return { error: "Unauthorized: Admin access required" };
  }

  try {
    const product = await createProduct({
      ...data,
      price: String(data.price),
    });
    revalidatePath("/shop");
    revalidatePath("/admin/products");
    return { product };
  } catch (_error) {
    return { error: "Failed to create product" };
  }
}

export async function updateProductAction(
  id: string,
  data: {
    name?: string;
    description?: string;
    price?: string | number;
    category?: "shoes" | "clothes" | "accessories";
    stock?: number;
    images?: string[];
  },
) {
  const admin = await requireAdmin();
  if (!admin) {
    return { error: "Unauthorized: Admin access required" };
  }

  try {
    const product = await updateProduct(id, {
      ...data,
      price: data.price ? String(data.price) : undefined,
    });
    if (!product) {
      return { error: "Product not found" };
    }
    revalidatePath("/shop");
    revalidatePath("/admin/products");
    revalidatePath(`/shop/products/${id}`);
    return { product };
  } catch (_error) {
    return { error: "Failed to update product" };
  }
}

export async function deleteProductAction(id: string) {
  const admin = await requireAdmin();
  if (!admin) {
    return { error: "Unauthorized: Admin access required" };
  }

  try {
    await deleteProduct(id);
    revalidatePath("/shop");
    revalidatePath("/admin/products");
    return { success: true };
  } catch (_error) {
    return { error: "Failed to delete product" };
  }
}

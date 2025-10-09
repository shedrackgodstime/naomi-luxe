"use server";

// Service Server Actions
import { revalidatePath } from "next/cache";
import {
  createService,
  deleteService,
  getAllServices,
  getServiceById,
  updateService,
} from "@/src/db/queries";
import { requireAdmin } from "@/src/libs/auth";

export async function getServicesAction() {
  try {
    const services = await getAllServices();
    return { services };
  } catch (_error) {
    return { error: "Failed to fetch services" };
  }
}

export async function getServiceByIdAction(id: string) {
  try {
    const service = await getServiceById(id);
    if (!service) {
      return { error: "Service not found" };
    }
    return { service };
  } catch (_error) {
    return { error: "Failed to fetch service" };
  }
}

export async function createServiceAction(data: {
  name: string;
  description?: string;
  price: string;
  duration: number;
}) {
  const admin = await requireAdmin();
  if (!admin) {
    return { error: "Unauthorized: Admin access required" };
  }

  try {
    const service = await createService(data);
    revalidatePath("/services");
    revalidatePath("/admin/services");
    return { service, message: "Service created successfully" };
  } catch (_error) {
    return { error: "Failed to create service" };
  }
}

export async function updateServiceAction(
  id: string,
  data: {
    name?: string;
    description?: string;
    price?: string;
    duration?: number;
  },
) {
  const admin = await requireAdmin();
  if (!admin) {
    return { error: "Unauthorized: Admin access required" };
  }

  try {
    const service = await updateService(id, data);
    if (!service) {
      return { error: "Service not found" };
    }
    revalidatePath("/services");
    revalidatePath("/admin/services");
    revalidatePath(`/services/${id}`);
    return { service, message: "Service updated successfully" };
  } catch (_error) {
    return { error: "Failed to update service" };
  }
}

export async function deleteServiceAction(id: string) {
  const admin = await requireAdmin();
  if (!admin) {
    return { error: "Unauthorized: Admin access required" };
  }

  try {
    await deleteService(id);
    revalidatePath("/services");
    revalidatePath("/admin/services");
    return { success: true, message: "Service deleted successfully" };
  } catch (_error) {
    return { error: "Failed to delete service" };
  }
}

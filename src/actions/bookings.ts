"use server";

// Booking Server Actions
import { revalidatePath } from "next/cache";
import {
  createBooking,
  deleteBooking,
  getAllBookings,
  getBookingById,
  getBookingsByUser,
  getServiceById,
  updateBookingStatus,
} from "@/src/db/queries";
import { requireAdmin, requireAuth } from "@/src/lib/auth";
import { sendBookingConfirmationEmail } from "@/src/lib/email";

export async function getBookingsAction() {
  const admin = await requireAdmin();
  if (!admin) {
    return { error: "Unauthorized: Admin access required" };
  }

  try {
    const bookings = await getAllBookings();
    return { bookings };
  } catch (_error) {
    return { error: "Failed to fetch bookings" };
  }
}

export async function getBookingByIdAction(id: string) {
  const user = await requireAuth();
  if (!user) {
    return { error: "Unauthorized: Please sign in" };
  }

  try {
    const booking = await getBookingById(id);
    if (!booking) {
      return { error: "Booking not found" };
    }

    // Check if user owns this booking or is admin
    if (booking.userId !== user.id && user.role !== "admin") {
      return { error: "Unauthorized: Access denied" };
    }

    return { booking };
  } catch (_error) {
    return { error: "Failed to fetch booking" };
  }
}

export async function getUserBookingsAction() {
  const user = await requireAuth();
  if (!user) {
    return { error: "Unauthorized: Please sign in" };
  }

  try {
    const bookings = await getBookingsByUser(user.id);
    return { bookings };
  } catch (_error) {
    return { error: "Failed to fetch bookings" };
  }
}

export async function createBookingAction(data: {
  serviceId: string;
  bookingDate: string;
  bookingTime: string;
}) {
  const user = await requireAuth();
  if (!user) {
    return { error: "Unauthorized: Please sign in" };
  }

  try {
    const booking = await createBooking({
      userId: user.id,
      serviceId: data.serviceId,
      bookingDate: data.bookingDate,
      bookingTime: data.bookingTime,
      status: "pending",
    });

    // Get service details for email
    const service = await getServiceById(data.serviceId);

    // Send confirmation email
    if (service && user.email) {
      await sendBookingConfirmationEmail({
        to: user.email,
        customerName: user.fullName || user.email,
        serviceName: service.name,
        bookingDate: data.bookingDate,
        bookingTime: data.bookingTime,
        bookingId: booking.id,
      });
    }

    revalidatePath("/bookings");
    revalidatePath("/admin/bookings");
    return { booking, message: "Booking created successfully" };
  } catch (_error) {
    return { error: "Failed to create booking" };
  }
}

export async function updateBookingStatusAction(
  id: string,
  status: "pending" | "confirmed" | "canceled" | "completed",
) {
  const admin = await requireAdmin();
  if (!admin) {
    return { error: "Unauthorized: Admin access required" };
  }

  try {
    const booking = await updateBookingStatus(id, status);
    if (!booking) {
      return { error: "Booking not found" };
    }

    revalidatePath("/bookings");
    revalidatePath("/admin/bookings");
    return { booking, message: `Booking ${status}` };
  } catch (_error) {
    return { error: "Failed to update booking" };
  }
}

export async function cancelBookingAction(id: string) {
  const user = await requireAuth();
  if (!user) {
    return { error: "Unauthorized: Please sign in" };
  }

  try {
    const booking = await getBookingById(id);
    if (!booking) {
      return { error: "Booking not found" };
    }

    // Check if user owns this booking or is admin
    if (booking.userId !== user.id && user.role !== "admin") {
      return { error: "Unauthorized: Access denied" };
    }

    const updatedBooking = await updateBookingStatus(id, "canceled");
    revalidatePath("/bookings");
    revalidatePath("/admin/bookings");
    return { booking: updatedBooking, message: "Booking canceled" };
  } catch (_error) {
    return { error: "Failed to cancel booking" };
  }
}

export async function deleteBookingAction(id: string) {
  const admin = await requireAdmin();
  if (!admin) {
    return { error: "Unauthorized: Admin access required" };
  }

  try {
    await deleteBooking(id);
    revalidatePath("/bookings");
    revalidatePath("/admin/bookings");
    return { success: true, message: "Booking deleted" };
  } catch (_error) {
    return { error: "Failed to delete booking" };
  }
}

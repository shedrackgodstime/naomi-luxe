import { and, desc, eq, gte, lte } from "drizzle-orm";
import { db } from "../index";
import { bookings, services } from "../schema";

export async function getAllBookings() {
  return await db
    .select({
      id: bookings.id,
      userId: bookings.userId,
      serviceId: bookings.serviceId,
      bookingDate: bookings.bookingDate,
      bookingTime: bookings.bookingTime,
      status: bookings.status,
      createdAt: bookings.createdAt,
      service: {
        id: services.id,
        name: services.name,
        description: services.description,
        price: services.price,
        duration: services.duration,
      },
    })
    .from(bookings)
    .leftJoin(services, eq(bookings.serviceId, services.id))
    .orderBy(desc(bookings.createdAt));
}

export async function getBookingById(id: string) {
  const result = await db
    .select({
      id: bookings.id,
      userId: bookings.userId,
      serviceId: bookings.serviceId,
      bookingDate: bookings.bookingDate,
      bookingTime: bookings.bookingTime,
      status: bookings.status,
      createdAt: bookings.createdAt,
      service: {
        id: services.id,
        name: services.name,
        description: services.description,
        price: services.price,
        duration: services.duration,
      },
    })
    .from(bookings)
    .leftJoin(services, eq(bookings.serviceId, services.id))
    .where(eq(bookings.id, id))
    .limit(1);
  return result[0] || null;
}

export async function getBookingsByUser(userId: string) {
  return await db
    .select({
      id: bookings.id,
      userId: bookings.userId,
      serviceId: bookings.serviceId,
      bookingDate: bookings.bookingDate,
      bookingTime: bookings.bookingTime,
      status: bookings.status,
      createdAt: bookings.createdAt,
      service: {
        id: services.id,
        name: services.name,
        description: services.description,
        price: services.price,
        duration: services.duration,
      },
    })
    .from(bookings)
    .leftJoin(services, eq(bookings.serviceId, services.id))
    .where(eq(bookings.userId, userId))
    .orderBy(desc(bookings.createdAt));
}

export async function getBookingsByDateRange(
  startDate: string,
  endDate: string,
) {
  return await db
    .select({
      id: bookings.id,
      userId: bookings.userId,
      serviceId: bookings.serviceId,
      bookingDate: bookings.bookingDate,
      bookingTime: bookings.bookingTime,
      status: bookings.status,
      createdAt: bookings.createdAt,
      service: {
        id: services.id,
        name: services.name,
        description: services.description,
        price: services.price,
        duration: services.duration,
      },
    })
    .from(bookings)
    .leftJoin(services, eq(bookings.serviceId, services.id))
    .where(
      and(
        gte(bookings.bookingDate, startDate),
        lte(bookings.bookingDate, endDate),
      ),
    )
    .orderBy(bookings.bookingDate, bookings.bookingTime);
}

export async function createBooking(data: {
  userId: string;
  serviceId: string;
  bookingDate: string;
  bookingTime: string;
  status?: "pending" | "confirmed" | "canceled" | "completed";
}) {
  const result = await db.insert(bookings).values(data).returning();
  return result[0];
}

export async function updateBookingStatus(
  id: string,
  status: "pending" | "confirmed" | "canceled" | "completed",
) {
  const result = await db
    .update(bookings)
    .set({ status })
    .where(eq(bookings.id, id))
    .returning();
  return result[0];
}

export async function deleteBooking(id: string) {
  return await db.delete(bookings).where(eq(bookings.id, id));
}

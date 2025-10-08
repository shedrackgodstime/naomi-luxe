import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

// Create the connection
const connectionString = process.env.DATABASE_URL || "";
const client = postgres(connectionString, { prepare: false });
export const db = drizzle(client, { schema });

// Export schema for use in other files
export * from "./schema";

"use server";

import { neon } from "@neondatabase/serverless";
import { safeHandler } from ".";
import type { LogEntry, LogsFilters, LogsPagination, LogsResponse } from ".";

// Types for SQL query results
interface LevelCountResult {
  level: string;
  count: string;
}

interface AppCountResult {
  app: string;
  count: string;
}

interface ServiceCountResult {
  service: string;
  count: string;
}

const databaseUrl = process.env.NEXT_PUBLIC_NEON_DATABASE_URL;
if (!databaseUrl) {
  throw new Error("NEXT_PUBLIC_NEON_DATABASE_URL is not defined");
}
const sql = neon(databaseUrl);

export async function getLogs(
  filters: LogsFilters = {},
  pagination: LogsPagination = { page: 1, pageSize: 50 },
): Promise<LogsResponse> {
  const result = await safeHandler(
    async () => {
      // const { level, app, service, search, startDate, endDate } = filters; // TODO: Implement filtering
      const { page, pageSize } = pagination;

      console.log(
        "getLogs called with filters:",
        filters,
        "pagination:",
        pagination,
      );

      // For now, let's just get all logs without filtering to test
      const countResult = await sql`SELECT COUNT(*) as total FROM logs`;
      const total = parseInt(countResult[0]?.total || "0", 10);
      console.log("Total count:", total);

      // Get paginated results
      const offset = (page - 1) * pageSize;
      const logs = await sql`
        SELECT id, app, level, message, service, context, stack, attempts, timestamp
        FROM logs 
        ORDER BY timestamp DESC
        LIMIT ${pageSize} OFFSET ${offset}
      `;

      const totalPages = Math.ceil(total / pageSize);
      console.log("Returning logs:", logs.length, "total:", total);

      return {
        logs: logs as LogEntry[],
        total,
        page,
        pageSize,
        totalPages,
      };
    },
    "logs-getAll",
    { retries: 2, delayMs: 1000 },
  );

  if (!result.ok) {
    console.error("getLogs failed:", result);
    throw new Error(result.message || "Failed to fetch logs");
  }

  return result.data;
}

export async function getLogStats(): Promise<{
  total: number;
  byLevel: Record<string, number>;
  byApp: Record<string, number>;
  byService: Record<string, number>;
}> {
  const result = await safeHandler(
    async () => {
      // Get total count
      const totalResult = await sql`SELECT COUNT(*) as total FROM logs`;
      const total = parseInt(totalResult[0]?.total || "0", 10);

      // Get counts by level
      const levelResult = await sql`
        SELECT level, COUNT(*) as count 
        FROM logs 
        GROUP BY level 
        ORDER BY count DESC
      `;
      const byLevel = (levelResult as LevelCountResult[]).reduce(
        (acc: Record<string, number>, row) => {
          acc[row.level] = parseInt(row.count, 10);
          return acc;
        },
        {},
      );

      // Get counts by app
      const appResult = await sql`
        SELECT app, COUNT(*) as count 
        FROM logs 
        GROUP BY app 
        ORDER BY count DESC
        LIMIT 10
      `;
      const byApp = (appResult as AppCountResult[]).reduce(
        (acc: Record<string, number>, row) => {
          acc[row.app] = parseInt(row.count, 10);
          return acc;
        },
        {},
      );

      // Get counts by service
      const serviceResult = await sql`
        SELECT service, COUNT(*) as count 
        FROM logs 
        WHERE service IS NOT NULL
        GROUP BY service 
        ORDER BY count DESC
        LIMIT 10
      `;
      const byService = (serviceResult as ServiceCountResult[]).reduce(
        (acc: Record<string, number>, row) => {
          acc[row.service] = parseInt(row.count, 10);
          return acc;
        },
        {},
      );

      return {
        total,
        byLevel,
        byApp,
        byService,
      };
    },
    "logs-getStats",
    { retries: 2, delayMs: 1000 },
  );

  if (!result.ok) {
    throw new Error(result.message || "Failed to fetch log stats");
  }

  return result.data;
}

export async function deleteLog(logId: number): Promise<{ deleted: number }> {
  const result = await safeHandler(
    async () => {
      const deleteResult = await sql`DELETE FROM logs WHERE id = ${logId}`;
      return { deleted: deleteResult.length || 0 };
    },
    "logs-delete",
    { retries: 2, delayMs: 1000 },
  );

  if (!result.ok) {
    throw new Error(result.message || "Failed to delete log");
  }

  return result.data;
}

export async function deleteLogs(
  logIds: number[],
): Promise<{ deleted: number }> {
  const result = await safeHandler(
    async () => {
      if (logIds.length === 0) return { deleted: 0 };

      const deleteResult =
        await sql`DELETE FROM logs WHERE id = ANY(${logIds})`;
      return { deleted: deleteResult.length || 0 };
    },
    "logs-deleteMultiple",
    { retries: 2, delayMs: 1000 },
  );

  if (!result.ok) {
    throw new Error(result.message || "Failed to delete logs");
  }

  return result.data;
}

export async function clearLogs(
  olderThan?: string,
): Promise<{ deleted: number }> {
  const result = await safeHandler(
    async () => {
      const deleteResult = olderThan
        ? await sql`DELETE FROM logs WHERE timestamp < ${olderThan}`
        : await sql`DELETE FROM logs`;

      return { deleted: deleteResult.length || 0 };
    },
    "logs-clear",
    { retries: 2, delayMs: 1000 },
  );

  if (!result.ok) {
    throw new Error(result.message || "Failed to clear logs");
  }

  return result.data;
}

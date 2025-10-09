import { neon } from "@neondatabase/serverless";

const databaseUrl = process.env.NEXT_PUBLIC_NEON_DATABASE_URL;
if (!databaseUrl) {
  throw new Error("NEXT_PUBLIC_NEON_DATABASE_URL is not defined");
}
const sql = neon(databaseUrl);

type LogLevel = "error" | "warn" | "info" | "debug";

interface LogEntry {
  app: string;
  level: LogLevel;
  message: string;
  service?: string;
  context?: string;
  stack?: string;
  attempts?: number;
  timestamp: string;
}

interface LogContext {
  attempt?: number;
  retries?: number;
}

interface LogEntryParams {
  app?: string;
  message?: string | Error;
  service?: string;
  level?: LogLevel;
  ctx?: LogContext;
  entry?: Omit<LogEntry, "level" | "timestamp">;
}

const buffer: LogEntry[] = [];
const FLUSH_INTERVAL_MS = 5000;
const MAX_BUFFER = 50;

export function logEntry(params: LogEntryParams) {
  let log: LogEntry;

  if (params.entry) {
    log = {
      ...params.entry,
      level: params.level ?? "info", // Use params.level, not entry.level
      timestamp: new Date().toISOString(),
      context:
        params.ctx?.attempt !== undefined && params.ctx?.retries !== undefined
          ? `attempt ${params.ctx.attempt}/${params.ctx.retries + 1}`
          : params.entry.context,
    };
  } else {
    const msg = params.message ?? "Unknown message";
    log = {
      app: params.app ?? "unknown",
      message: msg instanceof Error ? msg.message : msg,
      stack: msg instanceof Error ? msg.stack : undefined,
      service: params.service,
      attempts:
        msg instanceof Error
          ? ((msg as Partial<{ attempts: number }>).attempts ??
            params.ctx?.attempt)
          : params.ctx?.attempt,
      level: params.level ?? "info",
      context:
        params.ctx?.attempt !== undefined && params.ctx?.retries !== undefined
          ? `attempt ${params.ctx.attempt}/${params.ctx.retries + 1}`
          : undefined,
      timestamp: new Date().toISOString(),
    };
  }

  buffer.push(log);

  if (buffer.length >= MAX_BUFFER) {
    flushLogs();
  }
}

// Shortcut functions
export const logError = (params: LogEntryParams) =>
  logEntry({ ...params, level: "error" });
export const logWarn = (params: LogEntryParams) =>
  logEntry({ ...params, level: "warn" });
export const logInfo = (params: LogEntryParams) =>
  logEntry({ ...params, level: "info" });
export const logDebug = (params: LogEntryParams) =>
  logEntry({ ...params, level: "debug" });

// Periodic flush
setInterval(flushLogs, FLUSH_INTERVAL_MS);

async function flushLogs() {
  if (buffer.length === 0) return;

  const logsToInsert = buffer.splice(0, buffer.length);

  try {
    await sql`
      INSERT INTO logs (app, level, message, service, context, stack, attempts, timestamp)
      SELECT *
      FROM json_populate_recordset(NULL::logs, ${JSON.stringify(logsToInsert)}::json)
    `;
  } catch (err) {
    const error = err instanceof Error ? err : new Error(String(err));
    console.error("Logger failed (dropping logs):", error.message);
  }
}

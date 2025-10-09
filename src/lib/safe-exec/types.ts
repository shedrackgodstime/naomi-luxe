export type LogLevel = "error" | "warn" | "info" | "debug";

export interface LogEntry {
  id?: number;
  app: string;
  level: LogLevel;
  message: string;
  service?: string;
  context?: string;
  stack?: string;
  attempts?: number;
  timestamp: string;
}

export interface LogsFilters {
  level?: string;
  app?: string;
  service?: string;
  search?: string;
  startDate?: string;
  endDate?: string;
}

export interface LogsPagination {
  page: number;
  pageSize: number;
}

export interface LogsResponse {
  logs: LogEntry[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface LogStats {
  total: number;
  byLevel: Record<string, number>;
  byApp: Record<string, number>;
  byService: Record<string, number>;
}

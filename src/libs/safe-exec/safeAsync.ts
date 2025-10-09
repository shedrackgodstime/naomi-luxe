import { mapErrorToMessage } from "./errorMappers";
import { logError, logInfo, logWarn } from "./logger";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://naomi-luxe.com";

export interface SafeAsyncError extends Error {
  attempts?: number;
}

export type HandleResult<T> =
  | { ok: true; data: T; message: null }
  | { ok: false; error: SafeAsyncError; message: string; fallback?: T | null };

interface SafeHandlerOptions<T> {
  retries?: number;
  delayMs?: number;
  exponentialBackoff?: boolean;
  fallback?: T | null;
  timeoutMs?: number;
}

export async function safeHandler<T>(
  tryFn: () => Promise<T>,
  service: string,
  options: SafeHandlerOptions<T> = {},
): Promise<HandleResult<T>> {
  const {
    retries = 0,
    delayMs = 0,
    exponentialBackoff = false,
    fallback = null,
    timeoutMs,
  } = options;
  let attempt = 0;

  while (attempt <= retries) {
    try {
      const promise = tryFn();
      const data = await (timeoutMs
        ? Promise.race([
            promise,
            new Promise<never>((_, reject) =>
              setTimeout(
                () => reject(new Error(`Timed out after ${timeoutMs}ms`)),
                timeoutMs,
              ),
            ),
          ])
        : promise);

      // Success after retries
      if (attempt > 0) {
        logInfo({
          app: siteUrl,
          message: `Succeeded after ${attempt} attempt(s)`,
          service,
        });
      }

      return { ok: true, data, message: null };
    } catch (err: unknown) {
      attempt++;

      // Normalize error
      let error: SafeAsyncError;
      if (err instanceof Error) {
        error = err as SafeAsyncError;
      } else {
        error = Object.assign(new Error(String(err)), { attempts: attempt });
      }
      error.attempts = attempt;

      // Log intermediate failures as warnings
      if (attempt <= retries) {
        logWarn({
          app: siteUrl,
          message: error,
          service,
          ctx: { attempt, retries },
        });
      }

      // Log final failure as error
      if (attempt > retries) {
        logError({
          app: siteUrl,
          message: error,
          service,
          ctx: { attempt, retries },
        });

        const userMessage = mapErrorToMessage(service, error.message);
        return { ok: false, error, message: userMessage, fallback };
      }

      // Wait before next retry
      if (delayMs > 0) {
        const waitTime = exponentialBackoff
          ? delayMs * 2 ** (attempt - 1)
          : delayMs;
        await new Promise((resolve) => setTimeout(resolve, waitTime));
      }
    }
  }

  // Fallback for unexpected cases
  return {
    ok: false,
    error: new Error("Unexpected failure") as SafeAsyncError,
    message: "Unexpected failure",
    fallback,
  };
}

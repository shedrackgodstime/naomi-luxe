export function streamErrorMapper(message: string): string {
  const normalized = message.toLowerCase();

  if (normalized.includes("rate limit")) {
    return "You are sending too many messages. Please slow down.";
  }
  if (normalized.includes("unauthorized")) {
    return "You are not authorized to use chat at the moment.";
  }

  return "An unexpected error occurred with chat.";
}

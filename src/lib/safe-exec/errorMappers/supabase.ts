export function supabaseErrorMapper(message: string): string {
  const normalized = message.toLowerCase();

  if (normalized.includes("invalid login credentials")) {
    return "Incorrect email or password.";
  }
  if (normalized.includes("email not confirmed")) {
    return "Please confirm your email before logging in.";
  }
  if (normalized.includes("user already registered")) {
    return "This email is already registered.";
  }
  if (normalized.includes("jwt expired")) {
    return "Your session has expired. Please log in again.";
  }

  return "An unexpected error occurred with Supabase.";
}

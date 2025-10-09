import { streamErrorMapper } from "./stream";
import { supabaseErrorMapper } from "./supabase";

export function mapErrorToMessage(service: string, message: string): string {
  switch (service) {
    case "supabase":
      return supabaseErrorMapper(message);
    case "stream":
      return streamErrorMapper(message);
    default:
      return "Something went wrong. Please try again.";
  }
}

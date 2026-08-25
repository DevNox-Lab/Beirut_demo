/**
 * Centralized runtime configuration.
 *
 * All environment access happens here so the rest of the app never touches
 * `process.env` directly. Values fall back to sensible defaults so the demo
 * runs with zero configuration.
 *
 * Reminder: only variables prefixed with NEXT_PUBLIC_ are available in the
 * browser. Server-only secrets (DATABASE_URL, service keys) must never be
 * referenced from client components.
 */

export type ReservationBackend = "demo" | "supabase";

export const config = {
  /** Canonical public site URL (no trailing slash). */
  siteUrl: (
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://beirutdishes.ma"
  ).replace(/\/$/, ""),

  /** WhatsApp number, international format, digits only. */
  whatsappNumber:
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ??
    process.env.WHATSAPP_NUMBER ??
    "212669090588",

  /** Which reservation storage layer to use. */
  reservationBackend: (process.env.NEXT_PUBLIC_RESERVATION_BACKEND ??
    "demo") as ReservationBackend,

  supabase: {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",
  },
} as const;

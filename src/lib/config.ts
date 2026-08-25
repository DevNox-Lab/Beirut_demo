/**
 * Centralized runtime configuration.
 *
 * All environment access happens here so the rest of the app never touches
 * `process.env` directly. Values fall back to sensible defaults so the demo
 * runs with zero configuration.
 *
 * IMPORTANT: environment variables can be *defined but empty* (common on
 * hosting platforms like Vercel). The nullish coalescing operator (`??`) does
 * NOT catch empty strings, so we always trim and treat "" as "unset" to avoid
 * invalid values (e.g. an empty string reaching `new URL()`).
 *
 * Reminder: only variables prefixed with NEXT_PUBLIC_ are available in the
 * browser. Server-only secrets (DATABASE_URL, service keys) must never be
 * referenced from client components.
 */

export type ReservationBackend = "demo" | "supabase";

/** Return a trimmed env value, or `undefined` when missing/empty/whitespace. */
function env(name: string): string | undefined {
  const raw = process.env[name];
  if (typeof raw !== "string") return undefined;
  const trimmed = raw.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

/**
 * Resolve a usable absolute URL. Guards against empty/whitespace/invalid input
 * so an invalid value can never reach `new URL()` at build time.
 */
export function safeUrl(value: string | undefined, fallback: string): string {
  const candidate = value?.trim() || fallback;
  const stripTrailingSlash = (s: string) => s.replace(/\/+$/, "");
  try {
    // Validate; throws on invalid input.
    new URL(candidate);
    return stripTrailingSlash(candidate);
  } catch {
    try {
      new URL(fallback);
      return stripTrailingSlash(fallback);
    } catch {
      return "https://beirutdishes.ma";
    }
  }
}

const DEFAULT_SITE_URL = "https://beirutdishes.ma";
const DEFAULT_WHATSAPP = "212669090588";

/** Reservation backend, validated against the allowed set (defaults to demo). */
function resolveBackend(): ReservationBackend {
  return env("NEXT_PUBLIC_RESERVATION_BACKEND") === "supabase"
    ? "supabase"
    : "demo";
}

export const config = {
  /** Canonical public site URL (absolute, no trailing slash, always valid). */
  siteUrl: safeUrl(env("NEXT_PUBLIC_SITE_URL"), DEFAULT_SITE_URL),

  /** WhatsApp number, digits only. Empty/whitespace values fall back safely. */
  whatsappNumber: (
    env("NEXT_PUBLIC_WHATSAPP_NUMBER") ??
    env("WHATSAPP_NUMBER") ??
    DEFAULT_WHATSAPP
  ).replace(/[^0-9]/g, "") || DEFAULT_WHATSAPP,

  /** Which reservation storage layer to use. */
  reservationBackend: resolveBackend(),

  supabase: {
    url: env("NEXT_PUBLIC_SUPABASE_URL") ?? "",
    anonKey: env("NEXT_PUBLIC_SUPABASE_ANON_KEY") ?? "",
  },
} as const;

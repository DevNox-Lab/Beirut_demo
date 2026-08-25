export type Locale = "en" | "ar" | "fr";

export type Direction = "ltr" | "rtl";

/**
 * A translatable string. Either a plain string (same in all languages)
 * or a per-locale object. `en` is required; `ar`/`fr` fall back to `en`.
 */
export type LocalizedText =
  | string
  | {
      en: string;
      ar?: string;
      fr?: string;
    };

/** Resolve a LocalizedText for a given locale with graceful fallback. */
export function localize(text: LocalizedText, locale: Locale): string {
  if (typeof text === "string") return text;
  return text[locale] ?? text.en;
}

export interface LocaleMeta {
  code: Locale;
  label: string; // native label
  short: string; // e.g. EN
  dir: Direction;
}

export const localeMeta: Record<Locale, LocaleMeta> = {
  en: { code: "en", label: "English", short: "EN", dir: "ltr" },
  ar: { code: "ar", label: "العربية", short: "ع", dir: "rtl" },
  fr: { code: "fr", label: "Français", short: "FR", dir: "ltr" },
};

export const locales: Locale[] = ["en", "ar", "fr"];
export const defaultLocale: Locale = "en";

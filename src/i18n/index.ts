import en, { type Dictionary } from "./en";
import ar from "./ar";
import fr from "./fr";
import type { Locale } from "./types";

export const dictionaries: Record<Locale, Dictionary> = { en, ar, fr };

export type { Dictionary };
export * from "./types";

"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { dictionaries, type Dictionary } from "./index";
import {
  defaultLocale,
  localeMeta,
  localize,
  type Locale,
  type LocalizedText,
} from "./types";

interface I18nContextValue {
  locale: Locale;
  dir: "ltr" | "rtl";
  t: Dictionary;
  /** localize a LocalizedText value from data files */
  tf: (text: LocalizedText) => string;
  setLocale: (l: Locale) => void;
}

const I18nContext = createContext<I18nContextValue | null>(null);

const STORAGE_KEY = "beirut-dishes-locale";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);

  // hydrate from storage
  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY) as Locale | null;
    if (saved && dictionaries[saved]) setLocaleState(saved);
  }, []);

  // reflect on <html> and persist
  useEffect(() => {
    const dir = localeMeta[locale].dir;
    document.documentElement.lang = locale;
    document.documentElement.dir = dir;
    window.localStorage.setItem(STORAGE_KEY, locale);
  }, [locale]);

  const setLocale = useCallback((l: Locale) => setLocaleState(l), []);

  const value = useMemo<I18nContextValue>(() => {
    const dir = localeMeta[locale].dir;
    return {
      locale,
      dir,
      t: dictionaries[locale],
      tf: (text: LocalizedText) => localize(text, locale),
      setLocale,
    };
  }, [locale, setLocale]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within LanguageProvider");
  return ctx;
}

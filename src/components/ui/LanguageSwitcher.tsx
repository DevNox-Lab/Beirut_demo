"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useI18n } from "@/i18n/LanguageProvider";
import { localeMeta, locales } from "@/i18n/types";
import { cn } from "@/lib/utils";

export default function LanguageSwitcher({ className }: { className?: string }) {
  const { locale, setLocale } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div ref={ref} className={cn("relative", className)}>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Change language"
        className="flex items-center gap-2 rounded-full border border-gold/30 px-3 py-2 text-xs uppercase tracking-[0.15em] text-gold-light/80 transition-colors hover:border-gold hover:text-gold"
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3c2.5 2.5 3.5 6 3.5 9s-1 6.5-3.5 9c-2.5-2.5-3.5-6-3.5-9s1-6.5 3.5-9z" />
        </svg>
        {localeMeta[locale].short}
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="absolute end-0 mt-2 w-40 overflow-hidden rounded-2xl border border-gold/20 bg-ink-800/95 p-1.5 shadow-luxe backdrop-blur-xl"
          >
            {locales.map((l) => (
              <li key={l}>
                <button
                  onClick={() => {
                    setLocale(l);
                    setOpen(false);
                  }}
                  className={cn(
                    "flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm transition-colors",
                    locale === l
                      ? "bg-gold/10 text-gold"
                      : "text-gold-light/70 hover:bg-white/5 hover:text-gold-light"
                  )}
                >
                  <span className={l === "ar" ? "font-arabic text-base" : ""}>
                    {localeMeta[l].label}
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-gold-mid">
                    {localeMeta[l].short}
                  </span>
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

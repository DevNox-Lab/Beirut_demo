"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useI18n } from "@/i18n/LanguageProvider";
import Logo from "@/components/ui/Logo";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";

const linkKeys = [
  { key: "experience", href: "#experience" },
  { key: "menu", href: "#menu" },
  { key: "offers", href: "#offers" },
  { key: "story", href: "#story" },
  { key: "gallery", href: "#gallery" },
  { key: "reviews", href: "#reviews" },
  { key: "contact", href: "#contact" },
] as const;

export default function Navbar() {
  const { t } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled
            ? "border-b border-gold/10 bg-ink/70 backdrop-blur-xl"
            : "bg-transparent"
        )}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-12">
          <a href="#hero" aria-label={t.nav.experience}>
            <Logo variant="full" size={40} />
          </a>

          <ul className="hidden items-center gap-8 lg:flex">
            {linkKeys.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="group relative text-sm uppercase tracking-[0.15em] text-gold-light/70 transition-colors hover:text-gold"
                >
                  {t.nav[l.key]}
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <a
              href="#reservation"
              className="hidden rounded-full bg-gold-gradient px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.15em] text-ink shadow-glow transition-transform hover:scale-105 md:inline-block"
            >
              {t.nav.reserve}
            </a>
            <button
              aria-label="Menu"
              onClick={() => setOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/30 text-gold lg:hidden"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex flex-col bg-ink/95 backdrop-blur-2xl lg:hidden"
          >
            <div className="flex items-center justify-between px-6 py-4">
              <Logo variant="full" size={38} />
              <button
                aria-label="Close"
                onClick={() => setOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/30 text-gold"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            <ul className="flex flex-1 flex-col items-center justify-center gap-6">
              {linkKeys.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i }}
                >
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="font-display text-3xl text-gold-light/80 hover:text-gold"
                  >
                    {t.nav[l.key]}
                  </a>
                </motion.li>
              ))}
              <motion.li
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <a
                  href="#reservation"
                  onClick={() => setOpen(false)}
                  className="mt-4 inline-block rounded-full bg-gold-gradient px-8 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-ink"
                >
                  {t.nav.reserveTable}
                </a>
              </motion.li>
              <motion.li
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
              >
                <LanguageSwitcher />
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

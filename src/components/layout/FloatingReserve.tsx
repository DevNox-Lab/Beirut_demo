"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useI18n } from "@/i18n/LanguageProvider";

export default function FloatingReserve() {
  const { t } = useI18n();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const past = window.scrollY > window.innerHeight * 0.85;
      const resv = document.getElementById("reservation");
      let inReservation = false;
      if (resv) {
        const r = resv.getBoundingClientRect();
        inReservation = r.top < window.innerHeight * 0.6 && r.bottom > 0;
      }
      setShow(past && !inReservation);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.a
          href="#reservation"
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 24 }}
          whileHover={{ scale: 1.05 }}
          className="group fixed bottom-6 left-6 z-[80] flex items-center gap-3 rounded-full bg-gold-gradient px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.15em] text-ink shadow-glow"
        >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M8 7V3m8 4V3M3 11h18M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {t.floating.reserve}
        </motion.a>
      )}
    </AnimatePresence>
  );
}

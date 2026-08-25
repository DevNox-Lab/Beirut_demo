"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import { useI18n } from "@/i18n/LanguageProvider";
import type { ReactNode } from "react";

const iconProps = {
  width: 30,
  height: 30,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

// Icons align by index with t.services.items
const icons: ReactNode[] = [
  <svg key="dine" {...iconProps}>
    <path d="M3 3v7a3 3 0 003 3v8M6 3v7M9 3v7M15 3c-1 3-1 6 0 8v10" />
    <path d="M18 3c1 0 2 3 2 6s-1 4-2 4v8" />
  </svg>,
  <svg key="take" {...iconProps}>
    <path d="M6 8h12l-1 12H7L6 8z" />
    <path d="M9 8a3 3 0 016 0" />
  </svg>,
  <svg key="deliv" {...iconProps}>
    <path d="M3 13h11V6H3zM14 9h4l3 3v4h-7" />
    <circle cx="6.5" cy="17.5" r="1.8" />
    <circle cx="17.5" cy="17.5" r="1.8" />
  </svg>,
  <svg key="drive" {...iconProps}>
    <path d="M5 11l1.5-4h11L19 11M5 11h14v5H5zM5 16v2M19 16v2" />
    <circle cx="7.5" cy="13.5" r="0.6" />
    <circle cx="16.5" cy="13.5" r="0.6" />
  </svg>,
  <svg key="out" {...iconProps}>
    <path d="M12 2a7 7 0 017 7H5a7 7 0 017-7zM12 9v11M8 20h8" />
  </svg>,
  <svg key="fam" {...iconProps}>
    <circle cx="8" cy="8" r="2.4" />
    <circle cx="16" cy="8" r="2.4" />
    <path d="M4 20c0-3 2-5 4-5s4 2 4 5M12 20c0-3 2-5 4-5s4 2 4 5" />
  </svg>,
];

export default function Services() {
  const { t } = useI18n();

  return (
    <section className="relative overflow-hidden bg-ink-900 section-pad noise">
      <div className="arabesque pointer-events-none absolute inset-0 opacity-30" />
      <div className="relative mx-auto max-w-7xl">
        <SectionHeading
          eyebrow={t.services.eyebrow}
          arabic={t.services.arabic}
          title={t.services.title}
          subtitle={t.services.subtitle}
        />

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {t.services.items.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="group relative overflow-hidden rounded-3xl border border-gold/10 bg-white/[0.02] p-8 transition-all duration-500 hover:border-gold/40 hover:shadow-luxe"
            >
              <div className="pointer-events-none absolute -end-10 -top-10 h-32 w-32 rounded-full bg-gold/5 blur-2xl transition-all duration-500 group-hover:bg-gold/15" />
              <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-gold/20 bg-gold/5 text-gold transition-all duration-500 group-hover:scale-110 group-hover:border-gold/50 group-hover:text-gold-light group-hover:shadow-glow">
                {icons[i]}
              </div>
              <h3 className="mt-6 font-display text-2xl text-gold-light">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gold-light/50">{s.desc}</p>
              <div className="mt-5 h-px w-0 bg-gold-gradient transition-all duration-500 group-hover:w-full" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

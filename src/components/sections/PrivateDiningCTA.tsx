"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Reveal from "@/components/ui/Reveal";
import { useI18n } from "@/i18n/LanguageProvider";
import { whatsappLink } from "@/data/restaurant";

export default function PrivateDiningCTA() {
  const { t } = useI18n();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-14%", "14%"]);

  const wa = whatsappLink(t.privateDining.whatsappMessage);

  return (
    <section ref={ref} className="relative flex min-h-[70vh] items-center overflow-hidden">
      {/* Parallax background */}
      <motion.div style={{ y }} className="absolute inset-0 scale-125">
        <img
          src="https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=1900&q=80"
          alt="Private dining majlis"
          className="h-full w-full object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/80 to-ink/30" />
      <div className="absolute inset-0 bg-ink/40" />
      <div className="arabesque pointer-events-none absolute inset-0 opacity-20" />

      <div className="relative mx-auto w-full max-w-7xl px-6 md:px-12">
        <div className="max-w-2xl">
          <Reveal>
            <p className="mb-4 flex items-center gap-3 text-xs uppercase tracking-[0.4em] text-gold-mid">
              <span className="h-px w-8 bg-gold-mid/60" /> {t.privateDining.eyebrow}
            </p>
            <p className="font-arabic text-2xl text-crimson-light md:text-3xl">
              {t.privateDining.arabic}
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-4 font-display text-5xl font-light leading-[1.05] text-shadow-luxe md:text-7xl">
              <span className="text-gold-light">{t.privateDining.titleTop}</span>
              <br />
              <span className="text-gold-gradient">{t.privateDining.titleBottom}</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-gold-light/70">
              {t.privateDining.body}
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="mt-8 flex flex-wrap items-center gap-6">
              {t.privateDining.stats.map((s) => (
                <div key={s.l} className="border-s border-gold/20 ps-4">
                  <p className="font-display text-2xl text-gold-light">{s.n}</p>
                  <p className="text-xs uppercase tracking-[0.2em] text-gold-mid">{s.l}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.4}>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a href="#reservation" className="btn-luxe bg-gold-gradient text-ink shadow-glow">
                {t.privateDining.book}
                <svg className="rtl-flip" width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a
                href={wa}
                target="_blank"
                rel="noreferrer"
                className="btn-luxe border border-gold/40 text-gold hover:bg-gold/5"
              >
                {t.privateDining.enquire}
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

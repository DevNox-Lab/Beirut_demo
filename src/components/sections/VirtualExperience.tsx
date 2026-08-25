"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import { useI18n } from "@/i18n/LanguageProvider";

// Visual data (images + hotspot coordinates) stays here; all text comes from i18n.
const visuals = [
  {
    id: "hall",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1800&q=80",
    hotspots: [
      { x: 26, y: 62 },
      { x: 70, y: 34 },
    ],
  },
  {
    id: "outdoor",
    image:
      "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1800&q=80",
    hotspots: [
      { x: 40, y: 30 },
      { x: 64, y: 66 },
    ],
  },
  {
    id: "family",
    image:
      "https://images.unsplash.com/photo-1592861956120-e524fc739696?auto=format&fit=crop&w=1800&q=80",
    hotspots: [
      { x: 32, y: 48 },
      { x: 72, y: 40 },
    ],
  },
  {
    id: "private",
    image:
      "https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=1800&q=80",
    hotspots: [
      { x: 46, y: 40 },
      { x: 74, y: 60 },
    ],
  },
];

export default function VirtualExperience() {
  const { t } = useI18n();
  const [active, setActive] = useState(0);
  const spaces = t.experience.spaces;
  const space = spaces[active];
  const visual = visuals[active];

  return (
    <section
      id="experience"
      className="relative overflow-hidden bg-ink-900 section-pad noise"
    >
      <div className="arabesque pointer-events-none absolute inset-0 opacity-40" />
      <div className="relative mx-auto max-w-7xl">
        <SectionHeading
          eyebrow={t.experience.eyebrow}
          arabic={t.experience.arabic}
          title={t.experience.title}
          subtitle={t.experience.subtitle}
        />

        <div className="mt-16 grid gap-8 lg:grid-cols-[340px_1fr]">
          {/* Space selector */}
          <div className="flex flex-col gap-3">
            {spaces.map((s, i) => (
              <button
                key={visuals[i].id}
                onClick={() => setActive(i)}
                className={`group relative overflow-hidden rounded-2xl border p-5 text-start transition-all duration-500 ${
                  active === i
                    ? "border-gold/50 bg-gold/5 shadow-glow"
                    : "border-gold/10 bg-white/[0.02] hover:border-gold/30"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-display text-2xl text-gold-light">{s.name}</h3>
                    <p className="mt-1 text-xs uppercase tracking-[0.2em] text-gold-mid/70">
                      {s.tagline}
                    </p>
                  </div>
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all ${
                      active === i
                        ? "border-gold bg-gold text-ink"
                        : "border-gold/30 text-gold/60"
                    }`}
                  >
                    <svg className="rtl-flip" width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
                {active === i && (
                  <motion.div
                    layoutId="space-underline"
                    className="absolute inset-x-0 bottom-0 h-0.5 bg-gold-gradient"
                  />
                )}
              </button>
            ))}
          </div>

          {/* Cinematic viewport */}
          <div className="relative h-[420px] overflow-hidden rounded-3xl border border-gold/15 md:h-[560px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={visual.id}
                initial={{ opacity: 0, scale: 1.08 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                <motion.img
                  src={visual.image}
                  alt={space.name}
                  className="h-full w-full object-cover"
                  initial={{ scale: 1.15 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 8, ease: "easeOut" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/30 to-transparent" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(255,180,90,0.18),transparent_50%)]" />

                {visual.hotspots.map((h, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + idx * 0.2 }}
                    className="group absolute -translate-x-1/2 -translate-y-1/2"
                    style={{ left: `${h.x}%`, top: `${h.y}%` }}
                  >
                    <span className="relative flex h-4 w-4">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold/60" />
                      <span className="relative inline-flex h-4 w-4 rounded-full border border-gold bg-gold/40" />
                    </span>
                    <span className="pointer-events-none absolute start-6 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border border-gold/30 bg-ink/80 px-3 py-1 text-xs text-gold-light opacity-0 backdrop-blur transition-opacity duration-300 group-hover:opacity-100">
                      {space.hotspots[idx]}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

            <div className="absolute inset-x-0 bottom-0 z-10 p-8">
              <motion.div
                key={`cap-${visual.id}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                <h3 className="font-display text-3xl text-gold-light md:text-4xl">
                  {space.name}
                </h3>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-gold-light/70">
                  {space.desc}
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

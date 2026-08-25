"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Reveal from "@/components/ui/Reveal";
import { useI18n } from "@/i18n/LanguageProvider";

export default function Story() {
  const { t } = useI18n();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const yImg1 = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  const yImg2 = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);
  const scaleBg = useTransform(scrollYProgress, [0, 1], [1.1, 1.25]);
  const opacityText = useTransform(scrollYProgress, [0.1, 0.35, 0.75, 0.95], [0, 1, 1, 0.4]);

  return (
    <section id="story" ref={ref} className="relative overflow-hidden bg-ink">
      {/* Parallax backdrop */}
      <motion.div style={{ scale: scaleBg }} className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1900&q=80"
          alt="Beirut Dishes ambience"
          className="h-full w-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/85 to-ink" />
      </motion.div>

      <div className="relative mx-auto max-w-7xl px-6 py-28 md:px-12 md:py-40">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Text */}
          <motion.div style={{ opacity: opacityText }}>
            <Reveal>
              <p className="mb-4 flex items-center gap-3 text-xs uppercase tracking-[0.4em] text-gold-mid">
                <span className="h-px w-8 bg-gold-mid/60" /> {t.story.eyebrow}
              </p>
              <p className="font-arabic text-2xl text-crimson-light md:text-3xl">
                {t.story.arabic}
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-4 font-display text-4xl font-light leading-[1.1] text-gold-light md:text-6xl">
                {t.story.titleTop}
                <br />
                {t.story.titleBottom}
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-8 max-w-xl text-lg leading-relaxed text-gold-light/70">
                {t.story.body1}
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <p className="mt-5 max-w-xl leading-relaxed text-gold-light/50">
                {t.story.body2}
              </p>
            </Reveal>

            <div className="mt-12 flex gap-10">
              {t.story.stats.map((s, i) => (
                <Reveal key={s.l} delay={0.4 + i * 0.1}>
                  <div>
                    <p className="font-display text-4xl text-gold-gradient">
                      {s.n}
                    </p>
                    <p className="mt-1 text-xs uppercase tracking-[0.2em] text-gold-light/50">
                      {s.l}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </motion.div>

          {/* Parallax image stack */}
          <div className="relative h-[520px]">
            <motion.div
              style={{ y: yImg1 }}
              className="absolute left-0 top-0 h-72 w-56 overflow-hidden rounded-3xl border border-gold/20 shadow-luxe md:h-80 md:w-64"
            >
              <img
                src="https://images.unsplash.com/photo-1633321702518-7feccafb218f?auto=format&fit=crop&w=800&q=80"
                alt="Signature dish"
                className="h-full w-full object-cover"
              />
            </motion.div>
            <motion.div
              style={{ y: yImg2 }}
              className="absolute bottom-0 right-0 h-80 w-60 overflow-hidden rounded-3xl border border-gold/20 shadow-luxe md:h-96 md:w-72"
            >
              <img
                src="https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=800&q=80"
                alt="Interior"
                className="h-full w-full object-cover"
              />
            </motion.div>
            <div className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-crimson/20 blur-[80px]" />
          </div>
        </div>
      </div>
    </section>
  );
}

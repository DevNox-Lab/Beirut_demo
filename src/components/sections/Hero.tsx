"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import GoldButton from "@/components/ui/GoldButton";
import { useI18n } from "@/i18n/LanguageProvider";
import { restaurant } from "@/data/restaurant";

const HeroScene = dynamic(() => import("@/components/three/HeroScene"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-ink-900" />,
});

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15, delayChildren: 2.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function Hero() {
  const { t } = useI18n();
  const sceneRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(true);

  // Pause the WebGL render loop when the hero scrolls out of view (saves battery/GPU)
  useEffect(() => {
    const el = sceneRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { threshold: 0.05 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* 3D layer */}
      <div ref={sceneRef} className="absolute inset-0 z-0">
        <HeroScene active={active} />
      </div>

      {/* Vignette + gradient overlays */}
      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-ink-900/60 via-transparent to-ink-900" />
      <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(1,1,3,0.85)_100%)]" />

      {/* Content */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-20 flex flex-col items-center px-6 text-center"
      >
        <motion.p
          variants={item}
          className="mb-6 font-arabic text-2xl text-crimson-light md:text-3xl"
        >
          {restaurant.arabicName}
        </motion.p>

        <motion.div
          variants={item}
          className="mb-4 flex items-center gap-4 text-xs uppercase tracking-[0.4em] text-gold-mid"
        >
          <span className="h-px w-10 bg-gold-mid/50" />
          {t.hero.location}
          <span className="h-px w-10 bg-gold-mid/50" />
        </motion.div>

        <motion.h1
          variants={item}
          className="max-w-4xl font-display text-5xl font-light leading-[1.05] text-balance text-shadow-luxe md:text-7xl lg:text-8xl"
        >
          <span className="text-gold-light">{t.hero.line1}</span>
          <br />
          <span className="text-gold-gradient">{t.hero.line2}</span>
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-8 max-w-xl text-base leading-relaxed text-gold-light/60 md:text-lg"
        >
          {t.hero.subtitle}
        </motion.p>

        <motion.div
          variants={item}
          className="mt-12 flex flex-col items-center gap-4 sm:flex-row"
        >
          <a href="#reservation">
            <GoldButton variant="solid">
              {t.hero.reserveTable}
              <svg className="rtl-flip" width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </GoldButton>
          </a>
          <a href="#menu">
            <GoldButton variant="outline">{t.hero.exploreMenu}</GoldButton>
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3 }}
        className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2 text-gold-mid"
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">{t.common.scroll}</span>
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity }}
          className="h-10 w-px bg-gradient-to-b from-gold to-transparent"
        />
      </motion.div>
    </section>
  );
}

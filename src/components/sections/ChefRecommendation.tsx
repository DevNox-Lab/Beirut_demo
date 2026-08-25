"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { dishes } from "@/data/menu";
import { useI18n } from "@/i18n/LanguageProvider";

const picks = dishes.filter((d) => d.signature).slice(0, 4);

export default function ChefRecommendation() {
  const { t, tf, locale } = useI18n();
  const [active, setActive] = useState(0);
  const dish = picks[active];

  useEffect(() => {
    const t = setInterval(() => setActive((a) => (a + 1) % picks.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative overflow-hidden bg-ink-900 section-pad noise">
      <div className="arabesque pointer-events-none absolute inset-0 opacity-30" />
      <div className="pointer-events-none absolute -left-20 top-1/4 h-96 w-96 rounded-full bg-crimson/10 blur-[130px]" />
      <div className="relative mx-auto max-w-7xl">
        <SectionHeading
          eyebrow={t.chef.eyebrow}
          arabic={t.chef.arabic}
          title={t.chef.title}
          subtitle={t.chef.subtitle}
        />

        <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
          <div className="relative mx-auto aspect-square w-full max-w-md">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full border border-dashed border-gold/20"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              className="absolute inset-6 rounded-full border border-gold/10"
            />
            <div className="absolute inset-10 overflow-hidden rounded-full border border-gold/25 shadow-luxe">
              <AnimatePresence mode="wait">
                <motion.img
                  key={dish.id}
                  src={dish.image}
                  alt={tf(dish.name)}
                  initial={{ opacity: 0, scale: 1.25, rotate: -6 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 1.1 }}
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  className="h-full w-full object-cover"
                />
              </AnimatePresence>
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,220,150,0.25),transparent_55%)]" />
            </div>

            <motion.div
              key={`price-${dish.id}`}
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              className="absolute -end-2 top-6 flex h-20 w-20 flex-col items-center justify-center rounded-full bg-gold-gradient text-ink shadow-glow"
            >
              <span className="font-display text-2xl leading-none">{dish.price}</span>
              <span className="text-[10px] uppercase tracking-widest">{dish.currency}</span>
            </motion.div>
          </div>

          <div>
            <Reveal>
              <div className="mb-4 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-gradient font-display text-lg font-semibold text-ink">
                  ح
                </span>
                <div>
                  <p className="text-sm text-gold-light">{t.chef.chefName}</p>
                  <p className="text-xs uppercase tracking-[0.2em] text-gold-mid">
                    {t.chef.chefRole}
                  </p>
                </div>
              </div>
            </Reveal>

            <AnimatePresence mode="wait">
              <motion.div
                key={dish.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.6 }}
              >
                {locale !== "ar" && (
                  <p className="font-arabic text-2xl text-crimson-light">{dish.arabicName}</p>
                )}
                <h3 className="mt-1 font-display text-4xl text-gold-light md:text-5xl">
                  {tf(dish.name)}
                </h3>
                <p className="mt-4 max-w-lg text-base leading-relaxed text-gold-light/70">
                  {tf(dish.story)}
                </p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {dish.ingredients.slice(0, 4).map((ing) => (
                    <li
                      key={ing}
                      className="rounded-full border border-gold/20 bg-gold/5 px-3 py-1.5 text-xs text-gold-light/80"
                    >
                      {ing}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>

            <div className="mt-8 flex items-center gap-3">
              {picks.map((p, i) => (
                <button
                  key={p.id}
                  onClick={() => setActive(i)}
                  aria-label={tf(p.name)}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    i === active ? "w-10 bg-gold-gradient" : "w-4 bg-gold/25 hover:bg-gold/50"
                  }`}
                />
              ))}
              <a
                href="#menu"
                className="ms-auto text-sm uppercase tracking-[0.15em] text-gold-mid transition-colors hover:text-gold"
              >
                {t.common.fullMenu} →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

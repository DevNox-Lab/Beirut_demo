"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import { categories, dishes, type Dish, type MenuCategory } from "@/data/menu";
import { useI18n } from "@/i18n/LanguageProvider";

function SpiceMeter({ level = 0 }: { level?: number }) {
  return (
    <span className="flex items-center gap-1">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className={`h-1.5 w-1.5 rounded-full ${
            i < level ? "bg-crimson-light" : "bg-gold/20"
          }`}
        />
      ))}
    </span>
  );
}

function DishCard({ dish, onOpen }: { dish: Dish; onOpen: () => void }) {
  const { t, tf, locale } = useI18n();
  return (
    <motion.button
      layout
      onClick={onOpen}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-gold/10 bg-white/[0.02] text-start transition-all duration-500 hover:border-gold/40 hover:shadow-luxe"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={dish.image}
          alt={tf(dish.name)}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/20 to-transparent" />
        {dish.signature && (
          <span className="absolute start-4 top-4 rounded-full border border-gold/40 bg-ink/70 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-gold backdrop-blur">
            {t.common.signature}
          </span>
        )}
        <span className="absolute end-4 top-4 rounded-full bg-gold-gradient px-3 py-1 text-xs font-semibold text-ink shadow-glow">
          {dish.price} {dish.currency}
        </span>

        <div className="absolute inset-x-0 bottom-0 translate-y-4 p-5 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-gold">
            {t.common.viewDish}
            <svg className="rtl-flip" width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            {locale !== "ar" && (
              <p className="font-arabic text-sm text-crimson-light">{dish.arabicName}</p>
            )}
            <h3 className="font-display text-2xl leading-tight text-gold-light">
              {tf(dish.name)}
            </h3>
          </div>
          <SpiceMeter level={dish.spice} />
        </div>
        <p className="mt-2 text-sm leading-relaxed text-gold-light/50">
          {tf(dish.shortDesc)}
        </p>
      </div>
    </motion.button>
  );
}

function DishModal({ dish, onClose }: { dish: Dish; onClose: () => void }) {
  const { t, tf, locale } = useI18n();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[90] flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-ink-900/90 backdrop-blur-xl" />
      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.97 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative grid max-h-[90vh] w-full max-w-5xl overflow-hidden rounded-3xl border border-gold/20 bg-ink-800 shadow-luxe md:grid-cols-2"
      >
        <div className="relative h-64 overflow-hidden md:h-auto">
          <motion.img
            src={dish.image}
            alt={tf(dish.name)}
            className="h-full w-full object-cover"
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 6, ease: "easeOut" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-800 via-transparent to-transparent md:bg-gradient-to-r" />
        </div>

        <div className="relative flex flex-col overflow-y-auto p-8 md:p-10">
          <button
            onClick={onClose}
            aria-label={t.common.close}
            className="absolute end-5 top-5 flex h-9 w-9 items-center justify-center rounded-full border border-gold/30 text-gold transition-colors hover:bg-gold/10"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>

          <span className="text-xs uppercase tracking-[0.3em] text-gold-mid">
            {t.menuSection.categories[dish.category]}
          </span>
          {locale !== "ar" && (
            <p className="mt-3 font-arabic text-xl text-crimson-light">{dish.arabicName}</p>
          )}
          <h3 className="mt-1 font-display text-4xl text-gold-light">{tf(dish.name)}</h3>
          <p className="mt-2 font-display text-2xl text-gold-gradient">
            {dish.price} {dish.currency}
          </p>

          <div className="my-6 gold-hairline" />

          <h4 className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-mid">
            {t.menuSection.theStory}
          </h4>
          <p className="mt-3 text-sm leading-relaxed text-gold-light/70">{tf(dish.story)}</p>

          <h4 className="mt-6 text-xs font-semibold uppercase tracking-[0.3em] text-gold-mid">
            {t.menuSection.ingredients}
          </h4>
          <ul className="mt-3 flex flex-wrap gap-2">
            {dish.ingredients.map((ing) => (
              <li
                key={ing}
                className="rounded-full border border-gold/20 bg-gold/5 px-3 py-1.5 text-xs text-gold-light/80"
              >
                {ing}
              </li>
            ))}
          </ul>

          <a
            href="#reservation"
            onClick={onClose}
            className="btn-luxe mt-8 self-start bg-gold-gradient text-ink shadow-glow"
          >
            {t.common.reserveToTaste}
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Menu() {
  const { t } = useI18n();
  const [active, setActive] = useState<MenuCategory | "All">("All");
  const [selected, setSelected] = useState<Dish | null>(null);

  const filtered =
    active === "All" ? dishes : dishes.filter((d) => d.category === active);

  const tabs: (MenuCategory | "All")[] = ["All", ...categories];

  return (
    <section id="menu" className="relative overflow-hidden bg-ink section-pad">
      <div className="pointer-events-none absolute -top-40 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-crimson/10 blur-[120px]" />
      <div className="relative mx-auto max-w-7xl">
        <SectionHeading
          eyebrow={t.menuSection.eyebrow}
          arabic={t.menuSection.arabic}
          title={t.menuSection.title}
          subtitle={t.menuSection.subtitle}
        />

        <div className="no-scrollbar mt-12 flex justify-start gap-3 overflow-x-auto pb-2 md:justify-center">
          {tabs.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`relative shrink-0 rounded-full border px-5 py-2.5 text-sm uppercase tracking-[0.15em] transition-all duration-300 ${
                active === c
                  ? "border-gold/50 text-ink"
                  : "border-gold/15 text-gold-light/60 hover:border-gold/40 hover:text-gold"
              }`}
            >
              {active === c && (
                <motion.span
                  layoutId="menu-tab"
                  className="absolute inset-0 rounded-full bg-gold-gradient"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <span className="relative z-10">
                {c === "All" ? t.menuSection.all : t.menuSection.categories[c]}
              </span>
            </button>
          ))}
        </div>

        <motion.div layout className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((dish) => (
              <DishCard key={dish.id} dish={dish} onOpen={() => setSelected(dish)} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {selected && <DishModal dish={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  );
}

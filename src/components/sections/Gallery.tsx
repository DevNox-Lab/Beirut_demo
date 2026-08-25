"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import {
  gallery,
  galleryCategories,
  type GalleryCategory,
  type GalleryItem,
} from "@/data/gallery";
import { useI18n } from "@/i18n/LanguageProvider";

export default function Gallery() {
  const { t, tf } = useI18n();
  const [active, setActive] = useState<GalleryCategory | "All">("All");
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null);

  const items = useMemo(
    () => (active === "All" ? gallery : gallery.filter((g) => g.category === active)),
    [active]
  );

  const openIndex = lightbox ? items.findIndex((i) => i.id === lightbox.id) : -1;

  const navigate = (dir: 1 | -1) => {
    if (openIndex === -1) return;
    const next = (openIndex + dir + items.length) % items.length;
    setLightbox(items[next]);
  };

  return (
    <section id="gallery" className="relative overflow-hidden bg-ink-900 section-pad">
      <div className="relative mx-auto max-w-7xl">
        <SectionHeading
          eyebrow={t.gallery.eyebrow}
          arabic={t.gallery.arabic}
          title={t.gallery.title}
          subtitle={t.gallery.subtitle}
        />

        {/* Filters */}
        <div className="no-scrollbar mt-12 flex justify-start gap-3 overflow-x-auto pb-2 md:justify-center">
          {galleryCategories.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`relative shrink-0 rounded-full border px-5 py-2.5 text-sm uppercase tracking-[0.15em] transition-all ${
                active === c
                  ? "border-gold/50 text-ink"
                  : "border-gold/15 text-gold-light/60 hover:border-gold/40 hover:text-gold"
              }`}
            >
              {active === c && (
                <motion.span
                  layoutId="gallery-tab"
                  className="absolute inset-0 rounded-full bg-gold-gradient"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <span className="relative z-10">{t.gallery.categories[c]}</span>
            </button>
          ))}
        </div>

        {/* Masonry grid */}
        <motion.div
          layout
          className="mt-12 grid auto-rows-[220px] grid-cols-2 gap-4 md:grid-cols-4"
        >
          <AnimatePresence mode="popLayout">
            {items.map((item) => (
              <motion.button
                layout
                key={item.id}
                onClick={() => setLightbox(item)}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className={`group relative overflow-hidden rounded-2xl border border-gold/10 ${
                  item.span === "tall" ? "row-span-2" : ""
                } ${item.span === "wide" ? "col-span-2" : ""}`}
              >
                <img
                  src={item.src}
                  alt={tf(item.caption)}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-900/90 via-transparent to-transparent opacity-70 transition-opacity group-hover:opacity-100" />
                <div className="absolute inset-x-0 bottom-0 translate-y-3 p-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-gold-mid">
                    {t.gallery.categories[item.category]}
                  </span>
                  <p className="font-display text-lg text-gold-light">
                    {tf(item.caption)}
                  </p>
                </div>
                <span className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full border border-gold/30 bg-ink/50 text-gold opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[95] flex items-center justify-center p-4 md:p-10"
            onClick={() => setLightbox(null)}
          >
            <div className="absolute inset-0 bg-ink-900/95 backdrop-blur-xl" />

            <button
              onClick={() => setLightbox(null)}
              aria-label="Close"
              className="absolute right-5 top-5 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-gold/30 text-gold hover:bg-gold/10"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); navigate(-1); }}
              aria-label="Previous"
              className="absolute left-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-gold/30 text-gold hover:bg-gold/10 md:left-8"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); navigate(1); }}
              aria-label="Next"
              className="absolute right-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-gold/30 text-gold hover:bg-gold/10 md:right-8"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <motion.div
              key={lightbox.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[85vh] w-full max-w-4xl overflow-hidden rounded-2xl border border-gold/20"
            >
              <img
                src={lightbox.src}
                alt={tf(lightbox.caption)}
                className="max-h-[85vh] w-full object-contain"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink-900 to-transparent p-6">
                <span className="text-[10px] uppercase tracking-[0.2em] text-gold-mid">
                  {t.gallery.categories[lightbox.category]}
                </span>
                <p className="font-display text-2xl text-gold-light">
                  {tf(lightbox.caption)}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

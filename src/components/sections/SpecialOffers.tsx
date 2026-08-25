"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import { useI18n } from "@/i18n/LanguageProvider";

// Visual data stays here; text is pulled from i18n by index.
const visuals = [
  {
    image:
      "https://images.unsplash.com/photo-1544510808-91bcbee1df55?auto=format&fit=crop&w=1200&q=80",
    accent: "gold" as const,
  },
  {
    image:
      "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=1200&q=80",
    accent: "crimson" as const,
  },
  {
    image:
      "https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=1200&q=80",
    accent: "emerald" as const,
  },
];

const ring = {
  gold: "border-gold/40 text-gold",
  crimson: "border-crimson/50 text-crimson-light",
  emerald: "border-emerald-light/50 text-emerald-light",
};

export default function SpecialOffers() {
  const { t, locale } = useI18n();

  return (
    <section id="offers" className="relative overflow-hidden bg-ink section-pad">
      <div className="relative mx-auto max-w-7xl">
        <SectionHeading
          eyebrow={t.offers.eyebrow}
          arabic={t.offers.arabic}
          title={t.offers.title}
          subtitle={t.offers.subtitle}
        />

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {t.offers.items.map((o, i) => (
            <motion.article
              key={o.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="card-hover group relative overflow-hidden rounded-3xl border border-gold/10"
            >
              <div className="relative h-72 overflow-hidden">
                <img
                  src={visuals[i].image}
                  alt={o.title}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
                <span
                  className={`absolute start-5 top-5 rounded-full border bg-ink/70 px-3 py-1 text-[10px] uppercase tracking-[0.2em] backdrop-blur ${ring[visuals[i].accent]}`}
                >
                  {o.tag}
                </span>
              </div>

              <div className="absolute inset-x-0 bottom-0 p-6">
                {locale !== "ar" && (
                  <p className="font-arabic text-sm text-crimson-light">{o.arabic}</p>
                )}
                <h3 className="mt-1 font-display text-2xl text-gold-light">{o.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gold-light/60">{o.desc}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs uppercase tracking-[0.2em] text-gold-mid">
                    {o.detail}
                  </span>
                  <a
                    href="#reservation"
                    className="flex items-center gap-1.5 text-xs uppercase tracking-[0.15em] text-gold opacity-0 transition-all duration-500 group-hover:opacity-100"
                  >
                    {t.common.book}
                    <svg className="rtl-flip" width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                </div>
              </div>
              <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-gold/10 transition-all duration-500 group-hover:ring-gold/30" />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

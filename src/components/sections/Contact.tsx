"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { useI18n } from "@/i18n/LanguageProvider";
import { restaurant, whatsappLink } from "@/data/restaurant";

export default function Contact() {
  const { t } = useI18n();

  const contactItems = [
    {
      label: t.contact.location,
      value: restaurant.address.full,
      href: `https://maps.google.com/?q=${encodeURIComponent(restaurant.address.mapsQuery)}`,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 21s7-5.5 7-11a7 7 0 10-14 0c0 5.5 7 11 7 11z" />
          <circle cx="12" cy="10" r="2.5" />
        </svg>
      ),
    },
    {
      label: t.contact.phone,
      value: restaurant.phoneDisplay,
      href: `tel:${restaurant.phoneE164}`,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3 19.5 19.5 0 01-6-6 19.8 19.8 0 01-3-8.6A2 2 0 014.1 2h3a2 2 0 012 1.7c.1.9.3 1.8.6 2.7a2 2 0 01-.5 2.1L8.1 9.6a16 16 0 006 6l1.1-1.1a2 2 0 012.1-.5c.9.3 1.8.5 2.7.6a2 2 0 011.9 2.3z" />
        </svg>
      ),
    },
    {
      label: t.contact.instagram,
      value: "@beirut_dishes",
      href: restaurant.social.instagram,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
        </svg>
      ),
    },
    {
      label: t.contact.facebook,
      value: restaurant.legalName,
      href: restaurant.social.facebook,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M15 3h-3a4 4 0 00-4 4v3H5v4h3v7h4v-7h3l1-4h-4V7a1 1 0 011-1h3z" />
        </svg>
      ),
    },
  ];

  const wa = whatsappLink(t.contact.whatsappMessage);

  return (
    <section id="contact" className="relative overflow-hidden bg-ink section-pad">
      <div className="pointer-events-none absolute -bottom-20 left-1/4 h-80 w-80 rounded-full bg-crimson/10 blur-[120px]" />
      <div className="relative mx-auto max-w-7xl">
        <SectionHeading
          eyebrow={t.contact.eyebrow}
          arabic={t.contact.arabic}
          title={t.contact.title}
          subtitle={t.contact.subtitle}
        />

        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          <div className="flex flex-col gap-4">
            {contactItems.map((c, i) => (
              <Reveal key={c.label} delay={i * 0.08}>
                <a
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="group flex items-center gap-5 rounded-2xl border border-gold/10 bg-white/[0.02] p-5 transition-all hover:border-gold/40 hover:bg-white/[0.04]"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-gold/20 bg-gold/5 text-gold transition-all group-hover:scale-110 group-hover:text-gold-light">
                    {c.icon}
                  </span>
                  <div>
                    <p className="text-xs uppercase tracking-[0.25em] text-gold-mid">{c.label}</p>
                    <p className="mt-0.5 text-lg text-gold-light">{c.value}</p>
                  </div>
                  <svg
                    className="ms-auto text-gold/40 transition-all group-hover:text-gold rtl-flip"
                    width="18" height="18" viewBox="0 0 24 24" fill="none"
                  >
                    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </Reveal>
            ))}

            <Reveal delay={0.35}>
              <a
                href={wa}
                target="_blank"
                rel="noreferrer"
                className="btn-luxe mt-2 w-full bg-emerald-brand text-gold-light shadow-[0_0_40px_-10px_rgba(13,115,15,0.7)] hover:bg-emerald-light"
              >
                {t.contact.whatsappCta}
              </a>
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            <div className="group relative h-full min-h-[360px] overflow-hidden rounded-3xl border border-gold/15">
              <iframe
                title="Beirut Dishes location"
                src="https://www.openstreetmap.org/export/embed.html?bbox=4.0%2C34.19%2C4.05%2C34.23&layer=mapnik&marker=34.21%2C4.01"
                className="absolute inset-0 h-full w-full opacity-80 grayscale transition-all duration-700 group-hover:opacity-100 group-hover:grayscale-0"
                loading="lazy"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-900/70 via-transparent to-ink-900/30" />
              <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-gold/10" />
              <div className="absolute bottom-5 start-5 rounded-2xl border border-gold/20 bg-ink/80 p-4 backdrop-blur">
                <p className="font-arabic text-sm text-crimson-light">{restaurant.arabicName}</p>
                <p className="font-display text-xl text-gold-light">{restaurant.name}</p>
                <p className="text-xs text-gold-light/50">{restaurant.address.full}</p>
              </div>
              <motion.a
                href={`https://maps.google.com/?q=${encodeURIComponent(restaurant.address.mapsQuery)}`}
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.05 }}
                className="absolute end-5 top-5 rounded-full bg-gold-gradient px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-ink shadow-glow"
              >
                {t.common.openInMaps}
              </motion.a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

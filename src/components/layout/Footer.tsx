"use client";

import Link from "next/link";
import { useI18n } from "@/i18n/LanguageProvider";
import Logo from "@/components/ui/Logo";
import { restaurant } from "@/data/restaurant";

export default function Footer() {
  const { t } = useI18n();
  return (
    <footer className="relative overflow-hidden border-t border-gold/10 bg-ink-900 px-6 py-16 md:px-12">
      <div className="arabesque pointer-events-none absolute inset-0 opacity-40" />
      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <Logo variant="full" size={48} wordmarkClassName="text-2xl" />
            <p className="mt-6 max-w-md text-sm leading-relaxed text-gold-light/50">
              {t.footer.tagline}
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-gold-mid">
              {t.footer.explore}
            </h4>
            <ul className="space-y-3 text-sm text-gold-light/60">
              <li><a href="#menu" className="hover:text-gold">{t.footer.menu}</a></li>
              <li><a href="#reservation" className="hover:text-gold">{t.footer.reservations}</a></li>
              <li><a href="#gallery" className="hover:text-gold">{t.footer.gallery}</a></li>
              <li><Link href="/admin" className="hover:text-gold">{t.footer.adminDemo}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-gold-mid">
              {t.footer.visit}
            </h4>
            <ul className="space-y-3 text-sm text-gold-light/60">
              <li>{restaurant.address.full}</li>
              <li><a href={`tel:${restaurant.phoneE164}`} className="hover:text-gold">{restaurant.phoneDisplay}</a></li>
              <li className="flex gap-4 pt-2">
                <a href={restaurant.social.instagram} target="_blank" rel="noreferrer" className="hover:text-gold">{t.contact.instagram}</a>
                <a href={restaurant.social.facebook} target="_blank" rel="noreferrer" className="hover:text-gold">{t.contact.facebook}</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-gold/10 pt-8 text-xs text-gold-light/40 md:flex-row">
          <p>© {new Date().getFullYear()} {restaurant.name}. {t.footer.rights}</p>
          <p>{t.footer.crafted}</p>
        </div>
      </div>
    </footer>
  );
}

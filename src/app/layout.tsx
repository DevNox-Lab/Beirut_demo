import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Jost, Amiri } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/i18n/LanguageProvider";
import { restaurant } from "@/data/restaurant";
import { config } from "@/lib/config";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const body = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

const arabic = Amiri({
  subsets: ["arabic", "latin"],
  weight: ["400", "700"],
  variable: "--font-arabic",
  display: "swap",
});

const SITE_URL = config.siteUrl;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Beirut Dishes — أطباق بيروت | Lebanese Fine Dining in Taza",
    template: "%s | Beirut Dishes",
  },
  description:
    "Authentic Lebanese flavors crafted with Moroccan hospitality. An immersive fine-dining experience in Taza, Morocco. Reserve your table at Beirut Dishes — أطباق بيروت.",
  applicationName: "Beirut Dishes",
  keywords: [
    "Beirut Dishes",
    "أطباق بيروت",
    "Lebanese Restaurant Taza",
    "Restaurant libanais Taza",
    "Middle Eastern Cuisine Morocco",
    "Shawarma Taza",
    "Hummus",
    "Fine Dining Taza",
    "مطعم لبناني تازة",
  ],
  authors: [{ name: "Beirut Dishes" }],
  creator: "Beirut Dishes",
  alternates: {
    canonical: SITE_URL,
    languages: {
      en: SITE_URL,
      "ar-MA": SITE_URL,
      fr: SITE_URL,
    },
  },
  openGraph: {
    type: "website",
    siteName: "Beirut Dishes",
    title: "Beirut Dishes — Lebanese Fine Dining in Taza",
    description:
      "Authentic Lebanese flavors crafted with Moroccan hospitality. Reserve your table in Taza, Morocco.",
    url: SITE_URL,
    locale: "en_US",
    alternateLocale: ["ar_MA", "fr_FR"],
    images: [
      {
        url: "/images/logo/beirut-dishes.svg",
        width: 240,
        height: 240,
        alt: "Beirut Dishes",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Beirut Dishes — Lebanese Fine Dining in Taza",
    description:
      "Authentic Lebanese flavors crafted with Moroccan hospitality.",
    images: ["/images/logo/beirut-dishes.svg"],
  },
  robots: { index: true, follow: true },
  category: "restaurant",
};

export const viewport: Viewport = {
  themeColor: "#010103",
  width: "device-width",
  initialScale: 1,
};

function restaurantSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: restaurant.name,
    alternateName: restaurant.arabicName,
    legalName: restaurant.legalName,
    description:
      typeof restaurant.description === "string"
        ? restaurant.description
        : restaurant.description.en,
    servesCuisine: restaurant.cuisine,
    priceRange: restaurant.priceRange,
    telephone: restaurant.phoneE164,
    email: restaurant.email,
    url: SITE_URL,
    image: `${SITE_URL}/images/logo/beirut-dishes.svg`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Taza",
      addressCountry: "MA",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: restaurant.address.lat,
      longitude: restaurant.address.lng,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: restaurant.rating.average,
      reviewCount: restaurant.rating.total,
      bestRating: 5,
    },
    sameAs: [restaurant.social.instagram, restaurant.social.facebook],
    openingHoursSpecification: restaurant.hours.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: `https://schema.org/${h.key}`,
      opens: h.open,
      closes: h.close,
    })),
    acceptsReservations: true,
  };
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" dir="ltr" className={`${display.variable} ${body.variable} ${arabic.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantSchema()) }}
        />
      </head>
      <body className="bg-ink text-gold-light antialiased">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}

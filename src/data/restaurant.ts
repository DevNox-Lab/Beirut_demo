import type { LocalizedText } from "@/i18n/types";
import { config } from "@/lib/config";

/**
 * Single source of truth for all Beirut Dishes business information.
 * Swap these values to reflect the live restaurant — everything on the
 * site reads from here.
 */

export interface OpeningDay {
  /** JS Date.getDay() index (0 = Sunday) */
  idx: number;
  key: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";
  open: string; // "HH:MM"
  close: string; // "HH:MM" — may be past midnight (e.g. "00:30")
}

export interface RestaurantInfo {
  name: string;
  arabicName: string;
  legalName: string;
  description: LocalizedText;
  cuisine: string[];
  priceRange: string;
  address: {
    city: LocalizedText;
    country: LocalizedText;
    /** free-form single line used for maps / schema */
    full: string;
    mapsQuery: string;
    /** approximate coordinates for schema + map embed */
    lat: number;
    lng: number;
  };
  phoneDisplay: string;
  phoneE164: string;
  whatsapp: string; // international, no + or spaces
  email: string;
  social: {
    instagram: string;
    facebook: string;
  };
  hours: OpeningDay[];
  serviceKeys: (
    | "dineIn"
    | "takeaway"
    | "delivery"
    | "driveThrough"
    | "outdoor"
    | "family"
  )[];
  rating: { average: number; total: number };
}

export const restaurant: RestaurantInfo = {
  name: "Beirut Dishes",
  arabicName: "أطباق بيروت",
  legalName: "Beirut House Restaurant",
  description: {
    en: "Authentic Lebanese flavors crafted with Moroccan hospitality — a fine-dining experience in the heart of Taza, Morocco.",
    ar: "نكهات لبنانية أصيلة بحفاوة الضيافة المغربية — تجربة طعام راقية في قلب تازة، المغرب.",
    fr: "Saveurs libanaises authentiques sublimées par l'hospitalité marocaine — une expérience gastronomique au cœur de Taza, Maroc.",
  },
  cuisine: ["Lebanese", "Middle Eastern", "Mediterranean"],
  priceRange: "$$",
  address: {
    city: { en: "Taza", ar: "تازة", fr: "Taza" },
    country: { en: "Morocco", ar: "المغرب", fr: "Maroc" },
    full: "Taza, Morocco",
    mapsQuery: "Beirut Dishes Taza Morocco",
    lat: 34.21,
    lng: -4.01,
  },
  phoneDisplay: "+212 6 69 09 05 88",
  phoneE164: "+212669090588",
  whatsapp: config.whatsappNumber,
  email: "hello@beirutdishes.ma",
  social: {
    instagram: "https://www.instagram.com/beirut_dishes/",
    facebook: "https://www.facebook.com/BeirutHouseRestaurant/",
  },
  hours: [
    { idx: 1, key: "Monday", open: "12:00", close: "23:00" },
    { idx: 2, key: "Tuesday", open: "12:00", close: "23:00" },
    { idx: 3, key: "Wednesday", open: "12:00", close: "23:00" },
    { idx: 4, key: "Thursday", open: "12:00", close: "23:30" },
    { idx: 5, key: "Friday", open: "13:00", close: "00:30" },
    { idx: 6, key: "Saturday", open: "12:00", close: "00:30" },
    { idx: 0, key: "Sunday", open: "12:00", close: "23:00" },
  ],
  serviceKeys: ["dineIn", "takeaway", "delivery", "driveThrough", "outdoor", "family"],
  rating: { average: 4.3, total: 114 },
};

/** Helper: build a wa.me link with a pre-filled message. */
export function whatsappLink(message: string): string {
  return `https://wa.me/${restaurant.whatsapp}?text=${encodeURIComponent(message)}`;
}

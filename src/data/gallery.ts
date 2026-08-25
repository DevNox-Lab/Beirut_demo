import type { LocalizedText } from "@/i18n/types";

export type GalleryCategory = "Food" | "Interior" | "Events" | "Customers";

export interface GalleryItem {
  id: string;
  category: GalleryCategory;
  /** local asset path or remote URL — see public/images/ */
  src: string;
  caption: LocalizedText;
  span?: "tall" | "wide" | "normal";
}

export const galleryCategories: (GalleryCategory | "All")[] = [
  "All",
  "Food",
  "Interior",
  "Events",
  "Customers",
];

export const gallery: GalleryItem[] = [
  {
    id: "g1",
    category: "Food",
    src: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80",
    caption: { en: "Royal Lebanese Grill", ar: "مشاوي ملكية", fr: "Grillade royale libanaise" },
    span: "tall",
  },
  {
    id: "g2",
    category: "Interior",
    src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
    caption: { en: "The Main Hall", ar: "القاعة الرئيسية", fr: "La grande salle" },
    span: "wide",
  },
  {
    id: "g3",
    category: "Food",
    src: "https://images.unsplash.com/photo-1622440049916-95efb7b94b39?auto=format&fit=crop&w=1200&q=80",
    caption: { en: "Golden Hummus Beiruti", ar: "حمّص بيروتي", fr: "Houmous doré" },
  },
  {
    id: "g4",
    category: "Events",
    src: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1200&q=80",
    caption: { en: "Celebrations Under Lanterns", ar: "احتفالات تحت الفوانيس", fr: "Fêtes sous les lanternes" },
    span: "tall",
  },
  {
    id: "g5",
    category: "Interior",
    src: "https://images.unsplash.com/photo-1592861956120-e524fc739696?auto=format&fit=crop&w=1200&q=80",
    caption: { en: "Arabesque Lounge", ar: "صالة عربيسك", fr: "Salon arabesque" },
  },
  {
    id: "g6",
    category: "Customers",
    src: "https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=1200&q=80",
    caption: { en: "Guests & Gatherings", ar: "ضيوف ولقاءات", fr: "Convives & rencontres" },
    span: "wide",
  },
  {
    id: "g7",
    category: "Food",
    src: "https://images.unsplash.com/photo-1519676867240-f03562e64548?auto=format&fit=crop&w=1200&q=80",
    caption: { en: "Gold Leaf Baklava", ar: "بقلاوة بورق الذهب", fr: "Baklava à la feuille d'or" },
  },
  {
    id: "g8",
    category: "Interior",
    src: "https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=1200&q=80",
    caption: { en: "Private Majlis", ar: "المجلس الخاص", fr: "Majlis privé" },
    span: "tall",
  },
  {
    id: "g9",
    category: "Events",
    src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=80",
    caption: { en: "Chef's Table Evenings", ar: "أمسيات طاولة الشيف", fr: "Soirées table du chef" },
  },
  {
    id: "g10",
    category: "Customers",
    src: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1200&q=80",
    caption: { en: "A Table for Friends", ar: "طاولة للأصدقاء", fr: "Une table entre amis" },
  },
  {
    id: "g11",
    category: "Food",
    src: "https://images.unsplash.com/photo-1633321702518-7feccafb218f?auto=format&fit=crop&w=1200&q=80",
    caption: { en: "Beirut Shawarma", ar: "شاورما بيروت", fr: "Chawarma de Beyrouth" },
    span: "wide",
  },
  {
    id: "g12",
    category: "Interior",
    src: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1200&q=80",
    caption: { en: "Golden Hour Terrace", ar: "شرفة الساعة الذهبية", fr: "Terrasse à l'heure dorée" },
  },
];

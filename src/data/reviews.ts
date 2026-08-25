import type { LocalizedText } from "@/i18n/types";

export interface Review {
  id: string;
  name: string;
  initials: string;
  rating: number;
  date: LocalizedText;
  text: LocalizedText;
  source: "Google";
}

export const ratingSummary = {
  average: 4.3,
  total: 114,
  breakdown: [
    { stars: 5, count: 71 },
    { stars: 4, count: 24 },
    { stars: 3, count: 11 },
    { stars: 2, count: 5 },
    { stars: 1, count: 3 },
  ],
};

export const reviews: Review[] = [
  {
    id: "r1",
    name: "Yasmine El Amrani",
    initials: "YE",
    rating: 5,
    date: { en: "2 weeks ago", ar: "قبل أسبوعين", fr: "il y a 2 semaines" },
    text: {
      en: "The most authentic Lebanese food in Taza, hands down. The mixed grill was cooked to perfection and the atmosphere feels like a night out in Beirut. Service was warm and attentive.",
      ar: "أصدق طعام لبناني في تازة بلا منازع. المشاوي المشكّلة مطهوّة بإتقان والأجواء تشبه سهرة في بيروت. الخدمة كانت دافئة ومهتمّة.",
      fr: "La cuisine libanaise la plus authentique de Taza, sans hésiter. La grillade mixte était parfaite et l'ambiance rappelle une soirée à Beyrouth. Service chaleureux et attentionné.",
    },
    source: "Google",
  },
  {
    id: "r2",
    name: "Omar Benjelloun",
    initials: "OB",
    rating: 5,
    date: { en: "1 month ago", ar: "قبل شهر", fr: "il y a 1 mois" },
    text: {
      en: "Hummus and falafel were unreal — so fresh. The interior is stunning, real attention to detail. Felt premium without being stiff. We'll be back for the knafeh alone.",
      ar: "الحمّص والفلافل كانا رائعين — طازجان جدًا. الديكور مذهل باهتمام حقيقي بالتفاصيل. فخم دون تكلّف. سنعود من أجل الكنافة وحدها.",
      fr: "Le houmous et le falafel étaient incroyables — si frais. L'intérieur est magnifique, un vrai souci du détail. Haut de gamme sans être guindé. On reviendra rien que pour le knafeh.",
    },
    source: "Google",
  },
  {
    id: "r3",
    name: "Sofia Marchetti",
    initials: "SM",
    rating: 4,
    date: { en: "1 month ago", ar: "قبل شهر", fr: "il y a 1 mois" },
    text: {
      en: "Beautiful setting and delicious shawarma. Slightly busy on the weekend so book ahead, but the food more than made up for the wait. The mint lemonade is a must.",
      ar: "مكان جميل وشاورما لذيذة. مزدحم قليلًا في عطلة نهاية الأسبوع لذا احجز مسبقًا، لكن الطعام يستحق الانتظار. الليموناضة بالنعناع لا تُفوّت.",
      fr: "Cadre superbe et chawarma délicieuse. Un peu chargé le week-end, réservez à l'avance, mais la cuisine valait l'attente. La limonade à la menthe est incontournable.",
    },
    source: "Google",
  },
  {
    id: "r4",
    name: "Karim Haddad",
    initials: "KH",
    rating: 5,
    date: { en: "3 weeks ago", ar: "قبل ثلاثة أسابيع", fr: "il y a 3 semaines" },
    text: {
      en: "As a Lebanese living in Morocco, this place brings me home. The kibbeh tastes exactly like my grandmother's. Genuine flavors and genuine hospitality.",
      ar: "كلبناني يعيش في المغرب، هذا المكان يعيدني إلى الوطن. طعم الكبة كطعم كبة جدّتي تمامًا. نكهات صادقة وضيافة صادقة.",
      fr: "En tant que Libanais vivant au Maroc, cet endroit me ramène chez moi. Le kibbeh a exactement le goût de celui de ma grand-mère. Saveurs et hospitalité authentiques.",
    },
    source: "Google",
  },
  {
    id: "r5",
    name: "Nadia Fassi",
    initials: "NF",
    rating: 4,
    date: { en: "2 months ago", ar: "قبل شهرين", fr: "il y a 2 mois" },
    text: {
      en: "Lovely family dinner. The private dining area was perfect for our group of ten. Staff went above and beyond. Baklava with gold leaf was a beautiful touch.",
      ar: "عشاء عائلي رائع. الصالة الخاصة كانت مثالية لمجموعتنا المكوّنة من عشرة أشخاص. الطاقم بذل جهدًا استثنائيًا. البقلاوة بورق الذهب لمسة جميلة.",
      fr: "Superbe dîner en famille. Le salon privé était parfait pour notre groupe de dix. Le personnel s'est surpassé. Le baklava à la feuille d'or, une belle touche.",
    },
    source: "Google",
  },
  {
    id: "r6",
    name: "Youssef Tazi",
    initials: "YT",
    rating: 5,
    date: { en: "5 days ago", ar: "قبل خمسة أيام", fr: "il y a 5 jours" },
    text: {
      en: "Best shish taouk I've had outside of Lebanon. Charcoal flavor is spot on. The outdoor seating at night with the lanterns is magical. Highly recommend.",
      ar: "أفضل شيش طاووق تذوّقته خارج لبنان. نكهة الفحم مثالية. الجلوس في الخارج ليلًا مع الفوانيس ساحر. أنصح به بشدّة.",
      fr: "Le meilleur chich taouk hors du Liban. Le goût du charbon est parfait. La terrasse le soir avec les lanternes est magique. Vivement recommandé.",
    },
    source: "Google",
  },
];

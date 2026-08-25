import type { LocalizedText } from "@/i18n/types";

export type MenuCategory =
  | "Lebanese Plates"
  | "Small Plates"
  | "Grills"
  | "Desserts"
  | "Drinks";

export interface Dish {
  id: string;
  /** localized display name */
  name: LocalizedText;
  /** decorative Arabic calligraphy line shown above the name */
  arabicName: string;
  category: MenuCategory;
  price: number;
  currency: string;
  shortDesc: LocalizedText;
  story: LocalizedText;
  ingredients: string[];
  /** local asset path or remote URL — see public/images/food/ */
  image: string;
  signature?: boolean;
  spice?: 0 | 1 | 2 | 3;
}

export const categories: MenuCategory[] = [
  "Lebanese Plates",
  "Small Plates",
  "Grills",
  "Desserts",
  "Drinks",
];

export const dishes: Dish[] = [
  {
    id: "shawarma",
    name: { en: "Beirut Shawarma", ar: "شاورما بيروت", fr: "Chawarma de Beyrouth" },
    arabicName: "شاورما بيروت",
    category: "Lebanese Plates",
    price: 65,
    currency: "MAD",
    shortDesc: {
      en: "Slow-marinated, fire-shaved and wrapped with garlic toum and pickles.",
      ar: "متبّلة ببطء، تُقشر على النار وتُلفّ مع ثوم التوم والمخللات.",
      fr: "Longuement marinée, tranchée au feu et roulée avec toum à l'ail et pickles.",
    },
    story: {
      en: "Carved from a vertical flame that never sleeps, our shawarma follows a recipe carried from a small corner shop in Hamra, Beirut. The 24-hour marinade of seven spices is what regulars come back for.",
      ar: "تُقطع من لهب عمودي لا ينام، وتتبع شاورمتنا وصفة جاءت من دكان صغير في الحمرا ببيروت. تتبيلة أربع وعشرين ساعة بسبعة أنواع من البهارات هي سرّ عودة الزبائن.",
      fr: "Découpée sur une flamme verticale qui ne s'éteint jamais, notre chawarma suit une recette venue d'une petite échoppe de Hamra, à Beyrouth. La marinade de 24 heures aux sept épices fait revenir les habitués.",
    },
    ingredients: ["24h-marinated chicken", "Garlic toum", "House pickles", "Sumac onions", "Saj flatbread"],
    image: "https://images.unsplash.com/photo-1633321702518-7feccafb218f?auto=format&fit=crop&w=1400&q=80",
    signature: true,
    spice: 1,
  },
  {
    id: "hummus",
    name: { en: "Golden Hummus Beiruti", ar: "حمّص بيروتي", fr: "Houmous doré de Beyrouth" },
    arabicName: "حمّص بيروتي",
    category: "Small Plates",
    price: 38,
    currency: "MAD",
    shortDesc: {
      en: "Silken chickpea cream, first-press olive oil and toasted pine nuts.",
      ar: "كريمة حمّص حريرية مع زيت زيتون بكر وصنوبر محمّص.",
      fr: "Crème de pois chiches soyeuse, huile d'olive de première pression et pignons grillés.",
    },
    story: {
      en: "Blended for eleven minutes until it turns to silk, our hummus is finished tableside with a river of green olive oil pressed in the Rif mountains — where Lebanon meets Morocco on a single plate.",
      ar: "يُخفق لإحدى عشرة دقيقة حتى يصبح كالحرير، ويُقدّم حمّصنا بلمسة أخيرة من زيت الزيتون الأخضر المعصور في جبال الريف — حيث يلتقي لبنان بالمغرب في طبق واحد.",
      fr: "Mixé onze minutes jusqu'à devenir soyeux, notre houmous est nappé à table d'une huile d'olive verte pressée dans le Rif — le Liban et le Maroc dans une seule assiette.",
    },
    ingredients: ["Stone-blended chickpeas", "Tahini from Nabatieh", "First-press olive oil", "Toasted pine nuts", "Warm pita"],
    image: "https://images.unsplash.com/photo-1622440049916-95efb7b94b39?auto=format&fit=crop&w=1400&q=80",
    signature: true,
    spice: 0,
  },
  {
    id: "falafel",
    name: { en: "Emerald Falafel", ar: "فلافل", fr: "Falafel émeraude" },
    arabicName: "فلافل",
    category: "Small Plates",
    price: 34,
    currency: "MAD",
    shortDesc: {
      en: "Herb-green croquettes, crisp shell, tahini rain and pickled turnip.",
      ar: "أقراص خضراء بالأعشاب، قشرة مقرمشة، صلصة طحينة ولفت مخلّل.",
      fr: "Croquettes vertes aux herbes, croûte croustillante, tahini et navet mariné.",
    },
    story: {
      en: "Ground fresh at dawn and fried to order, our falafel keeps a molten-green herb heart. The recipe leans on a triple-herb blend that turns each bite emerald — our nod to the cedar hills.",
      ar: "تُطحن طازجة عند الفجر وتُقلى عند الطلب، وتحتفظ فلافلنا بقلب أخضر من الأعشاب. تعتمد الوصفة على مزيج ثلاثي من الأعشاب يمنح كل قضمة لونًا زمرديًا.",
      fr: "Moulu à l'aube et frit à la commande, notre falafel garde un cœur vert d'herbes. Un mélange de trois herbes rend chaque bouchée émeraude — un clin d'œil aux collines de cèdres.",
    },
    ingredients: ["Fava & chickpea", "Parsley, coriander, mint", "Sesame crust", "Tahini sauce", "Pickled turnip"],
    image: "https://images.unsplash.com/photo-1593001874117-c99c800e3eb7?auto=format&fit=crop&w=1400&q=80",
    spice: 1,
  },
  {
    id: "mixed-grill",
    name: { en: "Royal Lebanese Grill", ar: "مشاوي ملكية", fr: "Grillade royale libanaise" },
    arabicName: "مشاوي ملكية",
    category: "Grills",
    price: 145,
    currency: "MAD",
    shortDesc: {
      en: "Lamb kofta, shish taouk and lamb cutlets over charcoal, for sharing.",
      ar: "كفتة لحم، شيش طاووق وريش غنم على الفحم، للمشاركة.",
      fr: "Kofta d'agneau, chich taouk et côtelettes d'agneau au charbon, à partager.",
    },
    story: {
      en: "A feast built for the table, seared over live charcoal until the edges catch and caramelize. It arrives on a bed of embers-scented rice — the centerpiece of every Beirut Dishes celebration.",
      ar: "وليمة تُبنى للطاولة، تُشوى على الفحم الحيّ حتى تتحمّر أطرافها. تصل على فراش من الأرز بنكهة الجمر — قلب كل احتفال في أطباق بيروت.",
      fr: "Un festin conçu pour la table, saisi sur charbon vif jusqu'à caraméliser les bords. Servi sur un lit de riz fumé — la pièce maîtresse de chaque célébration.",
    },
    ingredients: ["Lamb kofta", "Shish taouk", "Lamb cutlets", "Grilled tomato & pepper", "Garlic toum & sumac"],
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1400&q=80",
    signature: true,
    spice: 2,
  },
  {
    id: "shish-taouk",
    name: { en: "Shish Taouk", ar: "شيش طاووق", fr: "Chich Taouk" },
    arabicName: "شيش طاووق",
    category: "Grills",
    price: 78,
    currency: "MAD",
    shortDesc: {
      en: "Yoghurt-lemon marinated chicken skewers, charred and juicy.",
      ar: "أسياخ دجاج متبّلة باللبن والليمون، مشويّة وطريّة.",
      fr: "Brochettes de poulet marinées au yaourt et citron, grillées et juteuses.",
    },
    story: {
      en: "Marinated overnight in yoghurt and citrus, these skewers stay impossibly tender. A Levantine classic that our grill master finishes with a whisper of smoke.",
      ar: "تُنقع طوال الليل في اللبن والحمضيات لتبقى طريّة بشكل استثنائي. كلاسيكية شامية يختمها معلّم الشواء بلمسة من الدخان.",
      fr: "Marinées une nuit dans le yaourt et les agrumes, ces brochettes restent incroyablement tendres. Un classique levantin fini par une pointe de fumée.",
    },
    ingredients: ["Chicken thigh", "Yoghurt & lemon marinade", "Garlic & white pepper", "Grilled vegetables", "Toum"],
    image: "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?auto=format&fit=crop&w=1400&q=80",
    spice: 1,
  },
  {
    id: "tabbouleh",
    name: { en: "Tabbouleh Verde", ar: "تبولة", fr: "Taboulé Verde" },
    arabicName: "تبولة",
    category: "Small Plates",
    price: 32,
    currency: "MAD",
    shortDesc: {
      en: "Mountains of parsley, bulgur pearls, tomato and lemon brightness.",
      ar: "جبال من البقدونس، حبّات البرغل، طماطم ونكهة الليمون المنعشة.",
      fr: "Montagnes de persil, perles de boulgour, tomate et éclat de citron.",
    },
    story: {
      en: "More herb than grain, chopped by hand so each leaf keeps its snap. It is the green heartbeat of the Lebanese table and the freshest thing on ours.",
      ar: "أعشاب أكثر من الحبوب، تُفرم يدويًا لتحتفظ كل ورقة بنضارتها. إنها النبض الأخضر للمائدة اللبنانية وأكثر ما على مائدتنا انتعاشًا.",
      fr: "Plus d'herbes que de grains, coupée à la main pour garder tout son croquant. Le cœur vert de la table libanaise, et le plus frais de la nôtre.",
    },
    ingredients: ["Hand-chopped parsley", "Fine bulgur", "Vine tomato", "Mint", "Lemon & olive oil"],
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1400&q=80",
    spice: 0,
  },
  {
    id: "baklava",
    name: { en: "Gold Leaf Baklava", ar: "بقلاوة", fr: "Baklava à la feuille d'or" },
    arabicName: "بقلاوة",
    category: "Desserts",
    price: 42,
    currency: "MAD",
    shortDesc: {
      en: "Forty layers of filo, pistachio and orange-blossom syrup.",
      ar: "أربعون طبقة من العجين الرقيق، فستق وقطر ماء الزهر.",
      fr: "Quarante couches de filo, pistache et sirop de fleur d'oranger.",
    },
    story: {
      en: "Forty gossamer layers brushed with butter and stacked by hand, then bathed in orange-blossom syrup. Crowned with gold leaf for the moments worth remembering.",
      ar: "أربعون طبقة رقيقة تُدهن بالزبدة وتُرصّ يدويًا، ثم تُغمر بقطر ماء الزهر. تُتوّج بورق الذهب للحظات التي تستحق الذكرى.",
      fr: "Quarante couches légères beurrées et empilées à la main, puis baignées de sirop de fleur d'oranger. Couronnées de feuille d'or pour les moments mémorables.",
    },
    ingredients: ["Hand-stretched filo", "Aleppo pistachio", "Clarified butter", "Orange-blossom syrup", "Edible gold leaf"],
    image: "https://images.unsplash.com/photo-1519676867240-f03562e64548?auto=format&fit=crop&w=1400&q=80",
    signature: true,
    spice: 0,
  },
  {
    id: "knafeh",
    name: { en: "Knafeh Beirutiyeh", ar: "كنافة بيروتية", fr: "Knafeh de Beyrouth" },
    arabicName: "كنافة بيروتية",
    category: "Desserts",
    price: 46,
    currency: "MAD",
    shortDesc: {
      en: "Molten cheese, crisp semolina, rose syrup and crushed pistachio.",
      ar: "جبن ذائب، سميد مقرمش، قطر الورد وفستق مجروش.",
      fr: "Fromage fondant, semoule croustillante, sirop de rose et pistache concassée.",
    },
    story: {
      en: "Served the way Beirut wakes up on a Sunday — a molten heart of cheese under a crown of golden crunch, finished tableside with warm rose syrup.",
      ar: "تُقدّم كما تستيقظ بيروت يوم الأحد — قلب من الجبن الذائب تحت تاج ذهبي مقرمش، بلمسة أخيرة من قطر الورد الدافئ.",
      fr: "Servie comme Beyrouth s'éveille le dimanche — un cœur de fromage fondant sous une croûte dorée, nappé de sirop de rose tiède.",
    },
    ingredients: ["Akkawi cheese", "Kataifi & semolina", "Rose syrup", "Crushed pistachio", "Clarified butter"],
    image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=1400&q=80",
    spice: 0,
  },
  {
    id: "mint-lemonade",
    name: { en: "Cedar Mint Lemonade", ar: "ليموناضة بالنعناع", fr: "Limonade menthe & cèdre" },
    arabicName: "ليموناضة بالنعناع",
    category: "Drinks",
    price: 28,
    currency: "MAD",
    shortDesc: {
      en: "Hand-pressed lemon, crushed mint and a breath of orange blossom.",
      ar: "ليمون معصور يدويًا، نعناع مجروش ولمسة من زهر البرتقال.",
      fr: "Citron pressé à la main, menthe pilée et une touche de fleur d'oranger.",
    },
    story: {
      en: "The drink of Levantine summers — sharp, herbal, and endlessly refreshing. We press the lemons to order so it never loses its edge.",
      ar: "مشروب صيف بلاد الشام — حادّ، عشبيّ ومنعش بلا حدود. نعصر الليمون عند الطلب كي لا يفقد نكهته أبدًا.",
      fr: "La boisson des étés levantins — vive, herbacée et infiniment rafraîchissante. Nous pressons les citrons à la commande.",
    },
    ingredients: ["Fresh-pressed lemon", "Crushed mint", "Orange-blossom water", "Cane sugar", "Crushed ice"],
    image: "https://images.unsplash.com/photo-1497534446932-c925b458314a?auto=format&fit=crop&w=1400&q=80",
    spice: 0,
  },
  {
    id: "arabic-coffee",
    name: { en: "Cardamom Arabic Coffee", ar: "قهوة عربية", fr: "Café arabe à la cardamome" },
    arabicName: "قهوة عربية",
    category: "Drinks",
    price: 22,
    currency: "MAD",
    shortDesc: {
      en: "Slow-brewed, cardamom-scented and poured from a dallah.",
      ar: "تُحضّر ببطء، بنكهة الهيل وتُسكب من دلّة.",
      fr: "Infusé lentement, parfumé à la cardamome et versé d'une dallah.",
    },
    story: {
      en: "A ritual, not a drink. Poured from a traditional dallah into small cups, our cardamom coffee is the Middle Eastern promise of welcome — offered to every guest.",
      ar: "طقس لا مجرّد مشروب. تُسكب من دلّة تقليدية في فناجين صغيرة، وقهوتنا بالهيل وعد الترحيب الشرقي — تُقدّم لكل ضيف.",
      fr: "Un rituel, pas une boisson. Versé d'une dallah traditionnelle dans de petites tasses, notre café à la cardamome est la promesse d'accueil du Moyen-Orient.",
    },
    ingredients: ["Lightly roasted beans", "Green cardamom", "A hint of saffron", "Poured from a dallah"],
    image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=1400&q=80",
    spice: 0,
  },
  {
    id: "moutabal",
    name: { en: "Smoked Moutabal", ar: "متبل", fr: "Moutabal fumé" },
    arabicName: "متبل",
    category: "Small Plates",
    price: 36,
    currency: "MAD",
    shortDesc: {
      en: "Fire-roasted eggplant whipped with tahini and pomegranate.",
      ar: "باذنجان مشويّ على النار مخفوق مع الطحينة والرمان.",
      fr: "Aubergine rôtie au feu, fouettée au tahini et à la grenade.",
    },
    story: {
      en: "The eggplants are blistered directly over the flame until smoke seeps into their flesh, then whipped with tahini. Sweet-tart pomegranate finishes the plate.",
      ar: "يُشوى الباذنجان مباشرة على اللهب حتى يتسلّل الدخان إلى لبّه، ثم يُخفق مع الطحينة. ويُختم الطبق بالرمان الحلو الحامض.",
      fr: "Les aubergines sont brûlées directement sur la flamme jusqu'à ce que la fumée imprègne leur chair, puis fouettées au tahini. La grenade aigre-douce termine le plat.",
    },
    ingredients: ["Charred eggplant", "Tahini", "Garlic & lemon", "Pomegranate molasses", "Olive oil"],
    image: "https://images.unsplash.com/photo-1637949385162-e416fb15b2ce?auto=format&fit=crop&w=1400&q=80",
    spice: 0,
  },
  {
    id: "kibbeh",
    name: { en: "Kibbeh Fried", ar: "كبة", fr: "Kibbeh frit" },
    arabicName: "كبة",
    category: "Lebanese Plates",
    price: 58,
    currency: "MAD",
    shortDesc: {
      en: "Bulgur shells filled with spiced minced lamb and pine nuts.",
      ar: "أقراص برغل محشوّة بلحم الغنم المفروم المتبّل والصنوبر.",
      fr: "Coques de boulgour farcies d'agneau haché épicé et de pignons.",
    },
    story: {
      en: "Considered the national dish of Lebanon, our kibbeh is shaped by hand into torpedoes, stuffed with spiced lamb and pine nuts, then fried to a deep amber crust.",
      ar: "تُعدّ الطبق الوطني للبنان، وتُشكّل كبتنا يدويًا، تُحشى بلحم الغنم المتبّل والصنوبر، ثم تُقلى حتى قشرة كهرمانية.",
      fr: "Considéré comme le plat national du Liban, notre kibbeh est façonné à la main, farci d'agneau épicé et de pignons, puis frit jusqu'à une croûte ambrée.",
    },
    ingredients: ["Bulgur & lamb shell", "Spiced minced lamb", "Pine nuts", "Onion & seven spice", "Yoghurt dip"],
    image: "https://images.unsplash.com/photo-1625944230945-1b7dd3b949ab?auto=format&fit=crop&w=1400&q=80",
    spice: 2,
  },
];

import { SubstitutionRule } from '../types';

export const INGREDIENT_SUBSTITUTIONS: SubstitutionRule[] = [
  {
    id: 'sub-egg-1',
    category: 'eggs',
    ingredient: {
      en: '1 Large Whole Egg',
      hi: '1 बड़ा अंडा',
      te: '1 పెద్ద గుడ్డు',
    },
    substitute: {
      en: '1/4 cup (60g) Unsweetened Applesauce',
      hi: '1/4 कप (60g) सेब की प्यूरी (एप्पल सॉस)',
      te: '1/4 కప్పు (60 గ్రా) యాపిల్ సాస్',
    },
    ratio: '1 egg = 60g applesauce + 1/4 tsp baking powder',
    notes: {
      en: 'Best for moist cakes, brownies, and muffins. Adds gentle moisture without affecting taste.',
      hi: 'ब्राउनी और केक के लिए बेहतरीन। स्वाद बदले बिना नमी बनाए रखता है।',
      te: 'కేకులు, బ్రౌనీలకు చాలా మంచిది. రుచి మారకుండా తేమను ఇస్తుంది.',
    },
  },
  {
    id: 'sub-egg-2',
    category: 'eggs',
    ingredient: {
      en: '1 Large Egg (Binder)',
      hi: '1 बड़ा अंडा (बाइंडिंग के लिए)',
      te: '1 గుడ్డు (బైండింగ్ కొరకు)',
    },
    substitute: {
      en: '1 tbsp Ground Flaxseed + 3 tbsp Warm Water (Flax Egg)',
      hi: '1 चम्मच पिसी अलसी + 3 चम्मच गुनगुना पानी (फ्लैक्स एग)',
      te: '1 చెంచా అవిసె గింజల పొడి + 3 చెంచాల గోరువెచ్చని నీరు',
    },
    ratio: '1 tbsp flax + 3 tbsp water, rest 5 mins until gelled',
    notes: {
      en: 'Ideal for rustic tarts, cookies, and spiced dessert crusts.',
      hi: 'टार्ट्स, कुकीज और पाई क्रस्ट के लिए सबसे अच्छा विकल्प।',
      te: 'కుకీలు, టార్ట్స్ మరియు పై క్రస్ట్ తయారీకి అనుకూలం.',
    },
  },
  {
    id: 'sub-egg-white',
    category: 'eggs',
    ingredient: {
      en: '1 Egg White (For Meringues & Macarons)',
      hi: '1 अंडे की सफेदी (मेरिंग्यू और मैकरॉन के लिए)',
      te: '1 గుడ్డు తెల్లసొన (మెరింగ్యూ & మకరాన్స్ కొరకు)',
    },
    substitute: {
      en: '2 tbsp Aquafaba (Chickpea Brine)',
      hi: '2 चम्मच एक्वाफाबा (उबले काबुली चने का पानी)',
      te: '2 చెంచాల ఆక్వాఫాబా (ఉడికించిన శనగల నీరు)',
    },
    ratio: '2 tbsp aquafaba per white, whip with 1/8 tsp cream of tartar',
    notes: {
      en: 'Whips to stunning glossy stiff peaks just like authentic egg whites. Vegan approved!',
      hi: 'अंडे की सफेदी की तरह ही कड़क झाग बनाता है। शत-प्रतिशत शाकाहारी।',
      te: 'గుడ్డు తెల్లసొన లాగానే గట్టి నురుగును ఇస్తుంది. శాకాహారులకు ఉత్తమం.',
    },
  },
  {
    id: 'sub-mascarpone',
    category: 'dairy',
    ingredient: {
      en: '1 cup (225g) Mascarpone Cheese',
      hi: '1 कप (225g) मस्करपोन चीज़',
      te: '1 కప్పు (225 గ్రా) మస్కార్పోన్ చీజ్',
    },
    substitute: {
      en: '3/4 cup Full-fat Cream Cheese + 1/4 cup Heavy Cream',
      hi: '3/4 कप क्रीम चीज़ + 1/4 कप हैवी क्रीम (फेंटा हुआ)',
      te: '3/4 కప్పు క్రీమ్ చీజ్ + 1/4 కప్పు హెవీ క్రీమ్',
    },
    ratio: 'Blend 170g cream cheese with 60ml heavy cream until smooth',
    notes: {
      en: 'Replicates the rich 44% fat mouthfeel of Italian mascarpone for tiramisu.',
      hi: 'तिरामिसु के लिए इटैलियन मस्करपोन का सटीक और मलाईदार विकल्प।',
      te: 'తిరామిసు కోసం ఇటాలియన్ మస్కార్పోన్ రుచిని అందిస్తుంది.',
    },
  },
  {
    id: 'sub-buttermilk',
    category: 'dairy',
    ingredient: {
      en: '1 cup Buttermilk',
      hi: '1 कप बटरमिल्क (छाछ)',
      te: '1 కప్పు బటర్‌మిల్క్',
    },
    substitute: {
      en: '1 cup Whole Milk + 1 tbsp Lemon Juice or White Vinegar',
      hi: '1 कप दूध + 1 चम्मच नींबू का रस या सिरका',
      te: '1 కప్పు పాలు + 1 చెంచా నిమ్మరసం లేదా వెనిగర్',
    },
    ratio: 'Mix and let stand at room temperature for 10 minutes until curdled',
    notes: {
      en: 'Activates baking soda in red velvet and sponge cakes for superior rise.',
      hi: 'केक को फूलाने और स्पंज को नरम बनाने के लिए एकदम सही।',
      te: 'కేకులను మెత్తగా మరియు పొంగేలా చేయడానికి ఎంతో ఉపయోగపడుతుంది.',
    },
  },
  {
    id: 'sub-gelatin',
    category: 'gelling',
    ingredient: {
      en: '1 tsp Gelatin Powder (Animal Source)',
      hi: '1 चम्मच जेलाटिन पाउडर',
      te: '1 చెంచా జెలటిన్ పౌడర్',
    },
    substitute: {
      en: '1/2 tsp Agar-Agar Powder (Seaweed Vegetarian)',
      hi: '1/2 चम्मच अगर-अगर पाउडर (शाकाहारी)',
      te: '1/2 చెంచా అగర్-అగర్ పౌడర్ (శాకాహార)',
    },
    ratio: '1 tsp gelatin = 1/2 tsp agar agar powder (must be boiled 2 mins to activate)',
    notes: {
      en: '100% plant-based gelling agent. Sets at room temperature and stays firm in warm climates.',
      hi: 'पूरी तरह से शाकाहारी। कमरे के तापमान पर भी आसानी से जम जाता है।',
      te: '100% శాకాహార ప్రత్యామ్నాయం. గది ఉష్ణోగ్రత వద్ద కూడా సులభంగా గడ్డకడుతుంది.',
    },
  },
  {
    id: 'sub-heavy-cream',
    category: 'dairy',
    ingredient: {
      en: '1 cup Heavy Whipping Cream',
      hi: '1 कप हैवी व्हीपिंग क्रीम',
      te: '1 కప్పు హెవీ విప్పింగ్ క్రీమ్',
    },
    substitute: {
      en: '1 can Chilled Coconut Cream (Whipped)',
      hi: 'ठंडी नारियल की मलाई (कोकोनट क्रीम)',
      te: 'చల్లని కొబ్బరి క్రీమ్',
    },
    ratio: 'Chill coconut milk overnight and scoop top solid layer',
    notes: {
      en: 'Dairy-free, whips easily into stiff chantilly for tarts and trifles.',
      hi: 'डेयरी-मुक्त विकल्प, टार्ट्स और मूस के लिए आदर्श।',
      te: 'డైరీ రహిత ప్రత్యామ్నాయం, క్రీమీ విప్ తయారీకి ఉత్తమం.',
    },
  },
  {
    id: 'sub-cake-flour',
    category: 'flours',
    ingredient: {
      en: '1 cup Cake Flour',
      hi: '1 कप केक का आटा',
      te: '1 కప్పు కేక్ పిండి',
    },
    substitute: {
      en: '3/4 cup All-Purpose Flour + 2 tbsp Cornstarch',
      hi: '3/4 कप मैदा + 2 चम्मच कॉर्नस्टार्च',
      te: '3/4 కప్పు మైదా + 2 చెంచాల కార్న్‌ఫ్లోర్',
    },
    ratio: 'Sift together 4 times for airy, tender crumb structure',
    notes: {
      en: 'Reduces gluten protein to create ultra-soft, tender crumb in sponge cakes.',
      hi: 'केक को बेहद हल्का और स्पंजी बनाने के लिए 4 बार छानें।',
      te: 'కేకులను దూది లాంటి మెత్తదనంతో ఉంచడానికి పిండిని 4 సార్లు జల్లించండి.',
    },
  },
];

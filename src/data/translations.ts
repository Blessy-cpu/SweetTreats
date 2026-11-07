import { Language } from '../types';

export interface Translations {
  appName: string;
  appTagline: string;
  home: string;
  search: string;
  favorites: string;
  mealPlanner: string;
  shoppingList: string;
  substitutions: string;
  addRecipe: string;
  flutterCode: string;
  login: string;
  logout: string;
  profile: string;
  categories: {
    all: string;
    cakes: string;
    pies_tarts: string;
    custards_puddings: string;
    pastries: string;
    chilled: string;
  };
  filterVeg: string;
  filterQuick: string;
  filterGlutenFree: string;
  searchPlaceholder: string;
  prepTime: string;
  cookTime: string;
  totalTime: string;
  servings: string;
  difficulty: string;
  calories: string;
  easy: string;
  medium: string;
  hard: string;
  ingredients: string;
  instructions: string;
  startCooking: string;
  cookingTimer: string;
  timerFinished: string;
  step: string;
  of: string;
  nextStep: string;
  prevStep: string;
  finishCooking: string;
  addToShoppingList: string;
  allAdded: string;
  substituteAvailable: string;
  viewSubstitutes: string;
  voiceCommandTitle: string;
  voiceListening: string;
  voicePrompt: string;
  voiceHelp: string;
  trySaying: string;
  addedToFavorites: string;
  removedFromFavorites: string;
  noFavorites: string;
  noFavoritesSub: string;
  mealPlannerTitle: string;
  mealPlannerSub: string;
  assignDessert: string;
  clearPlan: string;
  generateShoppingList: string;
  shoppingListTitle: string;
  emptyShoppingList: string;
  addCustomItem: string;
  clearCompleted: string;
  copiedToClipboard: string;
  shareList: string;
  newRecipeTitle: string;
  recipeNameLabel: string;
  prepTimeLabel: string;
  cookTimeLabel: string;
  categoryLabel: string;
  difficultyLabel: string;
  ingredientsLabel: string;
  stepsLabel: string;
  saveRecipe: string;
  cancel: string;
  formErrors: {
    titleRequired: string;
    timeRequired: string;
    ingredientRequired: string;
    stepRequired: string;
  };
  screenStates: {
    normal: string;
    loading: string;
    error: string;
    empty: string;
    retry: string;
    errorMessage: string;
    emptyMessage: string;
  };
  flutterPackTitle: string;
  flutterPackSub: string;
  downloadZip: string;
  deviceViewToggle: string;
  mobileView: string;
  webView: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    appName: "DolceVita",
    appTagline: "Artisan Western Desserts & Bakery Studio",
    home: "Recipes",
    search: "Explore",
    favorites: "Favorites",
    mealPlanner: "Menu Planner",
    shoppingList: "Shopping List",
    substitutions: "Substitutions",
    addRecipe: "Add Recipe",
    flutterCode: "Flutter Code & Project",
    login: "Sign In",
    logout: "Sign Out",
    profile: "Profile",
    categories: {
      all: "All Desserts",
      cakes: "Cakes & Gateaux",
      pies_tarts: "Pies & Tarts",
      custards_puddings: "Custards & Puddings",
      pastries: "Pastries & Fried",
      chilled: "Chilled & Mousses",
    },
    filterVeg: "Vegetarian / Eggless",
    filterQuick: "< 45 Mins",
    filterGlutenFree: "Gluten-Free",
    searchPlaceholder: "Search Western desserts, ingredients...",
    prepTime: "Prep Time",
    cookTime: "Cook Time",
    totalTime: "Total Time",
    servings: "Servings",
    difficulty: "Difficulty",
    calories: "kcal / serve",
    easy: "Easy",
    medium: "Medium",
    hard: "Master",
    ingredients: "Ingredients",
    instructions: "Baking Steps",
    startCooking: "Start Guided Cooking",
    cookingTimer: "Baking Timer",
    timerFinished: "Time's Up! Check your dessert.",
    step: "Step",
    of: "of",
    nextStep: "Next Step",
    prevStep: "Previous Step",
    finishCooking: "Bon Appétit! Finish",
    addToShoppingList: "Add Ingredients to Shopping List",
    allAdded: "All items added to shopping list!",
    substituteAvailable: "Substitute Available",
    viewSubstitutes: "View Baking Substitutes",
    voiceCommandTitle: "Voice Command Assistant",
    voiceListening: "Listening... Speak now",
    voicePrompt: "Tap the mic and say a command",
    voiceHelp: "Supported commands:",
    trySaying: "Try saying:",
    addedToFavorites: "Added to favorites ❤️",
    removedFromFavorites: "Removed from favorites",
    noFavorites: "No favorite desserts yet",
    noFavoritesSub: "Tap the heart icon on any dessert to save it here for quick baking sessions.",
    mealPlannerTitle: "Weekly Dessert Course Planner",
    mealPlannerSub: "Organize your dessert courses for dinner parties, weekend bakes, and special gatherings.",
    assignDessert: "Assign Dessert",
    clearPlan: "Reset Week",
    generateShoppingList: "Generate Week Shopping List",
    shoppingListTitle: "Smart Pantry & Ingredient List",
    emptyShoppingList: "Your shopping list is clear!",
    addCustomItem: "Add pantry item...",
    clearCompleted: "Clear Checked",
    copiedToClipboard: "Shopping list copied to clipboard!",
    shareList: "Copy List",
    newRecipeTitle: "Create New Dessert Recipe",
    recipeNameLabel: "Dessert Name",
    prepTimeLabel: "Prep Time (minutes)",
    cookTimeLabel: "Cook / Bake Time (minutes)",
    categoryLabel: "Dessert Category",
    difficultyLabel: "Skill Level",
    ingredientsLabel: "Ingredients (one per line with amount, e.g. 200g Mascarpone)",
    stepsLabel: "Preparation Steps (one per line)",
    saveRecipe: "Publish Dessert Recipe",
    cancel: "Cancel",
    formErrors: {
      titleRequired: "Recipe name is required (min 3 characters)",
      timeRequired: "Prep and cook times must be at least 1 minute",
      ingredientRequired: "Please specify at least 2 ingredients",
      stepRequired: "Please provide at least 2 baking steps",
    },
    screenStates: {
      normal: "Populated Data",
      loading: "Loading State",
      error: "Error State",
      empty: "Empty State",
      retry: "Retry Connection",
      errorMessage: "Could not fetch desserts from cloud. Please check your network and retry.",
      emptyMessage: "No dessert recipes match your filter criteria. Try adjusting your search.",
    },
    flutterPackTitle: "Flutter Dart Code & Submission Pack",
    flutterPackSub: "IITM Pravartak & BodhBridge Flutter Lab - KHIT Guntur Project Standards",
    downloadZip: "Download Flutter Project (.zip)",
    deviceViewToggle: "Device View",
    mobileView: "Mobile Phone (390px)",
    webView: "Flutter Web Fullscreen",
  },
  hi: {
    appName: "DolceVita",
    appTagline: "वेस्टर्न डेज़र्ट्स और बेकरी स्टूडियो",
    home: "व्यंजनों",
    search: "खोजें",
    favorites: "पसंदीदा",
    mealPlanner: "मेनू प्लानर",
    shoppingList: "खरीदारी सूची",
    substitutions: "सामग्री विकल्प",
    addRecipe: "नया व्यंजन जोड़ें",
    flutterCode: "फ्लटर कोड और प्रोजेक्ट",
    login: "साइन इन करें",
    logout: "साइन आउट",
    profile: "प्रोफ़ाइल",
    categories: {
      all: "सभी डेज़र्ट्स",
      cakes: "केक्स और गैटॉक्स",
      pies_tarts: "पाई और टार्ट्स",
      custards_puddings: "कस्टर्ड और पुडिंग",
      pastries: "पेस्ट्री और फ्राइड",
      chilled: "ठंडे और मूस",
    },
    filterVeg: "शाकाहारी / बिना अंडा",
    filterQuick: "< 45 मिनट",
    filterGlutenFree: "ग्लूटेन-मुक्त",
    searchPlaceholder: "वेस्टर्न डेज़र्ट, सामग्री खोजें...",
    prepTime: "तैयारी का समय",
    cookTime: "पकाने का समय",
    totalTime: "कुल समय",
    servings: "सर्विंग्स",
    difficulty: "कठिनाई",
    calories: "किलो कैलोरी",
    easy: "सरल",
    medium: "मध्यम",
    hard: "कठिन",
    ingredients: "सामग्री सूची",
    instructions: "बनाने की विधि",
    startCooking: "गाइडेड कुकिंग शुरू करें",
    cookingTimer: "बेकिंग टाइमर",
    timerFinished: "समय समाप्त! अपना डेज़र्ट जांचें।",
    step: "चरण",
    of: "का",
    nextStep: "अगला चरण",
    prevStep: "पिछला चरण",
    finishCooking: "तैयार है! समाप्त करें",
    addToShoppingList: "सामग्री को खरीदारी सूची में जोड़ें",
    allAdded: "सभी सामग्री सूची में जुड़ गई!",
    substituteAvailable: "विकल्प उपलब्ध",
    viewSubstitutes: "बेकिंग विकल्प देखें",
    voiceCommandTitle: "आवाज सहायक (Voice Assistant)",
    voiceListening: "सुन रहा हूँ... बोलिए",
    voicePrompt: "माइक दबाएं और बोलें",
    voiceHelp: "समर्थित आदेश:",
    trySaying: "ऐसे कहें:",
    addedToFavorites: "पसंदीदा में जोड़ा गया ❤️",
    removedFromFavorites: "पसंदीदा से हटाया गया",
    noFavorites: "कोई पसंदीदा डेज़र्ट नहीं",
    noFavoritesSub: "किसी भी डेज़र्ट पर दिल के निशान को दबाकर यहाँ सुरक्षित करें।",
    mealPlannerTitle: "साप्ताहिक डेज़र्ट प्लानर",
    mealPlannerSub: "पार्टियों और सप्ताहांत के लिए अपने पसंदीदा डेज़र्ट्स की योजना बनाएं।",
    assignDessert: "डेज़र्ट चुनें",
    clearPlan: "रीसेट करें",
    generateShoppingList: "हफ्ते की खरीदारी सूची बनाएं",
    shoppingListTitle: "स्मार्ट पेंट्री और खरीदारी सूची",
    emptyShoppingList: "आपकी खरीदारी सूची खाली है!",
    addCustomItem: "सामग्री जोड़ें...",
    clearCompleted: "चुने हुए हटाएं",
    copiedToClipboard: "खरीदारी सूची कॉपी हो गई!",
    shareList: "सूची कॉपी करें",
    newRecipeTitle: "नया डेज़र्ट व्यंजन जोड़ें",
    recipeNameLabel: "डेज़र्ट का नाम",
    prepTimeLabel: "तैयारी का समय (मिनट)",
    cookTimeLabel: "पकाने का समय (मिनट)",
    categoryLabel: "श्रेणी",
    difficultyLabel: "कठिनाई स्तर",
    ingredientsLabel: "सामग्री (प्रति पंक्ति एक, जैसे 200g मस्करपोन)",
    stepsLabel: "बनाने के चरण (प्रति पंक्ति एक)",
    saveRecipe: "व्यंजन प्रकाशित करें",
    cancel: "रद्द करें",
    formErrors: {
      titleRequired: "व्यंजन का नाम आवश्यक है (कम से कम 3 अक्षर)",
      timeRequired: "तैयारी और पकाने का समय कम से कम 1 मिनट होना चाहिए",
      ingredientRequired: "कम से कम 2 सामग्रियां दर्ज करें",
      stepRequired: "कम से कम 2 चरण दर्ज करें",
    },
    screenStates: {
      normal: "सामान्य डेटा",
      loading: "लोडिंग स्थिति",
      error: "त्रुटि स्थिति",
      empty: "खाली स्थिति",
      retry: "पुनः प्रयास करें",
      errorMessage: "क्लाउड से डेज़र्ट लोड नहीं हो सके। नेटवर्क जांचें और पुनः प्रयास करें।",
      emptyMessage: "कोई डेज़र्ट नहीं मिला। कृपया अपनी खोज बदलें।",
    },
    flutterPackTitle: "फ्लटर डार्ट कोड और सबमिशन पैक",
    flutterPackSub: "IITM प्रवर्तक और KHIT गुंटूर प्रोजेक्ट मानक",
    downloadZip: "फ्लटर प्रोजेक्ट डाउनलोड करें (.zip)",
    deviceViewToggle: "डिवाइस व्यू",
    mobileView: "मोबाइल फोन (390px)",
    webView: "फ्लटर वेब फुलस्क्रीन",
  },
  te: {
    appName: "DolceVita",
    appTagline: "వెస్ట్రన్ డెజర్ట్స్ & బేకరీ స్టూడియో",
    home: "వంటకాలు",
    search: "శోధించండి",
    favorites: "ఇష్టమైనవి",
    mealPlanner: "మెనూ ప్లానర్",
    shoppingList: "షాపింగ్ జాబితా",
    substitutions: "ప్రత్యామ్నాయాలు",
    addRecipe: "కొత్త వంటకం జోడించండి",
    flutterCode: "ఫ్లట్టర్ కోడ్ & ప్రాజెక్ట్",
    login: "సైన్ ఇన్",
    logout: "సైన్ అవుట్",
    profile: "ప్రొఫైల్",
    categories: {
      all: "అన్ని డెజర్ట్స్",
      cakes: "కేకులు & గాటోక్స్",
      pies_tarts: "పైస్ & టార్ట్స్",
      custards_puddings: "కస్టర్డ్స్ & పుడ్డింగ్స్",
      pastries: "పేస్ట్రీస్ & వేయించినవి",
      chilled: "చల్లనివి & మౌసెస్",
    },
    filterVeg: "శాకాహార / గుడ్డు లేనివి",
    filterQuick: "< 45 నిమిషాలు",
    filterGlutenFree: "గ్లూటెన్ రహితం",
    searchPlaceholder: "వెస్ట్రన్ డెజర్ట్, పదార్థాలను వెతకండి...",
    prepTime: "సిద్ధం చేసే సమయం",
    cookTime: "వండే సమయం",
    totalTime: "మొత్తం సమయం",
    servings: "సర్వింగ్స్",
    difficulty: "కఠినతరం",
    calories: "కేలరీలు",
    easy: "సులభం",
    medium: "మధ్యస్థం",
    hard: "నిపుణత",
    ingredients: "కావలసిన పదార్థాలు",
    instructions: "తయారీ విధానం",
    startCooking: "గైడెడ్ కుకింగ్ ప్రారంభించండి",
    cookingTimer: "బేకింగ్ టైమర్",
    timerFinished: "సమయం ముగిసింది! మీ డెజర్ట్ సరిచూసుకోండి.",
    step: "దశ",
    of: "/",
    nextStep: "తదుపరి దశ",
    prevStep: "మునుపటి దశ",
    finishCooking: "సిద్ధమైంది! ముగించండి",
    addToShoppingList: "పదార్థాలను షాపింగ్ జాబితాకు జోడించండి",
    allAdded: "అన్ని పదార్థాలు జాబితాలో చేర్చబడ్డాయి!",
    substituteAvailable: "ప్రత్యామ్నాయం అందుబాటులో ఉంది",
    viewSubstitutes: "బేకింగ్ ప్రత్యామ్నాయాలను చూడండి",
    voiceCommandTitle: "వాయిస్ కమాండ్ అసిస్టెంట్",
    voiceListening: "వింటున్నాను... ఇప్పుడు మాట్లాడండి",
    voicePrompt: "మైక్ నొక్కి మాట్లాడండి",
    voiceHelp: "మద్దతు ఉన్న ఆదేశాలు:",
    trySaying: "ఇలా చెప్పండి:",
    addedToFavorites: "ఇష్టమైన వాటిలో చేర్చబడింది ❤️",
    removedFromFavorites: "ఇష్టమైన వాటి నుండి తీసివేయబడింది",
    noFavorites: "ఇష్టమైన డెజర్ట్స్ ఏవీ లేవు",
    noFavoritesSub: "త్వరిత బేకింగ్ కోసం ఏదైనా డెజర్ట్ గుండె గుర్తును నొక్కి ఇక్కడ భద్రపరుచుకోండి.",
    mealPlannerTitle: "వారాంతపు డెజర్ట్ ప్లానర్",
    mealPlannerSub: "విందులు మరియు ప్రత్యేక సందర్భాల కోసం మీ డెజర్ట్‌లను ముందుగానే ప్లాన్ చేసుకోండి.",
    assignDessert: "డెజర్ట్ ఎంచుకోండి",
    clearPlan: "రీసెట్ చేయండి",
    generateShoppingList: "వారపు షాపింగ్ జాబితా రూపొందించండి",
    shoppingListTitle: "స్మార్ట్ కిరాణా & పదార్థాల జాబితా",
    emptyShoppingList: "మీ షాపింగ్ జాబితా ఖాళీగా ఉంది!",
    addCustomItem: "పదార్థాన్ని జోడించండి...",
    clearCompleted: "పూర్తయినవి తొలగించండి",
    copiedToClipboard: "షాపింగ్ జాబితా కాపీ చేయబడింది!",
    shareList: "జాబితా కాపీ",
    newRecipeTitle: "కొత్త డెజర్ట్ వంటకం నమోదు",
    recipeNameLabel: "డెజర్ట్ పేరు",
    prepTimeLabel: "సిద్ధం చేసే సమయం (నిమిషాలు)",
    cookTimeLabel: "వండే సమయం (నిమిషాలు)",
    categoryLabel: "డెజర్ట్ విభాగం",
    difficultyLabel: "నైపుణ్య స్థాయి",
    ingredientsLabel: "కావలసిన పదార్థాలు (లైనుకు ఒకటి, ఉదా: 200g Mascarpone)",
    stepsLabel: "తయారీ దశలు (లైనుకు ఒకటి)",
    saveRecipe: "వంటకాన్ని ప్రచురించండి",
    cancel: "రద్దు చేయండి",
    formErrors: {
      titleRequired: "డెజర్ట్ పేరు తప్పనిసరి (కనీసం 3 అక్షరాలు)",
      timeRequired: "సమయం కనీసం 1 నిమిషం ఉండాలి",
      ingredientRequired: "కనీసం 2 పదార్థాలను నమోదు చేయండి",
      stepRequired: "కనీసం 2 దశలను నమోదు చేయండి",
    },
    screenStates: {
      normal: "సాధారణ డేటా",
      loading: "లోడింగ్ స్థితి",
      error: "లోపం స్థితి",
      empty: "ఖాళీ స్థితి",
      retry: "మళ్ళీ ప్రయత్నించండి",
      errorMessage: "క్లౌడ్ నుండి డెజర్ట్‌లను పొందలేకపోయాము. నెట్‌వర్క్ తనిఖీ చేసి మళ్లీ ప్రయత్నించండి.",
      emptyMessage: "మీ శోధనకు తగిన డెజర్ట్‌లు ఏవీ కనుగొనబడలేదు.",
    },
    flutterPackTitle: "ఫ్లట్టర్ డార్ట్ కోడ్ & ప్రాజెక్ట్ ప్యాక్",
    flutterPackSub: "IITM ప్రవర్తక్ & KHIT గుంటూరు ప్రాజెక్ట్ ప్రమాణాలు",
    downloadZip: "ఫ్లట్టర్ ప్రాజెక్ట్ డౌన్‌లోడ్ (.zip)",
    deviceViewToggle: "పరికర వీక్షణ",
    mobileView: "మొబైల్ ఫోన్ (390px)",
    webView: "ఫ్లట్టర్ వెబ్ పూర్తి తెర",
  }
};

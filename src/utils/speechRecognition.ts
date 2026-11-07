export interface VoiceCommandResult {
  action: 'open_recipe' | 'switch_tab' | 'switch_lang' | 'search' | 'add_shopping' | 'unknown';
  target?: string;
  transcript: string;
  feedback: {
    en: string;
    hi: string;
    te: string;
  };
}

export function parseVoiceCommand(transcript: string): VoiceCommandResult {
  const text = transcript.toLowerCase().trim();

  // Language switching
  if (text.includes('hindi') || text.includes('हिन्दी') || text.includes('हिंदी')) {
    return {
      action: 'switch_lang',
      target: 'hi',
      transcript,
      feedback: {
        en: 'Switched language to Hindi',
        hi: 'भाषा बदलकर हिन्दी कर दी गई है',
        te: 'భాష హిందీకి మార్చబడింది',
      },
    };
  }
  if (text.includes('telugu') || text.includes('తెలుగు')) {
    return {
      action: 'switch_lang',
      target: 'te',
      transcript,
      feedback: {
        en: 'Switched language to Telugu',
        hi: 'भाषा बदलकर तेलुगु कर दी गई है',
        te: 'భాష తెలుగుకి మార్చబడింది',
      },
    };
  }
  if (text.includes('english') || text.includes('अंग्रेजी') || text.includes('ఇంగ్లీష్')) {
    return {
      action: 'switch_lang',
      target: 'en',
      transcript,
      feedback: {
        en: 'Switched language to English',
        hi: 'भाषा बदलकर अंग्रेज़ी कर दी गई है',
        te: 'భాష ఇంగ్లీష్ కు మార్చబడింది',
      },
    };
  }

  // Recipes
  if (text.includes('tiramisu') || text.includes('तिरामिसु') || text.includes('తిరామిసు')) {
    return {
      action: 'open_recipe',
      target: 'tiramisu',
      transcript,
      feedback: {
        en: 'Opening Classic Italian Tiramisu',
        hi: 'क्लासिक इटैलियन तिरामिसु खोला जा रहा है',
        te: 'క్లాసిక్ ఇటాలియన్ తిరామిసు తెరవబడుతోంది',
      },
    };
  }
  if (text.includes('cheesecake') || text.includes('चीज़केक') || text.includes('చీజ్‌కేక్')) {
    return {
      action: 'open_recipe',
      target: 'cheesecake',
      transcript,
      feedback: {
        en: 'Opening New York Baked Cheesecake',
        hi: 'न्यूयॉर्क बेक्ड चीज़केक खोला जा रहा है',
        te: 'న్యూయార్క్ బేక్డ్ చీజ్‌కేక్ తెరవబడుతోంది',
      },
    };
  }
  if (text.includes('crème brûlée') || text.includes('creme brulee') || text.includes('क्रेम ब्रूली') || text.includes('క్రెమ్ బ్రూలే')) {
    return {
      action: 'open_recipe',
      target: 'creme-brulee',
      transcript,
      feedback: {
        en: 'Opening French Vanilla Crème Brûlée',
        hi: 'फ्रेंच वैनिला क्रेम ब्रूली खोला जा रहा है',
        te: 'ఫ్రెంచ్ వెనిల్లా క్రెమ్ బ్రూలే తెరవబడుతోంది',
      },
    };
  }
  if (text.includes('lava cake') || text.includes('लावा केक') || text.includes('లావా కేక్') || text.includes('chocolate')) {
    return {
      action: 'open_recipe',
      target: 'lava-cake',
      transcript,
      feedback: {
        en: 'Opening Molten Chocolate Lava Cake',
        hi: 'मोल्टेन चॉकलेट लावा केक खोला जा रहा है',
        te: 'మోల్టెన్ చాక్లెట్ లావా కేక్ తెరవబడుతోంది',
      },
    };
  }
  if (text.includes('churros') || text.includes('चुरोस') || text.includes('చురోస్')) {
    return {
      action: 'open_recipe',
      target: 'churros',
      transcript,
      feedback: {
        en: 'Opening Spanish Cinnamon Churros',
        hi: 'स्पैनिश चुरोस खोला जा रहा है',
        te: 'స్పానిష్ చురోస్ తెరవబడుతోంది',
      },
    };
  }

  // Navigation
  if (text.includes('shopping') || text.includes('खरीदारी') || text.includes('షాపింగ్')) {
    return {
      action: 'switch_tab',
      target: 'shopping',
      transcript,
      feedback: {
        en: 'Navigating to Shopping List',
        hi: 'खरीदारी सूची पर जा रहे हैं',
        te: 'షాపింగ్ జాబితాకు వెళ్తున్నాం',
      },
    };
  }
  if (text.includes('meal') || text.includes('planner') || text.includes('प्लानर') || text.includes('ప్లానర్') || text.includes('menu')) {
    return {
      action: 'switch_tab',
      target: 'planner',
      transcript,
      feedback: {
        en: 'Opening Weekly Dessert Planner',
        hi: 'साप्ताहिक डेज़र्ट प्लानर खोला जा रहा है',
        te: 'వారపు డెజర్ట్ ప్లానర్ తెరవబడుతోంది',
      },
    };
  }
  if (text.includes('favorite') || text.includes('पसंदीदा') || text.includes('ఇష్టమైనవి') || text.includes('saved')) {
    return {
      action: 'switch_tab',
      target: 'favorites',
      transcript,
      feedback: {
        en: 'Showing your Favorite Desserts',
        hi: 'आपकी पसंदीदा डेज़र्ट सूची खोली जा रही है',
        te: 'ఇష్టమైన డెజర్ట్స్ చూపిస్తున్నాం',
      },
    };
  }
  if (text.includes('substitut') || text.includes('विकल्प') || text.includes('ప్రత్యామ్నాయాలు') || text.includes('replace')) {
    return {
      action: 'switch_tab',
      target: 'substitutions',
      transcript,
      feedback: {
        en: 'Opening Ingredient Substitutions Calculator',
        hi: 'सामग्री विकल्प कैलकुलेटर खोला जा रहा है',
        te: 'పదార్థాల ప్రత్యామ్నాయ క్యాలిక్యులేటర్ తెరవబడుతోంది',
      },
    };
  }
  if (text.includes('add recipe') || text.includes('create') || text.includes('नया व्यंजन') || text.includes('కొత్త వంటకం')) {
    return {
      action: 'switch_tab',
      target: 'add_recipe',
      transcript,
      feedback: {
        en: 'Opening Recipe Creator Form',
        hi: 'नया व्यंजन फॉर्म खोला जा रहा है',
        te: 'కొత్త వంటకం ఫారం తెరవబడుతోంది',
      },
    };
  }

  // Generic search
  return {
    action: 'search',
    target: text,
    transcript,
    feedback: {
      en: `Searching desserts for "${transcript}"`,
      hi: `"${transcript}" के लिए खोज रहे हैं`,
      te: `"${transcript}" కోసం శోధిస్తున్నాం`,
    },
  };
}

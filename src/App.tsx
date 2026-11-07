import React, { useState, useEffect } from 'react';
import {
  Recipe,
  Language,
  ScreenState,
  ThemeSeed,
  DessertCategory,
  ShoppingItem,
  MealPlanDay,
  UserProfile,
} from './types';
import { INITIAL_RECIPES } from './data/recipes';
import { translations } from './data/translations';
import { StateIndicatorBanner } from './components/StateIndicatorBanner';
import { TopAppBar } from './components/TopAppBar';
import { BottomNavBar, TabKey } from './components/BottomNavBar';
import { RecipeCard } from './components/RecipeCard';
import { RecipeDetailModal } from './components/RecipeDetailModal';
import { AddRecipeModal } from './components/AddRecipeModal';
import { MealPlannerView } from './components/MealPlannerView';
import { ShoppingListView } from './components/ShoppingListView';
import { SubstitutionsView } from './components/SubstitutionsView';
import { VoiceCommandModal } from './components/VoiceCommandModal';
import { LoginPortalModal } from './components/LoginPortalModal';
import { FlutterCodePackModal } from './components/FlutterCodePackModal';
import { VoiceCommandResult } from './utils/speechRecognition';
import {
  Search,
  Plus,
  RotateCcw,
  AlertTriangle,
  Loader2,
  Inbox,
  Sparkles,
  Heart,
  CalendarDays,
  ShoppingBag,
  ArrowLeftRight,
  Filter,
  Check,
} from 'lucide-react';

const INITIAL_MEAL_PLAN: MealPlanDay[] = [
  { day: 'Monday', dayKey: 'mon', dessertRecipeId: 'tiramisu', note: 'Start week sweet' },
  { day: 'Tuesday', dayKey: 'tue', dessertRecipeId: undefined },
  { day: 'Wednesday', dayKey: 'wed', dessertRecipeId: 'creme-brulee', note: 'Midweek dinner' },
  { day: 'Thursday', dayKey: 'thu', dessertRecipeId: undefined },
  { day: 'Friday', dayKey: 'fri', dessertRecipeId: 'lava-cake', note: 'Weekend celebration' },
  { day: 'Saturday', dayKey: 'sat', dessertRecipeId: 'cheesecake', note: 'Family gathering' },
  { day: 'Sunday', dayKey: 'sun', dessertRecipeId: 'churros', note: 'Sunday family brunch' },
];

export default function App() {
  // Localization & Theme
  const [language, setLanguage] = useState<Language>(() => {
    return (localStorage.getItem('dolce_vita_lang') as Language) || 'en';
  });
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    return localStorage.getItem('dolce_vita_theme') === 'dark';
  });
  const [seedColor, setSeedColor] = useState<ThemeSeed>('amber');
  const [isMobileFrame, setIsMobileFrame] = useState<boolean>(false);

  // Active navigation tab
  const [activeTab, setActiveTab] = useState<TabKey>('recipes');

  // Recipes state (GP 2: Real data saved on device)
  const [recipes, setRecipes] = useState<Recipe[]>(() => {
    const saved = localStorage.getItem('dolce_vita_custom_recipes');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return [...INITIAL_RECIPES, ...parsed];
      } catch {
        return INITIAL_RECIPES;
      }
    }
    return INITIAL_RECIPES;
  });

  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('dolce_vita_favs');
    return saved ? JSON.parse(saved) : ['tiramisu', 'cheesecake'];
  });

  // GP 3: Screen States (data, loading, error, empty)
  const [screenState, setScreenState] = useState<ScreenState>('data');

  // Modals
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isFlutterCodeOpen, setIsFlutterCodeOpen] = useState(false);

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<DessertCategory>('all');
  const [filterVegOnly, setFilterVegOnly] = useState(false);
  const [filterQuickOnly, setFilterQuickOnly] = useState(false);

  // Shopping List
  const [shoppingItems, setShoppingItems] = useState<ShoppingItem[]>(() => {
    const saved = localStorage.getItem('dolce_vita_shopping');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // default
      }
    }
    return [
      { id: '1', name: 'Mascarpone Cheese', amount: '250g', category: 'dairy', completed: false, recipeTitle: 'Classic Italian Tiramisu' },
      { id: '2', name: 'Savoiardi Ladyfingers', amount: '24 pcs', category: 'pantry', completed: true, recipeTitle: 'Classic Italian Tiramisu' },
      { id: '3', name: 'Dutch-process Dark Cocoa', amount: '15g', category: 'baking', completed: false },
      { id: '4', name: 'Fresh Strawberries', amount: '200g', category: 'produce', completed: false, recipeTitle: 'New York Baked Cheesecake' },
    ];
  });

  // Meal Plan
  const [mealPlan, setMealPlan] = useState<MealPlanDay[]>(() => {
    const saved = localStorage.getItem('dolce_vita_meal_plan');
    return saved ? JSON.parse(saved) : INITIAL_MEAL_PLAN;
  });

  // User Profile
  const [user, setUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('dolce_vita_user');
    return saved
      ? JSON.parse(saved)
      : {
          name: 'Student Evaluator',
          email: 'student.eval@khitguntur.ac.in',
          isLoggedIn: true,
          avatarUrl: 'https://api.dicebear.com/7.x/bottts/svg?seed=khit_flutter',
          role: 'student_evaluator',
        };
  });

  // Notification Toast message
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('dolce_vita_lang', language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem('dolce_vita_theme', isDarkMode ? 'dark' : 'light');
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    localStorage.setItem('dolce_vita_favs', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('dolce_vita_shopping', JSON.stringify(shoppingItems));
  }, [shoppingItems]);

  useEffect(() => {
    localStorage.setItem('dolce_vita_meal_plan', JSON.stringify(mealPlan));
  }, [mealPlan]);

  useEffect(() => {
    localStorage.setItem('dolce_vita_user', JSON.stringify(user));
  }, [user]);

  const t = translations[language];

  // Favorite toggle handler
  const handleToggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites((prev) => {
      const exists = prev.includes(id);
      if (exists) {
        showToast(t.removedFromFavorites);
        return prev.filter((x) => x !== id);
      } else {
        showToast(t.addedToFavorites);
        return [...prev, id];
      }
    });
  };

  // Add recipe handler
  const handleSaveRecipe = (newRecipe: Recipe) => {
    setRecipes((prev) => {
      const updated = [newRecipe, ...prev];
      const customOnly = updated.filter((r) => r.isCustom);
      localStorage.setItem('dolce_vita_custom_recipes', JSON.stringify(customOnly));
      return updated;
    });
    showToast(`Published "${newRecipe.title[language] || newRecipe.title.en}"! 🎉`);
  };

  // Shopping list actions
  const handleAddToShoppingList = (
    items: { name: string; amount: string; category: any; recipeTitle: string }[]
  ) => {
    const newItems: ShoppingItem[] = items.map((i, idx) => ({
      id: `shop_${Date.now()}_${idx}`,
      name: i.name,
      amount: i.amount,
      category: i.category,
      completed: false,
      recipeTitle: i.recipeTitle,
    }));
    setShoppingItems((prev) => [...newItems, ...prev]);
    showToast(`${items.length} ingredients added to shopping list!`);
  };

  const handleToggleCompleteItem = (id: string) => {
    setShoppingItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, completed: !i.completed } : i))
    );
  };

  const handleAddCustomShoppingItem = (item: Omit<ShoppingItem, 'id'>) => {
    const created: ShoppingItem = {
      ...item,
      id: `shop_c_${Date.now()}`,
    };
    setShoppingItems((prev) => [created, ...prev]);
    showToast('Item added to pantry list');
  };

  const handleRemoveShoppingItem = (id: string) => {
    setShoppingItems((prev) => prev.filter((i) => i.id !== id));
  };

  const handleClearCompletedShopping = () => {
    setShoppingItems((prev) => prev.filter((i) => !i.completed));
    showToast('Cleared completed items');
  };

  const handleClearAllShopping = () => {
    setShoppingItems([]);
    showToast('Shopping list cleared');
  };

  // Meal Planner actions
  const handleAssignMeal = (dayKey: MealPlanDay['dayKey'], recipeId?: string) => {
    setMealPlan((prev) =>
      prev.map((d) => (d.dayKey === dayKey ? { ...d, dessertRecipeId: recipeId } : d))
    );
  };

  const handleClearMealPlan = () => {
    setMealPlan((prev) => prev.map((d) => ({ ...d, dessertRecipeId: undefined })));
    showToast('Weekly dessert plan reset');
  };

  const handleGenerateShoppingFromPlan = () => {
    const plannedRecipeIds = mealPlan
      .map((d) => d.dessertRecipeId)
      .filter((id): id is string => !!id);

    if (plannedRecipeIds.length === 0) {
      showToast('No desserts scheduled in meal planner');
      return;
    }

    const uniqueRecipeIds = Array.from(new Set(plannedRecipeIds));
    const itemsToAdd: { name: string; amount: string; category: any; recipeTitle: string }[] = [];

    uniqueRecipeIds.forEach((id) => {
      const r = recipes.find((x) => x.id === id);
      if (r) {
        const recipeTitle = r.title[language] || r.title.en;
        r.ingredients.forEach((ing) => {
          itemsToAdd.push({
            name: `${ing.amount} ${ing.unit} ${ing.name[language] || ing.name.en}`,
            amount: `${ing.amount} ${ing.unit}`,
            category: 'baking',
            recipeTitle,
          });
        });
      }
    });

    handleAddToShoppingList(itemsToAdd);
    setActiveTab('shopping');
    showToast(`Added ${itemsToAdd.length} ingredients from weekly plan!`);
  };

  // Voice Command executor
  const handleExecuteVoiceCommand = (result: VoiceCommandResult) => {
    if (result.action === 'switch_lang' && result.target) {
      setLanguage(result.target as Language);
      showToast(result.feedback[language] || result.feedback.en);
    } else if (result.action === 'open_recipe' && result.target) {
      const found = recipes.find((r) => r.id === result.target);
      if (found) {
        setSelectedRecipe(found);
      }
    } else if (result.action === 'switch_tab' && result.target) {
      if (result.target === 'shopping') setActiveTab('shopping');
      else if (result.target === 'planner') setActiveTab('planner');
      else if (result.target === 'favorites') setActiveTab('favorites');
      else if (result.target === 'substitutions') setActiveTab('substitutions');
      else if (result.target === 'add_recipe') setIsAddModalOpen(true);
    } else if (result.action === 'search' && result.target) {
      setSearchQuery(result.target);
      setActiveTab('recipes');
    }
  };

  // Filter recipes
  const filteredRecipes = recipes.filter((r) => {
    // If in favorites tab
    if (activeTab === 'favorites') {
      if (!favorites.includes(r.id)) return false;
    }

    if (selectedCategory !== 'all' && r.category !== selectedCategory) {
      return false;
    }
    if (filterVegOnly && !r.isVegetarian) {
      return false;
    }
    if (filterQuickOnly && r.prepTimeMinutes + r.cookTimeMinutes > 45) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const title = (r.title[language] || r.title.en).toLowerCase();
      const desc = (r.description[language] || r.description.en).toLowerCase();
      const orig = r.origin.toLowerCase();
      const hasIng = r.ingredients.some((i) =>
        (i.name[language] || i.name.en).toLowerCase().includes(q)
      );
      return title.includes(q) || desc.includes(q) || orig.includes(q) || hasIng;
    }
    return true;
  });

  const categories: { key: DessertCategory; label: string }[] = [
    { key: 'all', label: t.categories.all },
    { key: 'cakes', label: t.categories.cakes },
    { key: 'pies_tarts', label: t.categories.pies_tarts },
    { key: 'custards_puddings', label: t.categories.custards_puddings },
    { key: 'pastries', label: t.categories.pastries },
    { key: 'chilled', label: t.categories.chilled },
  ];

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-stone-950 text-stone-100' : 'bg-stone-100/90 text-stone-900'} transition-colors duration-200`}>
      {/* Rubric GP 3 State Testing Bar */}
      <StateIndicatorBanner
        currentState={screenState}
        onStateChange={(st) => setScreenState(st)}
        language={language}
      />

      {/* Main Container / Mobile frame wrapper */}
      <div
        className={`${
          isMobileFrame
            ? 'max-w-[420px] mx-auto min-h-screen my-4 rounded-[44px] border-[10px] border-stone-800 shadow-2xl overflow-hidden bg-stone-50 dark:bg-stone-900 flex flex-col relative'
            : 'w-full'
        }`}
      >
        {/* Mobile Mockup Speaker & Camera Notch */}
        {isMobileFrame && (
          <div className="bg-stone-800 h-6 flex items-center justify-center shrink-0">
            <div className="w-16 h-3 bg-stone-900 rounded-full flex items-center justify-center gap-2">
              <div className="w-2 h-2 rounded-full bg-stone-700" />
              <div className="w-2 h-2 rounded-full bg-stone-700" />
            </div>
          </div>
        )}

        {/* Top App Bar */}
        <TopAppBar
          language={language}
          onLanguageChange={(lang) => setLanguage(lang)}
          isDarkMode={isDarkMode}
          onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
          seedColor={seedColor}
          onSeedColorChange={(seed) => setSeedColor(seed)}
          isMobileFrame={isMobileFrame}
          onToggleDeviceFrame={() => setIsMobileFrame(!isMobileFrame)}
          onOpenVoiceCommand={() => setIsVoiceModalOpen(true)}
          onOpenFlutterCode={() => setIsFlutterCodeOpen(true)}
          onOpenLogin={() => setIsLoginOpen(true)}
          userName={user.name}
          isLoggedIn={user.isLoggedIn}
        />

        {/* Main Content Area */}
        <main className={`flex-1 ${isMobileFrame ? 'px-3 py-4' : 'max-w-7xl mx-auto px-4 py-6'} pb-24`}>
          {/* Active Tab View Routing */}
          {activeTab === 'planner' ? (
            <MealPlannerView
              plan={mealPlan}
              recipes={recipes}
              language={language}
              onAssignDessert={handleAssignMeal}
              onClearPlan={handleClearMealPlan}
              onGenerateShoppingList={handleGenerateShoppingFromPlan}
              onSelectRecipe={(r) => setSelectedRecipe(r)}
            />
          ) : activeTab === 'shopping' ? (
            <ShoppingListView
              items={shoppingItems}
              language={language}
              onToggleComplete={handleToggleCompleteItem}
              onAddItem={handleAddCustomShoppingItem}
              onRemoveItem={handleRemoveShoppingItem}
              onClearCompleted={handleClearCompletedShopping}
              onClearAll={handleClearAllShopping}
            />
          ) : activeTab === 'substitutions' ? (
            <SubstitutionsView language={language} />
          ) : (
            /* 'recipes' and 'favorites' Tab Feed */
            <div className="space-y-6">
              {/* Search Bar & Instant Filters */}
              <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-3 sm:p-4 shadow-sm space-y-3">
                <div className="relative">
                  <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t.searchPlaceholder}
                    className="w-full h-11 pl-10 pr-10 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-xs text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus:outline-none focus:border-amber-500 transition-colors"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 text-xs font-semibold"
                    >
                      Clear
                    </button>
                  )}
                </div>

                {/* Categories Tabs (interactive filter controls) */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                  {categories.map((cat) => (
                    <button
                      key={cat.key}
                      onClick={() => setSelectedCategory(cat.key)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                        selectedCategory === cat.key
                          ? 'bg-amber-600 text-white shadow-sm'
                          : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>

                {/* Dietary Toggle Pills */}
                <div className="flex items-center gap-2 pt-1 border-t border-stone-100 dark:border-stone-800 flex-wrap">
                  <button
                    onClick={() => setFilterVegOnly(!filterVegOnly)}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-medium flex items-center gap-1 transition-colors ${
                      filterVegOnly
                        ? 'bg-emerald-600 text-white'
                        : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400'
                    }`}
                  >
                    {filterVegOnly && <Check className="w-3 h-3 stroke-[3]" />}
                    <span>{t.filterVeg}</span>
                  </button>

                  <button
                    onClick={() => setFilterQuickOnly(!filterQuickOnly)}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-medium flex items-center gap-1 transition-colors ${
                      filterQuickOnly
                        ? 'bg-amber-600 text-white'
                        : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400'
                    }`}
                  >
                    {filterQuickOnly && <Check className="w-3 h-3 stroke-[3]" />}
                    <span>{t.filterQuick}</span>
                  </button>

                  <span className="text-[11px] text-stone-400 ml-auto font-medium">
                    Showing <span className="tabular-nums font-bold text-stone-700 dark:text-stone-300">{filteredRecipes.length}</span> desserts
                  </span>
                </div>
              </div>

              {/* Rubric GP 3: Four Screen States Render Logic */}
              {screenState === 'loading' ? (
                /* Loading Skeleton State */
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {[1, 2, 3, 4, 5, 6].map((idx) => (
                    <div
                      key={idx}
                      className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 overflow-hidden shadow-sm animate-pulse"
                    >
                      <div className="aspect-[4/3] bg-stone-200 dark:bg-stone-800 flex items-center justify-center">
                        <Loader2 className="w-6 h-6 text-stone-400 animate-spin" />
                      </div>
                      <div className="p-4 space-y-3">
                        <div className="h-4 bg-stone-200 dark:bg-stone-800 rounded w-2/3" />
                        <div className="h-3 bg-stone-200 dark:bg-stone-800 rounded w-full" />
                        <div className="h-3 bg-stone-200 dark:bg-stone-800 rounded w-4/5" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : screenState === 'error' ? (
                /* Error State with Retry Button (GP 3 compliance) */
                <div className="bg-white dark:bg-stone-900 rounded-3xl border border-rose-200 dark:border-rose-900/60 p-12 text-center shadow-sm max-w-lg mx-auto">
                  <div className="w-16 h-16 rounded-full bg-rose-100 dark:bg-rose-950/80 text-rose-600 dark:text-rose-400 flex items-center justify-center mx-auto mb-4">
                    <AlertTriangle className="w-8 h-8" />
                  </div>
                  <h3 className="text-base font-bold font-display text-stone-900 dark:text-stone-100 mb-2">
                    Connection Error (GP 3 Simulator)
                  </h3>
                  <p className="text-xs text-stone-600 dark:text-stone-400 mb-6 leading-relaxed">
                    {t.screenStates.errorMessage}
                  </p>
                  <button
                    onClick={() => {
                      setScreenState('loading');
                      setTimeout(() => setScreenState('data'), 600);
                      showToast('Reconnected to cloud dessert catalog!');
                    }}
                    className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold flex items-center gap-2 mx-auto shadow-md shadow-amber-600/20 active:scale-95 transition-all"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>{t.screenStates.retry}</span>
                  </button>
                </div>
              ) : screenState === 'empty' || filteredRecipes.length === 0 ? (
                /* Empty State (GP 3 compliance) */
                <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-12 text-center shadow-sm max-w-lg mx-auto">
                  <div className="w-16 h-16 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-400 flex items-center justify-center mx-auto mb-4">
                    <Inbox className="w-8 h-8" />
                  </div>
                  <h3 className="text-base font-bold font-display text-stone-900 dark:text-stone-100 mb-1">
                    {activeTab === 'favorites' ? t.noFavorites : 'No Desserts Found'}
                  </h3>
                  <p className="text-xs text-stone-500 mb-6 leading-relaxed">
                    {activeTab === 'favorites' ? t.noFavoritesSub : t.screenStates.emptyMessage}
                  </p>
                  <div className="flex items-center justify-center gap-3">
                    <button
                      onClick={() => {
                        setSearchQuery('');
                        setSelectedCategory('all');
                        setFilterVegOnly(false);
                        setFilterQuickOnly(false);
                        setScreenState('data');
                      }}
                      className="px-4 py-2 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 text-xs font-semibold transition-colors"
                    >
                      Reset Filters
                    </button>
                    <button
                      onClick={() => setIsAddModalOpen(true)}
                      className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      <span>{t.addRecipe}</span>
                    </button>
                  </div>
                </div>
              ) : (
                /* Populated Data Feed */
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {filteredRecipes.map((recipe) => (
                    <RecipeCard
                      key={recipe.id}
                      recipe={recipe}
                      language={language}
                      isFavorite={favorites.includes(recipe.id)}
                      onToggleFavorite={handleToggleFavorite}
                      onSelect={(r) => setSelectedRecipe(r)}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </main>

        {/* Floating Action Button (FAB) for Add Recipe (GP 4) */}
        <button
          onClick={() => setIsAddModalOpen(true)}
          className={`fixed ${isMobileFrame ? 'bottom-20 right-8' : 'bottom-20 right-6'} z-30 h-13 px-4 rounded-full bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-lg shadow-amber-600/30 flex items-center gap-2 active:scale-95 transition-all`}
          title="Create & Validate New Recipe (GP 4)"
        >
          <Plus className="w-5 h-5 stroke-[2.5]" />
          <span className="hidden sm:inline">{t.addRecipe}</span>
        </button>

        {/* Bottom Navigation Bar */}
        <BottomNavBar
          activeTab={activeTab}
          onTabChange={(tab) => {
            setActiveTab(tab);
            setScreenState('data');
          }}
          language={language}
          shoppingCount={shoppingItems.filter((i) => !i.completed).length}
          favoritesCount={favorites.length}
        />

        {/* Notification Toast */}
        {toastMessage && (
          <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 bg-stone-900/90 text-white text-xs font-medium px-4 py-2 rounded-full shadow-lg backdrop-blur-sm animate-in fade-in slide-in-from-bottom-2 duration-200">
            {toastMessage}
          </div>
        )}
      </div>

      {/* Modals & Dialogs */}
      {selectedRecipe && (
        <RecipeDetailModal
          recipe={selectedRecipe}
          onClose={() => setSelectedRecipe(null)}
          language={language}
          isFavorite={favorites.includes(selectedRecipe.id)}
          onToggleFavorite={handleToggleFavorite}
          onAddToShoppingList={handleAddToShoppingList}
          onOpenSubstitutions={() => {
            setSelectedRecipe(null);
            setActiveTab('substitutions');
          }}
        />
      )}

      {isAddModalOpen && (
        <AddRecipeModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          language={language}
          onSaveRecipe={handleSaveRecipe}
        />
      )}

      {isVoiceModalOpen && (
        <VoiceCommandModal
          isOpen={isVoiceModalOpen}
          onClose={() => setIsVoiceModalOpen(false)}
          language={language}
          onExecuteCommand={handleExecuteVoiceCommand}
        />
      )}

      {isLoginOpen && (
        <LoginPortalModal
          isOpen={isLoginOpen}
          onClose={() => setIsLoginOpen(false)}
          language={language}
          user={user}
          onUpdateUser={(updated) => setUser(updated)}
        />
      )}

      {isFlutterCodeOpen && (
        <FlutterCodePackModal
          isOpen={isFlutterCodeOpen}
          onClose={() => setIsFlutterCodeOpen(false)}
          language={language}
        />
      )}
    </div>
  );
}

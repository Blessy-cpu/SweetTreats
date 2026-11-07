import React, { useState, useEffect, useRef } from 'react';
import { Recipe, Language } from '../types';
import { translations } from '../data/translations';
import {
  X,
  Heart,
  Clock,
  Flame,
  ChefHat,
  ShoppingBag,
  ArrowLeftRight,
  Play,
  Pause,
  RotateCcw,
  CheckCircle,
  Volume2,
  Share2,
  Check,
  ChevronRight,
  ChevronLeft,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface Props {
  recipe: Recipe | null;
  onClose: () => void;
  language: Language;
  isFavorite: boolean;
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
  onAddToShoppingList: (items: { name: string; amount: string; category: any; recipeTitle: string }[]) => void;
  onOpenSubstitutions: () => void;
}

export const RecipeDetailModal: React.FC<Props> = ({
  recipe,
  onClose,
  language,
  isFavorite,
  onToggleFavorite,
  onAddToShoppingList,
  onOpenSubstitutions,
}) => {
  const t = translations[language];

  const [servingMultiplier, setServingMultiplier] = useState<number>(1);
  const [checkedIngredients, setCheckedIngredients] = useState<Record<string, boolean>>({});
  const [copiedLink, setCopiedLink] = useState(false);
  const [addedSuccess, setAddedSuccess] = useState(false);

  // Cooking mode state
  const [isCookingMode, setIsCookingMode] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [timerSeconds, setTimerSeconds] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Reset states when recipe changes
  useEffect(() => {
    setCheckedIngredients({});
    setServingMultiplier(1);
    setIsCookingMode(false);
    setCurrentStepIndex(0);
    setIsTimerRunning(false);
    if (timerRef.current) clearInterval(timerRef.current);
  }, [recipe]);

  // Timer countdown handler
  useEffect(() => {
    if (isTimerRunning && timerSeconds > 0) {
      timerRef.current = setInterval(() => {
        setTimerSeconds((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            setIsTimerRunning(false);
            playTimerChime();
            confetti({ particleCount: 70, spread: 60, origin: { y: 0.7 } });
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isTimerRunning, timerSeconds]);

  // Web Audio synthesizer for timer chime
  const playTimerChime = () => {
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
      osc.frequency.setValueAtTime(880, ctx.currentTime + 0.15); // A5

      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.8);
    } catch {
      // Audio autoplay policy fallback
    }
  };

  if (!recipe) return null;

  const title = recipe.title[language] || recipe.title.en;
  const description = recipe.description[language] || recipe.description.en;

  const toggleIngredientCheck = (id: string) => {
    setCheckedIngredients((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleAddAllToShopping = () => {
    const items = recipe.ingredients.map((ing) => {
      const scaledAmount = (ing.amount * servingMultiplier).toFixed(0);
      const ingName = ing.name[language] || ing.name.en;
      return {
        name: `${scaledAmount} ${ing.unit} ${ingName}`,
        amount: `${scaledAmount} ${ing.unit}`,
        category: 'baking' as const,
        recipeTitle: title,
      };
    });
    onAddToShoppingList(items);
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 2500);
  };

  const startStepTimer = (minutes: number) => {
    setTimerSeconds(minutes * 60);
    setIsTimerRunning(true);
  };

  const formatTimer = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const currentStep = recipe.steps[currentStepIndex];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-0 sm:p-4">
      <div className="bg-white dark:bg-stone-900 w-full max-w-2xl min-h-screen sm:min-h-0 sm:rounded-3xl border border-stone-200 dark:border-stone-800 shadow-2xl overflow-hidden flex flex-col max-h-[94vh]">
        {/* Sticky Header with Title and Actions */}
        <div className="sticky top-0 z-20 bg-white/95 dark:bg-stone-900/95 backdrop-blur-md px-4 py-3 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 min-w-0">
            <h2 className="text-base font-bold font-display text-stone-900 dark:text-stone-100 truncate">
              {title}
            </h2>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={(e) => onToggleFavorite(recipe.id, e)}
              className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                isFavorite
                  ? 'bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400'
                  : 'text-stone-500 hover:bg-stone-100 dark:hover:bg-stone-800'
              }`}
              title="Toggle Favorite"
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
            </button>

            <button
              onClick={() => {
                navigator.clipboard?.writeText(window.location.href);
                setCopiedLink(true);
                setTimeout(() => setCopiedLink(false), 2000);
              }}
              className="w-9 h-9 rounded-xl text-stone-500 hover:bg-stone-100 dark:hover:bg-stone-800 flex items-center justify-center transition-colors"
              title="Share Recipe"
            >
              {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
            </button>

            <button
              onClick={onClose}
              className="w-9 h-9 rounded-xl text-stone-500 hover:bg-stone-100 dark:hover:bg-stone-800 flex items-center justify-center transition-colors"
              title="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto flex-1">
          {/* Guided Cooking Mode View */}
          {isCookingMode ? (
            <div className="p-6 flex flex-col justify-between min-h-[420px]">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                    <ChefHat className="w-4 h-4" />
                    <span>
                      {t.step} {currentStepIndex + 1} {t.of} {recipe.steps.length}
                    </span>
                  </div>
                  <button
                    onClick={() => setIsCookingMode(false)}
                    className="text-xs text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 font-medium"
                  >
                    {t.cancel}
                  </button>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-1.5 bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden mb-6">
                  <div
                    className="h-full bg-amber-500 transition-all duration-300"
                    style={{
                      width: `${((currentStepIndex + 1) / recipe.steps.length) * 100}%`,
                    }}
                  />
                </div>

                {/* Step Instruction */}
                <div className="bg-stone-50 dark:bg-stone-800/60 rounded-2xl p-6 border border-stone-200/80 dark:border-stone-700/60 mb-6">
                  <p className="text-lg font-medium text-stone-900 dark:text-stone-100 leading-relaxed mb-4">
                    {currentStep.instruction[language] || currentStep.instruction.en}
                  </p>

                  {currentStep.tip && (
                    <div className="text-xs text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 p-3 rounded-xl border border-amber-200 dark:border-amber-900/50">
                      <span className="font-bold mr-1">Chef Tip:</span>
                      {currentStep.tip[language] || currentStep.tip.en}
                    </div>
                  )}
                </div>

                {/* Step Timer if duration exists */}
                {currentStep.durationMinutes && (
                  <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4 flex items-center justify-between gap-4 mb-6">
                    <div>
                      <div className="text-xs font-semibold text-amber-800 dark:text-amber-300">
                        {t.cookingTimer} ({currentStep.durationMinutes} mins)
                      </div>
                      <div className="text-2xl font-bold font-mono text-stone-900 dark:text-stone-100 tabular-nums">
                        {timerSeconds > 0
                          ? formatTimer(timerSeconds)
                          : `${currentStep.durationMinutes}:00`}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {timerSeconds === 0 ? (
                        <button
                          onClick={() => startStepTimer(currentStep.durationMinutes!)}
                          className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 shadow-sm shadow-amber-600/20"
                        >
                          <Play className="w-3.5 h-3.5" />
                          <span>Start Timer</span>
                        </button>
                      ) : (
                        <>
                          <button
                            onClick={() => setIsTimerRunning(!isTimerRunning)}
                            className="p-2.5 bg-stone-200 dark:bg-stone-700 text-stone-800 dark:text-stone-100 rounded-xl"
                            title={isTimerRunning ? 'Pause' : 'Resume'}
                          >
                            {isTimerRunning ? (
                              <Pause className="w-4 h-4" />
                            ) : (
                              <Play className="w-4 h-4" />
                            )}
                          </button>
                          <button
                            onClick={() => {
                              setIsTimerRunning(false);
                              setTimerSeconds(0);
                            }}
                            className="p-2.5 bg-stone-200 dark:bg-stone-700 text-stone-800 dark:text-stone-100 rounded-xl"
                            title="Reset Timer"
                          >
                            <RotateCcw className="w-4 h-4" />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Step Navigation Controls */}
              <div className="flex items-center justify-between gap-4 pt-4 border-t border-stone-200 dark:border-stone-800">
                <button
                  disabled={currentStepIndex === 0}
                  onClick={() => setCurrentStepIndex((prev) => Math.max(0, prev - 1))}
                  className="px-4 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 text-xs font-semibold flex items-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>{t.prevStep}</span>
                </button>

                {currentStepIndex < recipe.steps.length - 1 ? (
                  <button
                    onClick={() => setCurrentStepIndex((prev) => prev + 1)}
                    className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm shadow-amber-600/20 transition-all"
                  >
                    <span>{t.nextStep}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
                      setIsCookingMode(false);
                    }}
                    className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm shadow-emerald-600/20 transition-all"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>{t.finishCooking}</span>
                  </button>
                )}
              </div>
            </div>
          ) : (
            /* Standard Full Recipe Detail View */
            <div>
              {/* Hero Photo */}
              <div className="relative aspect-[16/9] w-full bg-stone-100 dark:bg-stone-800 overflow-hidden">
                <img
                  src={recipe.imageUrl}
                  alt={title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-5">
                  <div className="text-white">
                    <div className="text-xs font-medium text-amber-300 mb-1">
                      {recipe.origin} · {t.categories[recipe.category] || recipe.category}
                    </div>
                    <h1 className="text-xl sm:text-2xl font-bold font-display leading-tight">
                      {title}
                    </h1>
                  </div>
                </div>
              </div>

              <div className="p-5 sm:p-6 space-y-6">
                {/* Description */}
                <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                  {description}
                </p>

                {/* Key Metrics Strip (anti-slop unboxed) */}
                <div className="grid grid-cols-4 gap-2 p-3 bg-stone-50 dark:bg-stone-800/60 rounded-2xl border border-stone-200/80 dark:border-stone-800 text-center">
                  <div>
                    <span className="text-[10px] uppercase font-semibold text-stone-400 block">
                      {t.prepTime}
                    </span>
                    <span className="text-sm font-bold text-stone-900 dark:text-stone-100 tabular-nums">
                      {recipe.prepTimeMinutes}m
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-semibold text-stone-400 block">
                      {t.cookTime}
                    </span>
                    <span className="text-sm font-bold text-stone-900 dark:text-stone-100 tabular-nums">
                      {recipe.cookTimeMinutes}m
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-semibold text-stone-400 block">
                      {t.totalTime}
                    </span>
                    <span className="text-sm font-bold text-amber-600 dark:text-amber-400 tabular-nums">
                      {recipe.prepTimeMinutes + recipe.cookTimeMinutes}m
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-semibold text-stone-400 block">
                      {t.calories}
                    </span>
                    <span className="text-sm font-bold text-stone-900 dark:text-stone-100 tabular-nums">
                      {recipe.caloriesPerServing}
                    </span>
                  </div>
                </div>

                {/* Ingredients Section with Scaler */}
                <div>
                  <div className="flex items-center justify-between gap-4 mb-3">
                    <h3 className="text-base font-bold font-display text-stone-900 dark:text-stone-100 flex items-center gap-2">
                      <span>{t.ingredients}</span>
                      <span className="text-xs font-normal text-stone-500">
                        ({recipe.ingredients.length} items)
                      </span>
                    </h3>

                    {/* Serving Scaler (1x, 2x, 3x) */}
                    <div className="flex items-center gap-1 p-0.5 bg-stone-100 dark:bg-stone-800 rounded-lg text-xs">
                      {[1, 2, 3].map((mult) => (
                        <button
                          key={mult}
                          onClick={() => setServingMultiplier(mult)}
                          className={`px-2 py-1 rounded-md font-semibold transition-colors ${
                            servingMultiplier === mult
                              ? 'bg-white dark:bg-stone-700 text-amber-600 dark:text-amber-400 shadow-sm'
                              : 'text-stone-500 hover:text-stone-900 dark:hover:text-stone-100'
                          }`}
                        >
                          {mult}x ({recipe.servings * mult})
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Ingredients List */}
                  <div className="space-y-2">
                    {recipe.ingredients.map((ing) => {
                      const isChecked = !!checkedIngredients[ing.id];
                      const scaledAmount = (ing.amount * servingMultiplier).toFixed(0);
                      const ingName = ing.name[language] || ing.name.en;

                      return (
                        <div
                          key={ing.id}
                          onClick={() => toggleIngredientCheck(ing.id)}
                          className={`p-2.5 rounded-xl border flex items-center justify-between gap-3 cursor-pointer transition-all ${
                            isChecked
                              ? 'bg-amber-50/50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900/40 text-stone-400'
                              : 'bg-white dark:bg-stone-800/40 border-stone-200/80 dark:border-stone-800 text-stone-800 dark:text-stone-200 hover:border-amber-300'
                          }`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <div
                              className={`w-4 h-4 rounded-md border flex items-center justify-center shrink-0 ${
                                isChecked
                                  ? 'bg-amber-600 border-amber-600 text-white'
                                  : 'border-stone-300 dark:border-stone-600'
                              }`}
                            >
                              {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                            </div>
                            <span
                              className={`text-xs font-medium truncate ${
                                isChecked ? 'line-through text-stone-400' : ''
                              }`}
                            >
                              {ingName}
                            </span>
                          </div>

                          <div className="text-right shrink-0">
                            <span className="text-xs font-bold text-amber-700 dark:text-amber-400 tabular-nums">
                              {scaledAmount} {ing.unit}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Add all to shopping list CTA */}
                  <div className="mt-3 flex items-center gap-2">
                    <button
                      onClick={handleAddAllToShopping}
                      className="flex-1 py-2.5 px-3 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
                    >
                      <ShoppingBag className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                      <span>{addedSuccess ? t.allAdded : t.addToShoppingList}</span>
                    </button>

                    <button
                      onClick={onOpenSubstitutions}
                      className="py-2.5 px-3 rounded-xl border border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800 text-xs font-medium flex items-center gap-1.5 transition-colors"
                      title="View Egg & Dairy Substitutions"
                    >
                      <ArrowLeftRight className="w-3.5 h-3.5 text-stone-500" />
                      <span className="hidden sm:inline">{t.substitutions}</span>
                    </button>
                  </div>
                </div>

                {/* Baking Steps Section */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-base font-bold font-display text-stone-900 dark:text-stone-100">
                      {t.instructions}
                    </h3>
                    <button
                      onClick={() => setIsCookingMode(true)}
                      className="px-3.5 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm shadow-amber-600/20 transition-all"
                    >
                      <Play className="w-3 h-3 fill-current" />
                      <span>{t.startCooking}</span>
                    </button>
                  </div>

                  <div className="space-y-3">
                    {recipe.steps.map((st) => (
                      <div
                        key={st.stepNumber}
                        className="p-3.5 bg-stone-50 dark:bg-stone-800/40 rounded-2xl border border-stone-200/80 dark:border-stone-800 flex gap-3"
                      >
                        <div className="w-6 h-6 rounded-full bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 text-xs font-bold flex items-center justify-center shrink-0">
                          {st.stepNumber}
                        </div>
                        <div className="flex-1">
                          <p className="text-xs text-stone-800 dark:text-stone-200 leading-relaxed mb-1">
                            {st.instruction[language] || st.instruction.en}
                          </p>
                          {st.durationMinutes && (
                            <span className="text-[11px] font-medium text-amber-600 dark:text-amber-400 flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {st.durationMinutes} mins
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

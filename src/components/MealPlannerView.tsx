import React from 'react';
import { Recipe, Language, MealPlanDay } from '../types';
import { translations } from '../data/translations';
import { Calendar, Plus, Trash2, ShoppingBag, Clock, Sparkles } from 'lucide-react';

interface Props {
  plan: MealPlanDay[];
  recipes: Recipe[];
  language: Language;
  onAssignDessert: (dayKey: MealPlanDay['dayKey'], recipeId?: string) => void;
  onClearPlan: () => void;
  onGenerateShoppingList: () => void;
  onSelectRecipe: (recipe: Recipe) => void;
}

export const MealPlannerView: React.FC<Props> = ({
  plan,
  recipes,
  language,
  onAssignDessert,
  onClearPlan,
  onGenerateShoppingList,
  onSelectRecipe,
}) => {
  const t = translations[language];

  const totalAssignedCalories = plan.reduce((sum, day) => {
    if (!day.dessertRecipeId) return sum;
    const r = recipes.find((x) => x.id === day.dessertRecipeId);
    return sum + (r ? r.caloriesPerServing : 0);
  }, 0);

  const assignedCount = plan.filter((d) => !!d.dessertRecipeId).length;

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-600 to-amber-700 dark:from-amber-900 dark:to-stone-900 text-white rounded-3xl p-6 shadow-md relative overflow-hidden">
        <div className="relative z-10 max-w-xl">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-200 uppercase tracking-wider mb-2">
            <Calendar className="w-4 h-4" />
            <span>Weekly Western Dessert Schedule</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-display mb-2">
            {t.mealPlannerTitle}
          </h2>
          <p className="text-xs text-amber-100/90 leading-relaxed mb-4">
            {t.mealPlannerSub}
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onGenerateShoppingList}
              disabled={assignedCount === 0}
              className="px-4 py-2 rounded-xl bg-white text-stone-900 hover:bg-stone-100 text-xs font-bold flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed shadow-sm transition-all active:scale-95"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-amber-600" />
              <span>{t.generateShoppingList}</span>
            </button>

            <button
              onClick={onClearPlan}
              className="px-3.5 py-2 rounded-xl bg-amber-800/80 hover:bg-amber-800 text-amber-100 text-xs font-medium flex items-center gap-1.5 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>{t.clearPlan}</span>
            </button>

            <div className="text-xs text-amber-200 ml-auto font-medium">
              <span className="tabular-nums font-bold text-white">{assignedCount}</span>/7 days planned ·{' '}
              <span className="tabular-nums font-bold text-white">{totalAssignedCalories}</span> total kcal
            </div>
          </div>
        </div>
      </div>

      {/* 7 Days Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {plan.map((day) => {
          const assignedRecipe = recipes.find((r) => r.id === day.dessertRecipeId);

          return (
            <div
              key={day.dayKey}
              className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-4 shadow-sm flex flex-col justify-between transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold font-display uppercase tracking-wide text-stone-900 dark:text-stone-100">
                    {day.day}
                  </span>
                  {assignedRecipe && (
                    <span className="text-[11px] font-semibold text-amber-600 dark:text-amber-400 tabular-nums">
                      {assignedRecipe.caloriesPerServing} kcal
                    </span>
                  )}
                </div>

                {assignedRecipe ? (
                  <div
                    onClick={() => onSelectRecipe(assignedRecipe)}
                    className="group cursor-pointer p-3 rounded-xl bg-stone-50 dark:bg-stone-800/50 border border-stone-200/80 dark:border-stone-700/60 hover:border-amber-400 transition-all flex items-center gap-3 mb-3"
                  >
                    <img
                      src={assignedRecipe.imageUrl}
                      alt={assignedRecipe.title.en}
                      referrerPolicy="no-referrer"
                      className="w-12 h-12 rounded-lg object-cover shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <h4 className="text-xs font-bold text-stone-900 dark:text-stone-100 truncate group-hover:text-amber-600 dark:group-hover:text-amber-400">
                        {assignedRecipe.title[language] || assignedRecipe.title.en}
                      </h4>
                      <p className="text-[11px] text-stone-500 flex items-center gap-1 mt-0.5">
                        <Clock className="w-3 h-3 text-amber-600" />
                        <span>
                          {assignedRecipe.prepTimeMinutes + assignedRecipe.cookTimeMinutes} mins
                        </span>
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="py-6 border border-dashed border-stone-200 dark:border-stone-800 rounded-xl text-center mb-3">
                    <Sparkles className="w-5 h-5 text-stone-300 dark:text-stone-600 mx-auto mb-1" />
                    <p className="text-xs text-stone-400">No dessert scheduled</p>
                  </div>
                )}
              </div>

              {/* Selector Dropdown */}
              <div className="flex items-center gap-2 pt-2 border-t border-stone-100 dark:border-stone-800">
                <select
                  value={day.dessertRecipeId || ''}
                  onChange={(e) =>
                    onAssignDessert(day.dayKey, e.target.value || undefined)
                  }
                  className="w-full h-8 px-2 rounded-lg border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-xs text-stone-800 dark:text-stone-200 focus:outline-none focus:border-amber-500"
                >
                  <option value="">-- Choose Dessert --</option>
                  {recipes.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.title[language] || r.title.en}
                    </option>
                  ))}
                </select>

                {day.dessertRecipeId && (
                  <button
                    onClick={() => onAssignDessert(day.dayKey, undefined)}
                    className="h-8 w-8 rounded-lg text-stone-400 hover:text-rose-500 hover:bg-stone-100 dark:hover:bg-stone-800 flex items-center justify-center shrink-0 transition-colors"
                    title="Remove assignment"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { Recipe, Language } from '../types';
import { translations } from '../data/translations';
import { Heart, Clock, Flame, UtensilsCrossed, Star } from 'lucide-react';

interface Props {
  recipe: Recipe;
  language: Language;
  isFavorite: boolean;
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
  onSelect: (recipe: Recipe) => void;
}

export const RecipeCard: React.FC<Props> = ({
  recipe,
  language,
  isFavorite,
  onToggleFavorite,
  onSelect,
}) => {
  const t = translations[language];
  const [imageError, setImageError] = useState(false);

  const title = recipe.title[language] || recipe.title.en;
  const description = recipe.description[language] || recipe.description.en;
  const totalMinutes = recipe.prepTimeMinutes + recipe.cookTimeMinutes;

  const difficultyLabel =
    recipe.difficulty === 'easy'
      ? t.easy
      : recipe.difficulty === 'medium'
      ? t.medium
      : t.hard;

  return (
    <div
      onClick={() => onSelect(recipe)}
      className="group bg-white dark:bg-stone-900 rounded-2xl border border-stone-200/80 dark:border-stone-800 overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col h-full"
    >
      {/* Image Container with Fallback */}
      <div className="relative aspect-[4/3] w-full bg-stone-100 dark:bg-stone-800 overflow-hidden">
        {!imageError ? (
          <img
            src={recipe.imageUrl}
            alt={title}
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-gradient-to-br from-amber-50 to-stone-100 dark:from-stone-800 dark:to-stone-900 text-stone-400">
            <UtensilsCrossed className="w-10 h-10 mb-2 text-amber-500/70" />
            <span className="text-xs font-medium text-stone-600 dark:text-stone-300 text-center line-clamp-1">
              {title}
            </span>
          </div>
        )}

        {/* Favorite Heart Button */}
        <button
          onClick={(e) => onToggleFavorite(recipe.id, e)}
          className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md transition-all ${
            isFavorite
              ? 'bg-rose-500 text-white shadow-md shadow-rose-500/30'
              : 'bg-white/80 dark:bg-stone-900/80 text-stone-700 dark:text-stone-200 hover:text-rose-500 hover:bg-white'
          }`}
          title={isFavorite ? t.removedFromFavorites : t.addedToFavorites}
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
        </button>

        {/* Origin subtle watermark overlay */}
        <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/60 backdrop-blur-sm text-[11px] font-medium text-white/90">
          {recipe.origin}
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Unboxed Metadata Line with typographic separators (anti-slop rule) */}
          <div className="flex items-center gap-1.5 text-xs text-stone-500 dark:text-stone-400 mb-1.5 flex-wrap">
            <span className="font-medium text-amber-700 dark:text-amber-400">
              {t.categories[recipe.category] || recipe.category}
            </span>
            <span aria-hidden="true">·</span>
            <span>{difficultyLabel}</span>
            {recipe.isVegetarian && (
              <>
                <span aria-hidden="true">·</span>
                <span className="text-emerald-700 dark:text-emerald-400 font-medium">
                  {language === 'hi' ? 'शाकाहारी' : language === 'te' ? 'శాకాహారం' : 'Veg'}
                </span>
              </>
            )}
          </div>

          <h3 className="text-base font-semibold font-display text-stone-900 dark:text-stone-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors line-clamp-1 mb-1">
            {title}
          </h3>

          <p className="text-xs text-stone-600 dark:text-stone-300 line-clamp-2 leading-relaxed mb-3">
            {description}
          </p>
        </div>

        {/* Bottom stats row */}
        <div className="pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs text-stone-600 dark:text-stone-400">
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            <span className="tabular-nums font-medium">{totalMinutes}m</span>
          </div>

          <div className="flex items-center gap-1">
            <Flame className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            <span className="tabular-nums font-medium">{recipe.caloriesPerServing} kcal</span>
          </div>

          <div className="flex items-center gap-1 text-amber-600 dark:text-amber-400">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span className="font-semibold tabular-nums">{recipe.rating}</span>
            <span className="text-[10px] text-stone-400">({recipe.reviewCount})</span>
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { SubstitutionRule, Language } from '../types';
import { INGREDIENT_SUBSTITUTIONS } from '../data/substitutions';
import { translations } from '../data/translations';
import { ArrowLeftRight, Search, Sparkles, Scale, Info, Check } from 'lucide-react';

interface Props {
  language: Language;
}

export const SubstitutionsView: React.FC<Props> = ({ language }) => {
  const t = translations[language];
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filtered = INGREDIENT_SUBSTITUTIONS.filter((rule) => {
    if (selectedCategory !== 'all' && rule.category !== selectedCategory) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const ing = rule.ingredient[language]?.toLowerCase() || rule.ingredient.en.toLowerCase();
      const sub = rule.substitute[language]?.toLowerCase() || rule.substitute.en.toLowerCase();
      const notes = rule.notes[language]?.toLowerCase() || rule.notes.en.toLowerCase();
      return ing.includes(q) || sub.includes(q) || notes.includes(q);
    }
    return true;
  });

  const categories = [
    { key: 'all', label: 'All Substitutes' },
    { key: 'eggs', label: 'Eggless Bakes' },
    { key: 'dairy', label: 'Dairy & Cheeses' },
    { key: 'gelling', label: 'Vegetarian Gelatin' },
    { key: 'flours', label: 'Flours & Gluten-Free' },
  ];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-6 shadow-sm">
        <div className="max-w-xl">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wider mb-1">
            <ArrowLeftRight className="w-4 h-4" />
            <span>Smart Baking Chemistry</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-display text-stone-900 dark:text-stone-100 mb-2">
            Western Dessert Substitutions Calculator
          </h2>
          <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
            Missing an ingredient or baking eggless / vegetarian? Easily substitute eggs, mascarpone, heavy cream, gelatin, and cake flour with authentic culinary ratios.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mt-5 relative">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search ingredient (e.g. eggs, mascarpone, gelatin, cream)..."
            className="w-full h-11 pl-10 pr-4 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800/80 text-xs text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus:outline-none focus:border-amber-500 transition-colors"
          />
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-1.5 mt-4 overflow-x-auto pb-1">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                selectedCategory === cat.key
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Substitutions Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-5 shadow-sm flex flex-col justify-between"
          >
            <div>
              {/* Original vs Substitute Split */}
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="flex-1">
                  <span className="text-[10px] uppercase font-bold text-stone-400 block mb-1">
                    Original Ingredient
                  </span>
                  <div className="text-sm font-bold text-stone-900 dark:text-stone-100">
                    {item.ingredient[language] || item.ingredient.en}
                  </div>
                </div>

                <div className="w-8 h-8 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 mt-2">
                  <ArrowLeftRight className="w-4 h-4" />
                </div>

                <div className="flex-1 text-right">
                  <span className="text-[10px] uppercase font-bold text-emerald-600 dark:text-emerald-400 block mb-1">
                    Best Substitute
                  </span>
                  <div className="text-sm font-bold text-stone-900 dark:text-stone-100">
                    {item.substitute[language] || item.substitute.en}
                  </div>
                </div>
              </div>

              {/* Exact Ratio */}
              <div className="bg-amber-500/10 dark:bg-amber-950/30 border border-amber-500/20 rounded-xl p-3 mb-3">
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-800 dark:text-amber-300 mb-1">
                  <Scale className="w-3.5 h-3.5" />
                  <span>Exact Ratio / Formula:</span>
                </div>
                <div className="text-xs font-mono text-stone-800 dark:text-stone-200">
                  {item.ratio}
                </div>
              </div>

              {/* Chef Notes & Performance */}
              <div className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed flex items-start gap-2">
                <Info className="w-3.5 h-3.5 text-stone-400 shrink-0 mt-0.5" />
                <span>{item.notes[language] || item.notes.en}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

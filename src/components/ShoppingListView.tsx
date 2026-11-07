import React, { useState } from 'react';
import { ShoppingItem, Language } from '../types';
import { translations } from '../data/translations';
import {
  ShoppingBag,
  Plus,
  Trash2,
  Check,
  Copy,
  CheckCheck,
  Milk,
  Wheat,
  Apple,
  Package,
} from 'lucide-react';

interface Props {
  items: ShoppingItem[];
  language: Language;
  onToggleComplete: (id: string) => void;
  onAddItem: (item: Omit<ShoppingItem, 'id'>) => void;
  onRemoveItem: (id: string) => void;
  onClearCompleted: () => void;
  onClearAll: () => void;
}

export const ShoppingListView: React.FC<Props> = ({
  items,
  language,
  onToggleComplete,
  onAddItem,
  onRemoveItem,
  onClearCompleted,
  onClearAll,
}) => {
  const t = translations[language];

  const [newItemName, setNewItemName] = useState('');
  const [newItemAmount, setNewItemAmount] = useState('1 item');
  const [newItemCategory, setNewItemCategory] = useState<ShoppingItem['category']>('baking');
  const [copied, setCopied] = useState(false);

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim()) return;

    onAddItem({
      name: newItemName.trim(),
      amount: newItemAmount.trim() || '1 item',
      category: newItemCategory,
      completed: false,
    });
    setNewItemName('');
  };

  const copyToClipboard = () => {
    if (items.length === 0) return;
    const text = items
      .map(
        (i) =>
          `${i.completed ? '☑' : '☐'} ${i.name} (${i.amount})${
            i.recipeTitle ? ` [from ${i.recipeTitle}]` : ''
          }`
      )
      .join('\n');
    navigator.clipboard.writeText(`🛒 DolceVita Baking Shopping List:\n\n${text}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const completedCount = items.filter((i) => i.completed).length;

  const categories: { key: ShoppingItem['category']; label: string; icon: any }[] = [
    { key: 'dairy', label: 'Dairy & Refrigerated', icon: Milk },
    { key: 'baking', label: 'Flours, Sugars & Cocoa', icon: Wheat },
    { key: 'produce', label: 'Fresh Fruits & Herbs', icon: Apple },
    { key: 'pantry', label: 'Pantry, Biscuits & Spices', icon: Package },
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner & Summary */}
      <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-5 sm:p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-1">
            <ShoppingBag className="w-4 h-4" />
            <span>Smart Grocery Assistant</span>
          </div>
          <h2 className="text-xl font-bold font-display text-stone-900 dark:text-stone-100">
            {t.shoppingListTitle}
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            <span className="font-semibold tabular-nums">{items.length - completedCount}</span> items pending ·{' '}
            <span className="font-semibold tabular-nums">{completedCount}</span> completed
          </p>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={copyToClipboard}
            disabled={items.length === 0}
            className="flex-1 sm:flex-initial px-3.5 py-2 rounded-xl border border-stone-200 dark:border-stone-700 hover:bg-stone-50 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors disabled:opacity-40"
          >
            {copied ? (
              <>
                <CheckCheck className="w-4 h-4 text-emerald-600" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>{t.shareList}</span>
              </>
            )}
          </button>

          {completedCount > 0 && (
            <button
              onClick={onClearCompleted}
              className="px-3.5 py-2 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>{t.clearCompleted}</span>
            </button>
          )}

          {items.length > 0 && (
            <button
              onClick={onClearAll}
              className="p-2 rounded-xl text-stone-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
              title="Clear all items"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Add Custom Item Form */}
      <form
        onSubmit={handleAddSubmit}
        className="bg-stone-50 dark:bg-stone-800/60 p-4 rounded-2xl border border-stone-200/80 dark:border-stone-700/60 flex flex-wrap sm:flex-nowrap items-center gap-2.5"
      >
        <input
          type="text"
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
          placeholder={t.addCustomItem}
          className="flex-1 min-w-[200px] h-10 px-3 rounded-xl border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-800 text-xs text-stone-900 dark:text-stone-100 focus:outline-none focus:border-amber-500"
        />

        <input
          type="text"
          value={newItemAmount}
          onChange={(e) => setNewItemAmount(e.target.value)}
          placeholder="Qty (e.g. 200g)"
          className="w-28 h-10 px-3 rounded-xl border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-800 text-xs text-stone-900 dark:text-stone-100 focus:outline-none focus:border-amber-500"
        />

        <select
          value={newItemCategory}
          onChange={(e) => setNewItemCategory(e.target.value as any)}
          className="h-10 px-3 rounded-xl border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-800 text-xs text-stone-900 dark:text-stone-100 focus:outline-none focus:border-amber-500"
        >
          <option value="dairy">Dairy</option>
          <option value="baking">Baking</option>
          <option value="produce">Produce</option>
          <option value="pantry">Pantry</option>
        </select>

        <button
          type="submit"
          className="h-10 px-4 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-sm shadow-amber-600/20 active:scale-95 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add</span>
        </button>
      </form>

      {/* Categorized List */}
      {items.length === 0 ? (
        <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-12 text-center">
          <ShoppingBag className="w-12 h-12 text-stone-300 dark:text-stone-600 mx-auto mb-3" />
          <h3 className="text-base font-bold font-display text-stone-800 dark:text-stone-200 mb-1">
            {t.emptyShoppingList}
          </h3>
          <p className="text-xs text-stone-500 max-w-sm mx-auto">
            Open any Western dessert recipe and click "Add Ingredients to Shopping List" or use the Weekly Meal Planner to populate this list.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {categories.map((cat) => {
            const catItems = items.filter((i) => i.category === cat.key);
            if (catItems.length === 0) return null;
            const Icon = cat.icon;

            return (
              <div
                key={cat.key}
                className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-4 shadow-sm"
              >
                <div className="flex items-center gap-2 mb-3 pb-2 border-b border-stone-100 dark:border-stone-800">
                  <Icon className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  <span className="text-xs font-bold font-display uppercase tracking-wider text-stone-800 dark:text-stone-200">
                    {cat.label}
                  </span>
                  <span className="text-[11px] text-stone-400 ml-auto font-medium">
                    ({catItems.length})
                  </span>
                </div>

                <div className="space-y-2">
                  {catItems.map((item) => (
                    <div
                      key={item.id}
                      className={`p-2.5 rounded-xl border flex items-center justify-between gap-3 transition-all ${
                        item.completed
                          ? 'bg-stone-50 dark:bg-stone-800/30 border-stone-200/60 dark:border-stone-800/60 opacity-60'
                          : 'bg-white dark:bg-stone-800/50 border-stone-200/80 dark:border-stone-700/80'
                      }`}
                    >
                      <div
                        onClick={() => onToggleComplete(item.id)}
                        className="flex items-center gap-2.5 flex-1 min-w-0 cursor-pointer"
                      >
                        <div
                          className={`w-4 h-4 rounded-md border flex items-center justify-center shrink-0 transition-colors ${
                            item.completed
                              ? 'bg-amber-600 border-amber-600 text-white'
                              : 'border-stone-300 dark:border-stone-600'
                          }`}
                        >
                          {item.completed && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <div className="min-w-0">
                          <span
                            className={`text-xs font-medium block truncate ${
                              item.completed
                                ? 'line-through text-stone-400'
                                : 'text-stone-800 dark:text-stone-200'
                            }`}
                          >
                            {item.name}
                          </span>
                          {item.recipeTitle && (
                            <span className="text-[10px] text-stone-400 block truncate">
                              For: {item.recipeTitle}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-xs font-semibold text-amber-700 dark:text-amber-400 tabular-nums">
                          {item.amount}
                        </span>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="w-6 h-6 rounded-lg text-stone-400 hover:text-rose-500 hover:bg-stone-100 dark:hover:bg-stone-700 flex items-center justify-center transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

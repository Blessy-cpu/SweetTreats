import React from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { Cake, CalendarDays, ShoppingBag, ArrowLeftRight, Heart } from 'lucide-react';

export type TabKey = 'recipes' | 'planner' | 'shopping' | 'substitutions' | 'favorites';

interface Props {
  activeTab: TabKey;
  onTabChange: (tab: TabKey) => void;
  language: Language;
  shoppingCount?: number;
  favoritesCount?: number;
}

export const BottomNavBar: React.FC<Props> = ({
  activeTab,
  onTabChange,
  language,
  shoppingCount = 0,
  favoritesCount = 0,
}) => {
  const t = translations[language];

  const items = [
    {
      id: 'recipes' as TabKey,
      label: t.home,
      icon: Cake,
    },
    {
      id: 'planner' as TabKey,
      label: t.mealPlanner,
      icon: CalendarDays,
    },
    {
      id: 'shopping' as TabKey,
      label: t.shoppingList,
      icon: ShoppingBag,
      badge: shoppingCount > 0 ? shoppingCount : undefined,
    },
    {
      id: 'substitutions' as TabKey,
      label: t.substitutions,
      icon: ArrowLeftRight,
    },
    {
      id: 'favorites' as TabKey,
      label: t.favorites,
      icon: Heart,
      badge: favoritesCount > 0 ? favoritesCount : undefined,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-stone-900/95 backdrop-blur-md border-t border-stone-200 dark:border-stone-800 shadow-lg transition-colors">
      <div className="max-w-md mx-auto grid grid-cols-5 h-16 items-center px-1">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`flex flex-col items-center justify-center py-1 relative min-h-[44px] transition-all ${
                isActive
                  ? 'text-amber-600 dark:text-amber-400 font-semibold'
                  : 'text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200'
              }`}
            >
              <div className="relative">
                <div
                  className={`p-1 rounded-full transition-colors ${
                    isActive ? 'bg-amber-100 dark:bg-amber-950/80' : ''
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.3]' : 'stroke-[1.8]'}`} />
                </div>
                {item.badge !== undefined && (
                  <span className="absolute -top-1 -right-2 bg-amber-600 text-white text-[10px] font-bold rounded-full min-w-[16px] h-4 flex items-center justify-center px-1">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] tracking-tight mt-0.5 truncate max-w-[64px]">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

import React from 'react';
import { ScreenState, Language } from '../types';
import { translations } from '../data/translations';
import { CheckCircle2, Loader2, AlertCircle, Inbox, ShieldCheck } from 'lucide-react';

interface Props {
  currentState: ScreenState;
  onStateChange: (state: ScreenState) => void;
  language: Language;
}

export const StateIndicatorBanner: React.FC<Props> = ({
  currentState,
  onStateChange,
  language,
}) => {
  const t = translations[language];

  return (
    <div className="bg-stone-900 text-stone-200 px-3 py-2 text-xs flex flex-wrap items-center justify-between gap-2 border-b border-stone-800">
      <div className="flex items-center gap-1.5 font-medium text-amber-400">
        <ShieldCheck className="w-3.5 h-3.5" />
        <span>IITM Pravartak / KHIT Rubric (GP 3):</span>
        <span className="text-stone-400 hidden sm:inline">Screen States Simulator</span>
      </div>

      <div className="flex items-center gap-1 bg-stone-800/80 p-0.5 rounded-lg border border-stone-700">
        <button
          onClick={() => onStateChange('data')}
          className={`px-2 py-1 rounded text-xs flex items-center gap-1 transition-colors ${
            currentState === 'data'
              ? 'bg-amber-600 text-white font-semibold'
              : 'text-stone-300 hover:text-white'
          }`}
          title="Show regular loaded data"
        >
          <CheckCircle2 className="w-3 h-3" />
          <span>{t.screenStates.normal}</span>
        </button>

        <button
          onClick={() => onStateChange('loading')}
          className={`px-2 py-1 rounded text-xs flex items-center gap-1 transition-colors ${
            currentState === 'loading'
              ? 'bg-amber-600 text-white font-semibold'
              : 'text-stone-300 hover:text-white'
          }`}
          title="Show loading skeleton state"
        >
          <Loader2 className={`w-3 h-3 ${currentState === 'loading' ? 'animate-spin' : ''}`} />
          <span>{t.screenStates.loading}</span>
        </button>

        <button
          onClick={() => onStateChange('error')}
          className={`px-2 py-1 rounded text-xs flex items-center gap-1 transition-colors ${
            currentState === 'error'
              ? 'bg-rose-600 text-white font-semibold'
              : 'text-stone-300 hover:text-white'
          }`}
          title="Show network error state with retry"
        >
          <AlertCircle className="w-3 h-3" />
          <span>{t.screenStates.error}</span>
        </button>

        <button
          onClick={() => onStateChange('empty')}
          className={`px-2 py-1 rounded text-xs flex items-center gap-1 transition-colors ${
            currentState === 'empty'
              ? 'bg-amber-600 text-white font-semibold'
              : 'text-stone-300 hover:text-white'
          }`}
          title="Show empty state"
        >
          <Inbox className="w-3 h-3" />
          <span>{t.screenStates.empty}</span>
        </button>
      </div>
    </div>
  );
};

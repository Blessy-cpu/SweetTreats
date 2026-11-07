import React, { useState } from 'react';
import { Language, ThemeSeed } from '../types';
import { translations } from '../data/translations';
import {
  Mic,
  Moon,
  Sun,
  Globe,
  Smartphone,
  Monitor,
  Code2,
  User,
  Palette,
  Sparkles,
  ChevronDown,
} from 'lucide-react';

interface Props {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  seedColor: ThemeSeed;
  onSeedColorChange: (seed: ThemeSeed) => void;
  isMobileFrame: boolean;
  onToggleDeviceFrame: () => void;
  onOpenVoiceCommand: () => void;
  onOpenFlutterCode: () => void;
  onOpenLogin: () => void;
  userName?: string;
  isLoggedIn: boolean;
}

export const TopAppBar: React.FC<Props> = ({
  language,
  onLanguageChange,
  isDarkMode,
  onToggleDarkMode,
  seedColor,
  onSeedColorChange,
  isMobileFrame,
  onToggleDeviceFrame,
  onOpenVoiceCommand,
  onOpenFlutterCode,
  onOpenLogin,
  userName,
  isLoggedIn,
}) => {
  const t = translations[language];
  const [showColorMenu, setShowColorMenu] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);

  const seedColors: { id: ThemeSeed; label: string; bg: string }[] = [
    { id: 'amber', label: 'Caramel Amber', bg: 'bg-amber-500' },
    { id: 'rose', label: 'Berry Rose', bg: 'bg-rose-500' },
    { id: 'emerald', label: 'Mint Pistachio', bg: 'bg-emerald-500' },
    { id: 'violet', label: 'Plum Vanilla', bg: 'bg-purple-500' },
    { id: 'chocolate', label: 'Dark Cocoa', bg: 'bg-amber-800' },
  ];

  const currentSeed = seedColors.find((s) => s.id === seedColor) || seedColors[0];

  return (
    <header className="sticky top-0 z-30 bg-white/95 dark:bg-stone-900/95 backdrop-blur-md border-b border-stone-200 dark:border-stone-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Brand Zone */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-600 to-amber-400 dark:from-amber-700 dark:to-amber-500 flex items-center justify-center text-white shadow-sm shadow-amber-500/20">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold font-display tracking-tight text-stone-900 dark:text-stone-100">
                {t.appName}
              </span>
              <span className="text-[10px] uppercase tracking-wider font-semibold px-1.5 py-0.5 rounded bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-900/50">
                Flutter M3
              </span>
            </div>
            <p className="text-[11px] text-stone-500 dark:text-stone-400 hidden md:block">
              {t.appTagline}
            </p>
          </div>
        </div>

        {/* Center / Actions Zone */}
        <div className="flex items-center gap-2">
          {/* Trilingual Language Selector */}
          <div className="relative">
            <button
              onClick={() => {
                setShowLangMenu(!showLangMenu);
                setShowColorMenu(false);
              }}
              className="h-9 px-2.5 rounded-lg border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-700 dark:text-stone-200 text-xs font-medium flex items-center gap-1.5 hover:bg-stone-100 dark:hover:bg-stone-700/60 transition-colors"
              title="Change Language"
            >
              <Globe className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span className="font-semibold uppercase">{language}</span>
              <ChevronDown className="w-3 h-3 text-stone-400" />
            </button>

            {showLangMenu && (
              <div className="absolute right-0 mt-1.5 w-40 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl shadow-xl py-1 z-50 animate-in fade-in zoom-in-95 duration-100">
                <button
                  onClick={() => {
                    onLanguageChange('en');
                    setShowLangMenu(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-stone-50 dark:hover:bg-stone-700/50 ${
                    language === 'en' ? 'font-bold text-amber-600 dark:text-amber-400' : 'text-stone-700 dark:text-stone-300'
                  }`}
                >
                  <span>English</span>
                  <span className="text-[10px] text-stone-400">EN</span>
                </button>
                <button
                  onClick={() => {
                    onLanguageChange('hi');
                    setShowLangMenu(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-stone-50 dark:hover:bg-stone-700/50 ${
                    language === 'hi' ? 'font-bold text-amber-600 dark:text-amber-400' : 'text-stone-700 dark:text-stone-300'
                  }`}
                >
                  <span>हिन्दी (Hindi)</span>
                  <span className="text-[10px] text-stone-400">HI</span>
                </button>
                <button
                  onClick={() => {
                    onLanguageChange('te');
                    setShowLangMenu(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-stone-50 dark:hover:bg-stone-700/50 ${
                    language === 'te' ? 'font-bold text-amber-600 dark:text-amber-400' : 'text-stone-700 dark:text-stone-300'
                  }`}
                >
                  <span>తెలుగు (Telugu)</span>
                  <span className="text-[10px] text-stone-400">TE</span>
                </button>
              </div>
            )}
          </div>

          {/* Seed Color Selector (Flutter GP 7 compliance) */}
          <div className="relative hidden sm:block">
            <button
              onClick={() => {
                setShowColorMenu(!showColorMenu);
                setShowLangMenu(false);
              }}
              className="h-9 px-2.5 rounded-lg border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-700 dark:text-stone-200 text-xs font-medium flex items-center gap-1.5 hover:bg-stone-100 dark:hover:bg-stone-700/60 transition-colors"
              title="Material 3 Seed Color (GP 7)"
            >
              <Palette className="w-3.5 h-3.5 text-stone-500" />
              <span className={`w-2.5 h-2.5 rounded-full ${currentSeed.bg}`} />
              <ChevronDown className="w-3 h-3 text-stone-400" />
            </button>

            {showColorMenu && (
              <div className="absolute right-0 mt-1.5 w-44 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl shadow-xl p-2 z-50 animate-in fade-in zoom-in-95 duration-100">
                <div className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider mb-1.5 px-1">
                  M3 Seed Color
                </div>
                {seedColors.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => {
                      onSeedColorChange(s.id);
                      setShowColorMenu(false);
                    }}
                    className={`w-full text-left px-2 py-1.5 rounded-lg text-xs flex items-center gap-2 hover:bg-stone-50 dark:hover:bg-stone-700/50 ${
                      seedColor === s.id ? 'font-bold text-amber-600 dark:text-amber-400' : 'text-stone-700 dark:text-stone-300'
                    }`}
                  >
                    <span className={`w-3 h-3 rounded-full ${s.bg}`} />
                    <span>{s.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Voice Assistant Mic Button */}
          <button
            onClick={onOpenVoiceCommand}
            className="h-9 px-3 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm shadow-amber-500/20 active:scale-95 transition-all"
            title="Voice Commands"
          >
            <Mic className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Voice Assistant</span>
          </button>

          {/* Device Frame View Toggle (Mobile vs Flutter Web) */}
          <button
            onClick={onToggleDeviceFrame}
            className="h-9 px-2.5 rounded-lg border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-700 dark:text-stone-200 text-xs font-medium flex items-center gap-1 hover:bg-stone-100 dark:hover:bg-stone-700/60 transition-colors"
            title={isMobileFrame ? 'Switch to Flutter Web Fullscreen' : 'Switch to Mobile Phone View'}
          >
            {isMobileFrame ? (
              <>
                <Monitor className="w-3.5 h-3.5 text-stone-500" />
                <span className="hidden md:inline">Web View</span>
              </>
            ) : (
              <>
                <Smartphone className="w-3.5 h-3.5 text-stone-500" />
                <span className="hidden md:inline">Phone View</span>
              </>
            )}
          </button>

          {/* Dark Mode Toggle */}
          <button
            onClick={onToggleDarkMode}
            className="h-9 w-9 rounded-lg border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-700 dark:text-stone-200 flex items-center justify-center hover:bg-stone-100 dark:hover:bg-stone-700/60 transition-colors"
            title="Toggle Light/Dark Theme"
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-stone-600" />}
          </button>

          {/* Flutter Code Pack & Rubric Submission Modal Trigger */}
          <button
            onClick={onOpenFlutterCode}
            className="h-9 px-3 rounded-lg bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-xs font-semibold flex items-center gap-1.5 hover:bg-stone-800 dark:hover:bg-white active:scale-95 transition-all"
            title="View Complete Flutter Dart Source & IITM Submission Pack"
          >
            <Code2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Flutter Project & Code</span>
          </button>

          {/* User Account / Firebase Login Portal */}
          <button
            onClick={onOpenLogin}
            className="h-9 px-2.5 rounded-lg border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-700 dark:text-stone-200 text-xs font-medium flex items-center gap-1.5 hover:bg-stone-100 dark:hover:bg-stone-700/60 transition-colors"
            title="Login Portal / Firebase User"
          >
            <User className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            <span className="hidden lg:inline truncate max-w-[90px]">
              {isLoggedIn ? (userName || 'Evaluator') : t.login}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};

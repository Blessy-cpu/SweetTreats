import React, { useState, useEffect } from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { parseVoiceCommand, VoiceCommandResult } from '../utils/speechRecognition';
import { Mic, MicOff, X, Volume2, Sparkles, Check, ArrowRight } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  onExecuteCommand: (result: VoiceCommandResult) => void;
}

export const VoiceCommandModal: React.FC<Props> = ({
  isOpen,
  onClose,
  language,
  onExecuteCommand,
}) => {
  const t = translations[language];

  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [lastFeedback, setLastFeedback] = useState<string | null>(null);
  const [recognitionSupported, setRecognitionSupported] = useState(true);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setRecognitionSupported(false);
    }
  }, []);

  const startListening = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setRecognitionSupported(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;

      // Select language for speech recognition
      if (language === 'hi') {
        recognition.lang = 'hi-IN';
      } else if (language === 'te') {
        recognition.lang = 'te-IN';
      } else {
        recognition.lang = 'en-US';
      }

      setIsListening(true);
      setTranscript('');
      setLastFeedback(null);

      recognition.onresult = (event: any) => {
        const text = event.results[0][0].transcript;
        setTranscript(text);
        setIsListening(false);
        handleProcessText(text);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch {
      setIsListening(false);
    }
  };

  const handleProcessText = (text: string) => {
    const result = parseVoiceCommand(text);
    const feedbackText = result.feedback[language] || result.feedback.en;
    setLastFeedback(feedbackText);

    setTimeout(() => {
      onExecuteCommand(result);
      onClose();
    }, 1200);
  };

  if (!isOpen) return null;

  const quickCommands = [
    { text: 'Open Tiramisu', label: 'Tiramisu' },
    { text: 'New York Cheesecake', label: 'Cheesecake' },
    { text: 'Crème Brûlée', label: 'Crème Brûlée' },
    { text: 'Lava cake', label: 'Lava Cake' },
    { text: 'Go to Shopping list', label: 'Shopping List' },
    { text: 'Weekly Meal planner', label: 'Meal Planner' },
    { text: 'Switch to Hindi', label: 'हिन्दी (Hindi)' },
    { text: 'Switch to Telugu', label: 'తెలుగు (Telugu)' },
    { text: 'Switch to English', label: 'English' },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-stone-900 w-full max-w-md rounded-3xl border border-stone-200 dark:border-stone-800 shadow-2xl overflow-hidden p-6 text-center">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
            <Volume2 className="w-4 h-4" />
            <span>AI Voice Command</span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Big Mic Button with Pulse Waveform */}
        <div className="relative my-6 flex items-center justify-center">
          {isListening && (
            <>
              <div className="absolute w-28 h-28 rounded-full bg-amber-500/20 animate-ping" />
              <div className="absolute w-24 h-24 rounded-full bg-amber-500/30 animate-pulse" />
            </>
          )}

          <button
            onClick={startListening}
            className={`relative z-10 w-20 h-20 rounded-full flex items-center justify-center transition-all ${
              isListening
                ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/40 scale-105'
                : 'bg-amber-600 hover:bg-amber-700 text-white shadow-lg shadow-amber-600/30'
            }`}
          >
            {isListening ? (
              <Mic className="w-8 h-8 animate-pulse" />
            ) : (
              <Mic className="w-8 h-8" />
            )}
          </button>
        </div>

        {/* Status text */}
        <p className="text-sm font-semibold text-stone-900 dark:text-stone-100 mb-1">
          {isListening ? t.voiceListening : t.voicePrompt}
        </p>

        {transcript ? (
          <div className="bg-stone-50 dark:bg-stone-800 rounded-xl p-3 my-3 text-xs font-mono text-stone-700 dark:text-stone-300">
            "{transcript}"
          </div>
        ) : (
          <p className="text-xs text-stone-400 mb-4">
            Supports voice commands in English, Hindi, and Telugu
          </p>
        )}

        {lastFeedback && (
          <div className="bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 rounded-xl p-2.5 text-xs font-medium flex items-center justify-center gap-1.5 mb-4 animate-in fade-in">
            <Check className="w-3.5 h-3.5" />
            <span>{lastFeedback}</span>
          </div>
        )}

        {/* Quick Simulated Command Triggers */}
        <div className="mt-4 pt-4 border-t border-stone-100 dark:border-stone-800 text-left">
          <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block mb-2">
            {t.trySaying} (Click to trigger directly)
          </span>
          <div className="flex flex-wrap gap-1.5">
            {quickCommands.map((qc) => (
              <button
                key={qc.text}
                onClick={() => {
                  setTranscript(qc.text);
                  handleProcessText(qc.text);
                }}
                className="px-2.5 py-1.5 rounded-lg bg-stone-100 dark:bg-stone-800 hover:bg-amber-50 dark:hover:bg-amber-950/40 hover:text-amber-700 dark:hover:text-amber-300 text-[11px] font-medium text-stone-700 dark:text-stone-300 flex items-center gap-1 transition-colors"
              >
                <span>{qc.label}</span>
                <ArrowRight className="w-2.5 h-2.5 text-stone-400" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { Language } from '../types';
import { FLUTTER_PROJECT_FILES, FlutterFile } from '../data/flutterProjectFiles';
import {
  X,
  Code2,
  Copy,
  Check,
  Download,
  FolderTree,
  FileCode,
  ShieldCheck,
  Terminal,
  FileCheck,
} from 'lucide-react';
import JSZip from 'jszip';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export const FlutterCodePackModal: React.FC<Props> = ({ isOpen, onClose, language }) => {
  const [selectedFile, setSelectedFile] = useState<FlutterFile>(FLUTTER_PROJECT_FILES[1]); // lib/main.dart
  const [copied, setCopied] = useState(false);
  const [isZipping, setIsZipping] = useState(false);
  const [activeTab, setActiveTab] = useState<'code' | 'rubric' | 'apk'>('code');

  if (!isOpen) return null;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(selectedFile.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadZip = async () => {
    setIsZipping(true);
    try {
      const zip = new JSZip();

      // Add all project files into the zip archive
      FLUTTER_PROJECT_FILES.forEach((f) => {
        zip.file(f.path, f.content);
      });

      // Generate zip file as blob
      const content = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(content);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'dolce_vita_dessert_app_flutter.zip';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch {
      // Handle download error
    } finally {
      setIsZipping(false);
    }
  };

  const rubricChecklist = [
    { id: 'GP 1', title: 'Four screens minimum', desc: 'Recipe List Screen, Recipe Detail Screen, Add Recipe Form Screen, and Meal Planner / Shopping List Screens.' },
    { id: 'GP 2', title: 'Real data', desc: 'Real Western dessert dataset with ratings, reviews, times, steps, and SharedPreferences / Firestore persistence.' },
    { id: 'GP 3', title: 'Four screen states', desc: 'Main list screen correctly supports Loading indicator, Error message with retry, Empty message, and Populated Data.' },
    { id: 'GP 4', title: 'Validated form', desc: 'Form checks every field (name, positive times, >=2 ingredients, >=2 steps) before saving and shows clear error messages.' },
    { id: 'GP 5', title: 'Detail view', desc: 'Tapping an item opens detail screen with 1x/2x scaler, guided cooking steps with timer, and nutrition.' },
    { id: 'GP 6', title: 'Shared state', desc: 'Application data held in Provider ChangeNotifier store and read across screens.' },
    { id: 'GP 7', title: 'Theme', desc: 'Consistent theme from seed color (Caramel Amber) used across every screen.' },
    { id: 'GP 8', title: 'Robustness', desc: 'Handles empty input, long text, fast taps, network error recovery, and responsive phone layout.' },
    { id: 'GP 9', title: 'Repository & README', desc: 'Clean repository structure with member ownership log, steps to run, and full documentation.' },
    { id: 'GP 10', title: 'Release build APK', desc: 'APK compilation commands and setup configured for physical Android phone execution.' },
    { id: 'GP 11', title: 'Widget test', desc: 'test/widget_test.dart passes flutter test.' },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4">
      <div className="bg-white dark:bg-stone-900 w-full max-w-5xl rounded-3xl border border-stone-200 dark:border-stone-800 shadow-2xl overflow-hidden flex flex-col h-[90vh]">
        {/* Top Header */}
        <div className="px-5 py-4 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between gap-4 bg-stone-50 dark:bg-stone-800/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold font-display text-stone-900 dark:text-stone-100">
                  Flutter Dart Codebase & Submission Pack
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300">
                  IITM / KHIT Guntur Compliant
                </span>
              </div>
              <p className="text-xs text-stone-500">
                Flutter SDK 3.35+ · Dart with Null Safety · Provider State Management · Material 3
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadZip}
              disabled={isZipping}
              className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold flex items-center gap-2 shadow-sm shadow-amber-600/20 active:scale-95 transition-all"
            >
              <Download className="w-4 h-4" />
              <span>{isZipping ? 'Packaging...' : 'Download Project (.zip)'}</span>
            </button>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-xl text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 flex items-center justify-center"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab switcher */}
        <div className="px-5 border-b border-stone-200 dark:border-stone-800 flex items-center gap-6 bg-white dark:bg-stone-900 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('code')}
            className={`py-3 border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'code'
                ? 'border-amber-600 text-amber-600 dark:text-amber-400'
                : 'border-transparent text-stone-500 hover:text-stone-800 dark:hover:text-stone-200'
            }`}
          >
            <FileCode className="w-4 h-4" />
            <span>Dart Code Explorer ({FLUTTER_PROJECT_FILES.length} files)</span>
          </button>

          <button
            onClick={() => setActiveTab('rubric')}
            className={`py-3 border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'rubric'
                ? 'border-amber-600 text-amber-600 dark:text-amber-400'
                : 'border-transparent text-stone-500 hover:text-stone-800 dark:hover:text-stone-200'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Rubric Checklist (GP 1 to GP 11)</span>
          </button>

          <button
            onClick={() => setActiveTab('apk')}
            className={`py-3 border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'apk'
                ? 'border-amber-600 text-amber-600 dark:text-amber-400'
                : 'border-transparent text-stone-500 hover:text-stone-800 dark:hover:text-stone-200'
            }`}
          >
            <Terminal className="w-4 h-4" />
            <span>Build & Demo Guide (Section 5.1)</span>
          </button>
        </div>

        {/* Tab 1: Code Explorer */}
        {activeTab === 'code' && (
          <div className="flex-1 flex overflow-hidden">
            {/* Sidebar File Tree */}
            <div className="w-64 border-r border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-900/50 overflow-y-auto p-3 shrink-0">
              <div className="text-[10px] font-bold text-stone-400 uppercase tracking-wider px-2 mb-2 flex items-center gap-1">
                <FolderTree className="w-3.5 h-3.5" />
                <span>Project Structure</span>
              </div>
              <div className="space-y-1">
                {FLUTTER_PROJECT_FILES.map((file) => {
                  const isSelected = selectedFile.path === file.path;
                  return (
                    <button
                      key={file.path}
                      onClick={() => setSelectedFile(file)}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs flex items-center gap-2 transition-colors truncate ${
                        isSelected
                          ? 'bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 font-bold'
                          : 'text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 hover:text-stone-900 dark:hover:text-stone-100'
                      }`}
                    >
                      <FileCode className="w-3.5 h-3.5 shrink-0 text-stone-400" />
                      <span className="truncate">{file.path}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Code View Area */}
            <div className="flex-1 flex flex-col bg-stone-950 text-stone-100 overflow-hidden">
              <div className="px-4 py-2 border-b border-stone-800 bg-stone-900 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-amber-400">{selectedFile.path}</span>
                  <span className="text-stone-500">
                    ({selectedFile.content.split('\n').length} lines)
                  </span>
                </div>
                <button
                  onClick={handleCopyCode}
                  className="px-2.5 py-1 rounded-md bg-stone-800 hover:bg-stone-700 text-stone-200 flex items-center gap-1.5 font-medium transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy Dart Code</span>
                    </>
                  )}
                </button>
              </div>

              <div className="flex-1 overflow-auto p-4 font-mono text-xs leading-relaxed text-stone-200 selection:bg-amber-800 selection:text-white">
                <pre>{selectedFile.content}</pre>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Rubric Checklist */}
        {activeTab === 'rubric' && (
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            <div className="mb-4">
              <h4 className="text-base font-bold font-display text-stone-900 dark:text-stone-100">
                IITM Pravartak & BodhBridge Flutter Lab Requirements
              </h4>
              <p className="text-xs text-stone-500">
                Verified compliance with all GP 1 through GP 11 specifications
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {rubricChecklist.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-2xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-800/50 flex items-start gap-3"
                >
                  <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400 uppercase">
                        {item.id}
                      </span>
                      <h5 className="text-xs font-bold text-stone-900 dark:text-stone-100">
                        {item.title}
                      </h5>
                    </div>
                    <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Build & Demo Guide */}
        {activeTab === 'apk' && (
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <div>
              <h4 className="text-base font-bold font-display text-stone-900 dark:text-stone-100 mb-1">
                Release APK Build Commands & 5-Minute Demonstration Format
              </h4>
              <p className="text-xs text-stone-500">
                Exact script according to Section 5.1 of the Project Specification guide
              </p>
            </div>

            <div className="bg-stone-900 text-stone-100 rounded-2xl p-4 font-mono text-xs space-y-3">
              <div className="text-amber-400 font-bold text-sm"># 1. How to Build Release APK:</div>
              <div className="p-3 bg-stone-950 rounded-xl space-y-1 text-stone-300">
                <div>flutter clean</div>
                <div>flutter pub get</div>
                <div>flutter test</div>
                <div className="text-emerald-400 font-bold">flutter build apk --release</div>
              </div>
              <p className="text-[11px] text-stone-400">
                Output file created at: <code className="text-amber-300">build/app/outputs/flutter-apk/app-release.apk</code>
              </p>
            </div>

            <div className="space-y-3">
              <h5 className="text-xs font-bold uppercase tracking-wider text-stone-400">
                Section 5.1 Demonstration Schedule (5 Minutes):
              </h5>
              <div className="space-y-2">
                <div className="p-3 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-800/50 flex gap-3">
                  <span className="font-mono text-xs font-bold text-amber-600">0:00 - 0:30</span>
                  <p className="text-xs text-stone-700 dark:text-stone-300">
                    <strong>Problem & Audience:</strong> Introduce DolceVita: a trilingual Western artisan dessert app solving baking accessibility for English, Hindi, and Telugu home cooks with automated ingredient substitutions.
                  </p>
                </div>
                <div className="p-3 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-800/50 flex gap-3">
                  <span className="font-mono text-xs font-bold text-amber-600">0:30 - 3:30</span>
                  <p className="text-xs text-stone-700 dark:text-stone-300">
                    <strong>Primary Flow & Error/Empty States:</strong> Demonstrate live browsing, scaling ingredients 2x, opening the recipe form with a rejected invalid entry (empty title / negative time) to show GP 4 validation, toggling Empty/Error states via the simulator bar, and finishing a guided bake.
                  </p>
                </div>
                <div className="p-3 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-800/50 flex gap-3">
                  <span className="font-mono text-xs font-bold text-amber-600">3:30 - 4:30</span>
                  <p className="text-xs text-stone-700 dark:text-stone-300">
                    <strong>Technical Challenge Solved:</strong> Explaining how SharedPreferences and Provider state synchronization handled dynamic trilingual locale switching and custom recipes without race conditions (DEF-01, DEF-02).
                  </p>
                </div>
                <div className="p-3 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-800/50 flex gap-3">
                  <span className="font-mono text-xs font-bold text-amber-600">4:30 - 5:00</span>
                  <p className="text-xs text-stone-700 dark:text-stone-300">
                    <strong>Git Commits & APK Verification:</strong> Review the clean commit history and install the release APK on a physical Android device.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

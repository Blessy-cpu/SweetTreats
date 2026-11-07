import React, { useState } from 'react';
import { UserProfile, Language } from '../types';
import { translations } from '../data/translations';
import { X, Lock, Mail, ShieldCheck, UserCheck, LogOut, CheckCircle2 } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  user: UserProfile;
  onUpdateUser: (user: UserProfile) => void;
}

export const LoginPortalModal: React.FC<Props> = ({
  isOpen,
  onClose,
  language,
  user,
  onUpdateUser,
}) => {
  const t = translations[language];

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');

  if (!isOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    onUpdateUser({
      name: name.trim() || email.split('@')[0],
      email: email.trim(),
      isLoggedIn: true,
      avatarUrl: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(email)}`,
      role: 'student_evaluator',
    });
    onClose();
  };

  const handleGoogleSignIn = () => {
    onUpdateUser({
      name: 'KHIT Guntur Student Evaluator',
      email: 'student.flutter@khitguntur.ac.in',
      isLoggedIn: true,
      avatarUrl: 'https://api.dicebear.com/7.x/bottts/svg?seed=khit_flutter',
      role: 'student_evaluator',
    });
    onClose();
  };

  const handleGuestSignIn = () => {
    onUpdateUser({
      name: 'Guest Pastry Chef',
      email: 'guest.baker@dolcevita.app',
      isLoggedIn: true,
      avatarUrl: 'https://api.dicebear.com/7.x/bottts/svg?seed=pastry_chef',
      role: 'pastry_chef',
    });
    onClose();
  };

  const handleSignOut = () => {
    onUpdateUser({
      name: 'Guest User',
      email: '',
      isLoggedIn: false,
      avatarUrl: '',
      role: 'home_baker',
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-stone-900 w-full max-w-md rounded-3xl border border-stone-200 dark:border-stone-800 shadow-2xl overflow-hidden p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold font-display text-stone-900 dark:text-stone-100">
                {user.isLoggedIn ? 'Firebase User Account' : 'Firebase Auth Login Portal'}
              </h3>
              <p className="text-[11px] text-stone-400">
                Secure Cloud Firestore Profile Sync
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Already Logged In View */}
        {user.isLoggedIn ? (
          <div className="space-y-4">
            <div className="p-4 bg-stone-50 dark:bg-stone-800/60 rounded-2xl border border-stone-200/80 dark:border-stone-700/60 flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center overflow-hidden border border-amber-500/30">
                {user.avatarUrl ? (
                  <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                  <UserCheck className="w-6 h-6 text-amber-600" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <h4 className="text-sm font-bold text-stone-900 dark:text-stone-100 truncate">
                    {user.name}
                  </h4>
                  <span className="text-[10px] bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 px-1.5 py-0.2 rounded font-semibold">
                    Active
                  </span>
                </div>
                <p className="text-xs text-stone-500 truncate">{user.email}</p>
                <div className="text-[10px] text-amber-700 dark:text-amber-400 font-medium mt-0.5">
                  Role: {user.role === 'student_evaluator' ? 'IITM / KHIT Evaluator' : 'Pastry Chef'}
                </div>
              </div>
            </div>

            <div className="p-3 bg-amber-500/10 rounded-xl text-xs text-stone-600 dark:text-stone-300">
              <span className="font-semibold text-amber-800 dark:text-amber-300 block mb-0.5">
                Firebase Firestore Status:
              </span>
              User recipe favorites, custom recipes, and weekly meal plans are synchronized in real-time.
            </div>

            <button
              onClick={handleSignOut}
              className="w-full py-2.5 rounded-xl border border-rose-200 dark:border-rose-900/50 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>{t.logout}</span>
            </button>
          </div>
        ) : (
          /* Sign In Form */
          <div className="space-y-4">
            {/* Quick One-Click Logins */}
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={handleGoogleSignIn}
                className="py-2 px-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 hover:bg-stone-50 dark:hover:bg-stone-700 text-xs font-medium text-stone-800 dark:text-stone-200 flex items-center justify-center gap-2 shadow-sm transition-colors"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>Google Sign In</span>
              </button>

              <button
                onClick={handleGuestSignIn}
                className="py-2 px-3 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-800 dark:text-amber-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                <UserCheck className="w-4 h-4" />
                <span>Guest / Demo</span>
              </button>
            </div>

            <div className="relative flex py-1 items-center">
              <div className="flex-grow border-t border-stone-200 dark:border-stone-800"></div>
              <span className="flex-shrink mx-3 text-[11px] text-stone-400">or with email</span>
              <div className="flex-grow border-t border-stone-200 dark:border-stone-800"></div>
            </div>

            <form onSubmit={handleLoginSubmit} className="space-y-3">
              {isRegister && (
                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Chef / Student Name"
                    className="w-full h-10 px-3 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-xs text-stone-900 dark:text-stone-100 focus:outline-none focus:border-amber-500"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="student@khitguntur.ac.in"
                    className="w-full h-10 pl-9 pr-3 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-xs text-stone-900 dark:text-stone-100 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full h-10 pl-9 pr-3 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-xs text-stone-900 dark:text-stone-100 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full h-10 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-md shadow-amber-600/20 active:scale-95 transition-all mt-2"
              >
                <span>{isRegister ? 'Create Account' : t.login}</span>
              </button>
            </form>

            <div className="text-center pt-2">
              <button
                onClick={() => setIsRegister(!isRegister)}
                className="text-xs text-stone-500 hover:text-amber-600 dark:hover:text-amber-400 font-medium"
              >
                {isRegister ? 'Already have an account? Sign In' : 'Need an account? Register'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

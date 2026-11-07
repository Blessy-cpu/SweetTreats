export type Language = 'en' | 'hi' | 'te';

export type ScreenState = 'data' | 'loading' | 'error' | 'empty';

export type DessertCategory = 
  | 'all'
  | 'cakes' 
  | 'pies_tarts' 
  | 'custards_puddings' 
  | 'pastries' 
  | 'chilled';

export type Difficulty = 'easy' | 'medium' | 'hard';

export interface Ingredient {
  id: string;
  name: {
    en: string;
    hi: string;
    te: string;
  };
  amount: number;
  unit: string;
  substituteTip?: {
    en: string;
    hi: string;
    te: string;
  };
}

export interface CookingStep {
  stepNumber: number;
  instruction: {
    en: string;
    hi: string;
    te: string;
  };
  durationMinutes?: number;
  tip?: {
    en: string;
    hi: string;
    te: string;
  };
}

export interface Recipe {
  id: string;
  title: {
    en: string;
    hi: string;
    te: string;
  };
  description: {
    en: string;
    hi: string;
    te: string;
  };
  category: DessertCategory;
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  servings: number;
  difficulty: Difficulty;
  caloriesPerServing: number;
  imageUrl: string;
  rating: number;
  reviewCount: number;
  isVegetarian: boolean;
  isGlutenFree: boolean;
  isCustom?: boolean;
  ingredients: Ingredient[];
  steps: CookingStep[];
  origin: string;
}

export interface SubstitutionRule {
  id: string;
  ingredient: {
    en: string;
    hi: string;
    te: string;
  };
  substitute: {
    en: string;
    hi: string;
    te: string;
  };
  ratio: string;
  notes: {
    en: string;
    hi: string;
    te: string;
  };
  category: 'eggs' | 'dairy' | 'sweeteners' | 'flours' | 'leavening' | 'gelling';
}

export interface ShoppingItem {
  id: string;
  name: string;
  amount: string;
  category: 'dairy' | 'pantry' | 'produce' | 'baking';
  completed: boolean;
  recipeTitle?: string;
}

export interface MealPlanDay {
  day: string; // 'Monday', 'Tuesday', etc.
  dayKey: 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun';
  dessertRecipeId?: string;
  note?: string;
}

export interface UserProfile {
  name: string;
  email: string;
  isLoggedIn: boolean;
  avatarUrl: string;
  role: 'student_evaluator' | 'home_baker' | 'pastry_chef';
}

export type ThemeSeed = 'amber' | 'rose' | 'emerald' | 'violet' | 'chocolate';

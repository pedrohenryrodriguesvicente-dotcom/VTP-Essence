
export interface Chapter {
  id: number;
  titulo: string;
  contenido: string;
  resumen: string;
  puntos_clave: string[];
  checklist: string[];
}

export interface Recipe {
  id: number;
  titulo: string;
  categoria: 'Desayuno' | 'Almuerzo' | 'Cena' | 'Snack' | 'Batido';
  ingredientes: string[];
  pasos: string[];
  tiempo_min: number;
  calorias: number;
  tags: string[];
  imagen: string;
  fuente_url: string;
  dalle_prompt: string;
}

export interface FoodToAvoid {
    id: number;
    nombre: string;
    motivo: string;
    alternativa: string;
    fuente_url: string;
}

export interface FoodRecommended {
    id: number;
    nombre: string;
    descripcion: string;
    fuente_url: string;
}

export interface FoodInModeration {
    id: number;
    nombre: string;
    descripcion: string;
    fuente_url: string;
}

export interface MealPlanner {
    id: number;
    titulo: string;
    descripcion: string;
    objetivo: 'Pérdida de peso' | 'Mantenimiento' | 'Vegetariano' | 'Horario Ocupado';
    plan_semanal: {
        dia: string;
        comidas: {
            desayuno: number; // Recipe ID
            almuerzo: number; // Recipe ID
            cena: number; // Recipe ID
            snack?: number; // Recipe ID
        };
    }[];
}


export interface Habit {
    id: number;
    nombre: string;
    descripcion: string;
    meta_diaria: number; // e.g., 8 glasses of water
    unidad: string; // e.g., 'vasos'
}

export interface Challenge {
    id: number;
    titulo: string;
    dias: number;
    pasos_por_dia: string[];
}

export interface Tip {
    id: number;
    frase: string;
}

export interface ProgressEntry {
    fecha: string; // ISO date string
    peso_actual: number;
    habitos_cumplidos: { [key: number]: number }; // habitId: value
    comentarios?: string;
}

export interface ReminderSettings {
  enabled: boolean;
  time: string; // "HH:MM" format
}

export interface ShoppingItem {
  id: string;
  name: string;
  checked: boolean;
  category?: string;
}

export interface FastingState {
  isFasting: boolean;
  startTime: number | null; // Timestamp
  targetHours: number;
}

export interface HydrationState {
  currentMl: number;
  targetMl: number;
  lastUpdated: string; // Date string to reset daily
}

export interface ChatMessage {
    id: string;
    role: 'user' | 'model';
    text: string;
    timestamp: number;
}

export type Mood = 'Radiante' | 'Bien' | 'Cansada' | 'Estresada' | 'Triste';

export interface UserProfile {
  height: number; // cm
  gender: 'female' | 'male';
  age: number;
}

export type Page = 'Inicio' | 'VTP' | 'Programa' | 'Recetas' | 'Config' | 'Retos';
export type RecipeCategory = Recipe['categoria'] | 'Favoritos' | 'Todas';
export type GuideCategory = 'Recomendados' | 'Moderación' | 'A Evitar';
export type FilterCategory = RecipeCategory | 'Planes' | GuideCategory;

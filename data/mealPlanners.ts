import { MealPlanner } from '../types';

// Nota: Los IDs de las recetas corresponden a las recetas en `data/recipes.ts`
export const mealPlanners: MealPlanner[] = [
    {
        id: 1,
        titulo: 'Plan de Inicio para Pérdida de Peso',
        descripcion: 'Un plan equilibrado y saciante, rondando las 1500-1600 kcal diarias, ideal para empezar a perder peso de forma sostenible.',
        objetivo: 'Pérdida de peso',
        plan_semanal: [
            { dia: 'Lunes', comidas: { desayuno: 1, almuerzo: 22, cena: 33, snack: 42 } },
            { dia: 'Martes', comidas: { desayuno: 3, almuerzo: 23, cena: 31 } },
            { dia: 'Miércoles', comidas: { desayuno: 1, almuerzo: 21, cena: 32, snack: 41 } },
            { dia: 'Jueves', comidas: { desayuno: 2, almuerzo: 22, cena: 33 } },
            { dia: 'Viernes', comidas: { desayuno: 3, almuerzo: 23, cena: 31, snack: 42 } },
            { dia: 'Sábado', comidas: { desayuno: 1, almuerzo: 21, cena: 32 } },
            { dia: 'Domingo', comidas: { desayuno: 2, almuerzo: 23, cena: 31, snack: 41 } },
        ]
    },
    {
        id: 2,
        titulo: 'Plan Vegetariano Lleno de Energía',
        descripcion: 'Una semana de comidas vegetarianas deliciosas y nutritivas, ricas en proteínas vegetales y fibra.',
        objetivo: 'Vegetariano',
        plan_semanal: [
            { dia: 'Lunes', comidas: { desayuno: 2, almuerzo: 21, cena: 33, snack: 41 } },
            { dia: 'Martes', comidas: { desayuno: 1, almuerzo: 23, cena: 33 } }, // Cena repetida, común en planes
            { dia: 'Miércoles', comidas: { desayuno: 3, almuerzo: 21, cena: 23, snack: 42 } },
            { dia: 'Jueves', comidas: { desayuno: 2, almuerzo: 23, cena: 33 } },
            { dia: 'Viernes', comidas: { desayuno: 1, almuerzo: 21, cena: 23, snack: 41 } },
            { dia: 'Sábado', comidas: { desayuno: 3, almuerzo: 21, cena: 33 } },
            { dia: 'Domingo', comidas: { desayuno: 2, almuerzo: 23, cena: 21, snack: 42 } },
        ]
    },
    {
        id: 3,
        titulo: 'Plan Rápido para Semana Ocupada',
        descripcion: 'Recetas que requieren menos de 30 minutos de preparación, perfectas para cuando no tienes tiempo pero quieres comer bien.',
        objetivo: 'Horario Ocupado',
        plan_semanal: [
            { dia: 'Lunes', comidas: { desayuno: 1, almuerzo: 22, cena: 31, snack: 42 } },
            { dia: 'Martes', comidas: { desayuno: 3, almuerzo: 22, cena: 33 } },
            { dia: 'Miércoles', comidas: { desayuno: 12, almuerzo: 23, cena: 31, snack: 3 } },
            { dia: 'Jueves', comidas: { desayuno: 1, almuerzo: 22, cena: 33 } },
            { dia: 'Viernes', comidas: { desayuno: 11, almuerzo: 23, cena: 31, snack: 42 } },
            { dia: 'Sábado', comidas: { desayuno: 3, almuerzo: 22, cena: 33 } },
            { dia: 'Domingo', comidas: { desayuno: 1, almuerzo: 23, cena: 31, snack: 41 } },
        ]
    },
    {
        id: 4,
        titulo: 'Plan de Mantenimiento Ligero',
        descripcion: 'Un plan diseñado para mantener tu peso de forma saludable, con comidas equilibradas y porciones adecuadas.',
        objetivo: 'Mantenimiento',
        plan_semanal: [
            { dia: 'Lunes', comidas: { desayuno: 3, almuerzo: 21, cena: 32, snack: 42 } },
            { dia: 'Martes', comidas: { desayuno: 1, almuerzo: 22, cena: 31 } },
            { dia: 'Miércoles', comidas: { desayuno: 2, almuerzo: 23, cena: 33, snack: 41 } },
            { dia: 'Jueves', comidas: { desayuno: 3, almuerzo: 21, cena: 32 } },
            { dia: 'Viernes', comidas: { desayuno: 1, almuerzo: 22, cena: 31, snack: 42 } },
            { dia: 'Sábado', comidas: { desayuno: 2, almuerzo: 23, cena: 33 } },
            { dia: 'Domingo', comidas: { desayuno: 3, almuerzo: 21, cena: 31, snack: 41 } },
        ]
    }
];

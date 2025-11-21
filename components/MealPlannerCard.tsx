import React, { useState } from 'react';
import { MealPlanner, Recipe } from '../types';
import { recipes } from '../data/recipes';
import Card from './Card';
import { SparklesIcon } from './Icons';

interface MealPlannerCardProps {
    planner: MealPlanner;
    onRecipeClick: (recipe: Recipe) => void;
}

const MealPlannerCard: React.FC<MealPlannerCardProps> = ({ planner, onRecipeClick }) => {
    const [expandedDay, setExpandedDay] = useState<string | null>(null);

    const toggleDay = (day: string) => {
        setExpandedDay(expandedDay === day ? null : day);
    };

    const getRecipeById = (id: number): Recipe | undefined => {
        return recipes.find(r => r.id === id);
    };

    return (
        <Card className="p-4">
            <h3 className="text-lg font-bold font-display text-accent">{planner.titulo}</h3>
            <p className="text-sm text-text-secondary mb-3">{planner.descripcion}</p>
            <div className="space-y-2">
                {planner.plan_semanal.map(({ dia, comidas }) => (
                    <div key={dia} className="border border-gray-700/50 rounded-lg overflow-hidden">
                        <button
                            onClick={() => toggleDay(dia)}
                            className="w-full text-left p-3 bg-card/50 flex justify-between items-center"
                        >
                            <span className="font-semibold text-text-primary">{dia}</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 transition-transform duration-300 ${expandedDay === dia ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                        {expandedDay === dia && (
                            <div className="p-3 bg-card/20 space-y-2">
                                {Object.entries(comidas).map(([mealType, recipeId]) => {
                                    const recipe = getRecipeById(recipeId);
                                    if (!recipe) return null;
                                    return (
                                        <div 
                                            key={`${dia}-${mealType}`} 
                                            onClick={() => onRecipeClick(recipe)}
                                            className="flex items-start cursor-pointer group p-2 rounded-md hover:bg-accent/10"
                                        >
                                             <SparklesIcon className="h-5 w-5 text-accent_alt mr-3 mt-1 flex-shrink-0"/>
                                            <div>
                                                <p className="font-semibold text-text-secondary capitalize text-sm">{mealType.replace('_', ' ')}</p>
                                                <p className="text-text-primary group-hover:text-accent transition-colors">{recipe.titulo}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </Card>
    );
};

export default MealPlannerCard;

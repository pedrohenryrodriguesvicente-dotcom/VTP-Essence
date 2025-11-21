
import React, { useState, useMemo } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { recipes } from '../data/recipes';
import { foodsToAvoid } from '../data/foodsToAvoid';
import { foodsRecommended } from '../data/foodsRecommended';
import { foodsInModeration } from '../data/foodsInModeration';
import { mealPlanners } from '../data/mealPlanners';
import Card from '../components/Card';
import { Recipe, FilterCategory, GuideCategory, ShoppingItem } from '../types';
import { HeartIcon, NoSymbolIcon, CheckCircleIcon } from '../components/Icons';
import MealPlannerCard from '../components/MealPlannerCard';
import Modal from '../components/Modal';
import Button from '../components/Button';

const recipeCategories: Recipe['categoria'][] = ['Desayuno', 'Almuerzo', 'Cena', 'Snack', 'Batido'];
const guideCategories: GuideCategory[] = ['Recomendados', 'Moderación', 'A Evitar'];
const displayFilters: FilterCategory[] = [...recipeCategories, 'Favoritos', 'Planes', ...guideCategories, 'Todas'];

const Recipes: React.FC = () => {
    const [selectedFilter, setSelectedFilter] = useState<FilterCategory>('Desayuno');
    const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
    const [favoriteRecipes, setFavoriteRecipes] = useLocalStorage<number[]>('favoriteRecipes', []);
    const [shoppingList, setShoppingList] = useLocalStorage<ShoppingItem[]>('shoppingList', []);
    const [isShoppingListOpen, setIsShoppingListOpen] = useState(false);
    const [addedFeedback, setAddedFeedback] = useState(false);

    const toggleFavorite = (id: number) => {
        setFavoriteRecipes(prev => prev.includes(id) ? prev.filter(favId => favId !== id) : [...prev, id]);
    };

    const addToShoppingList = (ingredients: string[]) => {
        const newItems: ShoppingItem[] = ingredients.map(ing => ({
            id: Math.random().toString(36).substr(2, 9),
            name: ing,
            checked: false
        }));
        setShoppingList(prev => [...prev, ...newItems]);
        
        // Feedback Animation
        setAddedFeedback(true);
        setTimeout(() => setAddedFeedback(false), 1500);
    };

    const toggleShoppingItem = (id: string) => {
        setShoppingList(prev => prev.map(item => item.id === id ? { ...item, checked: !item.checked } : item));
    };

    const clearCompletedItems = () => {
        setShoppingList(prev => prev.filter(item => !item.checked));
    };

    const filteredRecipes = useMemo(() => {
        if (selectedFilter === 'Todas') return recipes;
        if (selectedFilter === 'Favoritos') return recipes.filter(r => favoriteRecipes.includes(r.id));
        return recipes.filter(r => r.categoria === selectedFilter);
    }, [selectedFilter, favoriteRecipes]);

    if (selectedRecipe) {
        const isFavorite = favoriteRecipes.includes(selectedRecipe.id);
        return (
            <div className="pb-24 animate-fade-in">
                <button onClick={() => setSelectedRecipe(null)} className="text-accent hover:text-accent/80 mb-4 font-bold flex items-center text-sm">
                    <span className="mr-2 text-lg">&larr;</span> Volver
                </button>
                <Card className="overflow-hidden border-white/10" noPadding>
                    <div className="relative h-64">
                        <img src={selectedRecipe.imagen} alt={selectedRecipe.titulo} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 p-4 w-full">
                             <h1 className="text-2xl font-bold font-display text-white leading-tight mb-1">{selectedRecipe.titulo}</h1>
                             <p className="text-xs text-gray-300 font-medium uppercase tracking-wider">{selectedRecipe.categoria} &bull; {selectedRecipe.tiempo_min} min</p>
                        </div>
                        <button onClick={() => toggleFavorite(selectedRecipe.id)} className="absolute top-3 right-3 p-2 rounded-full bg-black/40 backdrop-blur-md border border-white/10 active:scale-90 transition-transform">
                            <HeartIcon fill={isFavorite ? '#FFC857' : 'none'} className={`w-6 h-6 transition-all duration-300 ${isFavorite ? 'text-detail' : 'text-white'}`}/>
                        </button>
                    </div>
                    
                    <div className="p-5 space-y-6">
                        <div className="flex justify-between items-center bg-surface/50 p-3 rounded-xl border border-white/5">
                             <div className="text-center">
                                <span className="block text-xs text-text-secondary uppercase">Calorías</span>
                                <span className="font-bold text-white">{selectedRecipe.calorias}</span>
                             </div>
                             <div className="w-px h-8 bg-white/10"></div>
                             <div className="text-center">
                                <span className="block text-xs text-text-secondary uppercase">Tiempo</span>
                                <span className="font-bold text-white">{selectedRecipe.tiempo_min}m</span>
                             </div>
                             <div className="w-px h-8 bg-white/10"></div>
                             <div className="text-center">
                                <span className="block text-xs text-text-secondary uppercase">Dificultad</span>
                                <span className="font-bold text-white">Media</span>
                             </div>
                        </div>

                        <div>
                            <div className="flex justify-between items-center mb-3">
                                <h3 className="text-lg font-bold text-primary">Ingredientes</h3>
                                <button 
                                    onClick={() => addToShoppingList(selectedRecipe.ingredientes)}
                                    className={`text-xs px-3 py-2 rounded-lg font-bold transition-all duration-300 border ${addedFeedback ? 'bg-green-500 text-white border-green-500' : 'bg-white/5 text-accent border-white/10 hover:bg-white/10'}`}
                                >
                                    {addedFeedback ? '¡Añadido! 🛒' : '+ Añadir a Lista'}
                                </button>
                            </div>
                            <ul className="space-y-2">
                                {selectedRecipe.ingredientes.map((ing, i) => (
                                    <li key={i} className="flex items-center text-sm text-text-secondary bg-white/5 p-2 rounded-lg">
                                        <div className="w-1.5 h-1.5 rounded-full bg-accent mr-3 shrink-0"></div>
                                        {ing}
                                    </li>
                                ))}
                            </ul>
                        </div>
                         <div>
                            <h3 className="text-lg font-bold text-secondary mb-3">Preparación</h3>
                            <div className="space-y-4">
                                {selectedRecipe.pasos.map((step, i) => (
                                    <div key={i} className="flex gap-4">
                                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-secondary/20 text-secondary flex items-center justify-center text-xs font-bold border border-secondary/30">
                                            {i + 1}
                                        </div>
                                        <p className="text-sm text-text-secondary leading-relaxed pt-0.5">{step}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        );
    }
    
    const renderContent = () => {
        if (guideCategories.includes(selectedFilter as GuideCategory)) {
            let items, title, Icon;
            switch(selectedFilter) {
                case 'Recomendados':
                    items = foodsRecommended;
                    title = 'Recomendados';
                    Icon = <CheckCircleIcon className="w-5 h-5 mr-2 text-accent_alt"/>;
                    break;
                case 'Moderación':
                    items = foodsInModeration;
                    title = 'Moderación';
                    Icon = <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2 text-detail" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>;
                    break;
                case 'A Evitar':
                    items = foodsToAvoid;
                    title = 'A Evitar';
                    Icon = <NoSymbolIcon className="w-5 h-5 mr-2 text-red-400"/>;
                    break;
                default:
                    return null;
            }
             return (
                 <div className="space-y-3 animate-slide-up">
                    <h2 className="text-lg font-bold font-display text-white flex items-center border-b border-white/10 pb-2">{Icon} {title}</h2>
                    {items.map(food => (
                        <Card key={food.id} className="p-4 border-white/5">
                            <h3 className="font-bold text-white text-sm">{food.nombre}</h3>
                            <p className="text-xs text-text-secondary mt-2 leading-relaxed">{ 'motivo' in food ? food.motivo : food.descripcion}</p>
                            { 'alternativa' in food && <p className="text-xs text-accent_alt mt-3 font-semibold bg-accent_alt/10 p-2 rounded-lg border border-accent_alt/20">Alternativa: <span className="font-normal text-gray-300">{food.alternativa}</span></p> }
                        </Card>
                    ))}
                 </div>
            );
        }

        if (selectedFilter === 'Planes') {
            return (
                 <div className="space-y-4 animate-slide-up">
                    <h2 className="text-lg font-bold font-display text-white">Planes Semanales</h2>
                    {mealPlanners.map(plan => <MealPlannerCard key={plan.id} planner={plan} onRecipeClick={(recipe) => setSelectedRecipe(recipe)}/> )}
                 </div>
            );
        }

        return (
             <div className="grid grid-cols-2 gap-3 pb-8 animate-slide-up">
                {filteredRecipes.map(recipe => (
                    <Card key={recipe.id} onClick={() => setSelectedRecipe(recipe)} noPadding className="h-full flex flex-col group">
                        <div className="relative aspect-square overflow-hidden">
                            <img src={recipe.imagen} alt={recipe.titulo} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
                            <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md px-1.5 py-0.5 rounded-md text-[10px] font-bold text-white border border-white/10">
                                {recipe.calorias} kcal
                            </div>
                            {favoriteRecipes.includes(recipe.id) && <div className="absolute top-2 left-2"><HeartIcon fill="#FFC857" className="w-4 h-4 text-detail drop-shadow-md"/></div>}
                        </div>
                        <div className="p-3 flex-grow flex flex-col justify-between">
                            <div>
                                <h2 className="font-bold text-sm text-white leading-tight line-clamp-2 mb-1">{recipe.titulo}</h2>
                            </div>
                            <div className="mt-2 flex items-center justify-between">
                                <span className="text-[10px] font-medium px-2 py-1 rounded-full bg-white/5 text-text-secondary border border-white/5">{recipe.tiempo_min} min</span>
                                <span className="text-[10px] text-primary uppercase font-bold tracking-wide">Ver</span>
                            </div>
                        </div>
                    </Card>
                ))}
                {filteredRecipes.length === 0 && (
                    <div className="col-span-2 text-center py-12">
                        <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                            <NoSymbolIcon className="w-8 h-8 text-text-muted" />
                        </div>
                        <p className="text-text-secondary text-sm">No hay recetas en esta categoría aún.</p>
                    </div>
                )}
            </div>
        )
    }

    return (
        <div className="space-y-4 h-full relative">
            <div className="sticky top-0 bg-background/95 backdrop-blur-xl z-40 pb-2 pt-2 -mx-4 px-4 border-b border-white/5 flex justify-between items-center">
                <div className="overflow-hidden">
                     <div className="flex space-x-3 overflow-x-auto pb-2 no-scrollbar">
                        {displayFilters.map(cat => (
                            <button 
                                key={cat} 
                                onClick={() => setSelectedFilter(cat)} 
                                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap border flex-shrink-0 ${
                                    selectedFilter === cat 
                                    ? 'bg-neon-gradient text-white border-transparent shadow-neon' 
                                    : 'bg-surface text-text-secondary border-white/10 hover:bg-white/5'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Shopping List Button Float */}
            <button 
                onClick={() => setIsShoppingListOpen(true)}
                className="fixed bottom-24 right-4 w-14 h-14 bg-accent rounded-full shadow-neon flex items-center justify-center z-50 active:scale-90 transition-transform"
            >
                <div className="relative">
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                     </svg>
                     {shoppingList.filter(i => !i.checked).length > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                            {shoppingList.filter(i => !i.checked).length}
                        </span>
                     )}
                </div>
            </button>
            
            {renderContent()}

            {/* Shopping List Modal */}
            <Modal 
                isOpen={isShoppingListOpen} 
                onClose={() => setIsShoppingListOpen(false)}
                title="Lista de Compra"
            >
                {shoppingList.length === 0 ? (
                    <div className="text-center py-10 opacity-60">
                        <p className="text-4xl mb-3">🛒</p>
                        <p>Tu lista está vacía.</p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {shoppingList.map(item => (
                            <div key={item.id} onClick={() => toggleShoppingItem(item.id)} className={`flex items-center p-3 rounded-xl transition-colors cursor-pointer ${item.checked ? 'bg-white/5 opacity-50' : 'bg-surface border border-white/10'}`}>
                                <div className={`w-5 h-5 rounded-full border mr-3 flex items-center justify-center ${item.checked ? 'bg-green-500 border-green-500' : 'border-gray-500'}`}>
                                    {item.checked && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"/></svg>}
                                </div>
                                <span className={`text-sm ${item.checked ? 'line-through text-text-muted' : 'text-white'}`}>{item.name}</span>
                            </div>
                        ))}
                        
                        {shoppingList.some(i => i.checked) && (
                            <Button variant="outline" onClick={clearCompletedItems} className="w-full mt-4 text-xs py-2">
                                Limpiar Completados
                            </Button>
                        )}
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default Recipes;

import React, { useMemo, useState, useEffect } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { ProgressEntry, Page, HydrationState, FastingState, Mood } from '../types';
import { INITIAL_WEIGHT, GOAL_WEIGHT as DEFAULT_GOAL } from '../constants';
import Card from '../components/Card';
import Button from '../components/Button';
import { tips } from '../data/tips';
import { SparklesIcon } from '../components/Icons';

interface HomeProps {
    setActivePage: (page: Page) => void;
}

const MOODS: { label: Mood; icon: string; color: string }[] = [
    { label: 'Radiante', icon: '🤩', color: 'text-yellow-400' },
    { label: 'Bien', icon: '🙂', color: 'text-green-400' },
    { label: 'Cansada', icon: '😴', color: 'text-blue-400' },
    { label: 'Estresada', icon: '🤯', color: 'text-orange-400' },
    { label: 'Triste', icon: '😢', color: 'text-gray-400' },
];

// --- TUTORIAL STEPS (HARVARD STYLE) ---
const TUTORIAL_STEPS = [
    {
        title: "Bienvenida a VTP Essence",
        subtitle: "Tu reseteo metabólico comienza aquí.",
        content: "Esto no es una dieta, es una reingeniería de tus hábitos. VTP Essence combina la neurociencia del cambio de comportamiento con la nutrición de alta densidad para transformar tu cuerpo en 60 días. Olvida contar calorías obsesivamente; enfócate en nutrir tus células.",
        icon: "🧬"
    },
    {
        title: "Nutrición Anti-Inflamatoria",
        subtitle: "Comida real, resultados reales.",
        content: "En la sección 'Recetas' encontrarás platos diseñados para estabilizar tu glucosa y reducir la inflamación. Cada receta tiene el equilibrio perfecto de macro y micronutrientes. Si no es comida real, no está en VTP.",
        icon: "🥑"
    },
    {
        title: "La Psicología del Ayuno",
        subtitle: "Repara mientras descansas.",
        content: "El 'Timer de Ayuno' en tu Inicio no es para pasar hambre. Es una herramienta para permitir la autofagia (limpieza celular). Empieza con 12 horas y escucha a tu cuerpo. El descanso digestivo es tan vital como el sueño.",
        icon: "⏳"
    },
    {
        title: "Neuroplasticidad y Retos",
        subtitle: "Reconfigura tu cerebro en 60 días.",
        content: "El 'Plan 60' utiliza la repetición progresiva. Al completar tareas diarias pequeñas pero constantes, creas nuevas vías neuronales. No puedes saltarte días porque la disciplina no conoce atajos. Bloqueamos el futuro para que te centres en el hoy.",
        icon: "🧠"
    },
    {
        title: "Gestión de Datos y Metas",
        subtitle: "Lo que se mide, se mejora.",
        content: "Usa 'Herramientas VTP' para ajustar tu meta de peso y visualizar tu IMC. Y lo más importante: usa el 'Modo Zen'. El estrés eleva el cortisol, y el cortisol bloquea la quema de grasa. Tu paz mental es tu mejor quemagrasas.",
        icon: "📊"
    }
];

const Home: React.FC<HomeProps> = ({ setActivePage }) => {
    // --- STATE ---
    const [progress] = useLocalStorage<ProgressEntry[]>('userProgress', []);
    const [hydration, setHydration] = useLocalStorage<HydrationState>('hydration', { currentMl: 0, targetMl: 2500, lastUpdated: '' });
    const [fasting, setFasting] = useLocalStorage<FastingState>('fasting', { isFasting: false, startTime: null, targetHours: 16 });
    const [todaysMood, setTodaysMood] = useLocalStorage<string | null>('mood_' + new Date().toISOString().split('T')[0], null);
    const [customGoalWeight] = useLocalStorage<string>('userGoalWeight', '');
    const [tutorialSeen, setTutorialSeen] = useLocalStorage<boolean>('vtp_tutorial_seen_v2', false);
    
    // Tutorial State
    const [tutorialStep, setTutorialStep] = useState(0);
    const [showWelcomeAnimation, setShowWelcomeAnimation] = useState(false);

    const [animatingMood, setAnimatingMood] = useState<string | null>(null);
    
    // Forcing re-render for timer
    const [now, setNow] = useState(Date.now());

    // Determine Goal Weight
    const currentGoalWeight = customGoalWeight ? parseFloat(customGoalWeight) : DEFAULT_GOAL;

    // --- HYDRATION LOGIC ---
    useEffect(() => {
        const today = new Date().toISOString().split('T')[0];
        if (hydration.lastUpdated !== today) {
            setHydration({ ...hydration, currentMl: 0, lastUpdated: today });
        }
    }, []);

    const updateWater = (amount: number) => {
        setHydration(prev => ({
            ...prev,
            currentMl: Math.max(0, Math.min(prev.currentMl + amount, 5000)), // Max 5L, Min 0
            lastUpdated: new Date().toISOString().split('T')[0]
        }));
    };

    const hydrationPercentage = Math.min((hydration.currentMl / hydration.targetMl) * 100, 100);

    // --- FASTING LOGIC ---
    useEffect(() => {
        let interval: ReturnType<typeof setInterval>;
        interval = setInterval(() => {
            setNow(Date.now());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const toggleFasting = () => {
        if (fasting.isFasting) {
            setFasting({ ...fasting, isFasting: false, startTime: null });
        } else {
            setFasting({ ...fasting, isFasting: true, startTime: Date.now() });
            setNow(Date.now());
        }
    };

    const getFastingTime = () => {
        if (!fasting.isFasting || !fasting.startTime) return '00:00:00';
        const diff = now - fasting.startTime;
        const hours = Math.floor(diff / 3600000);
        const minutes = Math.floor((diff % 3600000) / 60000);
        const seconds = Math.floor((diff % 60000) / 1000);
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    const fastingProgress = useMemo(() => {
        if (!fasting.isFasting || !fasting.startTime) return 0;
        const hoursElapsed = (now - fasting.startTime) / 3600000;
        return Math.min((hoursElapsed / fasting.targetHours) * 100, 100);
    }, [fasting, now]);

    // --- GENERAL STATS ---
    const latestWeight = progress.length > 0 ? progress[progress.length - 1].peso_actual : INITIAL_WEIGHT;
    
    const progressPercentage = useMemo(() => {
        const startW = INITIAL_WEIGHT;
        const currentW = latestWeight;
        const goalW = currentGoalWeight;

        if (startW <= goalW) return 100; 
        
        const totalToLose = startW - goalW;
        const lostSoFar = startW - currentW;
        
        const percentage = Math.round((lostSoFar / totalToLose) * 100);
        return Math.max(0, Math.min(100, percentage));
    }, [latestWeight, currentGoalWeight]);

    const dailyTip = useMemo(() => {
        const dayOfYear = Math.floor((new Date().getTime() - new Date(new Date().getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
        return tips[dayOfYear % tips.length];
    }, []);

    // --- MOOD ANIMATION ---
    const handleMoodClick = (mood: string) => {
        setAnimatingMood(mood);
        setTimeout(() => {
            setTodaysMood(mood);
            setAnimatingMood(null);
        }, 800); 
    };

    // --- TUTORIAL LOGIC ---
    const handleNextStep = () => {
        if (tutorialStep < TUTORIAL_STEPS.length - 1) {
            setTutorialStep(prev => prev + 1);
        } else {
            // Finish Tutorial
            setShowWelcomeAnimation(true);
            setTutorialSeen(true);
            setTimeout(() => {
                setShowWelcomeAnimation(false);
            }, 2500); // Length of welcome animation
        }
    };

    return (
        <div className="space-y-6 animate-fade-in relative">
            {/* --- SURPRISE WELCOME ANIMATION --- */}
            {showWelcomeAnimation && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-xl animate-welcome-explode">
                    <div className="text-center">
                        <div className="text-6xl mb-4">🚀</div>
                        <h1 className="text-4xl font-bold font-display bg-clip-text text-transparent bg-neon-gradient">
                            BIENVENIDA A<br/>VTP ESSENCE
                        </h1>
                        <p className="text-white/80 mt-4 font-light tracking-widest">TU TRANSFORMACIÓN COMIENZA AHORA</p>
                    </div>
                </div>
            )}

            {/* Header VTP Essence */}
            <header className="flex justify-between items-center py-4 sticky top-0 bg-background/80 backdrop-blur-md z-40 -mx-4 px-4 border-b border-white/5">
                <div>
                    <h1 className="text-3xl font-bold font-display bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
                        VTP Essence
                    </h1>
                    <p className="text-secondary text-[10px] font-bold tracking-[0.3em] uppercase mt-1">Vive Tu Potencial</p>
                </div>
                <div className="flex gap-2">
                     <div className="relative group cursor-pointer w-10 h-10" onClick={() => setActivePage('VTP')}>
                        <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative drop-shadow-neon transform transition-transform duration-300 group-hover:scale-105">
                            <circle cx="50" cy="50" r="48" fill="#0B0E14" stroke="url(#paint0_linear)" strokeWidth="2"/>
                            <text x="50" y="62" fontFamily="Arial, sans-serif" fontSize="32" fontWeight="bold" fill="white" textAnchor="middle" letterSpacing="-1">VTP</text>
                            <defs>
                                <linearGradient id="paint0_linear" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
                                    <stop stopColor="#8B5CF6"/>
                                    <stop offset="1" stopColor="#06B6D4"/>
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>
                </div>
            </header>

            {/* --- TUTORIAL / ONBOARDING 2.0 (Snake Border) --- */}
            {!tutorialSeen && !showWelcomeAnimation && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                    {/* The Snake Border Container */}
                    <div className="snake-border w-full max-w-sm bg-surface shadow-2xl">
                        <div className="relative z-10 p-6 flex flex-col h-full min-h-[400px] justify-between">
                            
                            {/* Header */}
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-[10px] font-bold tracking-widest text-secondary uppercase">
                                    Manual de Iniciación
                                </span>
                                <span className="text-[10px] font-mono text-gray-400">
                                    PASO {tutorialStep + 1}/{TUTORIAL_STEPS.length}
                                </span>
                            </div>

                            {/* Content */}
                            <div className="text-center space-y-4 animate-slide-up" key={tutorialStep}>
                                <div className="text-6xl mb-4 drop-shadow-neon">{TUTORIAL_STEPS[tutorialStep].icon}</div>
                                <h2 className="text-2xl font-bold font-display text-white">
                                    {TUTORIAL_STEPS[tutorialStep].title}
                                </h2>
                                <p className="text-xs font-bold text-accent uppercase tracking-wide">
                                    {TUTORIAL_STEPS[tutorialStep].subtitle}
                                </p>
                                <p className="text-sm text-text-secondary leading-relaxed px-2">
                                    {TUTORIAL_STEPS[tutorialStep].content}
                                </p>
                            </div>

                            {/* Footer / Controls */}
                            <div className="mt-8 space-y-4">
                                {/* Progress Bar */}
                                <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
                                    <div 
                                        className="h-full bg-neon-gradient transition-all duration-300"
                                        style={{ width: `${((tutorialStep + 1) / TUTORIAL_STEPS.length) * 100}%` }}
                                    ></div>
                                </div>

                                <Button onClick={handleNextStep} variant="primary" className="w-full">
                                    {tutorialStep === TUTORIAL_STEPS.length - 1 ? 'COMENZAR EXPERIENCIA' : 'SIGUIENTE LECCIÓN'}
                                </Button>
                                
                                <button 
                                    onClick={() => setTutorialSeen(true)}
                                    className="w-full text-center text-[10px] text-gray-500 hover:text-white transition-colors uppercase tracking-wider"
                                >
                                    Saltar Introducción
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Mood Tracker */}
            {!todaysMood && (
                <div className="animate-slide-up">
                    <p className="text-xs font-bold text-text-secondary uppercase mb-2">¿Cómo te sientes hoy?</p>
                    <div className="flex justify-between bg-surface/50 p-3 rounded-2xl border border-white/5">
                        {MOODS.map((m) => (
                            <button 
                                key={m.label} 
                                onClick={() => handleMoodClick(m.label)}
                                className={`flex flex-col items-center gap-1 transition-all duration-500
                                    ${animatingMood === m.label ? 'scale-[2] opacity-0' : 'active:scale-90'}
                                    ${animatingMood && animatingMood !== m.label ? 'opacity-0 scale-0' : ''}
                                `}
                            >
                                <span className="text-2xl filter drop-shadow-md">{m.icon}</span>
                                <span className="text-[9px] text-text-muted font-medium">{m.label}</span>
                            </button>
                        ))}
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 gap-6">
                {/* Main Stats Card - Weight */}
                <div className="relative group transform transition-all duration-300 hover:scale-[1.01]">
                    <div className="absolute inset-0 bg-neon-gradient rounded-3xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-500 animate-pulse-slow"></div>
                    <Card className="relative bg-gradient-to-br from-surface to-black border border-white/10 !p-6 overflow-hidden">
                         <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
                        <h2 className="text-[10px] uppercase tracking-widest text-text-muted mb-4 font-semibold flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
                            Tu Balance
                        </h2>
                        <div className="flex items-baseline gap-2 mb-6">
                            <span className="text-6xl font-bold text-white font-display tracking-tighter drop-shadow-md">{latestWeight}</span>
                            <span className="text-xl text-text-secondary font-light">kg</span>
                            <span className={`ml-auto text-xs font-bold py-1.5 px-3 rounded-lg border backdrop-blur-md ${latestWeight < INITIAL_WEIGHT ? 'text-success border-success/30 bg-success/10' : 'text-warning border-warning/30 bg-warning/10'}`}>
                            {latestWeight < INITIAL_WEIGHT ? '▼' : '▲'} {Math.abs(INITIAL_WEIGHT - latestWeight).toFixed(1)} kg
                            </span>
                        </div>
                         <div className="w-full bg-surface/80 rounded-full h-4 overflow-hidden border border-white/5 relative shadow-inner">
                            <div 
                                className="bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_100%] animate-[shimmer_3s_infinite] h-full rounded-full shadow-[0_0_15px_rgba(6,182,212,0.6)] relative" 
                                style={{ width: `${progressPercentage}%` }}
                            />
                        </div>
                        <p className="text-[9px] text-center mt-2 text-text-muted uppercase tracking-wide">Meta: {currentGoalWeight} kg</p>
                    </Card>
                </div>

                {/* Dual Widgets Row */}
                <div className="grid grid-cols-2 gap-4 h-48">
                    {/* Hydration Widget */}
                    <Card className="relative overflow-hidden flex flex-col justify-between !p-0 border-white/10 group">
                         {/* Liquid Animation Background */}
                         <div className="absolute bottom-0 left-0 right-0 transition-all duration-1000 ease-in-out z-0" style={{ height: `${hydrationPercentage}%` }}>
                            <div className="absolute top-0 left-0 right-0 h-4 -mt-2 animate-wave wave-bg opacity-70"></div>
                            <div className="absolute top-0 left-0 right-0 h-full bg-gradient-to-b from-cyan-500/40 to-blue-600/60 backdrop-blur-sm"></div>
                         </div>
                         
                         <div className="relative z-10 p-4 h-full flex flex-col justify-between">
                             <div className="flex justify-between items-start">
                                 <div>
                                     <h3 className="text-xs font-bold uppercase text-white/90">Hidratación</h3>
                                     <p className="text-[10px] text-white/60">{hydration.currentMl} / {hydration.targetMl} ml</p>
                                 </div>
                                 <div className="bg-black/20 p-1.5 rounded-full backdrop-blur-md">
                                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-cyan-300">
                                         <path fillRule="evenodd" d="M12.963 2.286a.75.75 0 0 0-1.071-.136 9.742 9.742 0 0 0-3.539 6.177c-.342 2.558.43 4.64 1.621 6.12l-.945.945a.75.75 0 0 0 1.06 1.06l.945-.945c.5.425 1.053.793 1.66 1.096.89.447 1.82.808 2.777 1.076.46.128.942.24 1.443.326.502.087 1.02.13 1.543.13.523 0 1.041-.043 1.543-.13.501-.086.983-.198 1.443-.326.958-.268 1.887-.63 2.777-1.076.607-.303 1.16-.671 1.66-1.096l.945.945a.75.75 0 0 0 1.06-1.06l-.945-.945c1.191-1.48 1.963-3.562 1.621-6.12a9.742 9.742 0 0 0-3.539-6.176.75.75 0 0 0-1.071.136 9.716 9.716 0 0 0-2.295 5.36 7.251 7.251 0 0 1-3.453-2.74 9.716 9.716 0 0 0-2.295-5.36zM12 20.25c-2.45 0-4.784-.623-6.822-1.725.118-.286.248-.566.39-.838 1.458-2.78 4.343-4.437 7.65-4.437 3.308 0 6.192 1.657 7.65 4.437.142.272.272.552.39.838C16.784 19.627 14.45 20.25 12 20.25z" clipRule="evenodd" />
                                     </svg>
                                 </div>
                             </div>
                             
                             <div className="text-center my-auto">
                                <span className="text-2xl font-bold font-display text-white drop-shadow-lg">{Math.round(hydrationPercentage)}%</span>
                             </div>

                             <div className="flex gap-2">
                                 <button 
                                    onClick={() => updateWater(-250)}
                                    // Added snake effect to secondary controls
                                    className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center justify-center font-bold backdrop-blur-md active:scale-90 snake-border"
                                 >-</button>
                                 <button 
                                    onClick={() => updateWater(250)}
                                    className="flex-1 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-xs font-bold text-white backdrop-blur-md active:scale-95 transition-all flex items-center justify-center gap-1 snake-border"
                                 >
                                     <span>+</span> 250ml
                                 </button>
                             </div>
                         </div>
                    </Card>

                    {/* Fasting Widget */}
                    <Card className="!p-4 flex flex-col justify-between relative overflow-hidden bg-surface border-white/10">
                        <div className="flex justify-between items-center mb-1">
                            <h3 className="text-xs font-bold uppercase text-text-secondary">Ayuno</h3>
                             <span className={`w-2 h-2 rounded-full ${fasting.isFasting ? 'bg-accent animate-pulse' : 'bg-gray-600'}`}></span>
                        </div>
                        
                        <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
                            {/* Circular Progress */}
                            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                                <circle cx="50" cy="50" r="45" fill="none" stroke="#1F2937" strokeWidth="8" />
                                <circle 
                                    cx="50" cy="50" r="45" fill="none" stroke={fasting.isFasting ? "#F472B6" : "#374151"} strokeWidth="8" 
                                    strokeDasharray="283" 
                                    strokeDashoffset={283 - (283 * fastingProgress) / 100}
                                    className="transition-all duration-1000 ease-linear"
                                    strokeLinecap="round"
                                />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center flex-col">
                                <span className="text-[10px] font-mono text-white font-bold tracking-tighter">
                                    {fasting.isFasting ? getFastingTime().slice(0,5) : 'Iniciar'}
                                </span>
                                {fasting.isFasting && <span className="text-[8px] text-gray-500">{getFastingTime().slice(6)}</span>}
                            </div>
                        </div>

                        {/* Added snake variant here if not active, or primary if active */}
                        <Button 
                            variant={fasting.isFasting ? 'outline' : 'snake'}
                            onClick={toggleFasting}
                            className="!py-1.5 !text-[10px] mt-2 w-full"
                        >
                            {fasting.isFasting ? 'Terminar' : 'Comenzar'}
                        </Button>
                    </Card>
                </div>

                {/* Tip Card */}
                <Card className="border-l-4 border-l-accent bg-gradient-to-r from-surface/60 to-surface/30 backdrop-blur-md">
                    <div className="flex items-start gap-4">
                        <div className="bg-accent/20 p-2.5 rounded-xl shrink-0 shadow-inner">
                             <SparklesIcon className="w-6 h-6 text-accent" />
                        </div>
                        <div>
                            <h3 className="font-bold text-white text-xs uppercase tracking-wider mb-1.5">Insight Diario</h3>
                            <p className="text-gray-300 italic text-sm leading-relaxed font-medium">"{dailyTip.frase}"</p>
                        </div>
                    </div>
                </Card>

                <Button onClick={() => setActivePage('Retos')} variant="primary" className="w-full py-4 uppercase tracking-widest text-xs font-bold border-white/10">
                    Ver Retos Activos
                </Button>
            </div>
        </div>
    );
};

export default Home;
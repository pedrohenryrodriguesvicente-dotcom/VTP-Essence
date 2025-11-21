
import React, { useState, useEffect } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { ProgressEntry } from '../types';
import Card from '../components/Card';
import Button from '../components/Button';
import { WindIcon, StarIcon, CogIcon, VtpIcon, CheckBadgeIcon } from '../components/Icons';
import Modal from '../components/Modal';
import { GOAL_WEIGHT as DEFAULT_GOAL } from '../constants';

const VTPTools: React.FC = () => {
  // Global State for Sync
  const [userProgress, setUserProgress] = useLocalStorage<ProgressEntry[]>('userProgress', []);
  const [favoriteRecipes] = useLocalStorage<number[]>('favoriteRecipes', []);
  const [challengeProgress] = useLocalStorage<any>('challengeProgress', {});
  const [customGoalWeight, setCustomGoalWeight] = useLocalStorage<string>('userGoalWeight', '');
  
  // BMI State
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [age, setAge] = useState('');
  const [goalWeightInput, setGoalWeightInput] = useState('');
  const [bmiResult, setBmiResult] = useState<number | null>(null);
  
  // Zen Mode State
  const [isZenModeOpen, setIsZenModeOpen] = useState(false);
  const [breathingPhase, setBreathingPhase] = useState<'Inhala' | 'Sostén' | 'Exhala'>('Inhala');
  const [zenSessions, setZenSessions] = useLocalStorage<number>('zenSessions', 0);

  // Load latest data on mount
  useEffect(() => {
    if (userProgress.length > 0) {
        setWeight(userProgress[userProgress.length - 1].peso_actual.toString());
    }
    if (customGoalWeight) {
        setGoalWeightInput(customGoalWeight);
    } else {
        setGoalWeightInput(DEFAULT_GOAL.toString());
    }
  }, []);

  // --- BMI CALCULATION & SYNC ---
  const calculateBMI = () => {
      if (height && weight) {
          const h = parseFloat(height) / 100; // Convert cm to meters
          const w = parseFloat(weight);
          
          if (h > 0 && w > 0) {
              const bmi = w / (h * h);
              setBmiResult(parseFloat(bmi.toFixed(1)));
              
              // Sync to Home by adding a progress entry
              const today = new Date().toISOString().split('T')[0];
              const lastEntry = userProgress.length > 0 ? userProgress[userProgress.length - 1] : null;
              
              // Save Goal Weight
              if (goalWeightInput) {
                  setCustomGoalWeight(goalWeightInput);
              }
              
              if (lastEntry && lastEntry.fecha.startsWith(today)) {
                   const updated = [...userProgress];
                   updated[updated.length - 1].peso_actual = w;
                   setUserProgress(updated);
              } else {
                  setUserProgress([...userProgress, {
                      fecha: new Date().toISOString(),
                      peso_actual: w,
                      habitos_cumplidos: {}
                  }]);
              }
          } else {
              alert("Por favor ingresa valores válidos.");
          }
      }
  };

  // --- ACHIEVEMENT LOGIC ---
  const getAchievements = () => {
      const challengeData = challengeProgress[1] || {};
      const daysCompleted = Object.values(challengeData).filter(Boolean).length;

      return [
          { id: 'start', label: 'Inicio', icon: '🚀', unlocked: true },
          { id: '3days', label: '3 Días', icon: '🔥', unlocked: daysCompleted >= 3 },
          { id: '1week', label: '1 Semana', icon: '📅', unlocked: daysCompleted >= 7 },
          { id: 'chef', label: 'Chef', icon: '👨‍🍳', unlocked: favoriteRecipes.length >= 5 },
          { id: 'zen', label: 'Zen Master', icon: '🧘', unlocked: zenSessions >= 1 },
          { id: '60days', label: '60 Días', icon: '👑', unlocked: daysCompleted >= 60 },
      ];
  };

  const achievements = getAchievements();

  // --- ZEN MODE LOGIC ---
  useEffect(() => {
      let interval: ReturnType<typeof setInterval>;
      if (isZenModeOpen) {
          setZenSessions(prev => prev + 1);
          const breatheLoop = () => {
              setBreathingPhase('Inhala');
              setTimeout(() => {
                  setBreathingPhase('Sostén');
                  setTimeout(() => {
                      setBreathingPhase('Exhala');
                  }, 4000);
              }, 4000);
          };
          breatheLoop();
          interval = setInterval(breatheLoop, 19000);
      }
      return () => clearInterval(interval);
  }, [isZenModeOpen]);

  return (
    <div className="space-y-6 pb-24 animate-fade-in">
      <div className="flex items-center gap-2 mb-2">
          <div className="bg-primary/20 p-2 rounded-full">
              <VtpIcon className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-3xl font-bold font-display text-white">Herramientas VTP</h1>
      </div>
      <p className="text-text-secondary text-sm mb-6">Utilidades exclusivas para potenciar tu transformación.</p>
      
      {/* 1. SECCIÓN CUERPO (BMI & META) */}
      <section className="space-y-3">
          <h2 className="text-xs font-bold text-primary uppercase tracking-widest ml-1">Tu Cuerpo</h2>
          <Card className="bg-gradient-to-br from-surface to-background border border-white/10">
              <div className="flex items-center gap-2 mb-4">
                  <div className="bg-primary/20 p-2 rounded-lg"><CogIcon className="w-5 h-5 text-primary" /></div>
                  <h3 className="font-bold text-white">Calculadora IMC & Metas</h3>
              </div>
              <div className="grid grid-cols-2 gap-3 mb-4">
                   <div>
                      <label className="text-[10px] text-text-secondary mb-1 block uppercase">Edad</label>
                      <input type="number" value={age} onChange={(e) => setAge(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:border-primary outline-none font-mono" placeholder="30" />
                  </div>
                  <div>
                      <label className="text-[10px] text-text-secondary mb-1 block uppercase">Altura (cm)</label>
                      <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:border-primary outline-none font-mono" placeholder="165" />
                  </div>
                  <div>
                      <label className="text-[10px] text-text-secondary mb-1 block uppercase">Peso Actual (kg)</label>
                      <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:border-primary outline-none font-mono" placeholder="65" />
                  </div>
                  <div>
                      <label className="text-[10px] text-accent mb-1 block uppercase font-bold">Peso Meta (kg)</label>
                      <input type="number" value={goalWeightInput} onChange={(e) => setGoalWeightInput(e.target.value)} className="w-full bg-accent/10 border border-accent/30 rounded-xl p-3 text-white focus:border-accent outline-none font-mono" placeholder="60" />
                  </div>
              </div>
              <Button onClick={calculateBMI} variant="outline" className="w-full py-3 text-xs font-bold">CALCULAR & ACTUALIZAR</Button>

              {bmiResult && (
                  <div className="mt-4 p-4 bg-white/5 rounded-xl text-center animate-slide-up border border-white/5">
                      <p className="text-[10px] text-text-secondary uppercase tracking-widest">Tu Índice</p>
                      <div className="flex justify-center items-baseline gap-2 my-1">
                          <span className="text-4xl font-bold text-white font-display">{bmiResult}</span>
                      </div>
                      <span className={`text-[10px] font-bold px-3 py-1 rounded-full inline-block border ${
                          bmiResult < 18.5 ? 'bg-blue-500/10 text-blue-400 border-blue-500/30' :
                          bmiResult < 25 ? 'bg-green-500/10 text-green-400 border-green-500/30' :
                          bmiResult < 30 ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30' :
                          'bg-red-500/10 text-red-400 border-red-500/30'
                      }`}>
                          {bmiResult < 18.5 ? 'Bajo Peso' : bmiResult < 25 ? 'Peso Saludable' : bmiResult < 30 ? 'Sobrepeso' : 'Obesidad'}
                      </span>
                  </div>
              )}
          </Card>
      </section>

      {/* 2. SECCIÓN MENTE (ZEN & BADGES) */}
      <section className="space-y-3">
          <h2 className="text-xs font-bold text-secondary uppercase tracking-widest ml-1">Tu Mente & Logros</h2>
          
          <div className="grid grid-cols-2 gap-3">
            <Card onClick={() => setIsZenModeOpen(true)} className="cursor-pointer hover:bg-white/5 active:scale-95 border-white/10">
                <div className="bg-secondary/20 w-10 h-10 rounded-full flex items-center justify-center mb-3">
                    <WindIcon className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="font-bold text-white text-sm">Modo Zen</h3>
                <p className="text-xs text-text-secondary mt-1">Respira y calma.</p>
            </Card>

            <Card className="border-white/10 relative overflow-hidden">
                <div className="bg-yellow-500/20 w-10 h-10 rounded-full flex items-center justify-center mb-3">
                    <StarIcon className="w-6 h-6 text-yellow-400" />
                </div>
                <h3 className="font-bold text-white text-sm">Logros</h3>
                <p className="text-xs text-text-secondary mt-1">Tu colección.</p>
                <div className="absolute top-2 right-2 flex -space-x-2">
                     {achievements.slice(0, 3).filter(a => a.unlocked).map((a, i) => (
                         <div key={i} className="w-4 h-4 rounded-full bg-yellow-500 border border-gray-800 flex items-center justify-center text-[8px]">★</div>
                     ))}
                </div>
            </Card>
          </div>
          
          {/* Expanded Badges View */}
          <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar pt-2 px-1">
             {achievements.map((badge) => (
                 <div key={badge.id} className={`flex-shrink-0 w-20 flex flex-col items-center gap-2 transition-all duration-500 ${badge.unlocked ? 'opacity-100' : 'opacity-40 grayscale'}`}>
                     {/* Applied 'border-flow-gradient' class for the specific contour animation requested for small buttons */}
                     <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl relative z-0 overflow-hidden ${badge.unlocked ? 'scale-105' : 'bg-surface border border-white/5'}`}>
                         {badge.unlocked && <div className="absolute inset-0 border-flow-gradient z-[-1]"></div>}
                         <div className={`absolute inset-[2px] rounded-xl flex items-center justify-center z-10 ${badge.unlocked ? 'bg-surface' : 'bg-surface'}`}>
                            {badge.icon}
                         </div>
                     </div>
                     <span className={`text-[9px] font-bold uppercase ${badge.unlocked ? 'text-white' : 'text-text-muted'}`}>{badge.label}</span>
                 </div>
             ))}
          </div>
      </section>

      {/* ZEN MODAL */}
      <Modal isOpen={isZenModeOpen} onClose={() => setIsZenModeOpen(false)} title="Espacio Zen">
        <div className="flex flex-col items-center justify-center py-12 space-y-8">
            <div className="relative w-56 h-56 flex items-center justify-center">
                <div className={`absolute inset-0 bg-secondary/20 rounded-full blur-2xl transition-all duration-[4000ms] ${breathingPhase === 'Inhala' ? 'scale-150 opacity-80' : breathingPhase === 'Exhala' ? 'scale-50 opacity-20' : 'scale-110 opacity-50'}`}></div>
                <div className={`relative w-32 h-32 bg-gradient-to-br from-secondary to-primary rounded-full shadow-[0_0_40px_rgba(6,182,212,0.5)] flex items-center justify-center transition-all duration-[4000ms] border border-white/20 ${breathingPhase === 'Inhala' ? 'scale-125' : breathingPhase === 'Exhala' ? 'scale-90' : 'scale-100'}`}>
                        <span className="text-xl font-bold text-white font-display tracking-widest">{breathingPhase}</span>
                </div>
            </div>
            <p className="text-center text-text-secondary text-sm px-8 leading-relaxed">
                Encuentra tu centro. Sigue el ritmo para reducir el cortisol y recuperar el control.
            </p>
        </div>
      </Modal>
    </div>
  );
};

export default VTPTools;

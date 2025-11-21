
import React, { useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { challenges } from '../data/challenges';
import Card from '../components/Card';
import { Challenge } from '../types';
import { CheckCircleIcon, SixtyIcon } from '../components/Icons';

type ChallengeProgress = { [dayIndex: number]: boolean };

const Challenges: React.FC = () => {
    const [progress, setProgress] = useLocalStorage<{ [challengeId: number]: ChallengeProgress }>('challengeProgress', {});
    // Default to the main 60 day challenge
    const mainChallenge = challenges[0];

    const toggleDayCompletion = (challengeId: number, dayIndex: number, isLocked: boolean) => {
        if (isLocked) return; // Prevent action if locked

        setProgress(prev => {
            const newProgress = { ...prev };
            if (!newProgress[challengeId]) {
                newProgress[challengeId] = {};
            }
            newProgress[challengeId][dayIndex] = !newProgress[challengeId][dayIndex];
            return newProgress;
        });
    };
    
    const currentProgress = progress[mainChallenge.id] || {};
    const completedDays = Object.values(currentProgress).filter(Boolean).length;
    const progressPercentage = Math.round((completedDays / mainChallenge.dias) * 100);

    return (
        <div className="space-y-6 pb-20 animate-fade-in">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold font-display text-white">Reto 60 Días</h1>
                    <p className="text-text-secondary">Tu camino hacia la mejor versión de ti.</p>
                </div>
                <div className="bg-surface/50 p-3 rounded-full border border-white/10 shadow-neon">
                    <SixtyIcon className="w-8 h-8 text-white" />
                </div>
            </div>

            {/* Progress Dashboard */}
            <Card className="bg-gradient-to-r from-surface to-background border border-primary/20">
                <div className="flex justify-between items-end mb-2">
                    <div>
                        <p className="text-sm text-text-muted">Progreso Total</p>
                        <p className="text-3xl font-bold text-white">{progressPercentage}%</p>
                    </div>
                    <p className="text-right text-sm text-secondary font-mono">{completedDays}/{mainChallenge.dias} Días</p>
                </div>
                <div className="w-full bg-black/40 rounded-full h-4 overflow-hidden border border-white/5">
                    <div 
                        className="bg-neon-gradient h-full rounded-full transition-all duration-1000 ease-out relative" 
                        style={{ width: `${progressPercentage}%` }}
                    >
                        <div className="absolute inset-0 bg-white/20 animate-[shimmer_2s_infinite]"></div>
                    </div>
                </div>
            </Card>

            {/* Timeline */}
            <div className="relative space-y-4">
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-transparent opacity-30"></div>
                
                {mainChallenge.pasos_por_dia.map((task, index) => {
                    const isCompleted = !!currentProgress[index];
                    // Logic: It's next if previous is completed OR it's the first day
                    const isUnlocked = index === 0 || !!currentProgress[index - 1];
                    const isLocked = !isUnlocked && !isCompleted;
                    const isNext = isUnlocked && !isCompleted;
                    const dayNumber = index + 1;

                    return(
                        <div key={index} className={`relative pl-10 transition-all duration-500 ${isNext ? 'scale-105 origin-left' : ''} ${isLocked ? 'opacity-50 grayscale pointer-events-none' : ''}`}>
                            {/* Timeline Node */}
                            <div 
                                className={`absolute left-[10px] top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 transition-colors duration-300 z-10
                                ${isCompleted ? 'bg-success border-success shadow-[0_0_10px_rgba(16,185,129,0.5)]' : 
                                  isNext ? 'bg-secondary border-white animate-pulse shadow-[0_0_10px_rgba(6,182,212,0.8)]' : 
                                  'bg-surface border-gray-600'}`}
                            >
                                {isLocked && (
                                    <div className="absolute -left-1 -top-1 w-6 h-6 flex items-center justify-center">
                                        {/* Small Lock Icon overlay */}
                                    </div>
                                )}
                            </div>

                            <Card 
                                noPadding
                                onClick={() => toggleDayCompletion(mainChallenge.id, index, isLocked)}
                                className={`p-4 flex items-center justify-between group transition-all border-l-4 
                                    ${isCompleted ? 'border-l-success bg-success/5' : 
                                      isNext ? 'border-l-secondary bg-surface shadow-neon cursor-pointer' : 
                                      'border-l-gray-700 bg-surface/30'}`}
                            >
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <p className={`text-xs font-bold uppercase tracking-wider ${isCompleted ? 'text-success' : isNext ? 'text-secondary' : 'text-text-muted'}`}>
                                            Día {dayNumber}
                                        </p>
                                        {isLocked && <span className="text-[10px] text-text-muted">🔒 Bloqueado</span>}
                                    </div>
                                    <p className={`text-sm md:text-base font-medium ${isCompleted ? 'text-text-secondary line-through decoration-success' : 'text-text-primary'}`}>
                                        {isLocked ? "Completa el día anterior para ver el reto." : task}
                                    </p>
                                </div>
                                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ml-4
                                    ${isCompleted ? 'border-success bg-success text-black' : 'border-gray-600 group-hover:border-secondary'}`}>
                                    {isCompleted && <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                                </div>
                            </Card>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export default Challenges;

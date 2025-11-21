import React, { useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { chapters } from '../data/chapters';
import Card from '../components/Card';
import Button from '../components/Button';
import { BookOpenIcon, CheckCircleIcon } from '../components/Icons';

const Program: React.FC = () => {
    const [completedChapters, setCompletedChapters] = useLocalStorage<number[]>('completedChapters', []);
    const [selectedChapterId, setSelectedChapterId] = useState<number | null>(null);

    const toggleChapterCompletion = (id: number) => {
        setCompletedChapters(prev => 
            prev.includes(id) ? prev.filter(chapId => chapId !== id) : [...prev, id]
        );
    };

    const selectedChapter = chapters.find(c => c.id === selectedChapterId);

    if (selectedChapter) {
        const isCompleted = completedChapters.includes(selectedChapter.id);
        return (
            <div className="space-y-4">
                <button onClick={() => setSelectedChapterId(null)} className="text-accent hover:underline mb-4 font-semibold">&larr; Volver a los capítulos</button>
                <h1 className="text-3xl font-bold font-display">{selectedChapter.titulo}</h1>
                <div className="prose max-w-none text-text-secondary" dangerouslySetInnerHTML={{ __html: selectedChapter.contenido }} />
                
                <Card className="p-4 bg-card/50">
                    <h3 className="text-lg font-semibold text-text-primary">Puntos Clave ✨</h3>
                    <ul className="list-disc list-inside mt-2 space-y-1 text-text-secondary">
                        {selectedChapter.puntos_clave.map((point, index) => <li key={index}>{point}</li>)}
                    </ul>
                </Card>

                <Card className="p-4 bg-card/50">
                    <h3 className="text-lg font-semibold text-text-primary">Checklist del Capítulo ✅</h3>
                    <ul className="mt-2 space-y-2 text-text-secondary">
                        {selectedChapter.checklist.map((item, index) => (
                             <li key={index} className="flex items-center">
                                <CheckCircleIcon className="h-5 w-5 text-accent_alt mr-3 flex-shrink-0" />
                                <span>{item}</span>
                             </li>
                        ))}
                    </ul>
                </Card>
                
                <Button 
                    onClick={() => toggleChapterCompletion(selectedChapter.id)} 
                    className="w-full"
                    variant={isCompleted ? 'completed' : 'primary'}
                >
                    {isCompleted ? 'Marcar como No Completado' : 'Marcar como Completado'}
                </Button>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <h1 className="text-3xl font-bold font-display">Programa de 60 Días</h1>
            <p className="text-text-secondary">Sigue tu camino, un capítulo a la vez. ¡Tú puedes!</p>
            <div className="space-y-3">
                {chapters.map(chapter => (
                    <Card key={chapter.id} onClick={() => setSelectedChapterId(chapter.id)} className="p-4 flex items-center justify-between">
                        <div className="flex items-center">
                            <div className={`mr-4 p-3 rounded-full ${completedChapters.includes(chapter.id) ? 'bg-accent_alt/20' : 'bg-accent/20'}`}>
                                <BookOpenIcon className={`h-6 w-6 ${completedChapters.includes(chapter.id) ? 'text-accent_alt' : 'text-accent'}`}/>
                            </div>
                            <div>
                                <h2 className="font-semibold text-text-primary">{chapter.titulo}</h2>
                                <p className="text-sm text-text-secondary">{chapter.resumen}</p>
                            </div>
                        </div>
                         {completedChapters.includes(chapter.id) && <CheckCircleIcon className="h-7 w-7 text-accent_alt" />}
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default Program;
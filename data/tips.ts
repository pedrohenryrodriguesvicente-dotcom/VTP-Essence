import { Tip } from '../types';

const phrases = [
    "Tu cuerpo es tu templo, cuídalo.",
    "La constancia vence al talento.",
    "No esperes resultados inmediatos, enamórate del proceso.",
    "Cada paso cuenta, por pequeño que sea.",
    "Eres más fuerte de lo que crees.",
    "La comida es combustible, no terapia.",
    "Bebe agua antes de que tengas sed.",
    "El descanso es parte del entrenamiento.",
    "Visualiza tu mejor versión cada mañana.",
    "No te rindas, el principio es siempre lo más difícil.",
    "Hazlo por ti, no por los demás.",
    "La disciplina es hacer lo que tienes que hacer, incluso si no quieres.",
    "Tu salud es tu mayor riqueza.",
    "Come para nutrirte, no para llenarte.",
    "El ejercicio celebra lo que tu cuerpo puede hacer.",
    "Un mal día no es una mala vida.",
    "Aprende a escuchar a tu cuerpo.",
    "La báscula no mide tu valor como persona.",
    "Rodéate de gente que te impulse.",
    "Cambia 'tengo que' por 'quiero'.",
    "La perfección no existe, busca el progreso.",
    "Sé tu propia motivación.",
    "Duerme bien para vivir mejor.",
    "El estrés engorda, respira profundo.",
    "Disfruta de cada bocado conscientemente.",
    "Las verduras son tus mejores amigas.",
    "Planifica y vencerás.",
    "No te compares, tu viaje es único.",
    "Celebra las victorias que no se ven en la báscula.",
    "Eres capaz de cosas increíbles.",
    "La fuerza de voluntad es un músculo, entrénalo.",
    "El azúcar es adictivo, contrólalo.",
    "Camina siempre que puedas.",
    "Invierte en ti misma.",
    "La actitud lo es todo.",
    "No dejes para mañana lo que puedes comer sano hoy.",
    "Crea hábitos, no restricciones.",
    "La flexibilidad metabólica es libertad.",
    "Ámate lo suficiente para llevar un estilo de vida saludable.",
    "El fracaso es solo una oportunidad para empezar de nuevo con más experiencia."
];

// Generate 120 tips by cycling and modifying slightly or combining
export const tips: Tip[] = Array.from({ length: 120 }, (_, i) => ({
    id: i + 1,
    frase: phrases[i % phrases.length] + (i > 40 ? " ✨" : "")
}));
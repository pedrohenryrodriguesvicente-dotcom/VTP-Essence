import { Challenge } from '../types';

const createDailyChallenges = () => {
    const tasks = [
        // Fase 1: Reinicio (Días 1-10)
        "Bebe 2.5 litros de agua hoy sin falta.",
        "Camina 20 minutos seguidos sin mirar el móvil.",
        "Elimina totalmente el azúcar añadido de tus comidas hoy.",
        "Incluye dos raciones generosas de verduras verdes.",
        "Duerme 8 horas hoy (vete a la cama antes).",
        "Cena 3 horas antes de irte a dormir.",
        "Realiza 10 minutos de estiramientos al levantarte.",
        "Sustituye cualquier bebida dulce por té o agua.",
        "Cocina todo en casa hoy, nada de comida comprada.",
        "Escribe en una nota 3 motivos por los que quieres mejorar.",
        
        // Fase 2: Construyendo Hábitos (Días 11-20)
        "Usa las escaleras siempre, evita el ascensor.",
        "Añade una fuente extra de proteína en el desayuno.",
        "Haz 20 sentadillas mientras te cepillas los dientes.",
        "Compra una fruta exótica y pruébala.",
        "Come despacio: mastica cada bocado 20 veces.",
        "Suda la camiseta: 20 minutos de cardio intenso.",
        "Cero alimentos ultraprocesados durante 24h.",
        "Bebe un vaso grande de agua 15 min antes de comer.",
        "Caminata rápida de 30 minutos.",
        "Día de recuperación activa: sesión de yoga o pilates.",

        // Fase 3: Intensidad (Días 21-30)
        "Suma 10 minutos a tu rutina habitual de ejercicio.",
        "Prueba el ayuno nocturno de 12 horas.",
        "Día vegetariano: cero carne hoy.",
        "Come sin pantallas (TV, móvil) en ninguna comida.",
        "Haz 3 series de 10 flexiones (o medias flexiones).",
        "Cocina sin sal hoy, usa solo especias.",
        "Objetivo pasos: llega a los 10,000 pasos hoy.",
        "Baila 3 canciones seguidas en tu salón.",
        "Evita los lácteos por hoy para ver cómo te sientes.",
        "Escribe cómo te sientes físicamente tras 30 días.",

        // Fase 4: Constancia (Días 31-40)
        "Deja preparada tu comida de mañana hoy mismo.",
        "Bebe agua tibia con limón al despertar.",
        "Entrenamiento de fuerza de 20 minutos.",
        "Tu plato principal debe ser una ensalada gigante.",
        "Toma café o té, pero totalmente negro (sin azúcar/leche).",
        "Haz 50 jumping jacks repartidos en el día.",
        "Lee un artículo sobre nutrición saludable.",
        "Cocina una receta nueva de la sección de Nutrición.",
        "Toma el sol (o aire libre) 15 minutos.",
        "Medita 5 minutos antes de dormir.",

        // Fase 5: Disciplina (Días 41-50)
        "Cero picoteo entre comidas hoy.",
        "Cena muy ligera: solo crema o sopa.",
        "Rutina HIIT: 15 minutos a máxima intensidad.",
        "Mírate al espejo y di 3 cosas que te gusten de ti.",
        "Camina más rápido de lo normal hoy.",
        "Prepara un snack saludable casero.",
        "Evita el pan y las harinas refinadas hoy.",
        "Objetivo hidratación: 3 litros de agua.",
        "Invita a alguien a caminar contigo.",
        "Visualiza cómo te verás al terminar el reto.",

        // Fase 6: La Recta Final (Días 51-60)
        "Elimina alcohol y refrescos al 100%.",
        "El entreno más largo: 45 minutos seguidos.",
        "Come con plena consciencia, saboreando todo.",
        "Día bajo en carbohidratos (Keto style).",
        "Reto de sentadillas: 100 en total durante el día.",
        "Lee tus motivos del Día 1.",
        "Sal a correr o marcha muy rápida.",
        "Versión saludable de tu 'comida trampa' favorita.",
        "Repasa todas tus victorias de estos 2 meses.",
        "¡Día Final! Celébralo haciendo algo que ames."
    ];
    return tasks;
};

export const challenges: Challenge[] = [
    {
        id: 1,
        titulo: "Reto VTP Essence: 60 Días",
        dias: 60,
        pasos_por_dia: createDailyChallenges()
    }
];
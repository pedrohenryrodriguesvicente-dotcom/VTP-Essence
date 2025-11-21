
import { Chapter } from '../types';

export const chapters: Chapter[] = [
    {
        id: 1,
        titulo: "Semana 1: Tu Nuevo Comienzo (Días 1-7)",
        contenido: "<h3>El Despertar de tu Mejor Versión</h3><p>¡Bienvenida a VTP! Esta semana no se trata de perfección, sino de iniciación. Tu cuerpo ha estado esperando este momento. Durante estos primeros 7 días, nos enfocaremos en limpiar el paladar, despertar el metabolismo con agua y decirle a tu mente que <b>tú estás al mando</b>.</p><p>No es una dieta, es un acto de amor propio. Bebe agua como si fuera tu elixir de vida y muévete con suavidad pero con intención.</p>",
        resumen: "Establece las bases y despierta tu metabolismo.",
        puntos_clave: ["Hidratación masiva: el agua es energía.", "Movimiento consciente: caminar sana.", "Elimina el azúcar añadido: desintoxica tu cerebro."],
        checklist: ["Beber 2.5 litros de agua diarios.", "Caminar 20 minutos sin el móvil.", "Eliminar bebidas azucaradas."]
    },
    {
        id: 2,
        titulo: "Semana 2: El Déficit Calórico (Días 8-14)",
        contenido: "<h3>Comer Mejor, No Menos</h3><p>Aquí es donde la magia matemática ocurre. Un déficit calórico no es pasar hambre, es ser estratégica. Vas a aprender a elegir alimentos con alta densidad nutricional (verduras, proteínas) que te llenan sin pesarte.</p><p>Imagina tu cuerpo como un coche deportivo de lujo: ¿le pondrías gasolina barata? No. Esta semana, elige combustible premium.</p>",
        resumen: "Aprende a nutrirte estratégicamente para quemar grasa.",
        puntos_clave: ["Volumen en el plato: muchas verduras.", "Proteína en cada comida: saciedad asegurada.", "Escucha a tu estómago: come hasta el 80%."],
        checklist: ["Incluir verduras en almuerzo y cena.", "Proteína magra en las 3 comidas principales.", "Masticar cada bocado lentamente."]
    },
    {
        id: 3,
        titulo: "Semana 3: Aceleración Metabólica (Días 15-21)",
        contenido: "<h3>Encendiendo el Horno Interno</h3><p>Ya tienes la base, ahora subimos la temperatura. Esta semana introducimos intervalos de intensidad en tu movimiento. Tu cuerpo se está adaptando, así que vamos a sorprenderlo.</p><p>La grasa se oxida cuando te mueves. Siente cómo tu energía aumenta. Ya no eres la misma persona que empezó hace 15 días.</p>",
        resumen: "Intensifica el movimiento para maximizar la quema.",
        puntos_clave: ["HIIT suave: picos de esfuerzo.", "Descanso activo: no te detengas del todo.", "El músculo quema más calorías en reposo."],
        checklist: ["Realizar 2 sesiones de ejercicios de fuerza.", "Aumentar pasos diarios a 8.000.", "Dormir 7-8 horas para recuperar."]
    },
    {
        id: 4,
        titulo: "Semana 4: Psicología y Antojos (Días 22-28)",
        contenido: "<h3>Dominando tu Mente</h3><p>Llegamos al mes. Aquí es donde muchas se rinden, pero tú no. Los antojos no son hambre, son emociones. Vamos a aprender a distinguir el hambre real del hambre emocional.</p><p>Cuando sientas ansiedad, respira (usa el Modo Zen en Herramientas). Eres más fuerte que una galleta. Tu meta vale más que un placer de 3 segundos.</p>",
        resumen: "Vence el hambre emocional y fortalece tu voluntad.",
        puntos_clave: ["Hambre real vs Emocional.", "El poder del 'No' es liberador.", "Sustitutos saludables para momentos críticos."],
        checklist: ["Usar el Modo Zen cuando tengas ansiedad.", "Sustituir dulce por fruta o chocolate 85%.", "Escribir cómo te sientes después de comer sano."]
    },
    {
        id: 5,
        titulo: "Semana 5: El Poder del Sueño (Días 29-35)",
        contenido: "<h3>Reparar para Renacer</h3><p>¿Sabías que si no duermes, no adelgazas? El cortisol (hormona del estrés) bloquea la quema de grasa. Esta semana es tu spa mental. Prioriza tu descanso como si fuera tu trabajo.</p><p>Crea un santuario en tu habitación. Sin pantallas, oscuridad total. Deja que tu cuerpo repare tejidos y regule hormonas.</p>",
        resumen: "Optimiza tu descanso para regular hormonas.",
        puntos_clave: ["El sueño regula el apetito.", "Menos pantallas, más melatonina.", "Cena ligero para dormir profundo."],
        checklist: ["Ir a la cama 30 minutos antes.", "Cenar 2 horas antes de dormir.", "Sin móvil en la cama."]
    },
    {
        id: 6,
        titulo: "Semana 6: Nutrición Avanzada (Días 36-42)",
        contenido: "<h3>Micro-Nutrientes, Macro-Resultados</h3><p>Ya no eres principiante. Ahora miramos los detalles. Vitaminas, minerales, fibra. ¿Estás comiendo suficientes colores? Cada color en tu vegetal es un antioxidante diferente.</p><p>Tu piel debería estar brillando. Tu digestión debería ser ligera. Si no es así, ajustamos los colores de tu plato.</p>",
        resumen: "Perfecciona tu dieta con variedad y calidad.",
        puntos_clave: ["Arcoíris en el plato.", "Fibra para la salud intestinal.", "Grasas buenas (Aguacate, Nueces) son necesarias."],
        checklist: ["Comer 3 colores diferentes de vegetales al día.", "Probar un alimento nuevo esta semana.", "Beber té verde o infusiones antioxidantes."]
    },
    {
        id: 7,
        titulo: "Semana 7: Resiliencia y Disciplina (Días 43-49)",
        contenido: "<h3>La Recta Final</h3><p>La motivación te hizo empezar, el hábito te mantiene aquí. Esta semana se trata de automatizar. Ya no piensas en beber agua, simplemente lo haces. Eso es el éxito.</p><p>Si tienes un día malo, no tires la toalla. Un pinchazo no significa rajar las otras 3 ruedas. Sigue adelante. Eres imparable.</p>",
        resumen: "Consolida tus hábitos a prueba de fallos.",
        puntos_clave: ["La consistencia vence a la intensidad.", "Perdónate rápido, corrige rápido.", "Visualiza tu meta final."],
        checklist: ["No fallar ningún día de ejercicio esta semana.", "Preparar tus comidas (Meal Prep) el domingo.", "Mirarte al espejo y felicitarte."]
    },
    {
        id: 8,
        titulo: "Semana 8 y Final: Mantenimiento y Futuro (Días 50-60)",
        contenido: "<h3>Tu Nuevo Estilo de Vida</h3><p>¡Has llegado! Pero esto no es el final, es el comienzo de tu vida mantenible. Ahora sabes comer, sabes moverte y sabes descansar. No vuelvas atrás.</p><p>Disfruta de tu nuevo cuerpo, de tu nueva energía. Eres la prueba viviente de que 60 días pueden cambiar una vida entera. ¡Vive Tu Potencial!</p>",
        resumen: "Integra todo lo aprendido para siempre.",
        puntos_clave: ["La regla del 80/20 para mantenimiento.", "Celebra sin comida (compra ropa, viaja).", "Inspira a otros con tu ejemplo."],
        checklist: ["Comparar tu foto del Día 1 con la del Día 60.", "Escribir una carta a tu 'yo' del futuro.", "Celebrar tu victoria (¡sin excesos!)."]
    }
];

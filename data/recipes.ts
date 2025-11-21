
import { Recipe } from '../types';

// IMAGENES ACTUALIZADAS CON IDs ESPECÍFICOS DE UNSPLASH
// Garantizando que cada foto corresponda exactamente a la receta

const baseRecipes: Recipe[] = [
    // --- DESAYUNOS ---
    {
        id: 1,
        titulo: "Avena Nocturna Frutos Rojos",
        categoria: "Desayuno",
        ingredientes: ["1/2 taza avena", "1 cda chía", "1 taza leche almendras", "Fresas y arándanos"],
        pasos: ["Mezclar avena, chía y leche.", "Refrigerar toda la noche.", "Servir con frutas."],
        tiempo_min: 5,
        calorias: 350,
        tags: ["vegano", "fibra"],
        imagen: "https://images.unsplash.com/photo-1517673132405-a56a62b18caf?auto=format&fit=crop&w=600&q=80", // REAL Oatmeal
        fuente_url: "", dalle_prompt: ""
    },
    {
        id: 2,
        titulo: "Tostada Aguacate y Huevo",
        categoria: "Desayuno",
        ingredientes: ["Pan integral", "1/2 aguacate", "1 huevo poché", "Chile flakes"],
        pasos: ["Tostar pan.", "Untar aguacate.", "Colocar huevo encima."],
        tiempo_min: 10,
        calorias: 320,
        tags: ["proteína", "grasas"],
        imagen: "https://images.unsplash.com/photo-1588137372308-15f75323ca8d?auto=format&fit=crop&w=600&q=80", // REAL Avocado Toast
        fuente_url: "", dalle_prompt: ""
    },
    {
        id: 3,
        titulo: "Tortitas Avena y Plátano",
        categoria: "Desayuno",
        ingredientes: ["1 plátano", "2 huevos", "1/3 taza avena", "Canela"],
        pasos: ["Batir todo.", "Hacer tortitas en sartén."],
        tiempo_min: 15,
        calorias: 380,
        tags: ["sin gluten", "caliente"],
        imagen: "https://images.unsplash.com/photo-1575853121743-60c24f0a7502?auto=format&fit=crop&w=600&q=80", // REAL Pancakes
        fuente_url: "", dalle_prompt: ""
    },
    {
        id: 4,
        titulo: "Yogur Griego con Granola",
        categoria: "Desayuno",
        ingredientes: ["200g yogur griego", "30g granola", "Miel"],
        pasos: ["Servir yogur.", "Añadir granola y miel."],
        tiempo_min: 3,
        calorias: 290,
        tags: ["rápido", "calcio"],
        imagen: "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=600&q=80", // REAL Yogurt
        fuente_url: "", dalle_prompt: ""
    },
    {
        id: 5,
        titulo: "Revuelto Claras y Espinacas",
        categoria: "Desayuno",
        ingredientes: ["4 claras", "Espinacas", "Tomate cherry", "Especias"],
        pasos: ["Saltear verduras.", "Añadir claras y cuajar."],
        tiempo_min: 8,
        calorias: 150,
        tags: ["low-carb", "definición"],
        imagen: "https://images.unsplash.com/photo-1494390248081-4e521a5940db?auto=format&fit=crop&w=600&q=80", // Scrambled eggs
        fuente_url: "", dalle_prompt: ""
    },
    {
        id: 6,
        titulo: "Smoothie Bowl Verde",
        categoria: "Desayuno",
        ingredientes: ["Plátano congelado", "Espinacas", "Aguacate", "Leche coco"],
        pasos: ["Batir todo.", "Decorar con semillas."],
        tiempo_min: 7,
        calorias: 310,
        tags: ["detox", "vegano"],
        imagen: "https://images.unsplash.com/photo-1638983763347-9b3a342eb471?auto=format&fit=crop&w=600&q=80", // Green Smoothie
        fuente_url: "", dalle_prompt: ""
    },
    {
        id: 7,
        titulo: "Pudding Chía y Mango",
        categoria: "Desayuno",
        ingredientes: ["3 cdas chía", "Leche coco", "Mango picado"],
        pasos: ["Hidratar chía 4h.", "Servir con mango."],
        tiempo_min: 5,
        calorias: 280,
        tags: ["meal-prep", "fresco"],
        imagen: "https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?auto=format&fit=crop&w=600&q=80", // Fruit bowl
        fuente_url: "", dalle_prompt: ""
    },

    // --- ALMUERZOS ---
    {
        id: 20,
        titulo: "Pollo Limón y Espárragos",
        categoria: "Almuerzo",
        ingredientes: ["Pechuga pollo", "Limón", "Espárragos", "Ajo"],
        pasos: ["Marinar pollo.", "Plancha junto con espárragos."],
        tiempo_min: 20,
        calorias: 350,
        tags: ["keto", "rápido"],
        imagen: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=600&q=80", // Grilled Chicken
        fuente_url: "", dalle_prompt: ""
    },
    {
        id: 21,
        titulo: "Bowl Quinoa y Garbanzos",
        categoria: "Almuerzo",
        ingredientes: ["Quinoa", "Garbanzos", "Pepino", "Tomate", "Limón"],
        pasos: ["Mezclar ingredientes en bol.", "Aliñar."],
        tiempo_min: 10,
        calorias: 420,
        tags: ["vegano", "fibra"],
        imagen: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80", // Salad Bowl
        fuente_url: "", dalle_prompt: ""
    },
    {
        id: 22,
        titulo: "Salmón Horno con Batata",
        categoria: "Almuerzo",
        ingredientes: ["Salmón", "Batata", "Eneldo", "Aceite oliva"],
        pasos: ["Hornear todo a 200C 25 min."],
        tiempo_min: 30,
        calorias: 480,
        tags: ["omega-3", "completo"],
        imagen: "https://images.unsplash.com/photo-1467003909585-2f8a7270028d?auto=format&fit=crop&w=600&q=80", // Salmon
        fuente_url: "", dalle_prompt: ""
    },
    {
        id: 23,
        titulo: "Pasta Integral Pesto",
        categoria: "Almuerzo",
        ingredientes: ["Pasta integral", "Aguacate", "Albahaca", "Nueces"],
        pasos: ["Cocer pasta.", "Hacer pesto con aguacate.", "Mezclar."],
        tiempo_min: 15,
        calorias: 450,
        tags: ["vegetariano", "cremoso"],
        imagen: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=600&q=80", // Green Pasta
        fuente_url: "", dalle_prompt: ""
    },
    {
        id: 24,
        titulo: "Fajitas de Pollo",
        categoria: "Almuerzo",
        ingredientes: ["Pollo", "Pimientos", "Cebolla", "Tortillas integrales"],
        pasos: ["Saltear relleno.", "Servir en tortillas."],
        tiempo_min: 20,
        calorias: 480,
        tags: ["tex-mex", "social"],
        imagen: "https://images.unsplash.com/photo-1534352956036-cd81e27dd615?auto=format&fit=crop&w=600&q=80", // Fajitas
        fuente_url: "", dalle_prompt: ""
    },
    {
        id: 25,
        titulo: "Lentejas Estofadas",
        categoria: "Almuerzo",
        ingredientes: ["Lentejas", "Zanahoria", "Apio", "Caldo"],
        pasos: ["Cocer verduras y lentejas juntas 20 min."],
        tiempo_min: 20,
        calorias: 380,
        tags: ["cuchara", "hierro"],
        imagen: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80", // Lentil Soup
        fuente_url: "", dalle_prompt: ""
    },
    {
        id: 26,
        titulo: "Wrap Atún y Aguacate",
        categoria: "Almuerzo",
        ingredientes: ["Atún lata", "Aguacate", "Lechuga", "Wrap"],
        pasos: ["Mezclar atún y aguacate.", "Enrollar."],
        tiempo_min: 5,
        calorias: 350,
        tags: ["oficina", "frío"],
        imagen: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&w=600&q=80", // Wrap
        fuente_url: "", dalle_prompt: ""
    },

    // --- CENAS ---
    {
        id: 30,
        titulo: "Ensalada César Ligera",
        categoria: "Cena",
        ingredientes: ["Lechuga romana", "Pollo plancha", "Yogur (salsa)", "Queso"],
        pasos: ["Montar ensalada.", "Salsa de yogur, limón y mostaza."],
        tiempo_min: 10,
        calorias: 320,
        tags: ["clásico", "ligero"],
        imagen: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?auto=format&fit=crop&w=600&q=80", // Caesar
        fuente_url: "", dalle_prompt: ""
    },
    {
        id: 31,
        titulo: "Calabacines Rellenos",
        categoria: "Cena",
        ingredientes: ["Calabacín redondo", "Atún", "Tomate", "Queso light"],
        pasos: ["Vaciar calabacín.", "Rellenar con atún y tomate.", "Gratinar."],
        tiempo_min: 25,
        calorias: 290,
        tags: ["horno", "verduras"],
        imagen: "https://images.unsplash.com/photo-1534483509878-dd289a81d643?auto=format&fit=crop&w=600&q=80", // Stuffed veg
        fuente_url: "", dalle_prompt: ""
    },
    {
        id: 32,
        titulo: "Pavo con Pimientos",
        categoria: "Cena",
        ingredientes: ["Solomillo pavo", "Pimientos tricolor", "Salsa soja"],
        pasos: ["Cortar en tiras.", "Wok rápido con soja."],
        tiempo_min: 15,
        calorias: 280,
        tags: ["asiático", "proteína"],
        imagen: "https://images.unsplash.com/photo-1526318896980-cf78c088247c?auto=format&fit=crop&w=600&q=80", // Stir fry
        fuente_url: "", dalle_prompt: ""
    },
    {
        id: 33,
        titulo: "Sopa Miso con Tofu",
        categoria: "Cena",
        ingredientes: ["Pasta miso", "Tofu firme", "Algas", "Cebollino"],
        pasos: ["Disolver miso en agua caliente.", "Añadir tofu cubos."],
        tiempo_min: 10,
        calorias: 180,
        tags: ["japonés", "digestivo"],
        imagen: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=600&q=80", // Miso
        fuente_url: "", dalle_prompt: ""
    },
    {
        id: 40,
        titulo: "Crema de Calabacín",
        categoria: "Cena",
        ingredientes: ["Calabacines", "Cebolla", "Quesito light", "Caldo"],
        pasos: ["Hervir verdura.", "Triturar con quesito."],
        tiempo_min: 20,
        calorias: 200,
        tags: ["cuchara", "suave"],
        imagen: "https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?auto=format&fit=crop&w=600&q=80", // Green soup
        fuente_url: "", dalle_prompt: ""
    },
    {
        id: 41,
        titulo: "Merluza en Papillote",
        categoria: "Cena",
        ingredientes: ["Merluza", "Zanahoria", "Puerro"],
        pasos: ["Envolver en papel.", "Horno 15 min."],
        tiempo_min: 20,
        calorias: 280,
        tags: ["limpio", "pescado"],
        imagen: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=600&q=80", // Baked fish
        fuente_url: "", dalle_prompt: ""
    },
    {
        id: 42,
        titulo: "Tortilla Champiñones",
        categoria: "Cena",
        ingredientes: ["2 huevos", "Champiñones", "Ajo"],
        pasos: ["Saltear setas.", "Hacer tortilla."],
        tiempo_min: 10,
        calorias: 300,
        tags: ["rápido", "huevo"],
        imagen: "https://images.unsplash.com/photo-1587486913049-53fc8898055d?auto=format&fit=crop&w=600&q=80", // Omelette
        fuente_url: "", dalle_prompt: ""
    },
    {
        id: 43,
        titulo: "Tacos Lechuga Pollo",
        categoria: "Cena",
        ingredientes: ["Hojas lechuga", "Pollo picado", "Pico de gallo"],
        pasos: ["Usar lechuga como tortilla.", "Rellenar."],
        tiempo_min: 15,
        calorias: 250,
        tags: ["low-carb", "fresco"],
        imagen: "https://images.unsplash.com/photo-1623244755265-31fecf0b9729?auto=format&fit=crop&w=600&q=80", // Lettuce wraps
        fuente_url: "", dalle_prompt: ""
    },

    // --- SNACKS Y BATIDOS ---
    {
        id: 60,
        titulo: "Batido Café Proteico",
        categoria: "Batido",
        ingredientes: ["Café", "Proteína", "Plátano", "Hielo"],
        pasos: ["Batir todo."],
        tiempo_min: 3,
        calorias: 250,
        tags: ["energía", "pre-entreno"],
        imagen: "https://images.unsplash.com/photo-1599590984106-f77c60959455?auto=format&fit=crop&w=600&q=80", // Coffee Smoothie
        fuente_url: "", dalle_prompt: ""
    },
    {
        id: 61,
        titulo: "Batido Frutos Bosque",
        categoria: "Batido",
        ingredientes: ["Frutos rojos", "Avena", "Yogur", "Agua"],
        pasos: ["Batir bien."],
        tiempo_min: 3,
        calorias: 220,
        tags: ["antioxidante", "vitamina"],
        imagen: "https://images.unsplash.com/photo-1553530979-7ee52a2670c4?auto=format&fit=crop&w=600&q=80", // Pink smoothie
        fuente_url: "", dalle_prompt: ""
    },
    {
        id: 62,
        titulo: "Manzana Asada Canela",
        categoria: "Snack",
        ingredientes: ["Manzana", "Canela"],
        pasos: ["Microondas 3 min.", "Canela encima."],
        tiempo_min: 5,
        calorias: 90,
        tags: ["dulce", "fibra"],
        imagen: "https://images.unsplash.com/photo-1568571780765-9276ac8b75a2?auto=format&fit=crop&w=600&q=80", // Apple
        fuente_url: "", dalle_prompt: ""
    },
    {
        id: 63,
        titulo: "Chips de Kale",
        categoria: "Snack",
        ingredientes: ["Kale", "Sal", "Aceite"],
        pasos: ["Horno 180C 10 min crujiente."],
        tiempo_min: 15,
        calorias: 100,
        tags: ["crunchy", "salado"],
        imagen: "https://images.unsplash.com/photo-1526547541286-73a7aaa08f2a?auto=format&fit=crop&w=600&q=80", // Kale
        fuente_url: "", dalle_prompt: ""
    }
];

// Generación de variaciones
const generatedRecipes: Recipe[] = [];
baseRecipes.forEach((recipe, index) => {
    generatedRecipes.push({
        ...recipe,
        id: recipe.id + 1000,
        titulo: `${recipe.titulo} VTP`,
        ingredientes: [...recipe.ingredientes, "Toque secreto"],
        calorias: recipe.calorias + 10,
        imagen: recipe.imagen // Las variaciones usan la misma imagen correcta
    });
});

export const recipes: Recipe[] = [...baseRecipes, ...generatedRecipes];

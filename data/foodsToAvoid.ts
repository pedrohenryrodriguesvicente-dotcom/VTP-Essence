import { FoodToAvoid } from '../types';

export const foodsToAvoid: FoodToAvoid[] = [
  {
    id: 1,
    nombre: 'Bebidas Azucaradas (Refrescos, Zumos Industriales)',
    motivo: 'Aportan una gran cantidad de "calorías vacías" sin valor nutricional, provocan picos de glucosa e insulina y no generan saciedad, favoreciendo el consumo excesivo de calorías y el almacenamiento de grasa.',
    alternativa: 'Agua, agua con gas y rodajas de limón o pepino, infusiones frías o calientes sin azúcar. Si buscas algo dulce, una pieza de fruta entera que aporta fibra.',
    fuente_url: 'https://www.hsph.harvard.edu/nutritionsource/healthy-drinks/sugary-drinks/'
  },
  {
    id: 2,
    nombre: 'Productos de Bollería y Galletas Industriales',
    motivo: 'Suelen estar cargados de harinas refinadas, azúcares añadidos y grasas trans o de baja calidad (como el aceite de palma). Son muy densos en calorías y pobres en nutrientes.',
    alternativa: 'Avena casera, yogur griego con frutos rojos, una tostada de pan integral con aguacate, o repostería casera usando harinas integrales y endulzantes naturales con moderación.',
    fuente_url: 'https://www.nhs.uk/live-well/eat-well/food-types/top-sources-of-added-sugar-in-our-diet/'
  },
  {
    id: 3,
    nombre: 'Comida Rápida y Frituras Comerciales',
    motivo: 'Generalmente altas en calorías, grasas saturadas, grasas trans y sodio. Su consumo frecuente se asocia con el aumento de peso y problemas cardiovasculares.',
    alternativa: 'Versiones caseras y más saludables: hamburguesas de pollo o legumbres a la plancha, "patatas fritas" de batata al horno, o ensaladas completas.',
    fuente_url: 'https://www.bhf.org.uk/informationsupport/support/healthy-living/healthy-eating/processed-foods'
  },
  {
    id: 4,
    nombre: 'Carnes Procesadas (Embutidos, Salchichas, Bacon)',
    motivo: 'Contienen altas cantidades de sodio y conservantes como los nitritos. La OMS los clasifica como carcinógenos y su consumo se relaciona con un mayor riesgo de enfermedades crónicas.',
    alternativa: 'Fuentes de proteína magra como pechuga de pollo o pavo a la plancha, pescado, huevos, legumbres como las lentejas o los garbanzos, y tofu o tempeh.',
    fuente_url: 'https://www.who.int/es/news-room/questions-and-answers/item/cancer-carcinogenicity-of-the-consumption-of-red-meat-and-processed-meat'
  },
  {
    id: 5,
    nombre: 'Cereales de Desayuno Azucarados',
    motivo: 'A pesar de su marketing, la mayoría son ultraprocesados con una enorme cantidad de azúcar añadido y harinas refinadas, lo que provoca un pico de energía seguido de un bajón y más hambre.',
    alternativa: 'Avena en copos (porridge), muesli sin azúcares añadidos, yogur natural con fruta fresca y nueces, o huevos revueltos.',
    fuente_url: 'https://www.eatingwell.com/article/291239/the-best-and-worst-cereals/'
  },
   {
    id: 6,
    nombre: 'Salsas Comerciales (Kétchup, BBQ, Salsas para Ensalada)',
    motivo: 'Suelen contener grandes cantidades de azúcares ocultos, jarabe de maíz de alta fructosa y sodio, convirtiendo un plato saludable en una bomba calórica.',
    alternativa: 'Aderezos caseros: vinagretas con aceite de oliva virgen extra y vinagre, salsa de yogur con hierbas, hummus, guacamole o mostaza de Dijon.',
    fuente_url: 'https://www.health.harvard.edu/staying-healthy/confused-about-condiments'
  }
];

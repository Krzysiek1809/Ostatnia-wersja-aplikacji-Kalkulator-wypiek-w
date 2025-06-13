
import { Ingredient, RollType, CalculatorConfig } from './types';

export const BASE_FLOUR_REFERENCE_AMOUNT_G = 500; // 500g of flour as a reference for recipe proportions

// --- Kalkulator Bułek (Rolls Calculator) Constants ---
export const DOUGH_YIELD_FACTOR_ROLLS = 1.319;
export const BASE_ROLL_COUNT = 10;

export const BASE_RECIPE_INGREDIENTS_ROLLS: Ingredient[] = [
  { id: 'flour', name: 'Mąka pszenna (typ 500-550)', unit: 'g', baseAmount: BASE_FLOUR_REFERENCE_AMOUNT_G },
  { id: 'water', name: 'Woda (letnia)', unit: 'ml', baseAmount: BASE_FLOUR_REFERENCE_AMOUNT_G * 0.5 },
  { id: 'yeast', name: 'Drożdże świeże', unit: 'g', baseAmount: BASE_FLOUR_REFERENCE_AMOUNT_G * 0.05 },
  { id: 'salt', name: 'Sól', unit: 'g', baseAmount: BASE_FLOUR_REFERENCE_AMOUNT_G * 0.015 },
  { id: 'sugar', name: 'Cukier', unit: 'g', baseAmount: BASE_FLOUR_REFERENCE_AMOUNT_G * 0.02 },
  { id: 'oil', name: 'Olej roślinny', unit: 'ml', baseAmount: BASE_FLOUR_REFERENCE_AMOUNT_G * 0.036 },
  { id: 'bakingImprover', name: 'Polepszacz piekarniczy', unit: 'g', baseAmount: BASE_FLOUR_REFERENCE_AMOUNT_G * 0.005 },
];

export const ROLL_TYPES: RollType[] = [
  { id: 'large', name: 'Bułka duża', finalWeightGrams: 100, displayName: 'Bułka duża (100g wagi/szt.)' },
  { id: 'small', name: 'Bułka mała', finalWeightGrams: 50, displayName: 'Bułka mała (50g wagi/szt.)' },
  { id: 'krakowska', name: 'Bułka krakowska (baton)', finalWeightGrams: 400, displayName: 'Bułka krakowska (400g wagi/szt.)' },
];

export const ROLL_CONFIG: CalculatorConfig = {
  id: 'rolls',
  name: 'Bułki',
  types: ROLL_TYPES,
  ingredients: BASE_RECIPE_INGREDIENTS_ROLLS,
  yieldFactor: DOUGH_YIELD_FACTOR_ROLLS,
  baseFlourReferenceAmount: BASE_FLOUR_REFERENCE_AMOUNT_G,
  baseCount: BASE_ROLL_COUNT,
  defaultSelectedTypeId: 'small',
  initialQuantities: ROLL_TYPES.reduce((acc, rollType) => {
    acc[rollType.id] = rollType.id === 'small' ? BASE_ROLL_COUNT.toString() : '0';
    return acc;
  }, {} as Record<string, string>),
};


// --- Kalkulator Rogali (Croissant/Sweet Roll Calculator) Constants ---
export const DOUGH_YIELD_FACTOR_ROGALS = 1.375;
export const BASE_ROGAL_COUNT = 10;

export const BASE_RECIPE_INGREDIENTS_ROGALS: Ingredient[] = [
  { id: 'flour', name: 'Mąka pszenna (typ 500-550)', unit: 'g', baseAmount: BASE_FLOUR_REFERENCE_AMOUNT_G },
  { id: 'water', name: 'Woda (letnia)', unit: 'ml', baseAmount: BASE_FLOUR_REFERENCE_AMOUNT_G * 0.5 },
  { id: 'yeast', name: 'Drożdże świeże', unit: 'g', baseAmount: BASE_FLOUR_REFERENCE_AMOUNT_G * 0.05 },
  { id: 'sugar', name: 'Cukier', unit: 'g', baseAmount: BASE_FLOUR_REFERENCE_AMOUNT_G * 0.1 },
  { id: 'margarine', name: 'Margaryna', unit: 'g', baseAmount: BASE_FLOUR_REFERENCE_AMOUNT_G * 0.07 },
  { id: 'milkPowder', name: 'Mleko w proszku', unit: 'g', baseAmount: BASE_FLOUR_REFERENCE_AMOUNT_G * 0.018 },
  { id: 'salt', name: 'Sól', unit: 'g', baseAmount: BASE_FLOUR_REFERENCE_AMOUNT_G * 0.015 },
  { id: 'bakingImproverRogal', name: 'Polepszacz (do rogali)', unit: 'g', baseAmount: BASE_FLOUR_REFERENCE_AMOUNT_G * 0.003 },
];

export const ROGAL_TYPES: RollType[] = [
  { id: 'rogale', name: 'Rogale', finalWeightGrams: 100, displayName: 'Rogale (100g wagi/szt.)' },
  { id: 'plecionki', name: 'Plecionki', finalWeightGrams: 100, displayName: 'Plecionki (100g wagi/szt.)' },
  { id: 'maslana', name: 'Bułka maślana', finalWeightGrams: 70, displayName: 'Bułka maślana (70g wagi/szt.)' },
];

export const ROGAL_CONFIG: CalculatorConfig = {
  id: 'croissants',
  name: 'Rogale',
  types: ROGAL_TYPES,
  ingredients: BASE_RECIPE_INGREDIENTS_ROGALS,
  yieldFactor: DOUGH_YIELD_FACTOR_ROGALS,
  baseFlourReferenceAmount: BASE_FLOUR_REFERENCE_AMOUNT_G,
  baseCount: BASE_ROGAL_COUNT,
  defaultSelectedTypeId: 'rogale',
  initialQuantities: ROGAL_TYPES.reduce((acc, rogalType) => {
    acc[rogalType.id] = rogalType.id === 'rogale' ? BASE_ROGAL_COUNT.toString() : '0';
    return acc;
  }, {} as Record<string, string>),
};

// --- Kalkulator Chleba Razowego FIT (Rye Bread FIT Calculator) Constants ---
const RYE_FIT_BASE_FLOUR_WHEAT_G = 65; 
const RYE_FIT_BASE_FLOUR_RYE_G = 105; 
export const RYE_FIT_BASE_FLOUR_SUM_G = RYE_FIT_BASE_FLOUR_WHEAT_G + RYE_FIT_BASE_FLOUR_RYE_G; // 170g total flour for one 400g reference loaf
export const DOUGH_YIELD_FACTOR_RYE_FIT = 400 / RYE_FIT_BASE_FLOUR_SUM_G; 
export const BASE_RYE_FIT_COUNT = 0;

export const BASE_RECIPE_INGREDIENTS_RYE_FIT: Ingredient[] = [
  { id: 'flourWheat650', name: 'Mąka pszenna 650', unit: 'g', baseAmount: RYE_FIT_BASE_FLOUR_WHEAT_G },
  { id: 'flourRye2000', name: 'Mąka razowa 2000', unit: 'g', baseAmount: RYE_FIT_BASE_FLOUR_RYE_G },
  { id: 'primaPan', name: 'PrimaPan', unit: 'g', baseAmount: 43 }, 
  { id: 'kwasBas', name: 'Kwas BAS', unit: 'g', baseAmount: 8.5 }, 
  { id: 'yeast', name: 'Drożdże', unit: 'g', baseAmount: 7.5 }, 
  { id: 'salt', name: 'Sól', unit: 'g', baseAmount: 4.8 }, 
  { id: 'water', name: 'Woda', unit: 'ml', baseAmount: 150 }, 
  { id: 'aromamalt', name: 'Aromamalt', unit: 'g', baseAmount: 6.5 }, 
];

export const RYE_FIT_TYPES: RollType[] = [
  { id: 'loaf400g', name: 'Chleb Razowy FIT', finalWeightGrams: 400, displayName: 'Chleb Razowy FIT (0,40kg)' },
];

export const RYE_FIT_CONFIG: CalculatorConfig = {
  id: 'ryeFitBread',
  name: 'Chleb Razowy FIT',
  types: RYE_FIT_TYPES,
  ingredients: BASE_RECIPE_INGREDIENTS_RYE_FIT,
  yieldFactor: DOUGH_YIELD_FACTOR_RYE_FIT,
  baseFlourReferenceAmount: RYE_FIT_BASE_FLOUR_SUM_G, 
  baseCount: BASE_RYE_FIT_COUNT, 
  defaultSelectedTypeId: 'loaf400g', 
  initialQuantities: RYE_FIT_TYPES.reduce((acc, ryeType) => {
    acc[ryeType.id] = ryeType.id === 'loaf400g' ? BASE_RYE_FIT_COUNT.toString() : '0';
    return acc;
  }, {} as Record<string, string>),
};

// --- Kalkulator Bułki Ciabatta (Ciabatta Roll Calculator) Constants ---
const CIABATTA_BASE_FLOUR_WHEAT_G = 52; // Mąka pszenna 500 per roll
export const CIABATTA_FINAL_WEIGHT_G = 85; // Final weight per roll
export const DOUGH_YIELD_FACTOR_CIABATTA = CIABATTA_FINAL_WEIGHT_G / CIABATTA_BASE_FLOUR_WHEAT_G; // Approx 1.6346
export const BASE_CIABATTA_COUNT = 0;

export const BASE_RECIPE_INGREDIENTS_CIABATTA: Ingredient[] = [
  { id: 'flourWheat500_ciabatta', name: 'Mąka pszenna 500', unit: 'g', baseAmount: CIABATTA_BASE_FLOUR_WHEAT_G },
  { id: 'ciabattaImprover', name: 'Ciabatta Mix', unit: 'g', baseAmount: 5.2 }, // 0.0052 kg
  { id: 'salt', name: 'Sól', unit: 'g', baseAmount: 1.3 }, // 0.0013 kg
  { id: 'yeast', name: 'Drożdże', unit: 'g', baseAmount: 1.6 }, // 0.0016 kg
  { id: 'water', name: 'Woda', unit: 'ml', baseAmount: 39 }, // 0.0039 L (image shows 2.88 for 74, which is 0.0389 per piece)
];

export const CIABATTA_TYPES: RollType[] = [
  { id: 'ciabatta_single', name: 'Bułka Ciabatta', finalWeightGrams: CIABATTA_FINAL_WEIGHT_G, displayName: `Bułka Ciabatta (${CIABATTA_FINAL_WEIGHT_G}g)` },
];

export const CIABATTA_CONFIG: CalculatorConfig = {
  id: 'ciabatta',
  name: 'Bułka Ciabatta',
  types: CIABATTA_TYPES,
  ingredients: BASE_RECIPE_INGREDIENTS_CIABATTA,
  yieldFactor: DOUGH_YIELD_FACTOR_CIABATTA,
  baseFlourReferenceAmount: CIABATTA_BASE_FLOUR_WHEAT_G,
  baseCount: BASE_CIABATTA_COUNT,
  defaultSelectedTypeId: 'ciabatta_single',
  initialQuantities: CIABATTA_TYPES.reduce((acc, type) => {
    acc[type.id] = BASE_CIABATTA_COUNT.toString();
    return acc;
  }, {} as Record<string, string>),
};

// --- Kalkulator Bułki Wiejskiej (Country Roll Calculator) Constants ---
const WIEJSKA_BASE_FLOUR_WHEAT_G = 37; // Mąka pszenna 500 per roll
const WIEJSKA_BASE_FLOUR_RYE_G = 12;   // Mąka żytnia 580 per roll
export const WIEJSKA_BASE_FLOUR_SUM_G = WIEJSKA_BASE_FLOUR_WHEAT_G + WIEJSKA_BASE_FLOUR_RYE_G; // 49g total
export const WIEJSKA_FINAL_WEIGHT_G = 85; // Final weight per roll
export const DOUGH_YIELD_FACTOR_WIEJSKA = WIEJSKA_FINAL_WEIGHT_G / WIEJSKA_BASE_FLOUR_SUM_G; // Approx 1.7347
export const BASE_WIEJSKA_COUNT = 0;

export const BASE_RECIPE_INGREDIENTS_WIEJSKA: Ingredient[] = [
  { id: 'flourWheat500_wiejska', name: 'Mąka pszenna 500', unit: 'g', baseAmount: WIEJSKA_BASE_FLOUR_WHEAT_G },
  { id: 'flourRye580_wiejska', name: 'Mąka żytnia 580', unit: 'g', baseAmount: WIEJSKA_BASE_FLOUR_RYE_G },
  { id: 'wbMix', name: 'WB-MIX', unit: 'g', baseAmount: 8.7 }, // 0.0087 kg
  { id: 'kwasBas', name: 'Kwas BAS', unit: 'g', baseAmount: 0.6 }, // 0.0006 kg
  { id: 'yeast', name: 'Drożdże', unit: 'g', baseAmount: 1.4 }, // 0.0014 kg
  { id: 'salt', name: 'Sól', unit: 'g', baseAmount: 1.1 }, // 0.0011 kg
  { id: 'water', name: 'Woda', unit: 'ml', baseAmount: 40 }, // 0.040 L
];

export const WIEJSKA_TYPES: RollType[] = [
  { id: 'wiejska_single', name: 'Bułka Wiejska', finalWeightGrams: WIEJSKA_FINAL_WEIGHT_G, displayName: `Bułka Wiejska (${WIEJSKA_FINAL_WEIGHT_G}g)` },
];

export const WIEJSKA_CONFIG: CalculatorConfig = {
  id: 'wiejska',
  name: 'Bułka Wiejska',
  types: WIEJSKA_TYPES,
  ingredients: BASE_RECIPE_INGREDIENTS_WIEJSKA,
  yieldFactor: DOUGH_YIELD_FACTOR_WIEJSKA,
  baseFlourReferenceAmount: WIEJSKA_BASE_FLOUR_SUM_G,
  baseCount: BASE_WIEJSKA_COUNT,
  defaultSelectedTypeId: 'wiejska_single',
  initialQuantities: WIEJSKA_TYPES.reduce((acc, type) => {
    acc[type.id] = BASE_WIEJSKA_COUNT.toString();
    return acc;
  }, {} as Record<string, string>),
};

export const CALCULATOR_CONFIGS: Record<string, CalculatorConfig> = {
  [ROLL_CONFIG.id]: ROLL_CONFIG,
  [ROGAL_CONFIG.id]: ROGAL_CONFIG,
  [RYE_FIT_CONFIG.id]: RYE_FIT_CONFIG,
  [CIABATTA_CONFIG.id]: CIABATTA_CONFIG,
  [WIEJSKA_CONFIG.id]: WIEJSKA_CONFIG,
};

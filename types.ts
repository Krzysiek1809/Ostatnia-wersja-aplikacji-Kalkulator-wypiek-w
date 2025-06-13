export interface Ingredient {
  id: string;
  name: string;
  unit: string;
  baseAmount: number; // Amount for a reference sum of flour (e.g., BASE_FLOUR_REFERENCE_AMOUNT_G)
}

export interface CalculatedIngredient extends Ingredient {
  amount: number; // Calculated amount
}

export interface RollType {
  id: string;
  name: string; // Internal name or key
  displayName: string; // Name for UI, e.g., "Bułka duża (100g wagi/szt.)"
  finalWeightGrams: number; // Final weight of one roll of this type
}

export interface CalculatorConfig {
  id: string;
  name: string;
  types: RollType[];
  ingredients: Ingredient[];
  yieldFactor: number;
  baseFlourReferenceAmount: number; // The sum of base flours to which other ingredients are proportioned
  baseCount: number; // Default quantity for the defaultSelectedTypeId
  defaultSelectedTypeId: string;
  initialQuantities: Record<string, string>;
}

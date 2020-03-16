export const INTOLERANCES = 'gluten';

export interface SearchResponse {
  results: SearchResult[];
  baseUri: string;
  offset: number;
  number: number;
  totalResults: number;
  processingTimeMs: number;
  expires: number;
}

export interface SearchResult {
  id: number;
  title: string;
  readyInMinutes: number;
  servings: number;
  image: string;
  imageUrls: string[];
}

export interface GetResponse {
  vegetarian: boolean;
  vegan: boolean;
  glutenFree: boolean;
  dairyFree: boolean;
  veryHealthy: boolean;
  cheap: boolean;
  veryPopular: boolean;
  sustainable: boolean;
  weightWatcherSmartPoints: number;
  gaps: string;
  lowFodmap: boolean;
  preparationMinutes: number;
  cookingMinutes: number;
  sourceUrl: string;
  spoonacularSourceUrl: string;
  aggregateLikes: number;
  spoonacularScore: number;
  healthScore: number;
  creditsText: number;
  sourceName: number;
  pricePerServing: number;
  extendedIngredients: Ingredient[];
  id: number;
  title: string;
  readyInMinutes: string;
  servings: number;
  image: string;
  imageType: string;
  summary: string;
  cuisines: string[];
  dishTypes: string[];
  diets: string[];
  occasions: string[];
  winePairing: {
    pairedWines: string[];
    pairingText: string;
    productMatches: string[];
  };
  instructions: string;
  analyzedInstructions: Instruction[];
  originalId: any;
}

export interface Ingredient {
  id: number;
  aisle: string;
  image: string;
  consistency: string;
  name: string;
  original: string;
  originalString: string;
  originalName: string;
  amount: number;
  unit: string;
  meta: string[];
  metaInformation: string[];
  measures: Measure;
}

export interface Measure {
  us: Measurements;
  metric: Measurements;
}

export interface Measurements {
  amount: number;
  unitShort: string;
  unitLong: string;
}

export interface Instruction {
  name: string;
  steps: Step[];
}

export interface Step {
  number: number;
  step: string;
  ingredients: Identifiers[];
  equipment: Identifiers[];
}

export interface Identifiers {
  id: number;
  name: string;
  image: string;
}

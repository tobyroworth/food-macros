import { lusolve } from 'mathjs';

export type Weight = number & { _brand: Weight };
export type Fat = Weight & { _brand: Fat };
export type Carbs = Weight & { _brand: Carbs };
export type Protein = Weight & { _brand: Protein };

// macro g per g for each food type

export interface MacrosSplit {
  fat: Fat;
  carbs: Carbs;
  protein: Protein;
}

export interface Food extends MacrosSplit {
  name: string;
  portionSize?: Weight;
  calories?: number;
}

export function createFood(
  name: string,
  fat: number,
  carbs: number,
  protein: number,
  calories?: number,
  portionSize?: number,
): Food {
  if (portionSize === 0) {
    throw new Error('Portion size cannot be zero');
  }
  if (portionSize !== undefined) {
    return {
      name,
      fat: (fat / portionSize) as Fat,
      carbs: (carbs / portionSize) as Carbs,
      protein: (protein / portionSize) as Protein,
      portionSize: portionSize as Weight,
      calories: calories !== undefined ? calories / portionSize : undefined,
    };
  }
  return {
    name,
    fat: fat as Fat,
    carbs: carbs as Carbs,
    protein: protein as Protein,
    calories,
  };
}

export type Recipe = Map<Food, Weight>;

// gFatF1.qF1 + gFatF2.qF2 + gFatF3.qF3 = gFatMacros

type Solver = {
  coefficients: Array<Array<Weight>>;
  constants: Array<Weight>;
};

export function solve(foods: Array<Food>, target: MacrosSplit): Recipe {
  if (foods.length !== 3) {
    throw new Error('Needs 3 foods');
  }

  const matrices: Solver = {
    coefficients: [
      [foods[0].fat, foods[1].fat, foods[2].fat],
      [foods[0].carbs, foods[1].carbs, foods[2].carbs],
      [foods[0].protein, foods[1].protein, foods[2].protein],
    ],
    constants: [target.fat, target.carbs, target.protein],
  };

  const amounts = lusolve(
    matrices.coefficients,
    matrices.constants,
  ) as Array<Weight>;

  if (amounts.some((a) => a < 0)) {
    throw new Error('Negative amounts');
  }

  return new Map([
    [foods[0], amounts[0]],
    [foods[1], amounts[1]],
    [foods[2], amounts[2]],
  ]);
}

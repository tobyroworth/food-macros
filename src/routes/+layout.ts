import type { LayoutLoad } from './$types';

import defaultFoods from './foods.json';
import { createFood, type Food } from '$lib/macros/macros';

export const prerender = true;

function loadLocalFoods(): Array<Food> {
  try {
    const localFoods = localStorage.getItem('foods');
    if (localFoods) {
      return JSON.parse(localFoods) as Array<Food>;
    } else throw new Error('No local foods found');
  } catch (error) {
    console.error('Error loading local foods:', error);
    return defaultFoods.map((food: any) => {
      return createFood(
        food.name,
        food.fat,
        food.carbs,
        food.protein,
        food.calories,
        food.portionSize
      );
    }) as Array<Food>;
  }
}

export const load = (async () => {
  const foods = new Set(loadLocalFoods());
  return {
    foods,
  };
}) satisfies LayoutLoad;
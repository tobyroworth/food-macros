<script lang="ts">
import { create } from 'mathjs';
import { createFood } from '$lib/macros/macros';
import type { PageProps } from './$types';

let { data }: PageProps = $props();

let name: string = $state('');
let fat: number = $state(0);
let carbs: number = $state(0);
let protein: number = $state(0);
let portionSize: number = $state(0);
let calories: number = $state(0);

function _save() {
  const newFood = createFood(name, fat, carbs, protein, calories, portionSize);

  const foods = [...data.foods, newFood];
  const foodsString = JSON.stringify(foods);
  localStorage.setItem('foods', foodsString);

  clear();
}

function clear() {
  name = '';
  fat = 0;
  carbs = 0;
  protein = 0;
  calories = 0;
  portionSize = 0;
}
</script>

<form>
  <label>
    Name
    <input bind:value={name} type="text" name="name" />
  </label>
  <label>
    Fat
    <input bind:value={fat} type="number" name="fat" step="0.1" min="0"/>
  </label>
  <label>
    Carbs
    <input bind:value={carbs} type="number" name="carbs" step="0.1" min="0"/>
  </label>
  <label>
    Protein
    <input bind:value={protein} type="number" name="protein" step="0.1" min="0"/>
  </label>
  <label>
    Portion Size (g)
    <input bind:value={portionSize} type="number" name="portionSize" step="0.1" min="0"/>
  </label>
  <label>
    Calories
    <input bind:value={calories} type="number" name="calories" />
  </label>
  <button type="button" onclick={_save}>Add Food</button>
</form>

<style>
  form {
    display: flex;
    flex-direction: column;
  }
</style>
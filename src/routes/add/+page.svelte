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
    <h3>Name</h3>
    <input bind:value={name} type="text" name="name" />
  </label>
  <label>
    <h3>Fat</h3>
    <input bind:value={fat} type="number" name="fat" step="0.1" min="0"/>
  </label>
  <label>
    <h3>Carbs</h3>
    <input bind:value={carbs} type="number" name="carbs" step="0.1" min="0"/>
  </label>
  <label>
    <h3>Protein</h3>
    <input bind:value={protein} type="number" name="protein" step="0.1" min="0"/>
  </label>
  <label>
    <h3>Portion Size (g)</h3>
    <input bind:value={portionSize} type="number" name="portionSize" step="0.1" min="0"/>
  </label>
  <label>
    <h3>Calories</h3>
    <input bind:value={calories} type="number" name="calories" />
  </label>
  <button type="button" onclick={_save}><h3>Add Food</h3></button>
</form>

<style>
  form {
    display: grid;
    grid-auto-rows: auto;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;

    button {
      all: unset;
      cursor: pointer;
      grid-column-start: 2;
    }

    & label {
      grid-column: span 2;
    }

    & label,
    & button {
      display: grid;
      grid-template-columns: subgrid;
      grid-template-rows: subgrid;
      background-color: var(--background-color);
      color: var(--text-color);
      
      /* biome-ignore lint/correctness/noUnknownProperty lint/correctness/noUnknownFunction: not yet in biome */
      corner-shape: superellipse(3);
      border-radius: calc(2* var(--unit));

      h3 {
        padding: var(--unit);
        margin: 0;
        width: 150px;
      }
    }
  }
</style>
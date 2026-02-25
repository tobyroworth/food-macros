<script lang="ts">
import {
  type Carbs,
  type Fat,
  type Food,
  type MacrosSplit,
  type Protein,
  type Recipe,
  solve,
} from '$lib/macros/macros.js';
import type { PageProps } from './$types';

let { data }: PageProps = $props();

let foods: Array<Food> = $state([]);

let error: string = $state('');

let target: MacrosSplit = $state({
  fat: (121 / 3) as Fat,
  carbs: (20 / 3) as Carbs,
  protein: (84 / 3) as Protein,
});

let recipe: Recipe = $derived.by(() => {
  try {
    return solve(foods, target);
  } catch (_e) {
    return new Map();
  }
});

let totals = $derived.by(() => {
  let totalFat = 0;
  let totalCarbs = 0;
  let totalProtein = 0;
  let totalCalories = 0;
  for (const [food, amount] of recipe) {
    totalFat += amount * food.fat;
    totalCarbs += amount * food.carbs;
    totalProtein += amount * food.protein;
    totalCalories += amount * (food.calories || 0);
  }
  return {
    fat: totalFat,
    carbs: totalCarbs,
    protein: totalProtein,
    calories: totalCalories,
  };
});
</script>

<form>
  <label>
    <h3>Food 1</h3>
    <select bind:value={foods[0]}>
      {#each data.foods as food}
      <option value={food}>{food.name}</option>
      {/each}
    </select>
  </label>
  <label>
    <h3>Food 2</h3>
    <select bind:value={foods[1]}>
      {#each data.foods as food}
      <option value={food}>{food.name}</option>
      {/each}
    </select>
  </label>
  <label>
    <h3>Food 3</h3>
    <select bind:value={foods[2]}>
      {#each data.foods as food}
      <option value={food}>{food.name}</option>
      {/each}
    </select>
  </label>
</form>
<div>{error}</div>
<table>
  <thead>
    <tr>
      <th>Food</th>
      <th>Fat</th>
      <th>Carbs</th>
      <th>Protein</th>
      <th>Amount</th>
      <th>Calories</th>
    </tr>
    <!-- <tr>
      <td>Target</td>
      <td>{Number(target.fat).toFixed(1)} g</td>
      <td>{Number(target.carbs).toFixed(1)} g</td>
      <td>{Number(target.protein).toFixed(1)} g</td>
      <td></td>
    </tr> -->
  </thead>
  <tbody>
    {#each recipe as [food, amount]}
    <tr>
      <td>{food.name}</td>
      <td class="number">{Number(amount * food.fat).toFixed(1)} g</td>
      <td class="number">{Number(amount * food.carbs).toFixed(1)} g</td>
      <td class="number">{Number(amount * food.protein).toFixed(1)} g</td>
      <td class="number">{Number(amount).toFixed(1)} g</td>
      <td class="number">{Number(amount * (food.calories || 0)).toFixed(1)} cal</td>
    </tr>
    {/each}
  </tbody>
  <tfoot>
    <tr>
      <td>Total</td>
      <td class="number">{Number(totals?.fat || 0).toFixed(1)} g</td>
      <td class="number">{Number(totals?.carbs || 0).toFixed(1)} g</td>
      <td class="number">{Number(totals?.protein || 0).toFixed(1)} g</td>
      <td class="number"></td>
      <td class="number">{Number(totals?.calories || 0).toFixed(1)} cal</td>
    </tr>
  </tfoot>
</table>

<style>
  td.number {
    text-align: right;
  }

  form {
    display: grid;
    grid-auto-rows: auto;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;

    & button {
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

  table {
    gap: 1rem;
    margin-top: var(--unit);

    & th, & td {
      /* biome-ignore lint/correctness/noUnknownProperty lint/correctness/noUnknownFunction: not yet in biome */
      corner-shape: superellipse(3);
      border-radius: calc(2* var(--unit));
      background-color: var(--background-color);
      color: var(--text-color);
      padding: calc(var(--unit) * 0.5);
    }

    & thead th,
    & tfoot td {
      background-color: color-mix(in lab, var(--background-color), #000);
      color: color-mix(in lab, var(--text-color), #fff);
      font-weight: bold;
    }
  }
</style>

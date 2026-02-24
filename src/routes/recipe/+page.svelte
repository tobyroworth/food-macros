<script lang="ts">
import {solve, type Carbs, type Fat, type Food, type MacrosSplit, type Protein, type Recipe} from '$lib/macros/macros.js';
import type { PageProps } from './$types';

let {data}: PageProps = $props();

let foods: Array<Food> = $state([]);

  let error: string = $state("");

let target: MacrosSplit = $state({
  fat: 121 / 3 as Fat,
  carbs: 20 / 3 as Carbs,
  protein: 84 / 3 as Protein
});

let recipe: Recipe = $derived.by(() => {
  try {
    return solve(foods, target);
  } catch (e) {
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
    calories: totalCalories
  };
});

</script>

<form>
  <label>Food 1
    <select bind:value={foods[0]}>
      {#each data.foods as food}
      <option value={food}>{food.name}</option>
      {/each}
    </select>
  </label>
  <label>Food 2
    <select bind:value={foods[1]}>
      {#each data.foods as food}
      <option value={food}>{food.name}</option>
      {/each}
    </select>
  </label>
  <label>Food 3
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
  form {
    display: flex;
    flex-direction: column;
  }

  td.number {
    text-align: right;
  }
</style>
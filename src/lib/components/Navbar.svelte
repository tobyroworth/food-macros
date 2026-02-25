<script lang="ts">
import { goto } from '$app/navigation';
import { base } from '$app/paths';
import favicon from '$lib/assets/favicon.svg';

let { children } = $props();
</script>

<nav class="rounded">
	<a href="{base}/add">Add Food</a>
	<a href="{base}/recipe">Create Recipe</a>
</nav>

<style>

	nav {
		display: flex;
		gap: var(--unit);
		padding: var(--unit);
		background-color: var(--background-color);

		a {
			font-weight: bold;

			&:hover {
				background-color: color-mix(in lab, var(--background-color), #fff);
				color: color-mix(in lab, var(--text-color), #000);
			}
		}
	}
</style>

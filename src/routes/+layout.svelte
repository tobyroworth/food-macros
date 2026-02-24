<script lang="ts">
import { goto } from '$app/navigation';
import { base } from '$app/paths';
import favicon from '$lib/assets/favicon.svg';

let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<nav>
	<a href="{base}/add">Add Food</a>
	<a href="{base}/recipe">Create Recipe</a>
</nav>

<section>
{@render children()}
</section>

<style>

	* {
		box-sizing: border-box;
		--text-color: #ded;
		--background-color: #343;
		--border-color: #bcb;
		--unit: 1rem;
		
		color: var(--text-color);
	}

	nav {
		display: flex;
		gap: var(--unit);
		padding: var(--unit);
		background-color: var(--background-color);

		& a {
			text-decoration: none;
			font-weight: bold;

			:hover {
				color: ;
			}
		}
	}

	section {
		padding: var(--unit);
	}
</style>

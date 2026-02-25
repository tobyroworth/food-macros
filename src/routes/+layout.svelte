<script lang="ts">
import { goto } from '$app/navigation';
import { base } from '$app/paths';
import favicon from '$lib/assets/favicon.svg';
import Navbar from '$lib/components/Navbar.svelte';

let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=Delius&display=swap" rel="stylesheet">
</svelte:head>

<Navbar />

<section>
{@render children()}
</section>

<style>

	:global(:root) {
		/* :root { */
			box-sizing: border-box;
			--text-color: #ded;
			--background-color: #343;
			--border-color: #bcb;
			--unit: 1rem;
			
			color: var(--text-color);
			/* biome-ignore lint/correctness/noUnknownProperty lint/correctness/noUnknownFunction: not yet in biome */
			corner-shape: superellipse(3);
			border-radius: calc(2* var(--unit));

			font-family: "Delius", cursive, sans-serif;
			font-weight: 400;
			font-style: normal;
		/* } */
	}

	:global(.rounded) {
		/* biome-ignore lint/correctness/noUnknownProperty lint/correctness/noUnknownFunction: not yet in biome */
		corner-shape: superellipse(3);
		border-radius: calc(2* var(--unit));
	}

	:global(a) {
		all: unset;
		cursor: pointer;
	}

	:global(button) {
		all: unset;
		cursor: pointer;
	}

	:global(h3) {
		padding: var(--unit);
		margin: 0;
	}

	:global(section) {
		padding: var(--unit);
	}
</style>

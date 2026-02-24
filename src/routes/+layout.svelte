<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import { goto } from '$app/navigation';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<nav>
	<a onclick={goto("./add")}>Add Food</a>
	<a onclick={goto("./recipe")}>Create Recipe</a>
</nav>

{@render children()}

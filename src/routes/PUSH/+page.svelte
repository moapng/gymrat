<script lang="ts">
	import { Accordion } from '@skeletonlabs/skeleton';
	import Exercise from '../Exercise.svelte';

	let { data } = $props();
</script>

<section>
	<div
		class="card p-4 variant-ghost-primary
		absolute top-5 inset-x-0"
	>
		<h1 class="h1 py-2">bänk & komplement</h1>
		<dl class="flex justify-around">
			<dd class="chip variant-filled-secondary">PR: <b>47,5kgx3</b></dd>
			<dd class="chip variant-filled-primary">mål: <b>50kg</b></dd>
		</dl>
	</div>
	<Accordion autocollapse>
		{#each data.exercises as exercise}
			<Exercise {exercise} />
		{/each}
	</Accordion>
</section>

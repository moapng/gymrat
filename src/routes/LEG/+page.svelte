<script lang="ts">
	import { Accordion } from '@skeletonlabs/skeleton';
	import Exercise from '../Exercise.svelte';
	import LineChart from '../LineChart.svelte';

	let { data } = $props();
</script>

<section>
	<div
		class="card p-4 variant-ghost-primary
		absolute top-5 inset-x-0"
	>
		<h1 class="h1 py-2">knäböj & komplement</h1>
		<dl class="flex justify-around">
			<dd class="chip variant-filled-secondary">PR: <b>100kg</b></dd>
			<dd class="chip variant-filled-primary">mål: <b>105kg</b></dd>
		</dl>

		<LineChart data={data.pr} min={40} />
	</div>
	<Accordion autocollapse>
		{#each data.exercises as exercise}
			<Exercise {exercise} />
		{/each}
	</Accordion>
</section>

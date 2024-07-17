<script lang="ts">
	import { Accordion } from '@skeletonlabs/skeleton';
	import Exercise from '../Exercise.svelte';

	let { data } = $props();
</script>

<section>
	<Accordion autocollapse>
		{#each data.exercises as exercise}
			<Exercise {exercise} />
		{/each}
	</Accordion>
</section>

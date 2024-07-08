<script lang="ts">
	import Exercise from '../Exercise.svelte';

	let { data } = $props();
</script>

<section>
	{#each data.exercises as exercise}
		<Exercise {exercise} />
	{/each}
</section>
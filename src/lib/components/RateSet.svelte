<script lang="ts">
	import { insertWorkout } from '$lib/api';
	import { cycleState, programState } from '$lib/stores/workout.svelte';

	const { lift, weight, repetitions } = $props();

	const handleClick = (rating: string) => {
		insertWorkout(lift, weight, repetitions, rating, programState.programName, cycleState.cycle.id);
	};

	const ratings = ['🔥', '😌', '😐', '😞', '💩'];
</script>

<div class="grid grid-cols-3">
	{#each ratings as rating}
		<button onclick={() => handleClick(rating)}>{rating}</button>
	{/each}
</div>

<style>
	button {
		font-size: 2rem;
		background-color: violet;
	}
</style>

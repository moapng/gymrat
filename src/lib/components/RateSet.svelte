<script lang="ts">
	import { insertWorkout, updateCycle } from '$lib/api';
	import { cycleState, programState } from '$lib/stores/workout.svelte';

	const { lift, weight, repetitions } = $props();

	let allSetsDone = $state(false);
	const handleClick = async (rating: string) => {
		const cycle = cycleState.cycle;

		if (cycle) {
			console.log(lift);
			insertWorkout(lift, weight, repetitions, rating, programState.programName, cycle.id);
			// TODO: toaster å stäng popper om status.ok
			const column = lift + '_done';
			console.log(column);
			if (allSetsDone) updateCycle(cycle.id, column, true);

			// if (cycle?.böj_done && cycle?.bänk_done && cycle?.mark_done) {
			// 	console.log('cycle done, create new cycle');
			// 	const response = await insertNewCycle(
			// 		cycle.cycle,
			// 		userState.user?.user_metadata.user_name,
			// 		programState.programName
			// 	);
			// 	if (response) cycleState.cycle = response;
			// }
		}
	};

	const ratings = ['🔥', '😌', '😐', '😞', '💩'];
</script>

<div class="grid grid-cols-3">
	{#each ratings as rating}
		<button onclick={() => handleClick(rating)}>{rating}</button>
	{/each}
	<input type="checkbox" bind:checked={allSetsDone} />
</div>

<style>
	button {
		font-size: 2rem;
		background-color: violet;
	}
</style>

<script lang="ts">
	import { insertPR, insertWorkout, updateCycle } from '$lib/api';
	import { popperState } from '$lib/stores/popper.svelte';
	import { toastState } from '$lib/stores/toast.svelte';
	import { cycleState, programState } from '$lib/stores/workout.svelte';

	const { lift, weight, repetitions } = $props();

	let allSetsDone = $state(false);
	// TODO: automatisk om senaste setten e 4 av böj tex ?
	const handleClick = async (rating: string) => {
		const cycle = cycleState.cycle;

		if (cycle) {
			const workoutResponse = await insertWorkout(
				lift,
				weight,
				repetitions,
				rating,
				programState.programName,
				cycle.id
			);
			if (workoutResponse.status === 201) {
				toastState.text = 'workout added';
				toastState.type = 'success';
				toastState.visible = true;
			} else {
				toastState.text = 'error';
				toastState.type = 'error';
				toastState.visible = true;
			}

			const column = lift + '_done';
			if (allSetsDone && workoutResponse.data) {
				updateCycle(cycle.id, column, true);
			}

			popperState.visible = false;
		}
	};

	const ratings = ['🔥', '😌', '😐', '😞', '💩'];
</script>

<div class="grid grid-cols-3">
	{#each ratings as rating}
		<button class="btn" onclick={() => handleClick(rating)}>{rating}</button>
	{/each}
	<input type="checkbox" bind:checked={allSetsDone} />
</div>

<style>
	button {
		font-size: 1rem;
		background-color: violet;
	}
</style>

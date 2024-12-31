<script lang="ts">
	import { insertPR, insertWorkout, updateCycle } from '$lib/api';
	import { popperVisibleState } from '$lib/stores/popper.svelte';
	import { toastState } from '$lib/stores/toast.svelte';
	import { cycleState, programState } from '$lib/stores/workout.svelte';

	const { lift, weight, repetitions } = $props();

	let allSetsDone = $state(false);
	// TODO: automatisk om senaste setten e 4 av böj tex ?
	let isPR = $state(false);
	// TODO: automatisk PR
	const handleClick = async (rating: string) => {
		const cycle = cycleState.cycle;

		if (cycle) {
			console.log(lift);
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
			if (isPR && workoutResponse.data) {
				insertPR(lift, weight, repetitions, workoutResponse.data.id);
			}

			popperVisibleState.visible = false;
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
	<input type="checkbox" bind:checked={isPR} />
</div>

<style>
	button {
		font-size: 2rem;
		background-color: violet;
	}
</style>

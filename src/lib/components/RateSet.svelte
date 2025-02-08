<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { insertWorkout, updateCycle } from '$lib/api';
	import { cycleState } from '$lib/stores/workout.svelte';

	let { lift, weight, repetitions } = $props();

	let allSetsDone = $state(false);
	// TODO: automatisk om senaste setten e 4 av böj tex ?
	const handleClick = async (rating: string) => {
		const cycle = cycleState.cycle;

		if (cycleState && cycle) {
			const workoutResponse = await insertWorkout(
				lift,
				weight,
				repetitions,
				rating,
				cycleState.cycle.program_name,
				cycle.id
			);

			// const column = lift + '_done';
			// if (allSetsDone && workoutResponse?.data) {
			// 	updateCycle(cycle.id, column, true);
			// }
		}
		setTimeout(() => {
			invalidateAll();
		}, 500);
	};

	const ratings = ['🔥', '😌', '😐', '😞', '💩'];
</script>

<div class="grid grid-cols-2">
	<input class="w-4 col-span-2" type="text" inputmode="numeric" bind:value={weight} />
	<button class="btn btn-secondary text-large" onclick={() => (weight -= 2.5)}>-</button>
	<button class="btn btn-secondary text-large" onclick={() => (weight += 2.5)}>+</button>
</div>
<div class="grid grid-cols-3">
	{#each ratings as rating}
		<button class="btn btn-secondary text-large" onclick={() => handleClick(rating)}>
			{rating}
		</button>
	{/each}
	<!-- <input type="checkbox" bind:checked={allSetsDone} /> -->
</div>
<div class="grid grid-cols-2">
	<input class="w-4 col-span-2" type="text" inputmode="numeric" bind:value={repetitions} />
	<button class="btn btn-secondary text-large" onclick={() => repetitions--}>-</button>
	<button class="btn btn-secondary text-large" onclick={() => repetitions++}>+</button>
</div>

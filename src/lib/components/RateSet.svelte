<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { insertWorkout, updateBlock } from '$lib/api';
	import { blockState } from '$lib/stores/workout.svelte';

	let { lift, weight, repetitions } = $props();

	let allSetsDone = $state(false);
	// TODO: automatisk om senaste setten e 4 av böj tex ?
	const handleClick = async (rating: string) => {
		const block = blockState.block;

		if (blockState && block) {
			const workoutResponse = await insertWorkout(
				lift,
				weight,
				repetitions,
				rating,
				comment,
				blockState.block.program_name,
				block.id
			);

			// const column = lift + '_done';
			// if (allSetsDone && workoutResponse?.data) {
			// 	updateBlock(block.id, column, true);
			// }
		}
		setTimeout(() => {
			invalidateAll();
		}, 500);
	};

	const ratings = ['🔥', '😌', '😐', '😞', '💩'];

	let comment = $state('');
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
	<input type="text" bind:value={comment} placeholder="kommentar" class="col-span-3" />
</div>
<div class="grid grid-cols-2">
	<input class="w-4 col-span-2" type="text" inputmode="numeric" bind:value={repetitions} />
	<button class="btn btn-secondary text-large" onclick={() => repetitions--}>-</button>
	<button class="btn btn-secondary text-large" onclick={() => repetitions++}>+</button>
</div>

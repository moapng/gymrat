<script lang="ts">
	import { insertPR, insertWorkout } from '$lib/api';
	import { Lift, ToastType } from '$lib/interfaces';
	import { hidePopper } from '$lib/stores/popper.svelte';
	import { toastState } from '$lib/stores/toast.svelte';
	import { blockState } from '$lib/stores/workout.svelte';

	let weight = $state(0);
	let repetitions = $state(0);
	let lift = $state(Lift.böj);

	const handleClick = async () => {
		if (weight <= 0 || repetitions <= 0) {
			toastState.text = 'vikt lr reps måste va mer än 0';
			toastState.type = ToastType.error;
			toastState.visible = true;
		} else {
			if (blockState.block) {
				const workoutResponse = await insertWorkout(
					lift,
					weight,
					repetitions,
					'🔥',
					blockState.block.program_name,
					blockState.block.id
				);
				if (workoutResponse?.status === 201) {
					insertPR(
						workoutResponse.data.lift,
						workoutResponse.data.weight,
						workoutResponse.data.repetitions,
						workoutResponse.data.id
					);

					hidePopper();
				}
			}
		}
	};
</script>

<div class="grid grid-cols-2 px-3">
	<input class="w-6" type="text" inputmode="numeric" bind:value={weight} />
	<input class="w-6" type="text" inputmode="numeric" bind:value={repetitions} />

	<select bind:value={lift}>
		<option value={Lift.böj}>{Lift.böj}</option>
		<option value={Lift.bänk}>{Lift.bänk}</option>
		<option value={Lift.mark}>{Lift.mark}</option>
	</select>
	<button class="btn btn-primary" onclick={() => handleClick()}>nytt PB</button>
</div>

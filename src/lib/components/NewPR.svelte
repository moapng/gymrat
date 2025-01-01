<script lang="ts">
	import { insertPR, insertWorkout } from '$lib/api';
	import { Lift } from '$lib/interfaces';
	import { cycleState } from '$lib/stores/workout.svelte';

	let weight = $state(0);
	let repetitions = $state(0);
	let lift = $state(Lift.bänk);

	const handleClick = async () => {
		if (cycleState.cycle) {
			const workoutResponse = await insertWorkout(
				lift,
				weight,
				repetitions,
				'🔥',
				cycleState.cycle.program_name,
				cycleState.cycle.id
			);
			if (workoutResponse.status === 201) {
				insertPR(
					workoutResponse.data.lift,
					workoutResponse.data.weight,
					workoutResponse.data.repetitions,
					workoutResponse.data.id
				);
			}
		}
	};
</script>

<select bind:value={lift}>
	<option value={Lift.böj}></option>
	<option value={Lift.bänk}></option>
	<option value={Lift.mark}></option>
</select>
<input type="text" inputmode="numeric" bind:value={weight} />
<input type="text" inputmode="numeric" bind:value={repetitions} />

<button class="btn btn-primary" onclick={() => handleClick()}>nytt PB wihoo</button>

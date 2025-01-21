<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { insertNewCycle } from '$lib/api';
	import { Lift, TexasWeek } from '$lib/interfaces';
	import { userState } from '$lib/stores/user.svelte';
	import { cycleState } from '$lib/stores/workout.svelte';

	let nextTexasWeek = $state(TexasWeek.deload);

	const setNextCycle = () => {
		if (cycleState.cycle?.cycle) {
			insertNewCycle(
				cycleState.cycle?.cycle,
				userState.user?.user_metadata.user_name,
				cycleState.cycle?.program_name,
				nextTexasWeek
			);

			setTimeout(() => {
				invalidateAll();
			}, 500);
		}
	};

	const autoSetNextCycle = async () => {
		if (cycleState.cycle?.cycle) {
			switch (cycleState.cycle.texas_week) {
				case TexasWeek.deload:
					nextTexasWeek = TexasWeek.volume;
					break;
				case TexasWeek.volume:
					nextTexasWeek = TexasWeek.intensity;
					break;
				case TexasWeek.intensity:
					nextTexasWeek = TexasWeek.deload;
					break;
			}

			insertNewCycle(
				cycleState.cycle?.cycle,
				userState.user?.user_metadata.user_name,
				cycleState.cycle?.program_name,
				nextTexasWeek
			);

			setTimeout(() => {
				invalidateAll();
			}, 500);
		}
	};
</script>

<div class="grid grid-cols-2 px-3">
	<div class="flex flex-col">
		<select bind:value={nextTexasWeek}>
			<option value={TexasWeek.volume}>{TexasWeek.volume}</option>
			<option value={TexasWeek.intensity}>{TexasWeek.intensity}</option>
			<option value={TexasWeek.deload}>{TexasWeek.deload}</option>
		</select>
		<button class="btn btn-primary" onclick={() => setNextCycle()}>xxx</button>
	</div>
	<button class="btn btn-primary" onclick={() => autoSetNextCycle()}>auto nästa</button>
</div>

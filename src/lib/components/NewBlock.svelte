<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { insertNewBlock } from '$lib/api';
	import { Lift, TexasWeek } from '$lib/interfaces';
	import { userState } from '$lib/stores/user.svelte';
	import { blockState } from '$lib/stores/workout.svelte';

	let nextTexasWeek = $state(TexasWeek.deload);

	const setNextBlock = () => {
		if (blockState.block?.block) {
			insertNewBlock(
				blockState.block?.block,
				userState.user?.user_metadata.user_name,
				blockState.block?.program_name,
				nextTexasWeek
			);

			setTimeout(() => {
				invalidateAll();
			}, 500);
		}
	};

	const autoSetNextBlock = async () => {
		if (blockState.block?.block) {
			switch (blockState.block.texas_week) {
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

			insertNewBlock(
				blockState.block?.block,
				userState.user?.user_metadata.user_name,
				blockState.block?.program_name,
				nextTexasWeek
			);

			setTimeout(() => {
				invalidateAll();
			}, 500);
		}
	};
</script>

<div class="grid grid-cols-2 px-3">
	<div class="flex flex-col w-8">
		<select bind:value={nextTexasWeek}>
			<option value={TexasWeek.volume}>{TexasWeek.volume}</option>
			<option value={TexasWeek.intensity}>{TexasWeek.intensity}</option>
			<option value={TexasWeek.deload}>{TexasWeek.deload}</option>
		</select>
		<button class="btn btn-primary" onclick={() => setNextBlock()}>{nextTexasWeek} nästa</button>
	</div>
	<button class="btn btn-primary w-8" onclick={() => autoSetNextBlock()}>auto nästa</button>
</div>

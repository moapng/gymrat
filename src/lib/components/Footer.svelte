<script lang="ts">
	import { insertNewCycle } from '$lib/api';
	import { TexasWeek } from '$lib/interfaces';
	import { popperState, showPopper, hidePopper } from '$lib/stores/popper.svelte';
	import { toastState } from '$lib/stores/toast.svelte';
	import { userState } from '$lib/stores/user.svelte';
	import { cycleState, programState } from '$lib/stores/workout.svelte';
	import NewPR from './NewPR.svelte';

	const setNextCycle = async () => {
		if (cycleState.cycle?.cycle) {
			let nextTexasWeek;
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

			const response = await insertNewCycle(
				cycleState.cycle?.cycle,
				userState.user?.user_metadata.user_name,
				programState.programName,
				nextTexasWeek
			);
			if (response.status === 201) {
				toastState.text = 'yay ny cykel';
				toastState.type = 'success';
				toastState.visible = true;
				cycleState.cycle = response.data;
			}
		}
	};

	const togglePopper = (e: Event) => {
		if (!popperState.visible) {
			showPopper(e.currentTarget as HTMLElement, NewPR, {});
		} else {
			hidePopper();
		}
	};
</script>

<div class="flex">
	<button class="btn btn-primary" onclick={() => setNextCycle()}>nästa set</button>

	<button class="btn btn-primary" onclick={(e) => togglePopper(e)}>nytt PB</button>
</div>

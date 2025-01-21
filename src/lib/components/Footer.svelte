<script lang="ts">
	import { popperState, showPopper, hidePopper } from '$lib/stores/popper.svelte';
	import NewPR from './NewPR.svelte';
	import NewCycle from './NewCycle.svelte';

	const togglePopper = (e: Event, type: 'cykel' | 'pb') => {
		if (!popperState.visible) {
			type === 'pb'
				? showPopper(e.currentTarget as HTMLElement, NewPR, {})
				: showPopper(e.currentTarget as HTMLElement, NewCycle, {});
		} else {
			hidePopper();
		}
	};
</script>

<div class="flex">
	<button class="btn btn-primary" onclick={(e) => togglePopper(e, 'cykel')}>ny cykel</button>

	<button class="btn btn-primary" onclick={(e) => togglePopper(e, 'pb')}>nytt PB</button>
</div>

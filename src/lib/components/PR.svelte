<script lang="ts">
	import { popperState, showPopper, hidePopper } from '$lib/stores/popper.svelte';
	import NewPR from './NewPR.svelte';

	const togglePopper = (e: Event) => {
		if (!popperState.visible) {
			showPopper(e.currentTarget as HTMLElement, NewPR, {});
		} else {
			hidePopper();
		}
	};
</script>

<button onclick={(e) => togglePopper(e)}>nytt PB</button>

<script lang="ts">
	import { referenceState } from '$lib/stores/reference.svelte';
	import { onMount } from 'svelte';

	let { children, popperVisible = $bindable(), position = 'below' } = $props();
	let popperElement: HTMLElement | undefined = $state();
	let isFirstClick = $state(true);

	const setPosition = () => {
		if (referenceState.reference && popperElement) {
			const referenceRect = referenceState.reference.getBoundingClientRect();
			const popperRect = popperElement.getBoundingClientRect();
			popperElement.style.position = 'absolute';

			if (position === 'above') {
				let bottom = window.innerHeight - referenceRect.top - popperRect.height;
				popperElement.style.bottom = `${bottom}px`;
			} else {
				let top = referenceRect.bottom - popperRect.height * 2.5;
				popperElement.style.top = `${top}px`;
			}

			popperElement.style.left = `0px`;
		}
	};

	const handleClickOutside = (event: Event) => {
		if (popperVisible) {
			if (isFirstClick) {
				isFirstClick = false;
			} else if ((event.target as HTMLElement) !== popperElement) {
				popperVisible = false;
				referenceState.reference = undefined;
			}
		}
	};

	onMount(() => {
		setPosition();
	});
</script>

<svelte:window onclick={(e) => handleClickOutside(e)} />

{#if popperVisible}
	<div
		bind:this={popperElement}
		id="popper"
		class="bg-secondary text-secondary w-full flex justify-center"
	>
		{@render children()}
	</div>
{/if}

<style>
	#popper {
		height: 80px;
	}
</style>

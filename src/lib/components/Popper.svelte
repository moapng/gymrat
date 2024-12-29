<script lang="ts">
	import { referenceState } from '$lib/stores/reference.svelte';
	import { onMount } from 'svelte';

	let { children, popperVisible = $bindable() } = $props();
	let popperElement: HTMLElement | undefined = $state();
	let isFirstClick = $state(true);

	const setPosition = () => {
		if (referenceState.reference && popperElement) {
			const referenceRect = referenceState.reference.getBoundingClientRect();

			const bottom = window.innerHeight - referenceRect.bottom - 40;
			let left = 0;

			popperElement.style.position = 'absolute';
			popperElement.style.bottom = `${bottom}px`;
			popperElement.style.left = `${left}px`;
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

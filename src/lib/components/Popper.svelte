<script lang="ts">
	import { referenceState } from '$lib/stores/reference.svelte';
	import { onMount } from 'svelte';

	let { children } = $props();
	let popperElement: HTMLElement;

	const setPosition = () => {
		if (referenceState.reference && popperElement) {
			const referenceRect = referenceState.reference.getBoundingClientRect();
			console.log(referenceRect);
			let top = referenceRect.top - 300;
			let left = 1;

			popperElement.style.position = 'absolute';
			popperElement.style.top = `${top}px`;
			popperElement.style.left = `${left}vw`;
		}
	};

	onMount(() => {
		setPosition();
		// window.addEventListener('resize', setPosition);
	});
</script>

<div bind:this={popperElement} class="popper">
	{@render children()}
</div>

<style>
	.popper {
		position: absolute;
		top: 0;
		left: 0;

		border: 1px solid #ccc;
		padding: 10px;

		background-color: tomato;
		color: azure;

		width: 90vw;
		height: 20vh;
	}
</style>

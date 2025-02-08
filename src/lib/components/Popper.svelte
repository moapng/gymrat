<script lang="ts">
	import { popperState, referenceState } from '$lib/stores/popper.svelte';

	let popperElement: HTMLElement | undefined = $state();
	let isFirstClick = $state(true);

	const setPosition = () => {
		if (referenceState.reference && popperElement) {
			const referenceRect = referenceState.reference.getBoundingClientRect();
			popperElement.style.position = 'absolute';
			if (popperState.position === 'above') {
				let bottom = window.innerHeight - referenceRect.top;
				popperElement.style.bottom = `${bottom}px`;
			} else {
				let top = referenceRect.bottom;
				popperElement.style.top = `${top}px`;
			}

			popperElement.style.left = `0px`;
		}
	};

	const handleClickOutside = (event: Event) => {
		if (popperState.visible) {
			if (isFirstClick) {
				isFirstClick = false;
			}
			// TODO: fix click outside
			// else if (
			// 	popperElement &&
			// 	(event.target as HTMLElement) !== popperElement &&
			// 	!popperElement.contains(event.target as Node)
			// ) {
			// 	hidePopper();
			// }
		}
	};

	$effect(() => {
		setPosition();
	});
</script>

<svelte:window onclick={(e) => handleClickOutside(e)} />

{#if popperState.visible}
	<dialog
		bind:this={popperElement}
		id="popper"
		class="bg-glass text-secondary w-full flex justify-center h-fit shadow-lg b-0 p-0 pt-6 pb-4"
	>
		<!-- svelte-ignore svelte_component_deprecated -->
		<svelte:component this={popperState.component} {...popperState.props}></svelte:component>
		<button
			class="absolute top-0 right-0 h-2 w-2 p-0 text-secondary"
			onclick={() => (popperState.visible = false)}
			aria-label="Close popper"
		>
			<i class="fa-solid fa-ban"></i>
		</button>
	</dialog>
{/if}

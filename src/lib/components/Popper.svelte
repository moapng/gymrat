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
			else if (
				popperElement &&
				(event.target as HTMLElement) !== popperElement &&
				!popperElement.contains(event.target as Node) &&
                !referenceState.reference?.contains(event.target as Node)
			) {
				popperState.visible = false;
			}
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
		class="bg-glass text-secondary w-full flex justify-center h-fit shadow-lg b-0 p-0 pt-6 pb-4 popper-animation"
	>
		<!-- svelte-ignore svelte_component_deprecated -->
		<svelte:component this={popperState.component} {...popperState.props}></svelte:component>
		<button
			class="absolute top-0 right-0 p-2 text-secondary close-btn"
			onclick={() => (popperState.visible = false)}
			aria-label="Close popper"
		>
			<i class="fa-solid fa-ban"></i>
		</button>
	</dialog>
{/if}

<style lang="scss">
    @use '../../../src/variables.scss' as *;
    
    dialog {
        transform-origin: top center;
        max-width: min(500px, 90vw);
        border: 2px solid $border-color;
        box-shadow: 6px 6px 0 $shadow-color !important;
    }
    
    .popper-animation {
        animation: pop-in 0.2s ease-out forwards;
    }
    
    .close-btn {
        transition: all 0.2s ease;
        border: none;
		box-shadow: none;
		background: none;
        
        &:hover {
            color: $primary-color;
            transform: scale(1.1);
        }
    }
    
    @keyframes pop-in {
        0% {
            opacity: 0;
            transform: translateY(-10px) scale(0.95);
        }
        100% {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
    }
</style>

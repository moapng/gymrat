<script>
	import { toastState } from '$lib/stores/toast.svelte';
	$effect(() => {
		if (toastState.visible) {
			setTimeout(() => {
				toastState.visible = false;
			}, 3000);
		}
	});
</script>

{#if toastState.visible && toastState.text}
	<div class="toast {toastState.type} visible shadow-lg">
		{toastState.text}
	</div>
{/if}

<style>
	.toast {
		position: absolute;
		bottom: 1rem;
		left: 50%;
		transform: translateX(-50%);
		padding: 1rem;
		border-radius: 0.5rem;
		color: white;
		background-color: black;
		opacity: 0;
		transition: opacity 0.3s ease-in-out;

		z-index: 99;
	}
	.toast.visible {
		opacity: 1;
	}
	.toast.info {
		background-color: blue;
	}
	.toast.success {
		background-color: green;
	}
	.toast.error {
		background-color: red;
	}
</style>

<script lang="ts">
	import type { IExercise } from '$lib/interfaces';
	import { AccordionItem } from '@skeletonlabs/skeleton';
	import WeightAndRepInputs from './WeightAndRepInputs.svelte';

	type Props = {
		exercise: IExercise;
	};

	//@ts-ignore
	let { exercise } = $props<Props>();

	let show_toast: boolean = $state(false);
	let toast_message = $state();
	let toast_error = $state();
</script>

{#if show_toast}
	<div class="toast toast-center toast-top">
		{#if toast_message}
			<div class="alert alert-success">
				<p>✨ {toast_message} ✨</p>
			</div>
		{:else if toast_error}
			<div class="alert alert-error">
				<p>⚠️ {toast_error} ⚠️</p>
			</div>
		{/if}
	</div>
{/if}

<AccordionItem class="variant-ghost-primary" onclick>
	<svelte:fragment slot="summary">
		{exercise.exercise_name}
	</svelte:fragment>
	<svelte:fragment slot="content">
		<WeightAndRepInputs exercise_id={exercise.id} {show_toast} {toast_message} {toast_error} />
	</svelte:fragment>
</AccordionItem>

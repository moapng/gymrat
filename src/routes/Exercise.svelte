<script lang="ts">
	import type { IExercise } from '$lib/interfaces';
	import { AccordionItem } from '@skeletonlabs/skeleton';
	import WeightAndRepInputs from './WeightAndRepInputs.svelte';

	type Props = {
		exercise: IExercise;
	};

	//@ts-ignore
	let { exercise } = $props<Props>();
</script>

<AccordionItem class="variant-ghost-primary">
	<svelte:fragment slot="summary">
		{exercise.exercise_name}
	</svelte:fragment>
	<svelte:fragment slot="content">
		<WeightAndRepInputs exercise_id={exercise.id} />
	</svelte:fragment>
</AccordionItem>

<script lang="ts">
	import { AccordionItem } from '@skeletonlabs/skeleton';
	import WeightAndRepInputs from './WeightAndRepInputs.svelte';
	import type { ICycle, ILift } from '$lib/interfaces';

	let {
		current_cycle,
		current_week,
		lift
	}: { current_cycle: ICycle; current_week: number; lift: ILift } = $props();
</script>

<AccordionItem class="variant-soft-primary">
	<svelte:fragment slot="summary">
		{lift.name}
	</svelte:fragment>
	<svelte:fragment slot="content">
		<WeightAndRepInputs {current_cycle} {current_week} set_number={1} lift_name={lift.name} />
		<WeightAndRepInputs {current_cycle} {current_week} set_number={2} lift_name={lift.name} />
		<WeightAndRepInputs {current_cycle} {current_week} set_number={3} lift_name={lift.name} />
	</svelte:fragment>
</AccordionItem>

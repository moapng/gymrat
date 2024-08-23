<script lang="ts">
	import { Accordion, getToastStore } from '@skeletonlabs/skeleton';
	import LiftSet from '../LiftSet.svelte';
	import {
		get_current_cycle,
		get_latest_sets,
		get_latest_week_from_sets,
		check_is_week_complete,
		get_next_week,
		get_remaining_lifts_for_the_week
	} from '$lib/api';
	import { type ICycle, Lift, type ISet, type ILift } from '$lib/interfaces';
	import { onMount } from 'svelte';

	let { data } = $props();

	const toast_store = getToastStore();

	let current_week: number = $state(1);
	let current_cycle: ICycle | null = $state(null);

	let completed_lifts: string[] | [] = $state([]);
	let lifts_to_do: ILift[] = $state([]);

	let latest_sets: ISet[] = $state([]);

	let is_week_complete = $state(false);

	onMount(async () => {
		current_cycle = await get_current_cycle();

		if (current_cycle !== null) {
			latest_sets = await get_latest_sets();
			current_week = await get_latest_week_from_sets(latest_sets);
		}
	});
	$effect(() => {
		is_week_complete = check_is_week_complete(latest_sets, current_week);
		if (is_week_complete) {
			toast_store.trigger({
				message: `veckkaaaa ${current_week} klaaaaar, get rdy för ${get_next_week(+current_week)}`,
				hideDismiss: true,
				timeout: 5000,
				background: 'bg-gradient-to-r from-success-500 to-success-400',
				classes: 'border-4 border-success-500'
			});
			current_week = get_next_week(+current_week);
		}
		lifts_to_do = get_remaining_lifts_for_the_week(latest_sets, current_week);
	});
</script>

<section>
	<h1 class="text-3xl font-bold">Vecka: {current_week}</h1>
	<h2 class="text-2xl font-bold">Lift kvar</h2>
	<ul class="gap-2">
		{#each lifts_to_do as lift}
			<li>{lift.name} - {lift.sets_to_do}</li>
		{/each}
	</ul>
	<h2 class="text-2xl font-bold">senaste lyftet</h2>
	<ul>
		{latest_sets[0]?.lift_name}
	</ul>
	<Accordion autocollapse class="space-y-0">
		{#if current_cycle && current_week}
			{#each data.lifts as lift}
				<LiftSet {current_cycle} {current_week} {lift} />
			{/each}
		{/if}
	</Accordion>
</section>

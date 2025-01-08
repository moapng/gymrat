<script lang="ts">
	import { getTodaysWorkouts } from '$lib/api';
	import {
		Lift,
		TexasFactor,
		TexasRepetitions,
		type OneRepMax,
		type supabaseWorkout
	} from '$lib/interfaces';
	import { calculateRPE, calculateTexasMethod, roundToNearestTwoPointFive } from '$lib/math';
	import { hidePopper, popperState, showPopper } from '$lib/stores/popper.svelte';
	import { cycleState } from '$lib/stores/workout.svelte';
	import RateSet from './RateSet.svelte';

	let { data, RPE = $bindable(), repetitions = $bindable() } = $props();
	let isOpen = $state({ [Lift.böj]: true, [Lift.bänk]: true, [Lift.mark]: true });
	let position = $state('above');
	let liftOpen: Lift = $state(Lift.böj);
	let todaysCompletedWorkouts: supabaseWorkout[] | null = $state(null);

	let oneRepMax: OneRepMax = $state({
		[Lift.böj]: data.böj as number,
		[Lift.bänk]: data.bänk as number,
		[Lift.mark]: data.mark as number
	});
	let calculatedWithTexasMethod: OneRepMax = Object.entries(oneRepMax)
		.map(([key, value]) => {
			if (cycleState.cycle) {
				const texasValue = calculateTexasMethod(value, +TexasFactor[cycleState.cycle.texas_week]);

				return { [key]: roundToNearestTwoPointFive(texasValue) };
			}
		})
		.reduce((acc, cur) => ({ ...acc, ...cur }), {} as OneRepMax);
	let calculatedWithRPE: OneRepMax = $state({
		[Lift.böj]: 0,
		[Lift.bänk]: 0,
		[Lift.mark]: 0
	});

	const toggleAccordion = async (lift: 'böj' | 'bänk' | 'mark') => {
		isOpen[lift] = !isOpen[lift];
	};

	const togglePopper = (e: Event, lift: Lift) => {
		lift === Lift.mark ? (position = 'above') : (position = 'below');
		if (!popperState.visible) {
			liftOpen = lift;
			showPopper(e.currentTarget as HTMLElement, RateSet, {
				lift: liftOpen,
				weight: calculatedWithTexasMethod[liftOpen],
				repetitions: TexasRepetitions[cycleState.cycle.texas_week]
			});
		} else {
			hidePopper();
		}
	};

	$effect(() => {
		calculatedWithRPE = Object.entries(calculatedWithTexasMethod)
			.map(([key, value]) => {
				return { [key]: calculateRPE(value, repetitions, RPE) };
			})
			.reduce((acc, cur) => ({ ...acc, ...cur }), {} as OneRepMax);
	});
</script>

{#snippet liftSnippet(lift: Lift)}
	<dl class="bg-secondary text-secondary w-full align-center">
		<button onclick={() => toggleAccordion(lift)} class="btn btn-primary w-full">
			<dt>{lift} {cycleState.cycle?.[`${lift}_done`]}</dt>
		</button>
		{#if isOpen[lift]}
			<dd class="m-4 flex justify-between">
				{calculatedWithTexasMethod[lift]} x {TexasRepetitions[cycleState.cycle.texas_week]}
				<div>
					{#await getTodaysWorkouts() then workouts}
						{#each workouts as workout}
							{#if workout.lift === lift}
								⭐
							{/if}
						{/each}
					{/await}
				</div>
				<button class="btn btn-primary" onclick={(e) => togglePopper(e, lift)}>
					<i class="material-symbols-outlined"> task_alt </i>
				</button>
			</dd>
		{/if}
	</dl>
{/snippet}

{@render liftSnippet(Lift.böj)}
{@render liftSnippet(Lift.bänk)}
{@render liftSnippet(Lift.mark)}

<style>
</style>

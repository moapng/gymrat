<script lang="ts">
	import { latestCompletedWorkoutForEachLift } from '$lib/api';
	import { Lift, TexasFactor, TexasRepetitions, type OneRepMax } from '$lib/interfaces';
	import { calculateTexasMethod, roundToNearestTwoPointFive } from '$lib/math';
	import { hidePopper, popperState, showPopper } from '$lib/stores/popper.svelte';
	import { blockState } from '$lib/stores/workout.svelte';
	import RateSet from './RateSet.svelte';

	let { data, RPE = $bindable(), repetitions = $bindable() } = $props();
	let isOpen = $state({ [Lift.böj]: true, [Lift.bänk]: true, [Lift.mark]: true });
	let position = $state('above');
	let liftOpen: Lift = $state(Lift.böj);

	let oneRepMax: OneRepMax = $state({
		[Lift.böj]: data.böj as number,
		[Lift.bänk]: data.bänk as number,
		[Lift.mark]: data.mark as number
	});
	let calculatedWithTexasMethod: OneRepMax = Object.entries(oneRepMax)
		.map(([key, value]) => {
			if (blockState.block) {
				const texasValue = calculateTexasMethod(value, +TexasFactor[blockState.block.texas_week]);

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
				repetitions: TexasRepetitions[blockState.block.texas_week]
			});
		} else {
			hidePopper();
		}
	};

	const checkWhenLiftWasLatestCompleted = async (lift: Lift) => {
		const latestCompleted = await latestCompletedWorkoutForEachLift();
		const relevantLift = latestCompleted.find((workout) => workout.lift === lift);
		return relevantLift?.created_at || 'ingen data';
	};

	// hämta alla workouts för BLOCK ID, om jag har en av varje, tillåt block++, annars dubbelkolla?
</script>

{#snippet liftSnippet(lift: Lift)}
	<dl class="text-secondary w-full align-center">
		<button onclick={() => toggleAccordion(lift)} class="btn btn-primary w-full">
			<dt>{lift} {blockState.block?.[`${lift}_count`]}</dt>
		</button>
		{#if isOpen[lift]}
			<dd class="m-4 flex justify-between">
				{calculatedWithTexasMethod[lift]} x {TexasRepetitions[blockState.block.texas_week]}
				<div>
					{#each data.todaysWorkouts as workout}
						{#if workout.lift === lift}
							⭐
						{/if}
					{/each}
				</div>
				<button
					class="btn btn-primary"
					onclick={(e) => togglePopper(e, lift)}
					aria-label="Toggle Popper"
				>
					<i class="fa-solid fa-check"></i>
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

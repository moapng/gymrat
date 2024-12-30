<script lang="ts">
	import {
		calculateRPE,
		calculateTexasMethod,
		Lift,
		TexasFactor,
		TexasRepetitions,
		type OneRepMax
	} from '$lib/interfaces';
	import { referenceState } from '$lib/stores/reference.svelte';
	import Popper from './Popper.svelte';
	import RateSet from './RateSet.svelte';

	let { data, RPE = $bindable(), repetitions = $bindable(), week } = $props();
	let isOpen = $state({ [Lift.böj]: true, [Lift.bänk]: true, [Lift.mark]: true });
	let popperVisible = $state(false);
	let position = $state('above');
	let lift: Lift = $state(Lift.böj);

	let oneRepMax: OneRepMax = $state({
		[Lift.böj]: data.böj as number,
		[Lift.bänk]: data.bänk as number,
		[Lift.mark]: data.mark as number
	});
	let calculatedWithTexasMethod: OneRepMax = Object.entries(oneRepMax)
		.map(([key, value]) => {
			return { [key]: calculateTexasMethod(value, +TexasFactor[week]) };
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
		if (!popperVisible) {
			lift = lift;
			popperVisible = true;
			referenceState.reference = e.currentTarget as HTMLElement;
		} else {
			popperVisible = false;
			referenceState.reference = undefined;
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
			<dt>{lift}</dt>
		</button>
		{#if isOpen[lift]}
			<dd class="m-4 flex justify-between">
				{calculatedWithTexasMethod[lift]} x {TexasRepetitions[week]}
				<button class="btn btn-primary" onclick={(e) => togglePopper(e, lift)}>
					<i class="material-symbols-outlined"> task_alt </i>
				</button>
			</dd>
			<!-- <dd class="m-4">{calculatedWithRPE[lift]}</dd> -->
		{/if}
	</dl>
{/snippet}

{@render liftSnippet(Lift.böj)}
{@render liftSnippet(Lift.bänk)}
{@render liftSnippet(Lift.mark)}

{#if referenceState.reference}
	<Popper bind:popperVisible {position}>
		<div>uppvärmning klar?</div>
		<RateSet {lift} weight={calculatedWithTexasMethod[lift]} repetitions={TexasRepetitions[week]} />
	</Popper>
{/if}

<style>
</style>

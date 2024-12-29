<script lang="ts">
	import {
		calculateRPE,
		calculateTexasMethod,
		Lift,
		TexasFactor,
		TexasRepititions,
		type OneRepMax
	} from '$lib/interfaces';
	import { referenceState } from '$lib/stores/reference.svelte';
	import Popper from './Popper.svelte';

	let { data, RPE = $bindable(), repetitions = $bindable(), week } = $props();
	let isOpen = $state({ [Lift.böj]: true, [Lift.bänk]: true, [Lift.mark]: true });
	let popperVisible = $state(false);

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

	const toggleAccordion = async (exercise: 'böj' | 'bänk' | 'mark') => {
		isOpen[exercise] = !isOpen[exercise];
	};

	const togglePopper = (e: Event) => {
		if (referenceState.reference === undefined) {
			referenceState.reference = e.currentTarget as HTMLElement;
			popperVisible = true;
		} else {
			referenceState.reference = undefined;
			popperVisible = false;
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

{#snippet exercise(exercise: 'böj' | 'bänk' | 'mark')}
	<dl class="bg-secondary text-secondary w-full align-center">
		<button onclick={() => toggleAccordion(exercise)} class="btn btn-primary w-full">
			<dt>{exercise}</dt>
		</button>
		{#if isOpen[exercise]}
			<dd class="m-4 flex justify-between">
				{calculatedWithTexasMethod[exercise]} x {TexasRepititions[week]}
				<button class="btn btn-primary" onclick={(e) => togglePopper(e)}>
					<i class="material-symbols-outlined"> task_alt </i>
				</button>
			</dd>
			<!-- <dd class="m-4">{calculatedWithRPE[exercise]}</dd> -->
		{/if}
	</dl>
{/snippet}

{@render exercise('böj')}
{@render exercise('bänk')}
{@render exercise('mark')}

{#if referenceState.reference && popperVisible}
	<Popper {popperVisible}>hej</Popper>
{/if}

<style>
</style>

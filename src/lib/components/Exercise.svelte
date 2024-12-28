<script lang="ts">
	import { calculateRPE, calculateTexasMethod, Lift } from '$lib/interfaces';

	let { data, RPE } = $props();

	let oneRepMax = {
		[Lift.böj]: data.böj as number,
		[Lift.bänk]: data.bänk as number,
		[Lift.mark]: data.mark as number
	};
	let isOpen = $state({ [Lift.böj]: true, [Lift.bänk]: true, [Lift.mark]: true });

	const toggleAccordion = async (exercise: 'böj' | 'bänk' | 'mark') => {
		isOpen[exercise] = !isOpen[exercise];
	};

	let calculatedWithTexasMethod = Object.entries(oneRepMax)
		.map(([key, value]) => {
			return { [key]: calculateTexasMethod(value, 0.9) };
		})
		.reduce((acc, cur) => ({ ...acc, ...cur }), {});

	let calculatedWithRPE = Object.entries(oneRepMax)
		.map(([key, value]) => {
			return { [key]: calculateRPE(+value, 5, RPE) };
		})
		.reduce((acc, cur) => ({ ...acc, ...cur }), {});
</script>

{#snippet exercise(exercise: 'böj' | 'bänk' | 'mark')}
	<dl class="bg-secondary text-secondary w-full align-center">
		<button onclick={() => toggleAccordion(exercise)} class="btn btn-primary w-full">
			<dt>{exercise}</dt>
		</button>
		{#if isOpen[exercise]}
			<dd class="m-4">{calculatedWithTexasMethod[exercise]}</dd>
		{/if}
	</dl>
{/snippet}

{@render exercise('böj')}
{@render exercise('bänk')}
{@render exercise('mark')}

<style>
</style>

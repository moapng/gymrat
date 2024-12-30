<script lang="ts">
	import { login, userState } from '$lib/stores/user.svelte';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import Lift from '$lib/components/Lift.svelte';
	import { TexasRepetitions, TexasWeek } from '$lib/interfaces';
	import { cycleState, programState, texasWeekState } from '$lib/stores/workout.svelte';

	let { data }: { data: PageData } = $props();

	let RPE = $state(0);
	let repetitions: TexasRepetitions = $state(5);
	let week: TexasWeek = $state(TexasWeek.deload);

	onMount(() => {
		const RPElocalStorage = localStorage.getItem('RPE');
		if (RPElocalStorage) {
			RPE = JSON.parse(RPElocalStorage);
		}
		switch (texasWeekState.texasWeek) {
			case TexasWeek.deload:
				repetitions = TexasRepetitions.deload;
				week = TexasWeek.deload;
				break;
			case TexasWeek.volume:
				repetitions = TexasRepetitions.volume;
				week = TexasWeek.volume;
				break;
			case TexasWeek.intensity:
				repetitions = TexasRepetitions.intensity;
				week = TexasWeek.intensity;
				break;
		}
	});

	$effect(() => {
		localStorage.setItem('RPE', RPE.toString());
	});
</script>

<header class="flex w-full justify-between">
	<p>{programState.programName}</p>
	<p>{cycleState.cycle}</p>
	<p>{week}</p>
</header>
<section class="flex flex-col w-full items-center bottom">
	{#if process.env.NODE_ENV !== 'production' || userState.user}
		<Lift {data} bind:RPE bind:repetitions {week} />

		<div class="flex flex-row">
			<input type="text" bind:value={repetitions} inputmode="numeric" />
			<input type="text" bind:value={RPE} inputmode="decimal" />
		</div>
	{:else}
		logga in bih

		<button class="btn btn-secondary" onclick={() => login()}> logga in </button>
	{/if}
</section>

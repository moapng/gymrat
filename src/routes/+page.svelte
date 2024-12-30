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

	onMount(() => {
		const RPElocalStorage = localStorage.getItem('RPE');
		if (RPElocalStorage) {
			RPE = JSON.parse(RPElocalStorage);
		}
		repetitions = TexasRepetitions[texasWeekState.texasWeek];
	});

	$effect(() => {
		localStorage.setItem('RPE', RPE.toString());
	});
</script>

<header class="flex w-full justify-between">
	<p>{programState.programName}</p>
	<p>{cycleState.cycle?.cycle}</p>
	<p>{texasWeekState.texasWeek}</p>
</header>
<section class="flex flex-col w-full items-center bottom">
	{#if process.env.NODE_ENV !== 'production' || userState.user}
		<Lift {data} bind:RPE bind:repetitions />

		<button class="btn btn-primary w-full">xxx</button>
	{:else}
		logga in bih

		<button class="btn btn-secondary" onclick={() => login()}> logga in </button>
	{/if}
</section>

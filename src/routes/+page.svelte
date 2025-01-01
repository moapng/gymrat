<script lang="ts">
	import { login, userState } from '$lib/stores/user.svelte';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import Lift from '$lib/components/Lift.svelte';
	import { TexasRepetitions, TexasWeek } from '$lib/interfaces';
	import { cycleState, programState } from '$lib/stores/workout.svelte';
	import Toast from '$lib/components/Toast.svelte';
	import { insertNewCycle } from '$lib/api';
	import { toastState } from '$lib/stores/toast.svelte';
	import NewPR from '$lib/components/NewPR.svelte';
	import Popper from '$lib/components/Popper.svelte';

	let { data }: { data: PageData } = $props();

	let RPE = $state(0);
	let repetitions: TexasRepetitions = $state(5);

	onMount(() => {
		const RPElocalStorage = localStorage.getItem('RPE');
		if (RPElocalStorage) {
			RPE = JSON.parse(RPElocalStorage);
		}
		repetitions = TexasRepetitions[cycleState.cycle.texas_week];
	});

	$effect(() => {
		localStorage.setItem('RPE', RPE.toString());
	});

	const setNextCycle = async () => {
		if (cycleState.cycle?.cycle) {
			let nextTexasWeek;
			switch (cycleState.cycle.texas_week) {
				case TexasWeek.deload:
					nextTexasWeek = TexasWeek.volume;
					break;
				case TexasWeek.volume:
					nextTexasWeek = TexasWeek.intensity;
					break;
				case TexasWeek.intensity:
					nextTexasWeek = TexasWeek.deload;
					break;
			}
			console.log(nextTexasWeek);

			const response = await insertNewCycle(
				cycleState.cycle?.cycle,
				userState.user?.user_metadata.user_name,
				programState.programName,
				nextTexasWeek
			);
			if (response.status === 201) {
				toastState.text = 'yay ny cykel';
				toastState.type = 'success';
				toastState.visible = true;
				cycleState.cycle = response.data;
			}
		}
	};
</script>

<header class="flex w-full justify-between">
	<p>{programState.programName}</p>
	<p>{cycleState.cycle.cycle}</p>
	<p>{cycleState.cycle.texas_week}</p>
</header>
<section class="flex flex-col w-full items-center bottom">
	{#if process.env.NODE_ENV !== 'production' || userState.user}
		<Lift {data} bind:RPE bind:repetitions />

		<NewPR />
		<button class="btn btn-primary w-full" onclick={() => setNextCycle()}>nästa set</button>
	{:else}
		logga in bih

		<button class="btn btn-secondary" onclick={() => login()}> logga in </button>
	{/if}
</section>
<Toast />
<Popper />

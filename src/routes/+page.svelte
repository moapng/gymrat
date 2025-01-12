<script lang="ts">
	import { login, userState } from '$lib/stores/user.svelte';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import Lift from '$lib/components/Lift.svelte';
	import { TexasRepetitions } from '$lib/interfaces';
	import { cycleState } from '$lib/stores/workout.svelte';
	import Toast from '$lib/components/Toast.svelte';
	import Popper from '$lib/components/Popper.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { getTodaysWorkouts } from '$lib/api';

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

		getTodaysWorkouts();
	});
</script>

{#if process.env.NODE_ENV !== 'production' || userState.user}
	<header class="flex w-full justify-between">
		<p>{data.cycle?.program_name}</p>
		<p>{data.cycle?.cycle}</p>
		<p>{data.cycle?.texas_week}</p>
	</header>
	<section class="flex flex-col w-full items-center bottom">
		<Lift {data} bind:RPE bind:repetitions />

		<Footer />
	</section>

	<Toast />
	<Popper />
{:else}
	logga in bih

	<button class="btn btn-secondary" onclick={() => login()}> logga in </button>
{/if}

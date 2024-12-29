<script lang="ts">
	import Exercise from '$lib/components/Exercise.svelte';
	import { login, userState } from '$lib/stores/user.svelte';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let RPE = $state(0);
	let repetitions = $state(5);
	let week = $state('volume');

	onMount(() => {
		const RPElocalStorage = localStorage.getItem('RPE');
		if (RPElocalStorage) {
			RPE = JSON.parse(RPElocalStorage);
		}
		switch (data.userData?.current_texas_week) {
			case 'deload':
				repetitions = 5;
				week = 'deload';
				break;
			case 'volume':
				repetitions = 3;
				week = 'volume';
				break;
			case 'intensity':
				repetitions = 1;
				week = 'intensity';
				break;
		}
	});

	$effect(() => {
		localStorage.setItem('RPE', RPE.toString());
	});
</script>

<header class="flex w-full justify-between">
	<p>{data.userData?.chosen_program_name}</p>
	<p>{data.userData?.current_schema_cycle}</p>
	<p>{week}</p>
</header>
<section class="flex flex-col w-full items-center bottom">
	{#if process.env.NODE_ENV !== 'production' || userState.user}
		<Exercise {data} bind:RPE bind:repetitions {week} />

		<div class="flex flex-row">
			<input type="text" bind:value={repetitions} inputmode="numeric" />
			<input type="text" bind:value={RPE} inputmode="decimal" />
		</div>
	{:else}
		logga in bih

		<button class="btn btn-secondary" onclick={() => login()}> logga in </button>
	{/if}
</section>

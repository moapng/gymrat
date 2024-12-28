<script lang="ts">
	import Exercise from '$lib/components/Exercise.svelte';
	import { login, userState } from '$lib/stores/user.svelte';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let RPE = $state(0);
	onMount(() => {
		const RPElocalStorage = localStorage.getItem('RPE');
		if (RPElocalStorage) {
			RPE = JSON.parse(RPElocalStorage);
		}
	});

	$effect(() => {
		localStorage.setItem('RPE', RPE.toString());
	});
</script>

<section class="flex flex-col items-center">
	{#if process.env.NODE_ENV !== 'production' || userState.user}
		<div class="flex w-full justify-between">
			<p>{data.userData?.chosen_program_name}</p>
			<p>{data.userData?.current_schema_cycle}</p>
			<p>{data.userData?.current_texas_week}</p>
		</div>

		<Exercise {data} {RPE} />

		<input type="number" bind:value={RPE} min="0" max="10" />
	{:else}
		logga in bih

		<button class="btn btn-secondary" onclick={() => login()}> logga in </button>
	{/if}
</section>

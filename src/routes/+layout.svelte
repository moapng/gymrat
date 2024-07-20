<script lang="ts">
	import '../app.postcss';
	import { ActiveDay } from '$lib/interfaces';
	import { login, user } from '$lib/stores/user';
	import type { User } from '@supabase/supabase-js';
	import { get, writable, type Writable } from 'svelte/store';
	import { base } from '$app/paths';
	import { initializeStores, Drawer } from '@skeletonlabs/skeleton';
	import { getDrawerStore } from '@skeletonlabs/skeleton';

	let { children, data } = $props();

	initializeStores();
	const drawerStore = getDrawerStore();

	const current_user: Writable<User | null> = writable(get(user));
	// let logs = $state([] as IExerciseLog[]);
	$effect(() => {
		current_user.set(get(user));
		// logs = data.logs;
	});

	const active_days = [ActiveDay.PUSH, ActiveDay.PULL, ActiveDay.LEG, ActiveDay.CORE];
</script>

<Drawer position="bottom" height="h-auto">
	<section class="card p-4 m-4 grid grid-cols-2 absolute inset-x-0 bottom-0">
		{#each active_days as active_day}
			<a
				href={`${base}/${active_day}`}
				onclick={() => drawerStore.close()}
				class="card p-4 text-center">{active_day}</a
			>
		{/each}

		<a
			href={`${base}/STATS`}
			class="card p-4 col-span-2 text-center"
			onclick={() => drawerStore.close()}
		>
			stats
		</a>
	</section>
</Drawer>
<main class="absolute inset-x-0 bottom-0">
	{#if !$current_user}
		<button class="btn variant-ghost-secondary" onclick={() => login()}> logga in </button>
	{/if}

	{#if $current_user && $current_user?.role === 'superduper'}
		{@render children()}
	{/if}
	<button class="btn variant-ghost-primary" onclick={() => drawerStore.open()}>
		hadsjahsdjh
	</button>
</main>

<style>
</style>

<script lang="ts">
	import '../app.postcss';
	import { ActiveDay } from '$lib/interfaces';
	import { login, user } from '$lib/stores/user';
	import type { User } from '@supabase/supabase-js';
	import { get, writable, type Writable } from 'svelte/store';
	import { base } from '$app/paths';
	import { initializeStores, Drawer, Toast } from '@skeletonlabs/skeleton';
	import { getDrawerStore } from '@skeletonlabs/skeleton';
	import { dev } from '$app/environment';

	let { children, data } = $props();

	initializeStores();
	const drawer_store = getDrawerStore();

	const current_user: Writable<User | null> = writable(get(user));
	// let logs = $state([] as IExerciseLog[]);
	$effect(() => {
		current_user.set(get(user));
		// logs = data.logs;
	});
</script>

<main
	class="bg-gradient-to-br from-surface-200 to-surface-300
	h-full"
>
	{#if !$current_user}
		<button class="btn variant-filled-primary" onclick={() => login()}> logga in </button>
	{/if}

	{#if $current_user && $current_user?.role === 'superduper'}
		{@render children()}
	{/if}
	<button
		class="btn w-full variant-soft-primary absolute bottom-0"
		onclick={() => drawer_store.open()}
	>
		meny
	</button>
</main>
<Toast />
<Drawer position="bottom" height="h-auto">
	<nav
		class="card p-4 m-4 grid grid-cols-2 absolute inset-x-0 bottom-0 gap-2
		bg-gradient-to-r from-primary-300 to-primary-400"
	>
		<a
			href={`${base}/workout`}
			onclick={() => drawer_store.close()}
			class="btn variant-glass-primary
				p-4
				text-center text-2xl">workout</a
		>
		<a
			href={`${base}/training_max`}
			onclick={() => drawer_store.close()}
			class="btn variant-glass-primary
				p-4
				text-center text-2xl">t maxx</a
		>
	</nav>
</Drawer>

<style>
</style>

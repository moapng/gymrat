<script lang="ts">
	import '../app.postcss';
	import { TabAnchor, TabGroup } from '@skeletonlabs/skeleton';
	import { ActiveDay, type IExerciseLog } from '$lib/interfaces';
	import { login, logout, user } from '$lib/stores/user';
	import type { User } from '@supabase/supabase-js';
	import { base } from '$app/paths';
	import { get, writable, type Writable } from 'svelte/store';
	import { page } from '$app/stores';

	let { children, data } = $props();

	let active_route: ActiveDay | 'STATS' = $state($page.url.pathname.slice(0, 1) as ActiveDay);

	const current_user: Writable<User | null> = writable(get(user));
	let logs = $state([] as IExerciseLog[]);
	$effect(() => {
		active_route = $page.url.pathname.slice(1) as ActiveDay;
		current_user.set(get(user));
		logs = data.logs;
	});
</script>

<main class="">
	{#if !$current_user}
		<button
			class="variant-gradient-secondary-tertiary btn bg-gradient-to-br"
			onclick={() => login()}
		>
			logga in
		</button>
	{/if}

	{#if $current_user && $current_user?.role === 'superduper'}
		{@render children()}
	{/if}
	{#each logs as log}
		<span class="chip variant-filled">
			{log.exercise_id}
		</span>
	{/each}
</main>
<TabGroup
	justify="justify-center"
	active="variant-filled-primary"
	hover="hover:variant-soft-primary"
	flex="flex-1 lg:flex-none"
	rounded=""
	border=""
	class="bg-surface-100-800-token w-full"
>
	<TabAnchor href={`${base}/${ActiveDay.PUSH}`} selected={active_route === ActiveDay.PUSH}>
		<svelte:fragment slot="lead">(icon)</svelte:fragment>
		<span>push</span>
	</TabAnchor>
	<TabAnchor href={`${base}/${ActiveDay.PULL}`} selected={active_route === ActiveDay.PULL}>
		<svelte:fragment slot="lead">(icon)</svelte:fragment>
		<span>pull</span>
	</TabAnchor>
	<TabAnchor href={`${base}/${ActiveDay.LEG}`} selected={active_route === ActiveDay.LEG}>
		<svelte:fragment slot="lead">(icon)</svelte:fragment>
		<span>leg</span>
	</TabAnchor>
	<TabAnchor href={`${base}/${ActiveDay.CORE}`} selected={active_route === ActiveDay.CORE}>
		<svelte:fragment slot="lead">(icon)</svelte:fragment>
		<span>core</span>
	</TabAnchor>
	<TabAnchor href={`${base}/STATS`} selected={active_route === 'STATS'}>
		<svelte:fragment slot="lead">(icon)</svelte:fragment>
		<span>stats</span>
	</TabAnchor>
</TabGroup>

<style>
	main {
		height: calc(100vh - 64px);
		overflow: scroll;
	}
</style>

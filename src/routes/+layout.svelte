<script lang="ts">
	import './styles.css';
	import { ActiveDay } from '$lib/interfaces';
	import { login, logout, user } from '$lib/stores/user';
	import type { User } from '@supabase/supabase-js';
	import { base } from '$app/paths';
	import { get, writable, type Writable } from 'svelte/store';
	import { page } from '$app/stores';

	let { children } = $props();
	let active_route: ActiveDay | 'STATS' = $state($page.url.pathname.slice(0, 1) as ActiveDay);

	const current_user: Writable<User | null> = writable(get(user));

	$effect(() => {
		active_route = $page.url.pathname.slice(1) as ActiveDay;
		current_user.set(get(user));
	});
</script>

<main class="grid grid-cols-1">
	{#if !$current_user}
		<button class="btn btn-primary" onclick={() => login()}> logga in </button>
	{/if}

	{#if $current_user && $current_user?.role === 'superduper'}
		{@render children()}
	{/if}
</main>

<nav class="btm-nav">
	<a href={`${base}/${ActiveDay.PUSH}`} class:active={active_route === ActiveDay.PUSH}>
		🏋️‍♀️
		<span class="btm-nav-label">PUSH</span>
	</a>
	<a href={`${base}/${ActiveDay.PULL}`} class:active={active_route === ActiveDay.PULL}>
		💪
		<span class="btm-nav-label">PULL</span>
	</a>
	<a href={`${base}/${ActiveDay.LEG}`} class:active={active_route === ActiveDay.LEG}>
		🦵
		<span class="btm-nav-label">LEG</span>
	</a>
	<a href={`${base}/${ActiveDay.CORE}`} class:active={active_route === ActiveDay.CORE}>
		🤸🏻‍♂️
		<span class="btm-nav-label">CORE</span>
	</a>
	<a href={`${base}/STATS`} class:active={active_route === 'STATS'}>
		📈
		<span class="btm-nav-label">Statics</span>
	</a>
</nav>

<style>
	main {
		height: calc(100vh - 64px);
		overflow: scroll;
	}
</style>

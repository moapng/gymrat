<script lang="ts">
	import './styles.css';
	import { ActiveDay } from '$lib/interfaces';
	import { login, logout, user } from '$lib/stores/user';
	import type { User } from '@supabase/supabase-js';
	import { base } from '$app/paths';
	import { get } from 'svelte/store';
	import { page } from '$app/stores';

	let { children } = $props();
	let active_route: ActiveDay | 'stats' = $state($page.url.pathname.slice(0, 1) as ActiveDay);
	$effect(() => {
		active_route = $page.url.pathname.slice(1) as ActiveDay;
	});

	const current_user: User | null = $state(get(user));
</script>

<header>
	{#if !current_user}
		<button onclick={() => (current_user ? logout() : login())}> logga in</button>
	{/if}
</header>
{#if current_user && current_user?.role === 'superduper'}
	<main>
		{@render children()}
	</main>
{/if}
<footer>
	<div class="btm-nav">
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
		<a href={`${base}/stats`} class:active={active_route === 'stats'}>
			📈
			<span class="btm-nav-label">Statics</span>
		</a>
	</div>
</footer>

<style>
</style>

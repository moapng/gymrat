<script lang="ts">
	import './styles.css';

	import { writable, type Writable } from 'svelte/store';
	import { goto } from '$app/navigation';
	import { ActiveDay } from '$lib/interfaces';
	import { login, logout, user } from '$lib/stores/user';
	import type { User } from '@supabase/supabase-js';
	import { base } from '$app/paths';
	import { get } from 'svelte/store';

	let { children } = $props();

	const handleClick = (active_day: ActiveDay) => {
		goto(`${base}/${active_day}`);
	};

	const current_user: User | null = $state(get(user));
</script>

<header>
	{#if !current_user}
		<button onclick={() => (current_user ? logout() : login())}> logga in</button>
	{:else if current_user && current_user?.role === 'superduper'}
		<button onclick={() => handleClick(ActiveDay.PUSH)}>PUSH</button>
		<button onclick={() => handleClick(ActiveDay.PULL)}>PULL</button>
		<button onclick={() => handleClick(ActiveDay.LEG)}>LEG</button>
		<button onclick={() => handleClick(ActiveDay.CORE)}>CORE</button>
	{/if}
</header>
{#if current_user && current_user?.role === 'superduper'}
	<main>
		{@render children()}
	</main>
{/if}
<footer></footer>

<style>
	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		margin: 0 auto;
		box-sizing: border-box;
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 12px;
	}
</style>

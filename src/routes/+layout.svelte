<script lang="ts">
	import './styles.css';

	import { writable, type Writable } from 'svelte/store';
	import { goto } from '$app/navigation';
	import { ActiveDay } from '$lib/interfaces';
	import { login, logout, user } from '$lib/stores/user';
	import type { User } from '@supabase/supabase-js';

	const handleClick = (active_day: ActiveDay) => {
		goto(`/gymrat/${active_day}`);
	};

	const current_user: Writable<User> = writable();
	user.subscribe((user) => {
		current_user.set(user as User);
	});
</script>

<div class="app">
	<header>
		<button on:click={() => ($current_user ? logout() : login())}>
			{$current_user ? 'logga ut' : 'logga in'}</button
		>
		<button on:click={() => handleClick(ActiveDay.PUSH)}>PUSH</button>
		<button on:click={() => handleClick(ActiveDay.PULL)}>PULL</button>
		<button on:click={() => handleClick(ActiveDay.LEG)}>LEG</button>
		<button on:click={() => handleClick(ActiveDay.CORE)}>CORE</button>
	</header>
	{#if $current_user && $current_user?.role === 'authenticated'}
		<main>
			<slot />
		</main>
	{/if}
	<footer></footer>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 64rem;
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

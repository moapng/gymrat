<script lang="ts">
	import { login, user } from '$lib/stores/user';
	import type { User } from '@supabase/supabase-js';
	import { get, writable, type Writable } from 'svelte/store';

	const current_user: Writable<User | null> = writable(get(user));
	$: console.log($current_user);
</script>

{#if $current_user && $current_user.role === 'authenticated'}
	inlogggad <h1>{$current_user.user_metadata.user_name}</h1>
{:else}
	logga in bih

	<button class="btn variant-filled-primary" onclick={() => login()}> logga in </button>
{/if}

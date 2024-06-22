<script lang="ts">
	import { goto } from '$app/navigation';
	import { login, logout, user } from '$lib/stores/user';
	import type { User } from '@supabase/supabase-js';
	import { get, writable, type Writable } from 'svelte/store';

	const current_user: Writable<User | null> = writable(get(user));

	$effect(() => {
		console.log($current_user);
		if ($current_user) goto('/push_day');
	});
</script>

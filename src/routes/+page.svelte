<script lang="ts">
	import { user } from '$lib/stores/user';
	import type { User } from '@supabase/supabase-js';
	import { get, writable, type Writable } from 'svelte/store';

	const current_user: Writable<User | null> = writable(get(user));
</script>

<script lang="ts">
	import { get } from 'svelte/store';
	import { user } from '$lib/stores/user';
	import type { User } from '@supabase/supabase-js';
	import Exercise from '../Exercise.svelte';

	let { data } = $props();

	const current_user: User = $state(get(user)) as User;
</script>

	{#each data.exercises as exercise}
		<Exercise {exercise} user={current_user} />
	{/each}

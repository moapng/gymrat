<script lang="ts">
	import { insert_exercise_log } from '$lib/api';
	import type { IExercise } from '$lib/interfaces';
	import type { User } from '@supabase/supabase-js';
	import { writable, type Writable } from 'svelte/store';

	export let exercise: IExercise;
	export let user: User;

	const input_weight: Writable<number> = writable();

	const show_button: Writable<boolean> = writable(false);
</script>

<dt on:click={() => show_button.set(true)}>{exercise.exercise_name}</dt>
<dd>Main Muscle Groups: {exercise.main_muscle_groups.join(', ')}</dd>
<dd>Type: {exercise.type}</dd>
<dd>Equipment: {exercise.equipment}</dd>
{#if $show_button}
	<input TYPE="NUMBER" bind:value={$input_weight} />
	<button on:click={() => insert_exercise_log(user.id, exercise.id, $input_weight, new Date())}
		>lägg till vikt</button
	>
{/if}

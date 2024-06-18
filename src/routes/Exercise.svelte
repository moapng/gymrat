<script lang="ts">
	import { insert_exercise_log } from '$lib/api';
	import type { IExercise } from '$lib/interfaces';
	import type { User } from '@supabase/supabase-js';
	import { writable, type Writable } from 'svelte/store';

	type Props = {
		exercise: IExercise;
		user: User;
	};

	let { exercise, user } = $props<Props>();

	const input_weight: Writable<number> = writable();

	let show_button: boolean = $state(false);
</script>

<dl class="card bg-primary gap-2 mb-2">
	<div class="card-body">
		<button onclick={() => (show_button = !show_button)}
			><dt class="card-title">{exercise.exercise_name}</dt></button
		>
		<dd>Main Muscle Groups: {exercise.main_muscle_groups.join(', ')}</dd>
		<dd>Type: {exercise.type}</dd>
		<dd>Equipment: {exercise.equipment}</dd>
		{#if show_button}
			<div class="flex flex-row">
				<input
					class="input input-bordered input-secondary w-20 basis-1/2"
					TYPE="NUMBER"
					bind:value={$input_weight}
				/>
				<button
					class="btn btn-secondary w-20 basis-1/2"
					onclick={() => insert_exercise_log(user.id, exercise.id, $input_weight, new Date())}
					>lägg till vikt</button
				>
			</div>
		{/if}
	</div>
</dl>

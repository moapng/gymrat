<script lang="ts">
	import { page } from '$app/stores';
	import { insert_exercise_log, insert_personal_best } from '$lib/api';
	import type { ActiveDay, IExercise } from '$lib/interfaces';
	import { user } from '$lib/stores/user';
	import type { User } from '@supabase/supabase-js';
	import { tick } from 'svelte';
	import { get } from 'svelte/store';

	type Props = {
		exercise: IExercise;
	};

	//@ts-ignore
	let { exercise } = $props<Props>();

	let input_weight_element: HTMLElement | undefined = $state();
	let input_weight: number | null = $state(null);

	let input_repetitions_element: HTMLElement | undefined = $state();
	let input_repetitions: number | null = $state(null);

	let current_texas_week: number = $state(99);

	let show_toast: boolean = $state(false);
	let toast_message = $state();
	let toast_error = $state();

	const current_user: User = $state(get(user)) as User;
	const active_day: ActiveDay = $state($page.route.id?.slice(1)) as ActiveDay;

	const onclick = async () => {
		await tick();
		input_weight_element?.focus();
	};

	const onsubmit = async () => {
		if (
			current_user &&
			current_user?.role === 'superduper' &&
			input_weight !== null &&
			input_repetitions !== null
		) {
			try {
				let response = await insert_exercise_log(
					exercise.id,
					input_weight,
					input_repetitions,
					new Date(),
					current_texas_week
				);
				if (response.status === 201 && response.data[0].id) {
					const log_id = response.data[0].id;
					tick();
					let response2 = await insert_personal_best(exercise.id, log_id);
					console.log(response2);
					toast_message = 'uppdaterat databasen';
				}
			} catch (error) {
				toast_error = error.message;
			}
			// show_input = false;
			show_toast = true;
			setTimeout(() => {
				show_toast = false;
			}, 5000);
		}
	};
	const onkeyup = (e: KeyboardEvent) => {
		if (e.key === 'Enter') onsubmit();
	};
</script>

{#if show_toast}
	<div class="toast toast-top toast-center">
		{#if toast_message}
			<div class="alert alert-success">
				<p>✨ {toast_message} ✨</p>
			</div>
		{:else if toast_error}
			<div class="alert alert-error">
				<p>⚠️ {toast_error} ⚠️</p>
			</div>
		{/if}
	</div>
{/if}

<div class="collapse collapse-plus bg-base-primary">
	<input type="radio" name="exercise-accordion" {onclick} />
	<dl class="stat h-24 collapse-title">
		<div class="stat-figure text-secondary"></div>
		<dt class="stat-desc">{exercise.primary_muscle_groups.join(', ')}</dt>
		<dd class="stat-title font-bold text-primary">{exercise.exercise_name}</dd>
		{#if exercise.secondary_muscle_groups}
			<dd class="stat-desc">{exercise.secondary_muscle_groups.join(', ')}</dd>
		{/if}
	</dl>
	<div class="collapse-content grid grid-cols-7 gap-2">
		<label for="weight"> vikt </label>
		<input
			name="weight"
			class="input input-bordered input-secondary col-span-2"
			TYPE="NUMBER"
			bind:this={input_weight_element}
			bind:value={input_weight}
		/>
		<div class="divider divider-horizontal" />
		<label for="repetitions"> reps </label>
		<input
			name="repetitions"
			class="input input-bordered input-secondary col-span-2"
			TYPE="NUMBER"
			bind:this={input_repetitions_element}
			bind:value={input_repetitions}
			{onsubmit}
			{onkeyup}
		/>
	</div>
</div>

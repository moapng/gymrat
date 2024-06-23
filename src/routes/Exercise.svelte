<script lang="ts">
	import { page } from '$app/stores';
	import { insert_exercise_log } from '$lib/api';
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

	let input_element: HTMLElement | undefined = $state();
	let input_weight: number | undefined = $state();
	let show_input: boolean = $state(false);

	let show_toast: boolean = $state(false);
	let toast_message = $state();
	let toast_error = $state();

	const current_user: User = $state(get(user)) as User;
	const active_day: ActiveDay = $state($page.route.id?.slice(1)) as ActiveDay;

	const onclick = async () => {
		if (!show_input) {
			show_input = true;
			await tick();
			input_element?.focus();
		}
	};
	const onsubmit = async () => {
		if (current_user && current_user?.role === 'superduper' && input_weight) {
			try {
				let response = await insert_exercise_log(
					current_user.id,
					exercise.exercise_name,
					active_day,
					input_weight,
					new Date()
				);
				if (response.status === 201) {
					toast_message = 'uppdaterat databasen';
				}
			} catch (error) {
				toast_error = error.message;
			}
			show_input = false;
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
<dl class="stat">
	<div class="stat-figure text-secondary">
		{#if show_input}
			<input
				class="input input-bordered input-secondary w-16"
				TYPE="NUMBER"
				bind:this={input_element}
				bind:value={input_weight}
				onblur={() => (show_input = false)}
				{onsubmit}
				{onkeyup}
			/>
		{:else}
			<button class="group btn btn-outline btn-primary w-16" {onclick}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 512 512"
					class="fill-secondary group-hover:fill-white"
				>
					<path
						d="M144 416H96V368 80 32h48H432h48V80 320l-96 96H144zm220.1-48L432 300.1V80H144V368H364.1zM320 128v64h64v64H320v64H256V256H192V192h64V128h64zM296 464h24v48H296 24 0V488 152 128l48 0v24l0 312H296z"
					/>
				</svg>
			</button>
		{/if}
	</div>
	<dt class="stat-desc">{exercise.primary_muscle_groups.join(', ')}</dt>
	<dd class="stat-title font-bold text-primary">{exercise.exercise_name}</dd>
	<dd class="stat-desc">{exercise.secondary_muscle_groups.join(', ')}</dd>
</dl>

<!-- <dl class="card bg-primary gap-2 mb-2">
	<div class="card-body">
		<button onclick={() => (show_button = !show_button)}
			><dt class="card-title">{exercise.exercise_name}</dt></button
		>
		<dt>Primary Muscle Groups:</dt>
		<dd>{exercise.primary_muscle_groups.join(', ')}</dd>
		<dt>Secondary Muscle Groups:</dt>
		<dd>{exercise.secondary_muscle_groups.join(', ')}</dd>
		<dd>Equipment: {exercise.equipment}</dd>
		{#if show_button}
			<div class="flex flex-row">
				<input
					class="input input-bordered input-secondary w-20 basis-1/2"
					TYPE="NUMBER"
					bind:value={$input_weight}
				/>
				<button class="btn btn-secondary w-20 basis-1/2" {onclick}>lägg till vikt</button>
			</div>
		{/if}
	</div>
</dl> -->

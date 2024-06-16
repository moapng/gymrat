<script lang="ts">
	import { writable, type Writable } from 'svelte/store';
	import type { PageData } from './$types';
	import type { Exercise } from '$lib/interfaces';

	export let data: PageData;
	const exercises: Writable<Exercise[]> = writable(data.exercises);
    $:console.log(data)
</script>


<dl>
	{#each $exercises as exercise}
		<dt>{exercise.exercise_name}</dt>
		<dd>Main Muscle Groups: {exercise.main_muscle_groups.join(', ')}</dd>
		<dd>Difficulty: {exercise.difficulty}</dd>
		<dd>Type: {exercise.type}</dd>
		<dd>Equipment: {exercise.equipment}</dd>
		<dd>Description: {exercise.description}</dd>
		<dd>Category: {exercise.category}</dd>
	{/each}
</dl>
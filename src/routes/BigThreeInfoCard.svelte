<script lang="ts">
	import LineChart from './LineChart.svelte';
	import type { IGoal, IPersonalRecord } from '$lib/interfaces';

	let {
		title,
		all_prs,
		latest_pr,
		next_goal
	}: { title: string; all_prs: IPersonalRecord[]; latest_pr: IPersonalRecord; next_goal: IGoal } =
		$props();
</script>

<div
	class="card p-4 variant-soft-primary
		absolute top-1 inset-x-1"
>
	<h1 class="h1 text-center py-2">{title} & komplement</h1>
	<dl class="flex justify-around">
		{#if latest_pr}
			<dd class="chip variant-filled-secondary">
				PR: <b>{latest_pr.weight}kgx{latest_pr.repetitions}</b>
			</dd>
		{/if}
		{#if next_goal}
			<dd class="chip variant-filled-primary">mål: <b>{next_goal.target_value}kg</b></dd>
		{/if}
	</dl>

	<LineChart data={all_prs} min={20} />
</div>

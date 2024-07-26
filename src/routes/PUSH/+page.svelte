<script lang="ts">
	import BigThreeInfoCard from '../BigThreeInfoCard.svelte';

	import { Accordion } from '@skeletonlabs/skeleton';
	import Exercise from '../Exercise.svelte';
	import type { IGoal, IPersonalRecord } from '$lib/interfaces';

	let { data } = $props();
	const all_prs = data.all_prs as IPersonalRecord[];
	const latest_pr = all_prs[all_prs.length - 1] as IPersonalRecord;
	const next_goal = data.next_goal[0] as IGoal;
</script>

<section>
	<BigThreeInfoCard title="bänk" {all_prs} {latest_pr} {next_goal}></BigThreeInfoCard>
	<Accordion autocollapse class="space-y-0">
		{#each data.exercises as exercise}
			<Exercise {exercise} />
		{/each}
	</Accordion>
</section>

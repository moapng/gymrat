<script lang="ts">
	import LineChart from '../LineChart.svelte';

	let { data } = $props();

	const unique_dates = [...new Set(data.logs.map((log) => log.log_date))];
	const percentage = $state(((unique_dates.length / 30) * 100).toPrecision(2));

	let personal_records = $state(data.personal_records);
</script>

<section class="stats stats-vertical shadow">
	<dl class="stat">
		<div class="stat-figure text-primary">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				class="inline-block w-8 h-8 stroke-current"
				><path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
				></path></svg
			>
		</div>
		<dt class="stat-title">Tränade dagar de senaste 30</dt>
		<dd class="stat-value text-primary">{percentage}%</dd>
		<dd class="stat-desc">{unique_dates.length} av 30</dd>
	</dl>

	<!-- <dl class="stat">
		<dt class="stat-title">Senaste PR</dt>
		{#each personal_records as PR}
			<dd class="stat-value text-primary">{PR.exercise_name}</dd>
			<dd class="stat-value text-secondary">{PR.weight}kgx{PR.repetitions}</dd>
		{/each}
	</dl> -->

	<!-- <dl class="stat">
		<div class="stat-figure text-secondary">
			<div class="avatar online">
				<div class="w-16 rounded-full">
					<img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
				</div>
			</div>
		</div>
		<dt class="stat-title">månadsstreak</dt>
		<dd class="stat-value text-primary">25.6K</dd>
		<dd class="stat-desc">21% more than last month</dd>
	</dl> -->

	<dl class="stat">
		<div class="stat-figure text-secondary"></div>
		<dt class="stat-title">PR</dt>
		<dd class="stat-value text-secondary">
			<LineChart data={data.personal_records} />
		</dd>
	</dl>
</section>

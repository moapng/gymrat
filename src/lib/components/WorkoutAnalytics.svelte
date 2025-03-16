<script lang="ts">
	import { getAllWorkouts } from '$lib/api';
	import { Lift, type supabaseWorkout } from '$lib/interfaces';
	import { Temporal } from '@js-temporal/polyfill';
	import * as echarts from 'echarts';
	import { onMount } from 'svelte';

	let allWorkouts: supabaseWorkout[] = $state([]);
	let timeFilter = $state('monthly');
	let selectedLift = $state(Lift.böj);
	let chart: echarts.ECharts | null = null;
	let showChart = $state(false);

	const TIMEZONE = 'Europe/Stockholm';

	let timeRanges = $state({
		sevenDaysAgo: Temporal.Now.zonedDateTimeISO(TIMEZONE).subtract({ days: 7 }),
		thirtyDaysAgo: Temporal.Now.zonedDateTimeISO(TIMEZONE).subtract({ days: 30 }),
		yearAgo: Temporal.Now.zonedDateTimeISO(TIMEZONE).subtract({ days: 365 })
	});

	function formatDate(date: Temporal.ZonedDateTime | undefined): string {
		if (!date) return '';
		return date.toLocaleString('sv-SE', {
			dateStyle: 'short',
			timeStyle: 'short'
		});
	}

	onMount(async () => {
		allWorkouts = await getAllWorkouts();
	});

	const updateChart = () => {
		if (chart) {
			chart.dispose();
		}

		chart = echarts.init(document.getElementById('chart') as HTMLElement);
		const filteredData = filterData(allWorkouts, timeFilter, selectedLift);

		const option = {
			tooltip: {
				trigger: 'axis'
			},
			xAxis: {
				type: 'category',
				data: filteredData.map((d) => formatDate(d.created_at)),
				axisLabel: {
					rotate: 45
				}
			},
			yAxis: {
				type: 'value',
				name: 'vikt (kg)'
			},
			series: [
				{
					name: 'vikt (kg)',
					type: 'line',
					data: filteredData.map((d) => d.weight),
					smooth: true,
					markPoint: {
						data: [
							{ type: 'max', name: 'Maximum' },
							{ type: 'min', name: 'Minimum' }
						]
					}
				}
			],
			toolbox: {
				feature: {
					saveAsImage: {},
					dataZoom: {},
					restore: {},
					dataView: {}
				}
			}
		};

		chart.setOption(option);
	};

	const filterData = (data: supabaseWorkout[], timeFrame: string, lift: string) => {
		if (!data || !data.length) return [];

		const filtered = data.filter((d) => d.lift === lift && d.created_at);

		const dateFiltered = filtered.filter((d) => {
			if (!d.created_at) return false;

			switch (timeFrame) {
				case 'weekly':
					return Temporal.ZonedDateTime.compare(d.created_at, timeRanges.sevenDaysAgo) >= 0;
				case 'monthly':
					return Temporal.ZonedDateTime.compare(d.created_at, timeRanges.thirtyDaysAgo) >= 0;
				case 'yearly':
					return Temporal.ZonedDateTime.compare(d.created_at, timeRanges.yearAgo) >= 0;
				default:
					return true;
			}
		});

		return dateFiltered.sort((a, b) => {
			if (!a.created_at || !b.created_at) return 0;
			return Temporal.ZonedDateTime.compare(a.created_at, b.created_at);
		});
	};

	$effect(() => {
		if (showChart && (timeFilter || selectedLift)) {
			updateChart();
		}
	});
</script>

<div class="analytics-container w-full">
	<div class="filters">
		<select bind:value={timeFilter}>
			<option value="weekly">Weekly</option>
			<option value="monthly">Monthly</option>
			<option value="yearly">Yearly</option>
		</select>

		<select bind:value={selectedLift}>
			<option value="böj">{Lift.böj}</option>
			<option value="bänk">{Lift.bänk}</option>
			<option value="mark">{Lift.mark}</option>
		</select>
	</div>

	<div class="view-toggle">
		<label class="switch">
			<input type="checkbox" bind:checked={showChart} />
			<span class="slider"></span>
		</label>
		<span class="toggle-label">{showChart ? 'Visa tabell' : 'Visa graf'}</span>
	</div>

	{#if showChart}
		<div id="chart" class="w-full h-40"></div>
	{:else}
		<div class="table-container">
			<table>
				<thead>
					<tr>
						<th>datum</th>
						<th>lyft</th>
						<th>vikt</th>
						<th>rating</th>
						<th>kommentar</th>
					</tr>
				</thead>
				<tbody>
					{#each filterData(allWorkouts, timeFilter, selectedLift) as workout}
						<tr>
							<td>{formatDate(workout.created_at)}</td>
							<td>{workout.lift}</td>
							<td>{workout.weight}</td>
							<td>{workout.workout_rating}</td>
							<td>{workout.comment}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{/if}
</div>

<style>
	.analytics-container {
		display: flex;
		flex-direction: column;
		gap: 2rem;
		padding: 1rem;
	}

	.filters {
		display: flex;
		gap: 1rem;
	}

	table {
		width: 100%;
		border-collapse: collapse;
		border-spacing: 0;
	}
	#chart {
		height: 300px;
	}
	.table-container {
		height: 300px;
		overflow: hidden;
		position: relative;
	}

	thead {
		position: sticky;
		top: 0;
		z-index: 1;
	}

	tbody {
		display: block;
		overflow-y: auto;
		height: calc(300px - 2.5rem); /* Subtract header height */
	}

	tr {
		display: table;
		width: 100%;
		table-layout: fixed;
	}

	th,
	td {
		padding: 0.5rem;
		text-align: left;
		border-bottom: 1px solid #ddd;
	}

	select {
		padding: 0.5rem;
		border-radius: 4px;
		border: 1px solid #ddd;
	}
</style>

<script lang="ts">
	import { getAllWorkouts } from '$lib/api';
	import { Lift, type supabaseWorkout } from '$lib/interfaces';
	import { Temporal } from '@js-temporal/polyfill';
	import * as echarts from 'echarts';
	import { onMount } from 'svelte';

	let allWorkouts: supabaseWorkout[] = $state([]);

	let timeFilter = $state('monthly');
	let selectedLift = $state('all');
	let chart: echarts.ECharts | null = null;

	onMount(async () => {
		allWorkouts = await getAllWorkouts();
	});
	const updateChart = () => {
		if (chart) {
			chart.dispose();
		}
		console.log(chart);
		chart = echarts.init(document.getElementById('chart') as HTMLElement);
		const filteredData = filterData(allWorkouts, timeFilter, selectedLift);
		const option = {
			tooltip: {
				trigger: 'axis'
			},
			xAxis: {
				type: 'category',
				data: filteredData.map((d) => d.created_at),
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
		if (!data) return [];

		let filtered = [...data];

		// Filter by lift type
		if (lift !== 'all') {
			filtered = filtered.filter((d) => d.lift === lift);
		}

		// Filter by time frame
		const nowZoned = Temporal.Now.zonedDateTimeISO('Europe/Stockholm'); // Use Stockholm timezone
		filtered = filtered.filter((d) => {
			const workoutDate = d.created_at;
			if (!workoutDate) return false;
			const workoutTemporal = Temporal.Instant.from(workoutDate.toString()).toZonedDateTimeISO(
				'Europe/Stockholm'
			); // Convert to Stockholm time

			// Calculate durations in days instead of weeks/months/years
			const sevenDaysAgo = nowZoned.subtract({ days: 7 });
			const thirtyDaysAgo = nowZoned.subtract({ days: 30 });
			const threeSixtyFiveDaysAgo = nowZoned.subtract({ days: 365 });

			switch (timeFrame) {
				case 'weekly':
					return Temporal.ZonedDateTime.compare(workoutTemporal, sevenDaysAgo) >= 0;
				case 'monthly':
					return Temporal.ZonedDateTime.compare(workoutTemporal, thirtyDaysAgo) >= 0;
				case 'yearly':
					return Temporal.ZonedDateTime.compare(workoutTemporal, threeSixtyFiveDaysAgo) >= 0;
				default:
					return true;
			}
		});

		// Sort by date using Temporal
		return filtered.sort((a, b) => {
			if (!a.created_at || !b.created_at) return 0;
			const aInstant = Temporal.Instant.from(a.created_at.toString()).toZonedDateTimeISO(
				'Europe/Stockholm'
			);
			const bInstant = Temporal.Instant.from(b.created_at.toString()).toZonedDateTimeISO(
				'Europe/Stockholm'
			);
			return Temporal.ZonedDateTime.compare(aInstant, bInstant);
		});
	};

	$effect(() => {
		console.log(showChart);
		if (showChart && (timeFilter || selectedLift)) {
			updateChart();
		}
	});
	let showChart = $state(true);
</script>

<div class="analytics-container w-full">
	<div class="filters">
		<select bind:value={timeFilter}>
			<option value="weekly">Weekly</option>
			<option value="monthly">Monthly</option>
			<option value="yearly">Yearly</option>
		</select>

		<select bind:value={selectedLift}>
			<option value="all">All Lifts</option>
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
					</tr>
				</thead>
				<tbody>
					{#each filterData(allWorkouts, timeFilter, selectedLift) as workout}
						<tr>
							<td>{workout.created_at}</td>
							<td>{workout.lift}</td>
							<td>{workout.weight}</td>
							<td>{workout.workout_rating}</td>
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
	/* Table container with fixed height and scroll */
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

<script lang="ts">
	import { getAllWorkouts } from '$lib/api';
	import { Lift, type supabaseWorkout } from '$lib/interfaces';
	import { Temporal } from '@js-temporal/polyfill';
	import * as echarts from 'echarts';
	import { onMount } from 'svelte';
	import { formatDate, getDateRanges, DEFAULT_TIMEZONE } from '$lib/temporal-service';

	let allWorkouts: supabaseWorkout[] = $state([]);
	let timeFilter = $state('monthly');
	let selectedLift = $state(Lift.böj);
	let chart: echarts.ECharts | null = null;
	let showChart = $state(false);

	let timeRanges = $state(getDateRanges());

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
			]
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

			// sort ascending for chart, descending for table
			return showChart
				? Temporal.ZonedDateTime.compare(a.created_at, b.created_at)
				: Temporal.ZonedDateTime.compare(b.created_at, a.created_at);
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
		<label class="cute-switch">
			<input type="checkbox" bind:checked={showChart} />
			<span class="slider">
				<span class="slider-icon">
					{#if showChart}📊{:else}📋{/if}
				</span>
			</span>
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

	.view-toggle {
		display: flex;
		align-items: center;
		gap: 1rem;
		margin: 0.5rem 0;
	}

	.cute-switch {
		position: relative;
		display: inline-block;
		width: 60px;
		height: 30px;
		cursor: pointer;
	}

	.cute-switch input {
		opacity: 0;
		width: 0;
		height: 0;
	}

	.slider {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: linear-gradient(to right, #c298e6, #f451d3);
		border-radius: 30px;
		transition: 0.4s;
		box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
		overflow: hidden;
	}

	.slider:before {
		position: absolute;
		content: '';
		height: 22px;
		width: 22px;
		left: 4px;
		bottom: 4px;
		background-color: white;
		border-radius: 50%;
		transition: 0.4s;
		z-index: 1;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	}

	.slider-icon {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		width: 100%;
		display: flex;
		justify-content: space-between;
		padding: 0 8px;
		box-sizing: border-box;
		font-size: 14px;
		transition: 0.4s;
	}

	input:checked + .slider:before {
		transform: translateX(30px);
	}

	input:focus + .slider {
		box-shadow: 0 0 3px #ad52f8;
	}

	input:checked + .slider {
		background: linear-gradient(to right, #ad52f8, #410077);
	}

	.toggle-label {
		font-weight: 500;
		user-select: none;
	}
</style>

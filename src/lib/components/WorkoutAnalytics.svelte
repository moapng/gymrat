<script lang="ts">
	import { getAllWorkouts } from '$lib/api';
	import { Lift, TableTimeToggle, type supabaseWorkout } from '$lib/interfaces';
	import { Temporal } from '@js-temporal/polyfill';
	import * as echarts from 'echarts';
	import { onMount } from 'svelte';
	import { formatDate, getDateRanges, DEFAULT_TIMEZONE } from '$lib/temporal-service';

	let allWorkouts: supabaseWorkout[] = $state([]);
	let timeFilter = $state(TableTimeToggle.latest_month);
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
			backgroundColor: '#253238',
			tooltip: {
				trigger: 'axis',
				backgroundColor: '#253238',
				borderColor: '#9ADBD6',
				textStyle: {
					color: '#CCCCCC',
					fontFamily: 'Courier New, monospace'
				}
			},
			xAxis: {
				type: 'category',
				data: filteredData.map((d) => formatDate(d.created_at)),
				axisLabel: {
					rotate: 45,
					color: '#CCCCCC',
					fontFamily: 'Courier New, monospace'
				},
				axisLine: {
					lineStyle: {
						color: '#9ADBD6'
					}
				},
				splitLine: {
					show: true,
					lineStyle: {
						color: '#9ADBD6',
						opacity: 0.3
					}
				}
			},
			yAxis: {
				type: 'value',
				name: 'vikt (kg)',
				nameTextStyle: {
					color: '#CCCCCC',
					fontFamily: 'Courier New, monospace'
				},
				axisLabel: {
					color: '#CCCCCC',
					fontFamily: 'Courier New, monospace'
				},
				axisLine: {
					lineStyle: {
						color: '#9ADBD6'
					}
				},
				splitLine: {
					lineStyle: {
						color: '#9ADBD6',
						opacity: 0.3
					}
				}
			},
			series: [
				{
					name: 'vikt (kg)',
					type: 'line',
					data: filteredData.map((d) => d.weight),
					smooth: false,
					symbol: 'rect',
					symbolSize: 8,
					lineStyle: {
						color: '#FF9DB6',
						width: 4
					},
					itemStyle: {
						color: '#FF9DB6',
						borderColor: '#9ADBD6',
						borderWidth: 2
					},
					markPoint: {
						data: [
							{ type: 'max', name: 'Maximum', itemStyle: { color: '#D09ED3' } },
							{ type: 'min', name: 'Minimum', itemStyle: { color: '#A7BDEF' } }
						],
						label: {
							color: '#253238',
							fontFamily: 'Courier New, monospace'
						}
					}
				}
			]
		};

		chart.setOption(option);
	};

	const filterData = (data: supabaseWorkout[], timeFrame: TableTimeToggle, lift: string) => {
		if (!data || !data.length) return [];

		const filtered = data.filter((d) => d.lift === lift && d.created_at);

		const dateFiltered = filtered.filter((d) => {
			if (!d.created_at) return false;

			switch (timeFrame) {
				case TableTimeToggle.latest_week:
					return Temporal.ZonedDateTime.compare(d.created_at, timeRanges.sevenDaysAgo) >= 0;
				case TableTimeToggle.latest_month:
					return Temporal.ZonedDateTime.compare(d.created_at, timeRanges.thirtyDaysAgo) >= 0;
				case TableTimeToggle.latest_year:
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
			<option value={TableTimeToggle.latest_week}>{TableTimeToggle.latest_week}</option>
			<option value={TableTimeToggle.latest_month}>{TableTimeToggle.latest_month}</option>
			<option value={TableTimeToggle.latest_year}>{TableTimeToggle.latest_year}</option>
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
		border: 2px solid #9adbd6;
	}

	#chart {
		height: 300px;
		border: 2px solid #9adbd6;
		background: #253238;
	}

	.table-container {
		height: 300px;
		overflow: hidden;
		position: relative;
		background: #253238;
	}

	thead {
		position: sticky;
		top: 0;
		z-index: 1;
		background: #253238;
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
		border-bottom: 1px solid #9adbd6;
	}

	th,
	td {
		padding: 0.5rem;
		text-align: left;
		color: #cccccc;
	}

	select {
		padding: 0.5rem;
		background: #253238;
		border: 2px solid #9adbd6;
		color: #cccccc;
		font-family: 'Courier New', monospace;
		cursor: pointer;
	}

	select:focus {
		border-color: #ff9db6;
		outline: none;
	}

	select option {
		background: #253238;
		color: #cccccc;
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
		background: #253238;
		border: 2px solid #9adbd6;
		transition: 0.3s;
		overflow: hidden;
	}

	.slider:before {
		position: absolute;
		content: '';
		height: 22px;
		width: 22px;
		left: 2px;
		bottom: 2px;
		background-color: #9adbd6;
		transition: 0.3s;
		z-index: 1;
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
		color: #cccccc;
		transition: 0.3s;
	}

	input:checked + .slider {
		background: #253238;
		border-color: #ff9db6;
	}

	input:checked + .slider:before {
		transform: translateX(30px);
		background-color: #ff9db6;
	}

	.toggle-label {
		font-weight: 400;
		user-select: none;
		margin-left: 8px;
		color: #cccccc;
	}
</style>

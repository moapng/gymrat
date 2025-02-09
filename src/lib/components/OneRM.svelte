<script lang="ts">
	import { getBänkOneRepMaxes, getBöjOneRepMaxes, getMarkOneRepMaxes } from '$lib/api';
	import { Lift, type supabaseWorkout } from '$lib/interfaces';
	import { onDestroy, onMount } from 'svelte';
	import * as echarts from 'echarts';

	let böjOneRepMaxes: supabaseWorkout[] = $state([]);
	let bänkOneRepMaxes: supabaseWorkout[] = $state([]);
	let markOneRepMaxes: supabaseWorkout[] = $state([]);

	let chart: echarts.ECharts | null = null;

	onMount(async () => {
		böjOneRepMaxes = await getBöjOneRepMaxes();
		bänkOneRepMaxes = await getBänkOneRepMaxes();
		markOneRepMaxes = await getMarkOneRepMaxes();

		if (chart) {
			chart.dispose();
		}
		chart = echarts.init(document.getElementById('chart') as HTMLElement);

		const allDates = Array.from(
			new Set([
				...böjOneRepMaxes.map((workout) => workout.achieved_at),
				...bänkOneRepMaxes.map((workout) => workout.achieved_at),
				...markOneRepMaxes.map((workout) => workout.achieved_at)
			])
		).sort();

		const mapDataToDates = (data: supabaseWorkout[], dates: any[]) => {
			const dateMap = new Map(data.map((workout) => [workout.achieved_at, workout.weight]));
			return dates.map((date) => dateMap.get(date) || null);
		};

		const option = {
			tooltip: {
				trigger: 'axis'
			},
			legend: {
				data: [Lift.böj, Lift.bänk, Lift.mark],
				textStyle: {
					color: '#ffffff'
				}
			},
			xAxis: {
				type: 'category',
				boundaryGap: true,
				data: allDates,
				axisLabel: {
					color: '#ffffff'
				}
			},
			yAxis: {
				type: 'value',
				axisLabel: {
					color: '#ffffff'
				}
			},
			series: [
				{
					name: Lift.böj,
					type: 'line',
					connectNulls: true,
					data: mapDataToDates(böjOneRepMaxes, allDates)
				},
				{
					name: Lift.bänk,
					type: 'line',
					connectNulls: true,
					data: mapDataToDates(bänkOneRepMaxes, allDates)
				},
				{
					name: Lift.mark,
					type: 'line',
					connectNulls: true,
					data: mapDataToDates(markOneRepMaxes, allDates)
				}
			],
			color: ['#98CE00', '#6CCFF6', '#b968f7'],
			textStyle: {
				color: '#ffffff'
			}
		};

		chart.setOption(option);
	});

	onDestroy(() => {
		if (chart) {
			chart.dispose();
		}
	});
</script>

<h1>1RM</h1>

<div id="chart" class="w-full h-40"></div>

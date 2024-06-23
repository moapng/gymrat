<script lang="ts">
	import { ActiveDay, colors, type IExerciseLog } from '$lib/interfaces';
	import * as echarts from 'echarts';
	import { onMount } from 'svelte';

	let { exercise_logs }: { exercise_logs: IExerciseLog[] } = $props();

	const exercise_names = [...new Set(exercise_logs.map((log) => log.exercise_name))];
	let dates = [...new Set(exercise_logs.map((log) => log.log_date))].sort(
		(a, b) => new Date(a).getTime() - new Date(b).getTime()
	);
	$effect(() => {
		console.log(dates);
	});

	const unique_exercise_names = [...new Set(exercise_logs.map((log) => log.exercise_name))];
	const series_data = unique_exercise_names.map((name, index) => {
		const weights = dates.map((date) => {
			const log = exercise_logs.find((ex) => ex.exercise_name === name && ex.log_date === date);
			return log ? log.weight : null;
		});

		return {
			name: name,
			type: 'line',
			connectNulls: true,
			stack: 'Total',
			smooth: true,
			lineStyle: {
				width: 4,
				stroke: 'black'
			},
			showSymbol: true,
			emphasis: {
				focus: 'series'
			},
			data: weights
		};
	});

	let options = {
		color: colors,
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'cross',
				label: {
					backgroundColor: '#6a7985'
				}
			}
		},
		legend: {
			data: exercise_names
		},
		grid: {
			left: '3%',
			right: '4%',
			bottom: '3%',
			containLabel: true
		},
		xAxis: [
			{
				type: 'category',
				boundaryGap: false,
				data: dates
			}
		],
		yAxis: [
			{
				type: 'value'
			}
		],
		series: series_data
	};

	let chart;
	let chartElement: HTMLElement;

	onMount(() => {
		const chartDom = chartElement;
		chart = echarts.init(chartDom);
		chart.setOption(options);
	});
</script>

<div bind:this={chartElement} id="main" style="width: 100%; height: 400px;"></div>

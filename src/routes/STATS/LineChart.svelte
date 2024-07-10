<script lang="ts">
	import { onMount } from 'svelte';
	import * as echarts from 'echarts';
	import { colors, type IPersonalRecord } from '$lib/interfaces';

	// Define props and ensure they conform to the IPersonalRecord interface
	export let data: IPersonalRecord[];

	const exercise_names = [...new Set(data.map((PR) => PR.exercise_name))];
	const dates = [...new Set(data.map((PR) => PR.date))].sort(
		(a, b) => new Date(a).getTime() - new Date(b).getTime()
	);

	const series_data = exercise_names.map((name, i) => {
		const weights = dates.map((date) => {
			const PR = data.find((ex) => ex.exercise_name === name && ex.date === date);
			return PR ? PR.weight : null;
		});

		const labels = weights.map((weight, index) => {
			const PR = data.find((ex) => ex.exercise_name === name && ex.date === dates[index]);
			return PR ? `${PR.weight} x ${PR.repetitions}` : '';
		});

		return {
			name: name,
			type: 'line',
			connectNulls: true,
			stack: 'Total',
			smooth: true,
			lineStyle: {
				width: 4,
				color: colors[i]
			},
			showSymbol: true,
			emphasis: {
				focus: 'series'
			},
			data: weights,
			label: {
				show: true,
				position: 'top',
				fontSize: 12,
				fontWeight: 'bold',
				fontFamily: 'Arial, sans-serif',
				color: '#4d306f',
				backgroundColor: colors[i],
				borderRadius: 6,
				padding: [6, 4],
				rotate: 45,
				formatter: (params: any) => labels[params.dataIndex]
			}
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
			left: '8%',
			right: '8%',
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

<script lang="ts">
	import { onMount } from 'svelte';
	import * as echarts from 'echarts';
	import {
		dark_purple_rgb,
		hot_pink_rgb,
		kuromi_purple_rgb,
		very_light_purple_rgb,
		type IPersonalRecord
	} from '$lib/interfaces';

	let { data, min }: { data: IPersonalRecord[]; min: number } = $props();

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
				color: hot_pink_rgb
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
				color: dark_purple_rgb,
				backgroundColor: hot_pink_rgb,
				borderRadius: 6,
				padding: [6, 4],
				rotate: 45,
				formatter: (params: any) => labels[params.dataIndex]
			}
		};
	});

	let options = {
		color: hot_pink_rgb,
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'cross',
				label: {
					backgroundColor: hot_pink_rgb
				}
			},
			backgroundColor: very_light_purple_rgb,
			borderRadius: 6,
			borderColor: very_light_purple_rgb,
			textStyle: {
				color: dark_purple_rgb
			}
		},
		grid: {
			bottom: '5%',
			top: '18%',
			containLabel: true
		},
		xAxis: [
			{
				type: 'category',
				boundaryGap: false,
				data: dates,
				axisLabel: {
					color: dark_purple_rgb
				},
				axisLine: {
					lineStyle: {
						color: dark_purple_rgb
					}
				}
			}
		],
		yAxis: [
			{
				type: 'value',
				min: min,
				axisLabel: {
					color: dark_purple_rgb
				},
				axisLine: {
					lineStyle: {
						color: dark_purple_rgb
					}
				},
				splitLine: {
					show: true,
					lineStyle: {
						color: kuromi_purple_rgb
					}
				}
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

<div bind:this={chartElement} id="main" style="width: 100%; height: 250px;" class="py-4"></div>

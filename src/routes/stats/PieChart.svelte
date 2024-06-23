<script lang="ts">
	import { ActiveDay, colors, type IExerciseLog } from '$lib/interfaces';
	import * as echarts from 'echarts';
	import { onMount } from 'svelte';

	let { exercise_logs }: { exercise_logs: IExerciseLog[] } = $props();

	let amount_of_specific_category_days = {
		[ActiveDay.PUSH]: 0,
		[ActiveDay.PULL]: 0,
		[ActiveDay.LEG]: 0,
		[ActiveDay.CORE]: 0
	};
	exercise_logs.map((log: IExerciseLog) => {
		amount_of_specific_category_days[log.category] =
			amount_of_specific_category_days[log.category] + 1;
	});
	console.log(
		Object.entries(amount_of_specific_category_days).map((day) => {
			return { value: day[1], name: day[0] };
		})
	);

	let options = {
		tooltip: {
			trigger: 'item'
		},
		series: [
			{
				name: 'Mest populära kategorin',
				type: 'pie',
				radius: '80%',
				center: ['50%', '50%'],
				roseType: 'radius',
				label: {
					show: false
				},

				data: Object.entries(amount_of_specific_category_days).map((day, i) => {
					return {
						value: day[1],
						name: day[0],
						itemStyle: {
							color: colors[i]
						}
					};
				})
			}
		]
	};
	let chart;
	let chartElement: HTMLElement;

	onMount(() => {
		const chartDom = chartElement;
		chart = echarts.init(chartDom, { renderer: 'canvas', useDirtyRect: false });
		chart.setOption(options);
	});
</script>

<div bind:this={chartElement} id="main" class="h-24 w-24"></div>

<style>
</style>

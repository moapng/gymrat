<script lang="ts">
	import { formatDate } from '$lib/temporal-service';
	import * as echarts from 'echarts';

	let { showChart, filterData, allWorkouts, timeFilter, liftFilter } = $props();

	let chart: echarts.ECharts | null = null;

	$effect(() => {
		if (showChart && (timeFilter || liftFilter)) {
			updateChart();
		}
	});

	const updateChart = () => {
		if (chart) {
			chart.dispose();
		}

		chart = echarts.init(document.getElementById('chart') as HTMLElement);
		const filteredData = filterData(allWorkouts, timeFilter, liftFilter);

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
</script>

<div id="chart" class="w-full h-40"></div>

<style>
	#chart {
		height: 300px;
		border: 2px solid #9adbd6;
		background: #253238;
	}
</style>

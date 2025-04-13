<script lang="ts">
	import { getAllWorkouts } from '$lib/api';
	import { Lift, TableTimeToggle, type supabaseWorkout } from '$lib/interfaces';
	import { Temporal } from '@js-temporal/polyfill';
	import { onMount } from 'svelte';
	import { getDateRanges } from '$lib/temporal-service';
	import Table from './Table.svelte';
	import Chart from './Chart.svelte';

	let allWorkouts: supabaseWorkout[] = $state([]);
	let timeFilter = $state(
		localStorage.getItem('timeFilter')
			? JSON.parse(localStorage.getItem('timeFilter')!)
			: TableTimeToggle.latest_month
	);
	let liftFilter = $state(
		localStorage.getItem('liftFilter') ? JSON.parse(localStorage.getItem('liftFilter')!) : Lift.böj
	);
	let showChart = $state(false);

	let timeRanges = $state(getDateRanges());

	onMount(async () => {
		allWorkouts = await getAllWorkouts();
	});

	$effect(() => {
		localStorage.setItem('timeFilter', JSON.stringify(timeFilter));
		localStorage.setItem('liftFilter', JSON.stringify(liftFilter));
		const timeFilterLocalStorage = localStorage.getItem('timeFilter');
		timeFilter = timeFilterLocalStorage
			? JSON.parse(timeFilterLocalStorage)
			: TableTimeToggle.latest_month;

		const liftFilterLocalStorage = localStorage.getItem('liftFilter');
		liftFilter = liftFilterLocalStorage ? JSON.parse(liftFilterLocalStorage) : Lift.böj;
		console.log(liftFilter);
	});

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
</script>

<div class="analytics-container w-full">
	<div class="view-toggles">
		<label class="cute-switch">
			<input type="checkbox" bind:checked={showChart} />
			<span class="slider">
				<span class="slider-icon" class:is-right={!showChart}>
					{#if showChart}📊{:else}📋{/if}
				</span>
			</span>
		</label>
		<select bind:value={timeFilter}>
			<option value={TableTimeToggle.latest_week}>{TableTimeToggle.latest_week}</option>
			<option value={TableTimeToggle.latest_month}>{TableTimeToggle.latest_month}</option>
			<option value={TableTimeToggle.latest_year}>{TableTimeToggle.latest_year}</option>
		</select>

		<select bind:value={liftFilter}>
			<option value="böj">{Lift.böj}</option>
			<option value="bänk">{Lift.bänk}</option>
			<option value="mark">{Lift.mark}</option>
		</select>
	</div>

	{#if showChart}
		<Chart {showChart} {filterData} {allWorkouts} {timeFilter} {liftFilter} />
	{:else}
		<Table {filterData} {allWorkouts} {timeFilter} {liftFilter} />
	{/if}
</div>

<style>
	.analytics-container {
		display: flex;
		flex-direction: column;
		gap: 2rem;
		padding: 1rem;
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

	.view-toggles {
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
		font-size: 14px;
		color: #cccccc;
		transition: 0.3s;
	}
	.slider-icon.is-right {
		transform: translateX(40%) translateY(-50%);
	}

	input:checked + .slider {
		background: #253238;
		border-color: #ff9db6;
	}

	input:checked + .slider:before {
		transform: translateX(30px);
		background-color: #ff9db6;
	}
</style>

<script lang="ts">
	import { showPopper } from '$lib/stores/popper.svelte';
	import { formatDate } from '$lib/temporal-service';
	import CommentTooltip from './CommentTooltip.svelte';

	let { filterData, allWorkouts, timeFilter, liftFilter } = $props();

	const showCommentTooltip = (event: Event, comment: string) => {
		if (comment) {
			const target = event.currentTarget as HTMLElement;
			showPopper(target, CommentTooltip, { comment });
		}
	};
</script>

<div class="table-container">
	<table>
		<thead>
			<tr>
				<th>📅</th>
				<th>⚖️</th>
				<th>🔄</th>
				<th>⭐</th>
				<th>💭</th>
			</tr>
		</thead>
		<tbody>
			{#each filterData(allWorkouts, timeFilter, liftFilter) as workout}
				<tr>
					<td>{formatDate(workout.created_at)}</td>
					<td>{workout.weight}</td>
					<td>{workout.repetitions}</td>
					<td>{workout.workout_rating}</td>
					<td
						class="comment-cell"
						onclick={(e) => showCommentTooltip(e, workout.comment)}
						ontouchstart={(e) => showCommentTooltip(e, workout.comment)}
					>
						<span class="comment-text">{workout.comment}</span>
						{#if workout.comment && workout.comment.length > 8}
							<span class="tooltip-indicator">👆</span>
						{/if}
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<style>
	table {
		width: 100%;
		border-collapse: collapse;
		border-spacing: 0;
		border: 2px solid #9adbd6;
		th:not(:first-child):not(:last-child),
		td:not(:first-child):not(:last-child) {
			width: 3rem;
		}
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

	.comment-cell {
		position: relative;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.comment-text {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		max-width: calc(100% - 20px);
	}

	.tooltip-indicator {
		font-size: 0.8rem;
		opacity: 0.7;
		margin-left: 4px;
	}
</style>

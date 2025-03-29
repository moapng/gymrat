<script lang="ts">
	let { comment } = $props();
</script>

<div class="comment-tooltip">
	{comment}
</div>

<style>
	.comment-tooltip {
		padding: 0.75rem;
		max-width: 80vw;
		word-break: break-word;
		white-space: pre-wrap;
		font-family: 'Courier New', monospace;
		color: #cccccc;
	}
</style>
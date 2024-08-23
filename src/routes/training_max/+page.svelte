<script lang="ts">
	let { data } = $props();
</script>

<section>
	<h1>tmaxx</h1>
	<dl>
		{#each data.t_max as t_max}
			<dt>{t_max.lif_id}</dt>
			<dd>{t_max.training_max}</dd>
			<dd>{t_max.updated_at}</dd>
		{/each}
	</dl>
</section>

<script lang="ts">
	import '../app.postcss';
	let { children, data } = $props();
</script>

<main
	class="bg-gradient-to-br from-surface-200 to-surface-300
	h-full"
>
	{@render children()}
</main>

<style>
</style>

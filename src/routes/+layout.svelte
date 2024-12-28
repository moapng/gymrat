<script lang="ts">
	import '../app.scss';
	let { children, data } = $props();
</script>

<main class="bg-primary h-full w-full">
	{@render children()}
</main>

<style>
</style>

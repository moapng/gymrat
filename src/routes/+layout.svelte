<script lang="ts">
	import '../app.scss';
	import '../utilities.scss';
	let { children, data } = $props();
</script>

<main class="bg h-full w-full">
	{@render children()}
</main>

<style>
</style>

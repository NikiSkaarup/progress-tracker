<script lang="ts">
	import '../app.postcss';
	import MyCursorEffect from '$lib/components/ui/mine/my-cursor-effect.svelte';
	import MyHeader from '$lib/components/ui/mine/my-header.svelte';
	import MyHead from '$lib/components/ui/mine/my-head.svelte';
</script>

<MyHead />

<MyHeader />

<main>
	<slot />
</main>

<MyCursorEffect />

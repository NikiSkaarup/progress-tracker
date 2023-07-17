<script>
	/** @type {string | undefined | null} */
	export let url = undefined;
	/** @type {boolean} */
	export let grayscale = false;
	$: style = url ? `background-image: url('${url}');` : undefined;
</script>

{#if url}
	<div
		class="absolute inset-0 transition-[filter] bg-cover bg-center bg-no-repeat"
		class:grayscale
		{style}
	/>
{/if}

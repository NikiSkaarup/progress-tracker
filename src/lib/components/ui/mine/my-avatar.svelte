<script lang="ts">
	import Noise from './noise.svelte';
	export let id: string;
	export let src: string;
	$: noiseId = id + '-noise';
</script>

<Noise id={noiseId} begin="{id}.mouseenter" />
<div {id} class="aspect-square h-12 overflow-hidden rounded-full">
	<img
		loading="eager"
		class="aspect-square h-full object-cover"
		{src}
		alt="portrait"
		style="filter: url(#{noiseId});"
	/>
</div>

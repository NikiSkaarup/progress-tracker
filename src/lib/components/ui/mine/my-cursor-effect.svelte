<script lang="ts">
	import { fade } from 'svelte/transition';
	import { spring } from 'svelte/motion';
	import { dev } from '$app/environment';

	const top = spring(100, {
		damping: 0.7,
		stiffness: 0.006
	});
	const left = spring(300, {
		damping: 0.75,
		stiffness: 0.003
	});
	let effect: HTMLDivElement;
</script>

<svelte:window
	on:mousemove={(event) => {
		const clientWidth = effect.clientWidth / 2;
		const clientHeight = effect.clientHeight / 2;
		const newLeft = event.clientX - clientWidth;
		const newTop = event.clientY - clientHeight;
		if (newLeft > window.innerWidth) {
			left.set(window.innerWidth);
		} else if (newLeft < -clientWidth) {
			left.set(-clientWidth);
		} else {
			left.set(newLeft);
		}
		if (newTop > window.innerHeight) {
			top.set(window.innerHeight);
		} else if (newTop < -clientHeight) {
			top.set(-clientHeight);
		} else {
			top.set(newTop);
		}
	}}
/>

<div
	transition:fade={{ duration: 2000 }}
	class="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
>
	{#if dev}
		<div class="fixed bottom-2 right-2 flex flex-col items-end font-mono text-xs opacity-40">
			<span>{$left.toFixed()} x</span>
			<span>{$top.toFixed()} y</span>
		</div>
	{/if}
	<div
		bind:this={effect}
		class="absolute left-0 top-0 -z-10 h-fit w-fit origin-center transform-gpu filter will-change-transform"
		style="--tw-translate-x: {$left.toFixed()}px; --tw-translate-y: {$top.toFixed()}px; --tw-blur: blur(128px);"
	>
		<div
			class="grid animate-spin items-center justify-center"
			style="animation-duration: 300s;"
		>
			<div
				class="ml-[7.5vw] h-[70vw] w-[25vw] animate-spin rounded-full bg-gradient-to-r from-violet-950 to-indigo-800 opacity-90"
				style="animation-duration: 120s;"
			/>
			<div
				class="mt-[15vw] h-[40vw] w-[40vw] animate-spin overflow-hidden rounded-full bg-gradient-to-r from-purple-950 to-indigo-800 opacity-90"
				style="animation-duration: 200s;"
			/>
		</div>
	</div>
</div>

<style>
	div.grid {
		grid-template-columns: 1fr;
		grid-template-rows: 1fr;
	}

	div.grid > div.animate-spin {
		grid-area: 1 / 1;
	}
</style>

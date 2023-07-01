<script lang="ts">
	import Markdown from 'svelte-exmarkdown';
	import { gfmPlugin } from 'svelte-exmarkdown/gfm';
	export let data;

	const plugins = [gfmPlugin];
</script>

<article>
	<header class="container mx-auto w-full space-y-4 px-4 py-8">
		<h1 class="mx-auto max-w-prose hyphens-auto break-words text-center text-3xl">
			{data.title}
		</h1>
		<p class="mx-auto max-w-prose hyphens-auto break-words text-center">
			{data.snippet}
		</p>
	</header>

	{#each data.content as md, i}
		<section class:bg-black={i % 2 === 0}>
			<div class="container mx-auto w-full px-4 py-8">
				<div class="mx-auto max-w-prose space-y-4 hyphens-auto break-words">
					<Markdown {md} {plugins} />
				</div>
			</div>
		</section>
	{/each}
</article>

<style>
	header {
		content-visibility: auto;
		contain-intrinsic-size: auto 65ch auto 300px;
	}

	section {
		content-visibility: auto;
		contain-intrinsic-size: auto 65ch auto 600px;
	}
</style>

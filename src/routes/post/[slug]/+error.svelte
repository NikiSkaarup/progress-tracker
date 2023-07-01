<script lang="ts">
	import { page } from '$app/stores';
</script>

<article>
	<header class="container mx-auto w-full space-y-4 px-4 py-8">
		<h1 class="mx-auto max-w-prose hyphens-auto break-words text-center text-3xl">
			{$page.status}
		</h1>
		<p class="mx-auto max-w-prose hyphens-auto break-words text-center">
			{#if $page.error === undefined}
				whoops
			{:else if typeof $page.error === 'string'}
				{$page.error}
			{:else if $page.error?.message !== undefined}
				{$page.error.message}
			{:else}
				whoops
			{/if}
		</p>
	</header>
</article>

<style>
	header {
		content-visibility: auto;
		contain-intrinsic-size: auto 65ch auto 300px;
	}
</style>

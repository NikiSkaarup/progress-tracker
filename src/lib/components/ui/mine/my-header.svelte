<script>
	import { page } from '$app/stores';
	import MyTail from './my-tail.svelte';
</script>

<header class="sticky top-0 z-20 bg-black font-mono drop-shadow">
	<div class="container mx-auto grid grid-cols-3 px-4 py-2 min-h-[4rem]">
		<div class="flex items-center gap-8">
			<a href="/" class="uppercase py-2">
				<span class="sr-only md:not-sr-only">Progress Tracker</span>
				<span class="md:hidden">P/T</span>
			</a>
		</div>

		<div class="flex items-center justify-center uppercase">
			{#if $page.data.session?.user?.name !== undefined && $page.data.session.user.name !== null}
				<span class="sr-only md:not-sr-only"> {$page.data.session.user.name}</span>
				<span class="md:hidden">
					{$page.data.session.user.name
						.split(' ')
						.map((w) => w[0])
						.join('.')}
				</span>
			{/if}
		</div>

		<div class="flex items-center justify-end gap-8">
			<MyTail />
		</div>
	</div>
</header>

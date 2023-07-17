<script lang="ts">
	import MyBackgroundImage from '$lib/components/ui/mine/my-background-image.svelte';

	export let data;
</script>

<div
	class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 container mx-auto py-4 px-4 lg:px-0"
>
	{#each data.subItems as subItem (subItem.id)}
		<a
			href="/{data.categoryId}/{data.itemId}/{subItem.id}"
			class="relative aspect-[3/4] flex justify-center items-end bg-slate-900"
			draggable="false"
		>
			<MyBackgroundImage url={subItem.poster} grayscale={!subItem.completed} />
			<div
				class="flex flex-col items-center gap-1 w-full backdrop-blur-md backdrop-brightness-75 py-2"
			>
				<span class="text-2xl">
					{subItem.name}
				</span>

				<span>
					{#if subItem.completed}
						completed
					{:else}
						incomplete
					{/if}
				</span>
			</div>
		</a>
	{:else}
		<article class="sm:col-span-2 md:col-span-3 lg:col-span-4 xl:col-span-5 2xl:col-span-6">
			<header class="container mx-auto w-full space-y-4 px-4 py-8">
				<h2 class="hyphens-auto break-words text-center text-3xl">
					No items yet. create one!
				</h2>
			</header>
		</article>
	{/each}
</div>

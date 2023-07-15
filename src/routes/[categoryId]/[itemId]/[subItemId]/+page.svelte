<script lang="ts">
	export let data;
</script>

<div
	class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 container mx-auto py-4 px-4 lg:px-0"
>
	{#each data.subItems as subitem (subitem.id)}
		<a
			href="/{data.categoryId}/{data.itemId}/{subitem.id}"
			class="aspect-[3/4] flex justify-center items-end bg-cover bg-center bg-no-repeat lg:transition-[filter] lg:brightness-90 lg:hover:brightness-100 bg-slate-900"
			draggable="false"
			style="background-image: url('{subitem.poster}');"
		>
			<div
				class="flex flex-col items-center gap-1 w-full backdrop-blur-md backdrop-brightness-75 py-2"
			>
				<span class="text-2xl">
					{subitem.name}
				</span>
				{#if subitem.completed}
					<span> completed </span>
				{:else}
					<span class="text-sm"> incomplete </span>
				{/if}
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

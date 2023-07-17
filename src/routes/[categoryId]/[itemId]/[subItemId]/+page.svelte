<script lang="ts">
	import { enhance } from '$app/forms';
	import MyBackgroundImage from '$lib/components/ui/mine/my-background-image.svelte';

	export let data;
</script>

<div
	class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 container mx-auto py-4 px-4 lg:px-0"
>
	<div class="relative aspect-[3/4] flex justify-center items-end bg-slate-900" draggable="false">
		<MyBackgroundImage url={data.subItem.poster} grayscale={!data.subItem.completed} />
		<div
			class="flex flex-col items-center gap-1 w-full backdrop-blur-md backdrop-brightness-75 py-2"
		>
			<span class="text-2xl">
				{data.subItem.name}
			</span>
			<form action="?/toggle" method="post" use:enhance class="w-full px-2">
				<button class="px-2 py-1 bg-black rounded-sm hover:bg-slate-950/75 w-full">
					{#if data.subItem.completed}
						Mark as incomplete
					{:else}
						Mark as complete
					{/if}
				</button>
			</form>
		</div>
	</div>
	<div />
</div>

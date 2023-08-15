<script lang="ts">
	import { page } from '$app/stores';
	import { signIn, signOut } from '@auth/sveltekit/client';
	import MyAvatar from './my-avatar.svelte';
	import { createDropdownMenu, melt } from '@melt-ui/svelte';

	// const { trigger, menu, item, arrow, separator } = createDropdownMenu();
	const {
		elements: { trigger, menu, item, arrow }
	} = createDropdownMenu();

	$: session = $page.data.session;
</script>

{#if session}
	{@const src = session.user?.image}
	<button type="button" class="trigger" use:melt={$trigger} aria-label="Update dimensions">
		{#if src}
			<MyAvatar id="avatar" {src} />
		{:else}
			<span class="flex h-12 w-12 items-center justify-center rounded-full bg-gray-500">
				|||
			</span>
		{/if}
	</button>
{:else}
	<button on:click={() => signIn('github')}> Sign In </button>
{/if}

<div
	class="menu z-30 flex max-h-[300px] min-w-fit flex-col rounded-md p-1 shadow-lg shadow-neutral-900/30 lg:max-h-none"
	use:melt={$menu}
>
	<div
		class="item flex h-[25px] min-h-[25px] cursor-pointer select-none items-center rounded-sm pl-6 pr-6 text-sm leading-none"
		use:melt={$item}
		on:m-click={() => signOut()}
	>
		Sign out
	</div>
	<div use:melt={$arrow} />
</div>

<style lang="postcss">
	.menu {
		color: rgb(240 244 250);
		background-color: rgb(50 47 95);
	}
	.item {
		color: rgb(240 244 250);
	}
	.item[data-highlighted] {
		background-color: rgb(50 47 95);
	}
	.item[data-highlighted] {
		@apply text-neutral-300;
	}
</style>

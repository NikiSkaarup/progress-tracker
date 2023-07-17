<script lang="ts">
	import { page } from '$app/stores';
	import { signIn, signOut } from '@auth/sveltekit/client';
	import MyAvatar from './my-avatar.svelte';
	import { createDropdownMenu } from '@melt-ui/svelte';

	const { trigger, menu, item, arrow, separator } = createDropdownMenu();
</script>

{#if $page.data.session}
	<button type="button" class="trigger" melt={$trigger} aria-label="Update dimensions">
		{#if $page.data.session.user?.image}
			<MyAvatar id="avatar" src={$page.data.session.user.image} />
		{:else}
			<span class="h-12 w-12 flex justify-center items-center bg-gray-500 rounded-full">
				|||
			</span>
		{/if}
	</button>
{:else}
	<button on:click={() => signIn('github')}> Sign In </button>
{/if}

<div
	class="menu z-30 flex max-h-[300px] min-w-fit flex-col shadow-lg shadow-neutral-900/30 rounded-md p-1 lg:max-h-none"
	melt={$menu}
>
	<div
		class="item cursor-pointer select-none rounded-sm pl-6 pr-6 h-[25px] min-h-[25px] flex items-center text-sm leading-none"
		melt={$item}
		use:item={{ onSelect: () => signOut() }}
	>
		Sign out
	</div>
	<div melt={$arrow} />
</div>

<style lang="postcss">
	.menu {
		color: rgb(240 244 250);
		background-color: rgb(30 27 75);
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

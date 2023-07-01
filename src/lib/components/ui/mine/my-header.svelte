<script>
	import { signIn, signOut } from '@auth/sveltekit/client';
	import { page } from '$app/stores';
	import MyAvatar from './my-avatar.svelte';
</script>

<header class="sticky top-0 z-20 bg-black font-mono drop-shadow">
	<div class="container mx-auto grid grid-cols-3 px-4 py-2 min-h-[4rem]">
		<div class="flex items-center gap-8">
			<a href="/" class="uppercase py-2"> Progress Tracker </a>
		</div>

		<div class="flex items-center justify-center">
			{#if $page.data.session?.user?.name !== undefined}
				<span class="uppercase">
					{$page.data.session.user.name}
				</span>
			{/if}
		</div>

		<div class="flex items-center justify-end gap-8">
			{#if $page.data.session}
				<button on:click={() => signOut()}>Sign out</button>
				{#if $page.data.session.user?.image}
					<MyAvatar id="avatar" src={$page.data.session.user.image} />
				{/if}
			{:else}
				<button on:click={() => signIn('github')}> Sign In </button>
			{/if}
		</div>
	</div>
</header>

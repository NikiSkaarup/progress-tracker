<script>
	import { page } from '$app/stores';

	const titleBase = 'Niki Wix Skaarup';
	$: title =
		$page.url.pathname === '/' || $page.data.title === undefined
			? titleBase
			: `${titleBase} - ${$page.data.title}`;
	$: description = $page.data.snippet ?? '';
	$: image = $page.data.image ?? '';
</script>

<svelte:head>
	<title>{title}</title>
	<meta property="twitter:image" content={image} />
	<meta property="twitter:card" content="summary" />
	<meta property="twitter:title" content={title} />
	<meta property="twitter:description" content={description} />
	<meta property="description" content={description} />
	<meta property="og:image" content={image} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={$page.url.toString()} />
	<link rel="manifest" href="/manifest.json" />
</svelte:head>

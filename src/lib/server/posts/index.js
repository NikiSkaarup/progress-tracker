import { env } from '$env/dynamic/private';
import { Directus } from '@directus/sdk';

/** @type {import('@directus/sdk').Directus<MyCollections, import('@directus/sdk').Auth>} */
const directus = new Directus(env.DIRECTUS_URL);

async function getSlugs() {
	const items = await directus.items('posts').readByQuery({
		sort: ['slug'],
		fields: ['slug']
	});

	return items.data?.map((val) => val.slug) ?? [];
}

async function getLatestPosts() {
	const items = await directus.items('posts').readByQuery({
		sort: ['-date_created', '-date_updated'],
		fields: ['title', 'slug', 'snippet'],
		limit: 10
	});

	return items.data ?? [];
}

async function getPost(/** @type {string} */ slug) {
	const item = await directus.items('posts').readByQuery({
		filter: { slug },
		fields: ['title', 'snippet', 'post_content.item.md'],
		limit: 1
	});

	if (item.data === undefined) return undefined;
	if (item.data === null) return undefined;
	if (item.data.length === 0) return undefined;

	return item.data[0];
}

export default { getLatestPosts, getPost, getSlugs };

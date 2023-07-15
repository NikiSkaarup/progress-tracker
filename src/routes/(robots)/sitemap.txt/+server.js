import posts from '$lib/server/posts';

export const GET = async ({ url }) => {
	const blogPosts = await posts.getSlugs();

	let sitemap = `${url.origin}/`;

	const postUrls = blogPosts.map((slug) => `${url.origin}/blog/${slug}`);

	if (postUrls.length > 0) {
		sitemap += `\n${postUrls.join('\n')}`;
	}

	return new Response(sitemap);
};

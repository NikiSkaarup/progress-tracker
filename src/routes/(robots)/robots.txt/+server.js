export const GET = async ({ url }) => {
	return new Response(`User-agent: *\nAllow: /\n\nSitemap: ${url.origin}/sitemap.txt`);
};

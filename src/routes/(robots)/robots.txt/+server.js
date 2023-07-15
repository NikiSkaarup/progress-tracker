export const GET = async ({ url }) =>
	new Response(`User-agent: *\nAllow: /\n\nSitemap: ${url.origin}/sitemap.txt`);

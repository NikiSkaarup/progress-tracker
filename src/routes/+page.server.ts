import posts from '$lib/server/posts';

export const load = async () => {
	return {
		posts: posts.getLatestPosts(),
		snippet: 'Portfolio / Blog' // TODO: get from directus
	};
};

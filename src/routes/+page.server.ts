import category from '$lib/server/db/category';

export const load = async () => {
	return {
		categories: category.getAll()
	};
};

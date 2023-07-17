import category from '$lib/server/database/category';

export const load = async () => {
	return {
		categories: category.getAll()
	};
};

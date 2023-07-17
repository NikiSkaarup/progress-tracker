import item from '$lib/server/database/item';

export const load = async ({ params }) => {
	return {
		items: item.getAll(params.categoryId),
		categoryId: params.categoryId
	};
};

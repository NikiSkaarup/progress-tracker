import item from '$lib/server/db/item';

export const load = async ({ params }) => {
	return {
		items: item.getAll(params.categoryId),
		categoryId: params.categoryId
	};
};

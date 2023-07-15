import subItem from '$lib/server/db/sub-item';

export const load = async ({ params }) => {
	return {
		subItems: subItem.getAll(params.itemId),
		categoryId: params.categoryId,
		itemId: params.itemId
	};
};

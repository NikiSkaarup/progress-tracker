import subItem from '$lib/server/database/sub-item';

export const load = async ({ params }) => {
	return {
		subItems: subItem.getAll(params.itemId),
		categoryId: params.categoryId,
		itemId: params.itemId
	};
};

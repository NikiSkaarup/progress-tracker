import subItem from '$lib/server/database/sub-item';

export const load = async ({ params }) => {
	return {
		subItem: subItem.get(params.subItemId),
		categoryId: params.categoryId,
		itemId: params.itemId,
		subItemId: params.subItemId
	};
};

export const actions = {
	toggle: async (event) => {
		const res = subItem.toggleCompleted(event.params.subItemId);

		if (res.changes === 1) {
			return {
				success: true
			};
		}
	}
};

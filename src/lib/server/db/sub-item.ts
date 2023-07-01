import db from '.';

const getAll = async (itemId: string) =>
	db.subItem.findMany({
		select: {
			id: true,
			name: true,
			poster: true,
			completed: true
		},
		orderBy: {
			updatedAt: 'desc'
		},
		where: {
			itemId
		}
	});

const get = async (id: string) =>
	db.subItem.findUnique({
		where: {
			id
		},
		select: {
			id: true,
			name: true,
			poster: true
		}
	});

export default {
	getAll,
	get
};

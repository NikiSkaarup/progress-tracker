import db from '.';

const getAll = async () =>
	db.tag.findMany({
		select: {
			id: true,
			name: true
		},
		orderBy: {
			updatedAt: 'desc'
		}
	});

const get = async (id: string) =>
	db.tag.findUnique({
		where: {
			id
		},
		select: {
			id: true,
			name: true
		}
	});

export default {
	getAll,
	get
};

import db from '.';

const getAll = async (/** @type {string} */ categoryId) =>
	db.item.findMany({
		select: {
			id: true,
			name: true,
			poster: true,
			subItem: {
				select: { completed: true },
				where: {
					completed: false
				}
			},
			_count: {
				select: {
					subItem: {
						where: {
							completed: true
						}
					}
				}
			}
		},
		orderBy: {
			updatedAt: 'desc'
		},
		where: {
			categoryId
		}
	});

const get = async (/** @type {string} */ id) =>
	db.item.findUnique({
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

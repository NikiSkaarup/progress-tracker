import db from '.';

// PRISMA WHY DO YOU MAKE ME DO THIS?! JUST TO GET TWO COUNTS OF THE SAME COLUMN?!
const getAll = async () =>
	db.category.findMany({
		select: {
			id: true,
			name: true,
			poster: true,
			_count: {
				select: {
					item: true
				}
			}
		},
		orderBy: {
			name: 'asc'
		}
	});

const get = async (/** @type {string} */ id) =>
	db.category.findUnique({
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

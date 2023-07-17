import client from '.';

const getAllPrep = client.prepare(
	'SELECT Category.id, Category.name, Category.poster, (SELECT COUNT(*) FROM Item WHERE Item.categoryId = Category.id) as items FROM Category ORDER BY Category.name ASC'
);

/** @typedef {{id: string; name: string; poster: string | null; items: number}[]} getAllResult */
function getAll() {
	return /** @type {getAllResult} */ (getAllPrep.all());
}

const getPrep = client.prepare('SELECT id, name, poster FROM Category WHERE id = ?');

/** @typedef {{id: string; name: string; poster: string | null;}} getResult */
function get(/** @type {string} */ id) {
	return /** @type {getResult} */ (getPrep.get(id));
}

export default {
	getAll,
	get
};

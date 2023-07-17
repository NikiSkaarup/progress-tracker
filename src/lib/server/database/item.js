import client from '.';

const getAllPrep = client.prepare(
	'SELECT Item.id, Item.name, Item.poster, (SELECT COUNT(*) FROM SubItem WHERE SubItem.itemId = Item.id) as subItems, (SELECT COUNT(*) FROM SubItem WHERE SubItem.itemId = Item.id AND SubItem.completed = true) as subItemsCompleted FROM Item WHERE Item.categoryId = ? ORDER BY Item.updatedAt DESC'
);

/** @typedef {{id: string; name: string; poster: string | null; subItems: number; subItemsCompleted: number;}[]} getAllResult */
function getAll(/** @type {string} */ categoryId) {
	return /** @type {getAllResult} */ (getAllPrep.all(categoryId));
}

const getPrep = client.prepare('SELECT id, name, poster FROM Item WHERE id = ?');

/** @typedef {{id: string; name: string; poster: string | null;}} getResult */
function get(/** @type {string} */ id) {
	return /** @type {getResult} */ (getPrep.get(id));
}

export default {
	getAll,
	get
};

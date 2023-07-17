import client from '.';

const getAllPrep = client.prepare('SELECT id, name FROM Tag ORDER BY updatedAt DESC');

/** @typedef {{id: string; name: string;}[]} getAllResult */
function getAll() {
	return /** @type {getAllResult} */ (getAllPrep.all());
}

const getPrep = client.prepare('SELECT id, name FROM Tag WHERE id = ?');

/** @typedef {{id: string; name: string;}} getResult */
function get(/** @type {string} */ id) {
	return /** @type {getResult} */ (getPrep.get(id));
}

export default {
	getAll,
	get
};

import client from '.';

const getAllPrep = client.prepare(
	'SELECT id, name, poster, completed FROM SubItem WHERE ItemId = ? ORDER BY updatedAt DESC'
);

/** @typedef {{id: string; name: string; poster: string | null; completed: boolean;}[]} getAllResult */
function getAll(/** @type {string} */ id) {
	return /** @type {getAllResult} */ (getAllPrep.all(id));
}

const getPrep = client.prepare('SELECT id, name, poster, completed FROM SubItem WHERE id = ?');

/** @typedef {{id: string; name: string; poster: string | null; completed: boolean;}} getResult */
function get(/** @type {string} */ id) {
	return /** @type {getResult} */ (getPrep.get(id));
}

const toggleCompletedPrep = client.prepare(
	'UPDATE SubItem SET completed = NOT completed WHERE id = ?'
);

function toggleCompleted(/** @type {string} */ id) {
	return toggleCompletedPrep.run(id);
}

export default {
	getAll,
	get,
	toggleCompleted
};

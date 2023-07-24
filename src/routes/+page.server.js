import category from '$lib/server/database/category';
import { redirect } from '@sveltejs/kit';

export const load = async () => {
	return {
		categories: category.getAll()
	};
};

export const actions = {
	default: async (event) => {
		event.setHeaders({
			'Set-Cookie': event.cookies.serialize('provider', JSON.stringify({ name: 'hello' }), {
				path: '/'
			})
		});

		throw redirect(303, '/');
	}
};

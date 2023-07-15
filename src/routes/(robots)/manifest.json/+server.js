import { json } from '@sveltejs/kit';

export const GET = async () =>
	json({
		name: 'Progress Tracker',
		short_name: 'PT',
		// start_url: '.',
		display: 'browser',
		background_color: '#141141',
		theme_color: '#371D85',
		description: 'Progress Tracker',
		icons: [],
		related_applications: []
	});

import { SvelteKitAuth } from '@auth/sveltekit';
import authAdapter from '$lib/server/database/auth-adapter';
import GitHub from '@auth/core/providers/github';
import { sequence } from '@sveltejs/kit/hooks';
import { redirect } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { dev } from '$app/environment';
import database from '$lib/server/database';

/** @type {import('@auth/core/providers').Provider} */
const githubProvider = GitHub({
	clientId: env.GITHUB_ID,
	clientSecret: env.GITHUB_SECRET
});

/** @type {import('@sveltejs/kit').Handle} */
const authHandle = SvelteKitAuth({
	adapter: authAdapter(database),
	providers: [githubProvider]
});

/** @type {import('@sveltejs/kit').Handle} */
const authorization = async ({ event, resolve }) => {
	if (event.url.pathname.startsWith('/auth')) {
		// Only allow access to the auth routes if the user is not logged in
		return resolve(event);
	}

	const session = await event.locals.getSession();

	if (!session) {
		throw redirect(303, '/auth/signin');
	}

	return resolve(event);
};

/** @type {import('@sveltejs/kit').Handle} */
const preHandle = async ({ event, resolve }) => resolve(event);
/** @type {import('@sveltejs/kit').Handle} */
const postHandle = async ({ event, resolve }) => resolve(event);

export const handle = sequence(preHandle, authHandle, authorization, postHandle);

export const handleFetch = async ({ request, fetch }) => {
	return fetch(request);
};

export const handleError = async ({ error, event }) => {
	let message = 'Unknown error';

	if (typeof error === 'string') {
		message = error;
	} else if (error instanceof Error) {
		message = error.message;
	}

	if (dev) {
		console.log('Error:', event.request.url);
		console.error(error);
	}

	return {
		message
	};
};

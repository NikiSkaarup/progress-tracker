import { SvelteKitAuth } from '@auth/sveltekit';
import { PrismaAdapter } from '@auth/prisma-adapter';
import GitHub from '@auth/core/providers/github';
import { sequence } from '@sveltejs/kit/hooks';
import { redirect, type Handle } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import db from '$lib/server/db';
import type { Provider } from '@auth/core/providers';
import { dev } from '$app/environment';

const authHandle: Handle = SvelteKitAuth({
	adapter: PrismaAdapter(db),
	providers: [
		GitHub({
			clientId: env.GITHUB_ID,
			clientSecret: env.GITHUB_SECRET
		}) as unknown as Provider
	]
});

const authorization: Handle = async ({ event, resolve }) => {
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

const preHandle: Handle = async ({ event, resolve }) => resolve(event);
const postHandle: Handle = async ({ event, resolve }) => resolve(event);

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

import { SvelteKitAuth } from '@auth/sveltekit';
import authAdapter from '$lib/server/database/auth-adapter';
import GitHub from '@auth/core/providers/github';
import { sequence } from '@sveltejs/kit/hooks';
import { redirect } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { dev } from '$app/environment';
import database from '$lib/server/database';
import { nanoid } from 'nanoid/async';

const githubProvider = GitHub({
	clientId: env.GITHUB_ID,
	clientSecret: env.GITHUB_SECRET
});

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

/** @type {Map<string, number>} */
const startTimes = new Map();

/** @type {import('@sveltejs/kit').Handle} */
const preHandle = async ({ event, resolve }) => {
	event.locals.requestId = await nanoid();
	startTimes.set(event.locals.requestId, performance.now());

	event.cookies.set('requestId', event.locals.requestId, {
		path: '/'
	});

	return resolve(event);
};

const fgGray = '\x1b[90m';
const fgYellow = '\x1b[33m';
const fgRed = '\x1b[31m';
const fgGreen = '\x1b[32m';
const fgTeal = '\x1b[36m';
const reset = '\x1b[0m';

function goodOrBad(/** @type {number} */ duration) {
	if (isNaN(duration) || duration < 0) return '';

	return `took ${duration > 16 ? fgRed : fgGreen}${duration.toFixed(3)}${fgYellow}ms`;
}

function createMessage(
	/** @type {string} */ requestId,
	/** @type {number} */ duration,
	/** @type {unknown} */ err = null
) {
	const base = `${fgTeal}request ${fgGreen}${requestId}`;

	if (err instanceof Error || typeof err === 'string' || err !== null) {
		return `${base} ${fgGray}- ${fgRed}${err}${reset}`;
	}

	return `${base} ${fgGray}${goodOrBad(duration)}${reset}`;
}

/** @type {import('@sveltejs/kit').Handle} */
const postHandle = async ({ event, resolve }) => {
	const start = startTimes.get(event.locals.requestId);

	if (start) {
		const message = createMessage(event.locals.requestId, performance.now() - start);
		console.info(message);
		startTimes.delete(event.locals.requestId);
	}

	return resolve(event);
};

export const handle = sequence(preHandle, authHandle, authorization, postHandle);

export const handleFetch = async ({ request, fetch }) => {
	return fetch(request);
};

export const handleError = async ({ error, event }) => {
	let msg = 'Unknown error';

	if (typeof error === 'string') {
		msg = error;
	} else if (error instanceof Error) {
		msg = error.message;
	}

	if (dev) {
		console.error(`${fgTeal}request ${fgGreen}${event.locals.requestId}${reset}`, error);
	}

	if (event.locals.requestId) {
		const start = startTimes.get(event.locals.requestId) ?? -1;
		const message = createMessage(
			event.locals.requestId,
			start > 0 ? performance.now() - start : -1,
			error
		);
		console.error(message);
		startTimes.delete(event.locals.requestId);
	}

	return {
		message: msg
	};
};

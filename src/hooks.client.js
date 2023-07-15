import { dev } from '$app/environment';

export const handleError = async ({ error }) => {
	let message = 'Unknown error';

	if (typeof error === 'string') {
		message = error;
	} else if (error instanceof Error) {
		message = error.message;
	}

	if (dev) console.error(error);

	return {
		message
	};
};

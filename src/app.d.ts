/* eslint-disable no-var */
import { type PrismaClient } from '@prisma/client';

declare global {
	namespace App {
		// interface Locals {}
		// interface PageData {}
		interface Error {
			message: string;
		}
		// interface Platform {}
	}

	var client: PrismaClient;
}

export {};

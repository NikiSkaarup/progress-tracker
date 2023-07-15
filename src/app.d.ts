/* eslint-disable no-var */
import { type PrismaClient } from '@prisma/client';
import type Database from 'better-sqlite3';

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
	var dbClient: Database;
}

export {};

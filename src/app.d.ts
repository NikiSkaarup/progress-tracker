/* eslint-disable no-var */
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

	var dbClient: Database;
}

export {};

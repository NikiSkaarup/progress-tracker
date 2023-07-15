import { dev } from '$app/environment';
import Database from 'better-sqlite3';
/** @type {import('better-sqlite3').Database} */
const client = global.dbClient || new Database('./prisma/dev.db');
client.pragma('journal_mode = WAL');
if (dev) global.dbClient = client;

export default client;

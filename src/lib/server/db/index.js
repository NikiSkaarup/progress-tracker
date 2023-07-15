import { PrismaClient } from '@prisma/client';
const client = global.client || new PrismaClient();

if (process.env.NODE_ENV === 'development') {
	global.client = client;
}

export default client;

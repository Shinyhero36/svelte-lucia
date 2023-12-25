import { lucia } from 'lucia';
import { sveltekit } from 'lucia/middleware';
import { dev } from '$app/environment';
import { prisma } from '@lucia-auth/adapter-prisma';
import { PrismaClient } from '@prisma/client';

const client = new PrismaClient();

export const auth = lucia({
	env: dev ? 'DEV' : 'PROD',
	middleware: sveltekit(),
	adapter: prisma(client, {
		user: 'user',
		key: 'key',
		session: 'session'
	}),
	getUserAttributes: (databaseUser) => ({
		email: databaseUser.email
	}),
	getSessionAttributes: (databaseSession) => ({
		id: databaseSession.id,
		userId: databaseSession.user_id,
		expires: databaseSession.active_expires
	})
});

export type Auth = typeof auth;

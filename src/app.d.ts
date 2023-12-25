// See https://kit.svelte.dev/docs/types#app

import type { Session, User } from '@prisma/client';

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			auth: import('lucia').AuthRequest;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}

	namespace Lucia {
		type Auth = import('$lib/server/lucia').Auth;
		type DatabaseUserAttributes = Pick<User, 'email'>;
		type DatabaseSessionAttributes = Session;
	}
}

export {};

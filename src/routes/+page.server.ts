import { redirect, type Actions, fail } from '@sveltejs/kit';

export const load = async ({ locals }) => {
	const session = await locals.auth.validate();
	if (!session) throw redirect(302, '/login');

	return {
		userId: session.userId,
		email: session.user.email
	};
};

export const actions = {
	logout: async ({ locals }) => {
		const session = await locals.auth.validate();
		if (!session) throw fail(401);
		await locals.auth.invalidate();
		locals.auth.setSession(null);
		throw redirect(302, '/login');
	}
} satisfies Actions;

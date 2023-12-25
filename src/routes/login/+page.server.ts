import { auth } from '$lib/server/lucia.js';
import createUserSchema from '$validation/createUser';
import { error, redirect, type Actions } from '@sveltejs/kit';

export const load = async ({ locals }) => {
	const session = await locals.auth.validate();
	if (session) throw redirect(302, '/');
	return {};
};

export const actions = {
	default: async ({ request, locals }) => {
		// Get email and password from from
		const { email, password } = Object.fromEntries(await request.formData());

		// Validate email and password
		const safeData = createUserSchema.safeParse({
			email,
			password
		});
		if (!safeData.success) throw error(400, safeData.error.message);

		// Find user by key and validate password
		const key = await auth.useKey('email', safeData.data.email, safeData.data.password);
		const session = await auth.createSession({
			userId: key.userId,
			attributes: {
				id: '1',
				user_id: key.userId,
				active_expires: BigInt(new Date().getTime() + 1000 * 60 * 60 * 24 * 30),
				idle_expires: BigInt(new Date().getTime() + 1000 * 60 * 60 * 24 * 30)
			}
		});
		locals.auth.setSession(session);
		throw redirect(302, '/');
	}
} satisfies Actions;

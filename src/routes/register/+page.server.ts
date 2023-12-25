import prisma from '$lib/prisma';
import { auth } from '$lib/server/lucia';
import { redirect, type Actions } from '@sveltejs/kit';
import createUserSchema from '$validation/createUser';

export const actions = {
	default: async ({ request }) => {
		const { email, password } = Object.fromEntries(await request.formData());

		// Validate email and password
		const safeData = createUserSchema.safeParse({ email, password });
		if (!safeData.success) return { status: 400 };

		// Make sure email is unique
		const user = await prisma.user.findUnique({
			where: {
				email: safeData.data.email
			}
		});
		if (user)
			return {
				status: 400
			};

		// Create user
		await auth.createUser({
			key: {
				providerId: 'email',
				providerUserId: safeData.data.email,
				password: safeData.data.password
			},
			attributes: {
				email: safeData.data.email
			}
		});

		return redirect(302, '/');
	}
} satisfies Actions;

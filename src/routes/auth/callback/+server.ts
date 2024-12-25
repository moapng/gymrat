import { base } from '$app/paths';
import { redirect } from '@sveltejs/kit';
export const prerender = true;

export const GET = async (event) => {
	const {
		url,
		locals: { supabase }
	} = event;
	const code = url.searchParams.get('code') as string;

	if (code) {
		const { error } = await supabase.auth.exchangeCodeForSession(code)
		if (!error) {
			throw redirect(303, base);
		}
	}

	throw redirect(303, '/auth/auth-code-error');
};
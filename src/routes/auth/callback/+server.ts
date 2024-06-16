import { base } from '$app/paths';
import { redirect } from '@sveltejs/kit';
export const prerender = true;

export const GET = async (event) => {
	const {
		locals: { supabase }
	} = event;

	const code = event.params.code as string;

	if (code) {
		const { error } = await supabase.auth.exchangeCodeForSession(code);
		if (!error) {
			throw redirect(303, base);
		}
	}

	throw redirect(303, base);
};

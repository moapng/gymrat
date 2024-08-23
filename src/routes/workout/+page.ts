import { supabase } from '$lib/supabase';

export const load = async () => {
	const { data: lifts, error: lifts_error } = await supabase
		.from('lifts')
		.select('*');
	if (lifts_error) {
		console.error('kunde int hämta lyft:', lifts_error);
		return { lifts: [] };
	}
	return { lifts }
};

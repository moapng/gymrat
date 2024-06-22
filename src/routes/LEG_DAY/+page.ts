import { supabase } from '$lib/supabase';

export const load = async () => {
	const { data, error } = await supabase.from('exercises').select('*').eq('category', 'LEG_DAY');

	if (error) {
		console.error('Error fetching exercises:', error);
		return { exercises: [] };
	}

	return { exercises: data };
};

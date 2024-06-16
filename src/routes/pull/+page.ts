import { supabase } from '$lib/supabase';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
	const { data, error } = await supabase.from('exercises').select('*').eq('category', 'PULL_DAY');

	if (error) {
		console.error('Error fetching exercises:', error);
		return { exercises: [] };
	}

	return { exercises: data };
};

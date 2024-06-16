// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
export const prerender = true;

import { supabase } from '$lib/supabase';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
	const { data, error } = await supabase.from('exercises').select('*').eq('category', 'CORE_DAY');

	if (error) {
		console.error('Error fetching exercises:', error);
		return { exercises: [] };
	}

	return { exercises: data };
};

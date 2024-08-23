import { supabase } from '$lib/supabase';

export const load = async () => {
	const { data: t_max, error: t_max_error } = await supabase
		.from('latest_training_maxes')
		.select('*');
	if (t_max_error) {
		console.error('kunde int hämta t maxx:', t_max_error);
		return { t_max: [] };
	}
	return { t_max }
};

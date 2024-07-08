import { supabase } from '$lib/supabase';

export const load = async () => {
	const { data, error } = await supabase
		.from('exercise_logs')
		.select('*')
		.gte(
			'date',
			new Date(new Date().setDate(new Date().getDate() - 30)).toISOString().split('T')[0]
		);

	if (error) {
		console.error('Error fetching exercises:', error);
		return { logs: [] };
	}

	return { logs: data };
};

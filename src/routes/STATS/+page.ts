import { supabase } from '$lib/supabase';

export const load = async () => {
	const logs = await supabase
		.from('exercise_logs')
		.select('*')
		.gte(
			'date',
			new Date(new Date().setDate(new Date().getDate() - 30)).toISOString().split('T')[0]
		);

	const latest_pbs = await supabase
		.from('latest_personal_best')
		.select('*');

	if (logs.error || latest_pbs.error) {
		console.error('Error fetching exercises:', logs.error);
		return { logs: [], latest_pbs: [] };
	}

	return { logs: logs.data, latest_pbs: latest_pbs.data };
};

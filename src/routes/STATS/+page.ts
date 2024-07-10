import { supabase } from '$lib/supabase';

export const load = async () => {
	const logs = await supabase
		.from('exercise_logs')
		.select('*')
		.gte(
			'date',
			new Date(new Date().setDate(new Date().getDate() - 30)).toISOString().split('T')[0]
		);

	const personal_records = await supabase
		.from('personal_records')
		.select('*');

	if (logs.error || personal_records.error) {
		console.error('Error fetching exercises:', logs.error);
		return { logs: [], personal_records: [] };
	}

	return { logs: logs.data, personal_records: personal_records.data };
};

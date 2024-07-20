export const prerender = true;

import type { IExerciseLog } from '$lib/interfaces';
import { supabase } from '$lib/supabase';

export const load = async () => {
	const logs = await supabase
		.from('exercise_logs')
		.select('*')
		.gte(
			'date',
			new Date().toISOString().split('T')
		);


	if (logs.error) {
		console.error('Error fetching exercises:', logs.error);
		return { logs: [] };
	}

	return { logs: logs.data as IExerciseLog[] };
};

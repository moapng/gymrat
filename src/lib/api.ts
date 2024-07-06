import { supabase } from './supabase';

export const insert_exercise_log = async (
	exercise_id: string,
	weight: number,
	repetitions: number,
	date: Date,
	is_personal_best: boolean,
	week: number
) => {
	const { error, status } = await supabase.from('exercise_logs').insert([
		{
			exercise_id,
			weight,
			repetitions,
			date,
			is_personal_best,
			week
		}
	]);

	if (error) {
		console.error('Error inserting exercise log:', error);
		throw error;
	}
	return { status };
};

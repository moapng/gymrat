import { supabase } from './supabase';

export const insert_exercise_log = async (
	exercise_id: string,
	weight: number,
	repetitions: number,
	date: Date,
	week: number
) => {
	const { error, status, data } = await supabase
		.from('exercise_logs')
		.insert([
			{
				exercise_id,
				weight,
				repetitions,
				date,
				week
			}
		])
		.select('*');

	if (error) {
		console.error('Error inserting exercise log:', error);
		throw error;
	}
	return { status, data };
};

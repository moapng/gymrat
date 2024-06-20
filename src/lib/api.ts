import { supabase } from './supabase';

export const insert_exercise_log = async (
	user_id: string,
	exercise_id: number,
	weight: number,
	log_date: Date
) => {
	const { error, status } = await supabase.from('exercise_logs').insert([
		{
			user_id,
			exercise_id,
			weight,
			log_date
		}
	]);

	if (error) {
		console.error('Error inserting exercise log:', error);
		throw error;
	}
	return { status };
};

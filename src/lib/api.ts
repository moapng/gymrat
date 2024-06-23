import type { ActiveDay } from './interfaces';
import { supabase } from './supabase';

export const insert_exercise_log = async (
	user_id: string,
	exercise_name: string,
	category: ActiveDay,
	weight: number,
	log_date: Date
) => {
	const { error, status } = await supabase.from('exercise_logs').insert([
		{
			user_id,
			exercise_name,
			category,
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

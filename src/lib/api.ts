import type { ActiveDay } from './interfaces';
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


export const fetch_exercise_and_pr_data = async (exercise_type: ActiveDay, exercise_name: string) => {
	const exercises = await supabase
		.from('exercises')
		.select().eq('exercise_type', exercise_type);

	const pr = await supabase
		.from('personal_records')
		.select().eq('exercise_name', exercise_name);

	if (exercises.error || pr.error) {
		console.error('Error fetching data:', exercises.error || pr.error);
		return { exercises: [], pr: [] };
	}

	return { exercises: exercises.data, pr: pr.data };
}
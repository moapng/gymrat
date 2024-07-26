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
	const { data: exercises, error: exercises_error } = await supabase
		.from('exercises')
		.select().eq('exercise_type', exercise_type);


	const { data: all_prs, error: all_prs_error } = await supabase
		.from('personal_records')
		.select().eq('exercise_name', exercise_name);

	if (exercises_error) {
		console.error('kunde int hämta övningar', exercises_error);
		return { exercises: [], pr: [], next_goal: [] };
	}
	if (all_prs_error) {
		console.error('kunde int hämta PR', all_prs_error);
		return { exercises, pr: [], next_goal: [] };
	}
	const exercise_id = exercises.find(exercise => exercise.exercise_name === exercise_name).id;

	const { data: next_goal, error: next_goal_error } = await supabase
		.from('goals')
		.select()
		.eq('exercise_id', exercise_id)
		.is('achieved_date', null)
		.order('target_value', { ascending: true })
		.limit(1);

	if (next_goal_error) {
		console.error('kunde int hämta mål:', next_goal_error);
		return { exercises, all_prs, next_goal: [] };
	}

	return { exercises, all_prs, next_goal };
}
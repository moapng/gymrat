import { supabase } from './supabase';
import type { Lift, supabaseCycle, supabaseWorkout, TexasWeek } from './interfaces';

export const get1RM = async (lift: 'böj' | 'bänk' | 'mark'): Promise<number> => {
	const { data: PR, error } = await supabase
		.from('PR')
		.select('weight')
		.eq('lift', lift)
		.order('weight', { ascending: false })
		.limit(1);

	if (error) {
		console.error('Error fetching sets:', error);
		return 0;
	}

	return PR && PR.length > 0 ? PR[0].weight : 0;
};

export const getUserProgramName = async (currentUser: string): Promise<string> => {

	const { data, error } = await supabase
		.from('user')
		.select('chosen_program_name')
		.eq('user_name', currentUser)
		.limit(1)
		.single();

	if (error) {
		console.error('Error fetching formula:', error);
		return '';
	}
	return data ? data.chosen_program_name : '';
}

export const getUserCycleId = async (currentUser: string) => {
	const { data, error } = await supabase
		.from('user')
		.select('cycle_id')
		.eq('user_name', currentUser)
		.limit(1)
		.single()

	if (error) {
		console.error('Error fetching user:', error);
		return null;
	}
	return data ? data.cycle_id : null;
}

export const getCycle = async (cycleId: string) => {
	const { data: cycle, error } = await supabase
		.from('cycle')
		.select('*')
		.eq('id', cycleId)
		.limit(1)
		.single()
	if (error) {
		console.error('Error fetching user:', error);
		return null;
	}

	return cycle ? cycle : null;
}

export const insertNewCycle = async (latestCycle: number, userName: string, programName: string, texasWeek: TexasWeek): Promise<{ data: supabaseCycle; status: number }> => {
	const { data, status, error } = await supabase
		.from('cycle')
		.insert([
			{
				cycle: latestCycle + 1,
				'user_name': userName ?? 'moapng',
				'program_name': programName,
				'texas_week': texasWeek
			},
		])
		.select()
		.limit(1)
		.single();

	if (error) console.error(error)
	return { data, status };
}

export const updateCycle = async (cycleId: string, column: string, value: any) => {
	const { data, error } = await supabase
		.from('cycle')
		.update({ [column]: value })
		.eq('id', cycleId)
		.select();

	if (error) return error;
	return data;
}

export const insertWorkout = async (lift: Lift, weight: number, repetitions: number, workoutRating: string, programName: string, cycleId: string): Promise<{ data: supabaseWorkout; status: number }> => {

	const { data, status, error } = await supabase
		.from('workout')
		.insert([
			{
				lift: lift,
				weight: weight,
				repetitions: repetitions,
				workout_rating: workoutRating,
				cycle_id: cycleId,
				program_name: programName
			},
		])
		.select()
		.limit(1)
		.single();

	if (error) console.error(error);
	return { data, status };
}

export const insertPR = async (lift: Lift, weight: number, repetitions: number, workoutId: string) => {
	const { data, status, error } = await supabase
		.from('PR')
		.insert([
			{
				lift: lift,
				weight: weight,
				repetitions: repetitions,
				workout_id: workoutId
			},
		])
		.select()

	if (error) return { data: null, status: 500 };
	return { data, status };
}

export const getLatestCycle = async (currentUser: string) => {

	const { data: cycle, error } = await supabase
		.from('cycle')
		.select('*')
		.eq('user_name', currentUser)
		.order('started_at', { ascending: false })
		.limit(1)
		.single();

	if (error) return error;
	return cycle ? cycle : null;

}
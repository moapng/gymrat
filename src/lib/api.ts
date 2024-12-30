import { supabase } from './supabase';
import type { Lift } from './interfaces';

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
export const getTexasWeek = async (cycleId: string) => {
	const { data, error } = await supabase
		.from('cycle')
		.select('texas_week')
		.eq('id', cycleId)
		.limit(1)
		.single()

	if (error) {
		console.error('Error fetching user:', error);
		return null;
	}

	return data ? data.texas_week : null;
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

export const insertNewCycle = async (latestCycle: number, userName: string, programName: string) => {
	const { data, error } = await supabase
		.from('cycle')
		.insert([
			{
				cycle: latestCycle + 1,
				'user_name': userName ?? 'moapng',
				'program_name': programName
			},
		])
		.select()
		.limit(1)
		.single();

	if (error) return error;
	return data;
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

export const insertWorkout = async (lift: Lift, weight: number, repetitions: number, workoutRating: string, programName: string, cycleId: string) => {

	const { data, error } = await supabase
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

	if (error) return error;
	return data;

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
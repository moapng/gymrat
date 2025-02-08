import { supabase } from './supabase';
import { ToastType, type Lift, type supabaseCycle, type supabasePR, type supabaseWorkout, type TexasWeek } from './interfaces';
import { toastState } from './stores/toast.svelte';
import { Temporal } from '@js-temporal/polyfill';

const handleError = (error: Error) => {
	console.error(error)
	toastState.text = error.message;
	toastState.type = ToastType.error;
	toastState.visible = true;
	return null;
}

const handleSuccess = (message: string) => {
	toastState.text = message;
	toastState.type = ToastType.success;
	toastState.visible = true;
}

export const get1RM = async (lift: 'böj' | 'bänk' | 'mark'): Promise<number | null> => {
	const { data: PR, error, statusText } = await supabase
		.from('PR')
		.select('weight')
		.eq('lift', lift)
		.order('weight', { ascending: false })
		.limit(1);

	if (error) {
		handleError(error)
	} else {
		handleSuccess(statusText);
	}

	return PR && PR.length > 0 ? PR[0].weight : 0;
};

export const getUserCycleId = async (currentUser: string) => {
	const { data, error, statusText } = await supabase
		.from('user')
		.select('cycle_id')
		.eq('user_name', currentUser)
		.limit(1)
		.single()

	if (error) {
		handleError(error)
	} else {
		handleSuccess(statusText);
	}
	return data ? data.cycle_id : null;
}

export const getCycle = async (cycleId: string): Promise<supabaseCycle | null> => {
	const { data: cycle, error, statusText } = await supabase
		.from('cycle')
		.select('*')
		.eq('id', cycleId)
		.limit(1)
		.single()

	if (error) {
		handleError(error)
	} else {
		handleSuccess(statusText);
	}

	return cycle ? cycle : null;
}

export const insertNewCycle = async (latestCycle: number, userName: string, programName: string, texasWeek: TexasWeek): Promise<{ data: supabaseCycle; status: number } | null> => {
	const { data, status, error } = await supabase
		.from('cycle')
		.insert([
			{
				cycle: latestCycle + 1,
				'user_name': userName ?? import.meta.env.MY_USER,
				'program_name': programName,
				'texas_week': texasWeek
			},
		])
		.select()
		.limit(1)
		.single();

	if (error) {
		handleError(error)
	} else {
		handleSuccess('ny cykel!');
	}
	return { data, status };
}

export const updateCycle = async (cycleId: string, column: string, value: any): Promise<supabaseCycle | null> => {
	const { data: cycle, error } = await supabase
		.from('cycle')
		.update({ [column]: value })
		.eq('id', cycleId)
		.select()
		.limit(1)
		.single();

	if (error) {
		handleError(error)
	} else {
		handleSuccess(`uppdaterat cykeln`);
	}
	return cycle ? cycle : null;
}

export const getLatestCycle = async (currentUser: string): Promise<supabaseCycle> => {

	const { data: cycle, error } = await supabase
		.from('cycle')
		.select('*')
		.eq('user_name', currentUser)
		.order('started_at', { ascending: false })
		.limit(1)
		.single();

	if (error) {
		handleError(error)
	}
	return cycle ? cycle : null;

}

export const insertWorkout = async (lift: Lift, weight: number, repetitions: number, workoutRating: string, programName: string, cycleId: string): Promise<{ data: supabaseWorkout; status: number } | null> => {
	const { data, status, error } = await supabase
		.from('workout')
		.insert([
			{
				lift: lift,
				created_at: Temporal.Now.zonedDateTimeISO().toPlainDateTime(),
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

	if (error) {
		handleError(error)
	} else {
		handleSuccess('lagt till set');
	};
	return { data, status };
}

export const insertPR = async (lift: Lift, weight: number, repetitions: number, workoutId: string): Promise<{ data: supabasePR; status: number } | null> => {
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
		.limit(1)
		.single();

	if (error) {
		handleError(error)
	} else {
		handleSuccess(`nytt PB wihoo ${data.weight}kg ${data.repetitions}reps`);
	}
	return data ? { data, status } : null;
}

export const getTodaysWorkouts = async (): Promise<supabaseWorkout[]> => {

	const now = Temporal.Now.zonedDateTimeISO();
	const startOfDay = now.with({ hour: 0, minute: 0, second: 0, }).toPlainDateTime();
	const endOfDay = now.with({
		hour: 23,
		minute: 59,
		second: 59,
	}).toPlainDateTime();

	const { data, error } = await supabase
		.from('workout')
		.select('*')
		.gte('created_at', startOfDay)
		.lt('created_at', endOfDay);

	if (error) {
		handleError(error)
	}
	return data as supabaseWorkout[];
}

export const latestCompletedWorkoutForEachLift = async (): Promise<supabaseWorkout[]> => {
	const { data, error } = await supabase
		.from('latest_workouts_view')
		.select('*');

	if (error) {
		handleError(error)
	}
	console.log(data)
	return data as supabaseWorkout[];

}

export const getBöjOneRepMaxes = async (): Promise<supabaseWorkout[]> => {
	const { data, error } = await supabase
		.from('1RM_böj_view')
		.select('*')
		.order('achieved_at', { ascending: true });

	if (error) {
		handleError(error)
	}
	return data as supabaseWorkout[];
}

export const getBänkOneRepMaxes = async (): Promise<supabaseWorkout[]> => {
	const { data, error } = await supabase
		.from('1RM_bänk_view')
		.select('*')
		.order('achieved_at', { ascending: true });

	if (error) {
		handleError(error)
	}
	return data as supabaseWorkout[];
}

export const getMarkOneRepMaxes = async (): Promise<supabaseWorkout[]> => {
	const { data, error } = await supabase
		.from('1RM_mark_view')
		.select('*')
		.order('achieved_at', { ascending: true });

	if (error) {
		handleError(error)
	}
	return data as supabaseWorkout[];
}
import { supabase } from './supabase';
import { ToastType, type Lift, type supabaseBlock, type supabasePR, type supabaseWorkout, type TexasWeek } from './interfaces';
import { toastState } from './stores/toast.svelte';
import {
	processWorkoutData,
	processBlockData,
	createTimestamp,
	getStartOfDay,
	getEndOfDay
} from './temporal-service';

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

export const getUserBlockId = async (currentUser: string) => {
	const { data, error, statusText } = await supabase
		.from('user')
		.select('block_id')
		.eq('user_name', currentUser)
		.limit(1)
		.single()

	if (error) {
		handleError(error)
	} else {
		handleSuccess(statusText);
	}
	return data ? data.block_id : null;
}

export const getBlock = async (blockId: string): Promise<supabaseBlock | null> => {
	const { data: block, error, statusText } = await supabase
		.from('blocks')
		.select('*')
		.eq('id', blockId)
		.limit(1)
		.single()

	if (error) {
		handleError(error)
	} else {
		handleSuccess(statusText);
	}

	return block ? processBlockData(block) : null;
};

export const insertNewBlock = async (latestBlock: number, userName: string, programName: string, texasWeek: TexasWeek): Promise<{ data: supabaseBlock; status: number } | null> => {
	const { data, status, error } = await supabase
		.from('blocks')
		.insert([
			{
				block: latestBlock + 1,
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

export const updateBlock = async (blockId: string, column: string, value: any): Promise<supabaseBlock | null> => {
	const { data: block, error } = await supabase
		.from('blocks')
		.update({ [column]: value })
		.eq('id', blockId)
		.select()
		.limit(1)
		.single();

	if (error) {
		handleError(error)
	} else {
		handleSuccess(`uppdaterat cykeln`);
	}
	return block ? processBlockData(block) : null;
}

export const getLatestBlock = async (currentUser: string): Promise<supabaseBlock> => {
	const { data: block, error } = await supabase
		.from('blocks')
		.select('*')
		.eq('user_name', currentUser)
		.order('started_at', { ascending: false })
		.limit(1)
		.single();

	if (error) {
		handleError(error)
	}

	return block ? processBlockData(block) : null;
}

export const insertWorkout = async (lift: Lift, weight: number, repetitions: number, workoutRating: string, comment: string, programName: string, blockId: string): Promise<{ data: supabaseWorkout; status: number } | null> => {
	const now = createTimestamp();

	const { data, status, error } = await supabase
		.from('workouts')
		.insert([
			{
				lift: lift,
				created_at: now,
				weight: weight,
				repetitions: repetitions,
				workout_rating: workoutRating,
				comment: comment,
				block_id: blockId,
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

	const processedData = data ? processWorkoutData([data])[0] : null;

	return processedData ? { data: processedData, status } : null;
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
	const startOfDay = getStartOfDay();
	const endOfDay = getEndOfDay();

	const { data, error } = await supabase
		.from('workouts')
		.select('*')
		.gte('created_at', startOfDay)
		.lt('created_at', endOfDay);

	if (error) {
		handleError(error);
	}

	return data ? processWorkoutData(data) : [];
}

export const latestCompletedWorkoutForEachLift = async (): Promise<supabaseWorkout[]> => {
	const { data, error } = await supabase
		.from('latest_workouts_view')
		.select('*');

	if (error) {
		handleError(error);
	}

	return data ? processWorkoutData(data) : [];
}

export const getBöjOneRepMaxes = async (): Promise<supabaseWorkout[]> => {
	const { data, error } = await supabase
		.from('1RM_böj_view')
		.select('*')
		.order('achieved_at', { ascending: true });

	if (error) {
		handleError(error);
	}

	return data ? processWorkoutData(data) : [];
}

export const getBänkOneRepMaxes = async (): Promise<supabaseWorkout[]> => {
	const { data, error } = await supabase
		.from('1RM_bänk_view')
		.select('*')
		.order('achieved_at', { ascending: true });

	if (error) {
		handleError(error);
	}

	return data ? processWorkoutData(data) : [];
}

export const getMarkOneRepMaxes = async (): Promise<supabaseWorkout[]> => {
	const { data, error } = await supabase
		.from('1RM_mark_view')
		.select('*')
		.order('achieved_at', { ascending: true });

	if (error) {
		handleError(error);
	}

	return data ? processWorkoutData(data) : [];
}

export const getAllWorkouts = async (): Promise<supabaseWorkout[]> => {
	const { data, error } = await supabase
		.from('workouts')
		.select('*')
		.order('created_at', { ascending: false });

	if (error) {
		handleError(error);
	}

	return data ? processWorkoutData(data) : [];
};
import { supabase } from './supabase';
import { ToastType, type Lift, type supabaseBlock, type supabasePR, type supabaseWorkout, type TexasWeek } from './interfaces';
import { toastState } from './stores/toast.svelte';
import { Temporal } from '@js-temporal/polyfill';

const TIMEZONE = 'Europe/Stockholm';

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

const toZonedDateTime = (date: string | Temporal.Instant | Temporal.PlainDateTime | Temporal.ZonedDateTime | null | undefined): Temporal.ZonedDateTime | undefined => {
	if (!date) return undefined;

	if (date instanceof Temporal.ZonedDateTime) {
		return date;
	} else if (date instanceof Temporal.PlainDateTime) {
		return date.toZonedDateTime(TIMEZONE);
	} else if (date instanceof Temporal.Instant) {
		return date.toZonedDateTimeISO(TIMEZONE);
	} else if (typeof date === 'string') {
		try {
			return Temporal.Instant.from(date).toZonedDateTimeISO(TIMEZONE);
		} catch (e) {
			try {
				return Temporal.PlainDateTime.from(date).toZonedDateTime(TIMEZONE);
			} catch (e) {
				console.error('Could not parse date:', date, e);
				return undefined;
			}
		}
	}

	return undefined;
};

const processWorkoutData = <T extends { created_at?: any, achieved_at?: any }>(data: T[]): T[] => {
	if (!data) return [];

	return data.map(item => {
		const processed = { ...item };
		if (item.created_at) {
			processed.created_at = toZonedDateTime(item.created_at);
		}
		if (item.achieved_at) {
			processed.achieved_at = toZonedDateTime(item.achieved_at);
		}
		return processed;
	});
};

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

	if (block && block.started_at) {
		block.started_at = toZonedDateTime(block.started_at);
	}

	return block ? block : null;
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
	return block ? block : null;
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

	if (block && block.started_at) {
		block.started_at = toZonedDateTime(block.started_at);
	}

	return block ? block : null;

}

export const insertWorkout = async (lift: Lift, weight: number, repetitions: number, workoutRating: string, comment: string, programName: string, blockId: string): Promise<{ data: supabaseWorkout; status: number } | null> => {
	const now = new Date().toISOString();

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

	if (data) {
		data.created_at = toZonedDateTime(data.created_at);
		if (data.achieved_at) {
			data.achieved_at = toZonedDateTime(data.achieved_at);
		}
	}

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
	const now = Temporal.Now.plainDateISO();
	const startOfDay = now.toString() + 'T00:00:00';
	const endOfDay = now.toString() + 'T23:59:59';

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
}
import { type ISet, type ActiveDay, type ICycle, type ILift, Lift } from './interfaces';
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


export const get_latest_sets = async (): Promise<ISet[]> => {
	const { data: sets, error: sets_error } = await supabase
		.from('sets')
		.select('*')
		.limit(15)
		.order('week', { ascending: false })
		.order('date', { ascending: false });

	if (sets_error) {
		console.error('error fetching sets', sets_error)
		return []
	}

	return sets
}

export const get_latest_week_from_sets = async (sets: ISet[]): Promise<number> => {
	return sets[0].week;
}


export const check_is_week_complete = (sets: ISet[], current_week: number): boolean => {
	const bp = [];
	const kb = [];
	const ml = [];

	sets.forEach((set) => {
		if (set.lift_name === Lift.bänkpress && set.week === current_week) {
			bp.push(set);
		}
		if (set.lift_name === Lift.knäböj && set.week === current_week) {
			kb.push(set);
		}
		if (set.lift_name === Lift.marklyft && set.week === current_week) {
			ml.push(set);
		}
	})

	if (bp.length >= 3 && kb.length >= 3 && ml.length >= 3) {
		return true
	} else {
		return false
	}
}

export const get_remaining_lifts_for_the_week = (sets: ISet[], current_week: number): ILift[] => {
	const bp = [];
	const kb = [];
	const ml = [];
	sets.forEach((set) => {
		if (set.lift_name === Lift.bänkpress && set.week === current_week) {
			bp.push(set);
		}
		if (set.lift_name === Lift.knäböj && set.week === current_week) {
			kb.push(set);
		}
		if (set.lift_name === Lift.marklyft && set.week === current_week) {
			ml.push(set);
		}
	})

	const lifts_left = [];
	if (bp.length < 3) {
		lifts_left.push({ name: 'bänkpress', sets_to_do: 3 - bp.length })
	}
	if (kb.length < 3) {
		lifts_left.push({ name: 'knäböj', sets_to_do: 3 - kb.length })
	}
	if (ml.length < 3) {
		lifts_left.push({ name: 'marklyft', sets_to_do: 3 - ml.length })
	}

	return lifts_left
}

export const get_next_week = (current_week: number): number => {
	console.log('veckaaaaaaa ' + current_week)
	switch (current_week) {
		case 1:
			return 2;
		case 2:
			return 3;
		case 3:
			return 4;
		case 4:
		default:
			return 1;
	}
}

export const get_current_cycle = async () => {
	const today = new Date().toISOString().split('T')[0];

	const { data: training_cycle, error: training_cycle_error } = await supabase
		.from('training_cycles')
		.select('*')
		.lte('start_date', today)
		.order('start_date', { ascending: false })
		.limit(1)
		.single();

	if (training_cycle_error) {
		console.error('Error fetching current cycle:', training_cycle_error);
		return null;
	}

	return training_cycle as ICycle;
};

// export const get_completed_lifts = async (cycle_id: string, week: Week): Promise<string[]> => {
// 	const { data: sets, error: sets_error } = await supabase
// 		.from('sets')
// 		.select('lift_id')
// 		.eq('cycle_id', cycle_id)
// 		.eq('week', week);

// 	if (sets_error) {
// 		console.error('Error fetching completed lifts:', sets_error);
// 		return [];
// 	}

// 	const lift_ids = sets.map((set) => set.lift_id);
// 	return Array.from(new Set(lift_ids));
// };

export const insert_set_with_pr_check = async (
	cycle_id: string,
	lift_name: string,
	week: number,
	date: Date,
	weight: number,
	reps: number,
	set_number: number
): Promise<any> => {
	// Fetch the current PR for the lift
	const { data: pr_data, error: pr_error } = await supabase
		.from('personal_records')
		.select('weight, reps')
		.eq('lift_name', lift_name)
		.order('weight', { ascending: false })
		.order('reps', { ascending: false })
		.limit(1)
		.single();

	if (pr_error) {
		console.error('Error fetching PR data:', pr_error);
		return;
	}

	let is_pr = false;

	// Check if this set is a new PR
	if (pr_data) {
		const current_pr_weight = pr_data.weight;
		const current_pr_reps = pr_data.reps;

		if (weight > current_pr_weight || (weight === current_pr_weight && reps > current_pr_reps)) {
			is_pr = true;
		}
	} else {
		is_pr = true;

	}

	const { status: insert_set_status, error: insert_error } = await supabase.from('sets').insert({
		cycle_id,
		lift_name,
		week,
		date,
		weight,
		reps,
		is_pr,
		set_number
	});

	if (insert_error) {
		console.error('Error inserting set:', insert_error);
		return;
	}


	console.log('Set inserted successfully with PR status:', is_pr);

	if (is_pr) {
		const { status: insert_pr_status, error: pr_insert_error } = await supabase.from('personal_records').insert({
			lift_name,
			weight,
			reps,
			date
		});

		if (pr_insert_error) {
			console.error('Error inserting new personal record:', pr_insert_error);
		} else {
			return { insert_set_status, insert_pr_status, is_pr }
		}
	}
	else { return { insert_set_status, is_pr } }
};

// export const update_current_week = async (): Promise<Week> => {
// 	const { data: week_data, error } = await supabase
// 		.from('current_week_view')
// 		.select('week')
// 		.single();

// 	if (error) {
// 		console.error('Error fetching current week:', error);
// 	}
// 	if (week_data) {
// 		const current_week = week_data.week as Week;

// 		console.log(`Updated current week to: ${Week[current_week]}`);

// 		return current_week;
// 	}
// 	return Week.first
// };

// export const calculate_current_week = async (cycle_id: string): Promise<Week> => {
// 	// const { data: sets, error: sets_error } = await supabase
// 	// 	.from('sets')
// 	// 	.select('lift_id, week')
// 	// 	.order('date', { ascending: false })
// 	// 	.limit(9);
// 	// if (sets_error) {
// 	// 	console.error('Error inserting set:', sets_error);
// 	// 	return Week.first
// 	// }
// 	const { data: sets, error } = await supabase
// 		.from('sets')
// 		.select('week, lift_id')
// 		.eq('cycle_id', cycle_id)
// 		.order('date', { ascending: false });

// 	if (error) {
// 		console.error('Error fetching sets:', error);
// 		// Default to first week if there's an error
// 		return Week.first;
// 	}

// 	// Calculate total completed sets
// 	const total_sets = sets ? sets.length : 0;

// 	// Determine the current week
// 	const week_number = (total_sets % 4) + 1;
// 	console.log(sets)

// 	// Map the week number to Week enum
// 	const current_week = week_number as Week;

// 	console.log(`Total Sets: ${total_sets}, Current Week: ${Week[current_week]} (${current_week})`);

// 	return current_week;
// };

// export const calculate_current_week = async (cycle_id: string): Promise<Week> => {
// 	// const { data: sets, error: sets_error } = await supabase
// 	// 	.from('sets')
// 	// 	.select('lift_id, week')
// 	// 	.order('date', { ascending: false })
// 	// 	.limit(9);
// 	// if (sets_error) {
// 	// 	console.error('Error inserting set:', sets_error);
// 	// 	return Week.first
// 	// }
// 	const { data: sets, error } = await supabase
// 		.from('sets')
// 		.select('week')
// 		.eq('cycle_id', cycle_id)
// 		.order('date', { ascending: false });

// 	if (error) {
// 		console.error('Error fetching sets:', error);
// 		// Default to first week if there's an error
// 		return Week.first;
// 	}

// 	// Calculate total completed sets
// 	const total_sets = sets ? sets.length : 0;

// 	// Determine the current week
// 	const week_number = (total_sets % 4) + 1;

// 	// Map the week number to Week enum
// 	const current_week = week_number as Week;

// 	console.log(`Total Sets: ${total_sets}, Current Week: ${Week[current_week]} (${current_week})`);

// 	return current_week;
// };
// const weeks = sets.map(set => set.week);
// const all_weeks_are_the_same = weeks.every(week => week === weeks[0]);
// if (weeks.length === 0) {
// 	return Week.first;
// } else {
// 	if (!all_weeks_are_the_same) {
// 		return weeks[0] as Week;
// 	} else {
// 		switch (weeks[0]) {
// 			case Week.first:
// 				return Week.second
// 			case Week.second:
// 				return Week.third
// 			case Week.third:
// 				return Week.fourth
// 			case Week.fourth:
// 				return Week.first
// 			default:
// 				console.error('Unexpected week value:', weeks[0]);
// 				return Week.first;
// 		}
// 	}
// }
// };
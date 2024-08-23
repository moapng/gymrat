export interface IExercise {
	id: number;
	primary_muscle_groups: string[];
	secondary_muscle_groups: string[];
	exercise_name: string;
	type: string;
	equipment: string;
}

export interface IExerciseLog {
	id: string;
	exercise_id: string;
	weight: number;
	repetitions: number;
	date: Date;
	week: number;
}

export interface IPersonalRecord {
	id: string;
	exercise_id: string;
	exercise_name: string;
	weight: number;
	repetitions: number;
	date: string;
}

export interface IGoal {
	id: string;
	exercise_id: string;
	created_date: string;
	achieved_date?: string | null;
	goal_type: GoalType;
	target_value: number;
	target_reps?: number | null;
}

export enum GoalType {
	WEIGHT = 'weight',
	REPS = 'reps',
	TIME = 'time',
	DISTANCE = 'distance'
}


export enum ActiveDay {
	PUSH = 'PUSH',
	PULL = 'PULL',
	LEG = 'LEG',
	CORE = 'CORE',
	// CARDIO = 'CARDIO'
}


// colors
export const hot_pink_rgb = 'rgb(244, 81, 211)';
export const dark_purple_rgb = 'rgb(65, 0, 119)';
export const kuromi_purple_rgb = 'rgb(173, 82, 248)';
export const very_light_purple_rgb = 'rgb(194, 152, 230)';


export interface ICycle {
	id: string;
	start_date: string;
	end_date: string;
	cycle_number: number;
	created_at: string;
	updated_at: string;
}

export interface ILift {
	name: string;
	id: string;
	sets_to_do?: number;
}

export interface ISet {
	id: string;
	weight: number;
	reps: number;
	is_pr: boolean;
	cycle_id: string;
	lift_name: string;
	week: number;
	date: Date;
	set_number: 1 | 2 | 3;
}

// export enum Week {
// 	first = 1 as number,
// 	second = 2 as number,
// 	third = 3 as number,
// 	fourth = 4 as number
// }

export enum Lift {
	knäböj = 'knäböj',
	marklyft = 'marklyft',
	bänkpress = 'bänkpress'
}
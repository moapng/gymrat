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
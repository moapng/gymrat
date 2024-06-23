export interface IExercise {
	id: number;
	primary_muscle_groups: string[];
	secondary_muscle_groups: string[];
	exercise_name: string;
	difficulty: number;
	type: string;
	equipment: string;
	description: string;
	category: string;
}

export interface IExerciseLog {
	id: string;
	user_id: string;
	exercise_name: string;
	weight: number;
	log_date: Date;
	category: ActiveDay;
}

export enum ActiveDay {
	PUSH = 'PUSH_DAY',
	PULL = 'PULL_DAY',
	LEG = 'LEG_DAY',
	CORE = 'CORE_DAY',
	// CARDIO = 'CARDIO'
}
export const colors = [
	'#81AEEF',
	'#6ACFF0',
	'#7CEAF4',
	'#58EECE',
	'#79F685',
	'#FAAF75',
	'#FF99A0',
	'#EA9ADB',
	'#B99AEA',
	'#93BAF1'
];
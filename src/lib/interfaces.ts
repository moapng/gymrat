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
	is_personal_best: boolean;
	week: number;
}

export enum ActiveDay {
	PUSH = 'PUSH',
	PULL = 'PULL',
	LEG = 'LEG',
	CORE = 'CORE',
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
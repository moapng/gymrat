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

export enum ActiveDay {
	PUSH = 'PUSH_DAY',
	PULL = 'PULL_DAY',
	LEG = 'LEG_DAY',
	CORE = 'CORE_DAY',
	CARDIO = 'CARDIO'
}

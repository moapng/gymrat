export interface Exercise {
	id: number;
	main_muscle_groups: string[];
	exercise_name: string;
	difficulty: number;
	type: string;
	equipment: string;
	description: string;
	category: string;
}

export enum ActiveDay {
	PUSH = 'push',
	PULL = 'pull',
	LEG = 'leg',
	CORE = 'core'
}

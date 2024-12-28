// colors
export const hot_pink_rgb = 'rgb(244, 81, 211)';
export const dark_purple_rgb = 'rgb(65, 0, 119)';
export const kuromi_purple_rgb = 'rgb(173, 82, 248)';
export const very_light_purple_rgb = 'rgb(194, 152, 230)';


export enum Lift {
	böj = 'böj',
	bänk = 'bänk',
	mark = 'mark'
}

export interface PR {
	weight: number;
	exercise: Lift;
}

export interface Program {
	formula: string;
	name: string;
}

export interface OneRepMax {
	[Lift.böj]: number;
	[Lift.bänk]: number;
	[Lift.mark]: number;
}

export enum TexasFactor {
	Deload = 0.68,
	Volume = 0.85,
	Intensity = 1
}


// Formulas
export const calculateTexasMethod = (oneRM: number, factor: number) => oneRM * 0.87 * factor;
export const calculateRPE = (oneRM: number, reps: number, rpe: number) => oneRM * (1 - ((reps - 1) * 0.03) - ((10 - rpe) * 0.025));
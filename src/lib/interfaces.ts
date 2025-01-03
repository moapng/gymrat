// colors
export const hot_pink_rgb = 'rgb(244, 81, 211)';
export const dark_purple_rgb = 'rgb(65, 0, 119)';
export const kuromi_purple_rgb = 'rgb(173, 82, 248)';
export const very_light_purple_rgb = 'rgb(194, 152, 230)';

export interface supabasePR {
	id: number; // bigint
	achieved_at: Date; // date
	lift: string; // public.lift (assuming it's a string representation)
	weight: number; // double precision
	workout_id?: string; // uuid
	repetitions: number; // bigint
}
export interface supabaseCycle {
	id: string; // uuid
	started_at: Date; // timestamp with time zone
	cycle: number; // bigint
	bänk_done: boolean; // boolean
	böj_done: boolean; // boolean
	mark_done: boolean; // boolean
	user_name: string; // text
	program_name: string; // text
	texas_week: TexasWeek;
}

export interface supabaseProgram {
	created_at: Date; // timestamp with time zone
	name: string; // text
	formula: object; // json
}
export interface supabaseUser {
	user_name: string; // text
	chosen_program_name: string; // text
	current_texas_week: string; // public.texas_week (assuming it's a string representation)
}
export interface supabaseWorkout {
	id: string; // uuid
	created_at: Date; // timestamp with time zone
	lift: Lift; // public.lift (assuming it's a string representation)
	weight: number; // double precision
	cycle_id: string; // uuid
	repetitions: number; // bigint
	program_name: string; // text
	workout_rating: string; // text
}

export enum Lift {
	böj = 'böj',
	bänk = 'bänk',
	mark = 'mark'
}

export interface PR {
	weight: number;
	lift: Lift;
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
	deload = 0.68,
	volume = 0.85,
	intensity = 1
}

export enum TexasRepetitions {
	deload = 5,
	volume = 3,
	intensity = 1
}

export enum TexasWeek {
	volume = 'volume',
	intensity = 'intensity',
	deload = 'deload'
}

export interface Toast {
	text: string;
	type: ToastType;
	duration: number;
}
export enum ToastType {
	info = 'info',
	warning = 'warning',
	error = 'error',
	success = 'success'
}
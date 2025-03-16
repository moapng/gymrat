import type { Temporal } from '@js-temporal/polyfill';

// colors
export const hot_pink_rgb = 'rgb(244, 81, 211)';
export const dark_purple_rgb = 'rgb(65, 0, 119)';
export const kuromi_purple_rgb = 'rgb(173, 82, 248)';
export const very_light_purple_rgb = 'rgb(194, 152, 230)';

export interface supabasePR {
	id: number;
	achieved_at: Temporal.PlainDateTime;
	lift: string;
	weight: number;
	workout_id?: string;
	repetitions: number;
}
export interface supabaseBlock {
	id: string;
	started_at: Temporal.PlainDateTime;
	block: number;
	bänk_count: boolean;
	böj_count: boolean;
	mark_count: boolean;
	user_name: string;
	program_name: string;
	texas_week: TexasWeek;
}

export interface supabaseProgram {
	created_at: Temporal.PlainDateTime;
	name: string;
	formula: object;
}
export interface supabaseUser {
	user_name: string;
	chosen_program_name: string;
	program_state: string;
}
export interface supabaseWorkout {
	id: string;
	created_at?: Temporal.ZonedDateTime;
	achieved_at?: Temporal.ZonedDateTime;
	lift: Lift;
	weight: number;
	block_id: string;
	repetitions: number;
	program_name: string;
	workout_rating: string;
	comment: string;
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
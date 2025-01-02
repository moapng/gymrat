import { TexasWeek, type supabaseCycle } from '$lib/interfaces';

export const cycleState: { cycle: supabaseCycle } = $state({ cycle: { cycle: 1, id: '', started_at: new Date, böj_done: false, bänk_done: false, mark_done: false, user_name: '', texas_week: TexasWeek.deload, program_name: '' } });


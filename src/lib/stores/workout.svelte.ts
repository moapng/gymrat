import { TexasWeek, type supabaseCycle } from '$lib/interfaces';
import { Temporal } from '@js-temporal/polyfill';

export const cycleState: { cycle: supabaseCycle } = $state({ cycle: { cycle: 1, id: '', started_at: Temporal.Now.zonedDateTimeISO().toPlainDateTime(), böj_done: false, bänk_done: false, mark_done: false, user_name: '', texas_week: TexasWeek.deload, program_name: '' } });


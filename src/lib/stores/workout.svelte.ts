import { TexasWeek, type supabaseCycle } from '$lib/interfaces';

export const cycleState: { cycle: supabaseCycle | null } = $state({ cycle: null });

export const programState: { programName: string } = $state({ programName: '' });

export const texasWeekState: { texasWeek: TexasWeek } = $state({ texasWeek: TexasWeek.volume });
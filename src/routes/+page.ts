import { browser } from '$app/environment';
import { get1RM, getUserCycle, getUserProgramName, getUserTexasWeek } from '$lib/api';
import { Lift } from '$lib/interfaces';
import { userState } from '$lib/stores/user.svelte';
import { cycleState, programState, texasWeekState } from '$lib/stores/workout.svelte';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
	if (browser) {
		const session = localStorage.getItem('sb-nsmjxidguxrhtjqysiek-auth-token')
		let sessionObject;
		if (session) {
			sessionObject = JSON.parse(session);
		}

		const userName = sessionObject?.user.user_metadata.user_name ?? 'moapng';
		userState.user = sessionObject?.user;
		programState.programName = await getUserProgramName(userName)
		cycleState.cycle = await getUserCycle(userName)
		texasWeekState.texasWeek = await getUserTexasWeek(userName);

		const böj = await get1RM(Lift.böj)
		const bänk = await get1RM(Lift.bänk);
		const mark = await get1RM(Lift.mark);

		return { böj, bänk, mark }
	}
};

import { browser } from '$app/environment';
import { get1RM, getLatestCycle } from '$lib/api';
import { Lift } from '$lib/interfaces';
import { userState } from '$lib/stores/user.svelte';
import { cycleState } from '$lib/stores/workout.svelte';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
	if (browser) {
		const session = localStorage.getItem('sb-nsmjxidguxrhtjqysiek-auth-token')
		let sessionObject;
		if (session) {
			sessionObject = JSON.parse(session);
		}

		const userName = sessionObject?.user.user_metadata.user_name ?? import.meta.env.VITE_MY_USER;
		;
		userState.user = sessionObject?.user;
		if (userState.user) {
			cycleState.cycle = await getLatestCycle(userName);

			const böj = await get1RM(Lift.böj)
			const bänk = await get1RM(Lift.bänk);
			const mark = await get1RM(Lift.mark);

			return { böj, bänk, mark }
		}
	}
};

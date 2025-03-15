import { browser } from '$app/environment';
import { get1RM, getLatestBlock, getTodaysWorkouts } from '$lib/api';
import { Lift } from '$lib/interfaces';
import { userState } from '$lib/stores/user.svelte';
import { blockState } from '$lib/stores/workout.svelte';
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
			const block = await getLatestBlock(userName);
			blockState.block = block;
			const böj = await get1RM(Lift.böj)
			const bänk = await get1RM(Lift.bänk);
			const mark = await get1RM(Lift.mark);

			const todaysWorkouts = await getTodaysWorkouts();

			return { block, böj, bänk, mark, todaysWorkouts }
		}
	}
};

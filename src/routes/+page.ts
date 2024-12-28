import { browser } from '$app/environment';
import { get1RM, getProgram, getUser } from '$lib/api';
import { Lift } from '$lib/interfaces';
import { userState } from '$lib/stores/user.svelte';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
	if (browser) {
		const session = localStorage.getItem('sb-nsmjxidguxrhtjqysiek-auth-token')
		let sessionObject;
		if (session) {
			sessionObject = JSON.parse(session);
		}


		userState.user = sessionObject?.user;
		const program = await getProgram(sessionObject?.user.user_metadata.user_name ?? 'moapng')

		const böj = await get1RM(Lift.böj)
		const bänk = await get1RM(Lift.bänk);
		const mark = await get1RM(Lift.mark);
		const userData = await getUser(sessionObject?.user.user_metadata.user_name ?? 'moapng')

		return { böj, bänk, mark, program, userData }
	}
};

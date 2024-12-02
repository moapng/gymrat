import { browser } from '$app/environment';
import { user } from '$lib/stores/user';

export const load = async () => {
	if (browser) {
		const session = localStorage.getItem('sb-nsmjxidguxrhtjqysiek-auth-token')

		if (session) {
			const sessionObject = JSON.parse(session)
			user.set(sessionObject.user)
		}
	}
};

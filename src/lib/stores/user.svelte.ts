import { supabase } from '$lib/supabase';
import type { User } from '@supabase/supabase-js';

export const userState: { user: User | null } = $state({ user: null });

// supabase.auth.onAuthStateChange((event, session) => {
// 	console.log(event)
// 	if (session) {

// 		userState.user = session.user;
// 		supabase.auth.setSession({ access_token: session.access_token, refresh_token: session.refresh_token });
// 	}
// });

export const login = async () => {
	const { error } = await supabase.auth.signInWithOAuth({
		provider: 'github',
		options: {
			redirectTo:
				process.env.NODE_ENV === 'production'
					? 'https://moapng.github.io/gymrat/'
					: 'http://localhost:5173/'
		}
	});
	if (error) {
		console.error(error)
	}
};

export const logout = async () => {
	await supabase.auth.signOut();
	userState.user = null;
};

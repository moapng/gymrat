import { supabase } from '$lib/supabase';
import type { User } from '@supabase/supabase-js';

export const userState: { user: User | undefined } = $state({ user: undefined });

// supabase.auth.getSession().then(({ data }) => {
// 	userState.user = data.session?.user;
// });

supabase.auth.onAuthStateChange((event, session) => {
	if (event == 'INITIAL_SESSION' && session) {
		console.log('initial')
		supabase.auth.setSession({ access_token: session.access_token, refresh_token: session.refresh_token });
	}
	if (event == 'SIGNED_IN' && session) {
		console.log('signed in')
		userState.user = session.user;

	} else if (event == 'SIGNED_OUT') {
		userState.user = undefined;
	}
});

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
	userState.user = undefined;
};

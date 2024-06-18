import { writable, type Writable } from 'svelte/store';
import { supabase } from '$lib/supabase';
import type { User } from '@supabase/supabase-js';

export const user: Writable<User | null> = writable();

supabase.auth.onAuthStateChange((event, session) => {
	user.set(session?.user || null);
});

export const login = async () => {
	const { data, error } = await supabase.auth.signInWithOAuth({
		provider: 'github',
		options: {
			redirectTo:
				process.env.NODE_ENV === 'production'
					? 'https://moapng.github.io/gymrat/'
					: 'http://localhost:5173/'
		}
	});
};

export const logout = async () => {
	await supabase.auth.signOut();
	user.set(null);
};

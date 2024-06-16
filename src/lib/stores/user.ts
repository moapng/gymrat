import { writable, type Writable } from 'svelte/store';
import { supabase } from '$lib/supabase';

export const user = writable();

supabase.auth.onAuthStateChange((event, session) => {
	user.set(session?.user || null);
});

export const login = async () => {
	const { data, error } = await supabase.auth.signInWithOAuth({
		provider: 'github'
	});
	console.log(data);
};

export const logout = async () => {
	await supabase.auth.signOut();
	user.set(null);
};

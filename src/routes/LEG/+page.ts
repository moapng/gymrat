import { supabase } from '$lib/supabase';

export const load = async () => {
	const { data, error } = await supabase.from('exercises').select('*').eq('exercise_type', 'LEG');

	if (error) {
		console.error('Error fetching exercises:', error);
		return { exercises: [] };
	}

	return { exercises: data };
};

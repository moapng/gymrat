import { supabase } from './supabase';

export const get1RM = async (exercise: 'böj' | 'bänk' | 'mark'): Promise<number> => {
	const { data: PR, error } = await supabase
		.from('PR')
		.select('weight')
		.eq('exercise', exercise)
		.order('weight', { ascending: false })
		.limit(1);

	if (error) {
		console.error('Error fetching sets:', error);
		return 0;
	}

	return PR && PR.length > 0 ? PR[0].weight : 0;
};

export const getProgram = async (currentUser: string): Promise<{ formula: string, name: string }> => {

	const { data: user, error: errorUser } = await supabase
		.from('user')
		.select('chosen_program_name')
		.eq('user_name', currentUser);
	if (errorUser) {
		console.error('Error fetching user:', errorUser);
		return { formula: '', name: '' };
	}
	const { data: program, error } = await supabase
		.from('program')
		.select('formula, name')
		.eq('name', user[0]?.chosen_program_name)
		.limit(1);

	if (error) {
		console.error('Error fetching formula:', error);
		return { formula: '', name: '' };
	}
	return program && program.length > 0 ? program[0] : { formula: '', name: '' };
}
export const getUser = async (currentUser: string) => {
	const { data: user, error } = await supabase
		.from('user')
		.select('*')
		.eq('user_name', currentUser);

	if (error) {
		console.error('Error fetching user:', error);
		return null;
	}

	return user && user.length > 0 ? user[0] : null;
}
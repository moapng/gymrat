import { fetch_exercise_and_pr_data } from '$lib/api';
import { ActiveDay } from '$lib/interfaces';

export const load = async () => {
	return fetch_exercise_and_pr_data(ActiveDay.PULL, 'Deadlift')
};


export const calculateTexasMethod = (oneRM: number, factor: number) => oneRM * factor;
export const calculateRPE = (oneRM: number, reps: number, rpe: number) =>
	oneRM * (1 - ((reps - 1) * 0.03) + ((10 - rpe) * 0.025));

export const roundToNearestTwoPointFive = (value: number): number => {
	return parseFloat((Math.round(value / 2.5) * 2.5).toFixed(1));
}

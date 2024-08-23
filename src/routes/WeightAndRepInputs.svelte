<script lang="ts">
	import { get_current_cycle, insert_exercise_log, insert_set_with_pr_check } from '$lib/api';
	import type { ICycle } from '$lib/interfaces';
	import { user } from '$lib/stores/user';
	import { getToastStore } from '@skeletonlabs/skeleton';
	import type { User } from '@supabase/supabase-js';
	import { tick } from 'svelte';
	import { get } from 'svelte/store';

	let {
		current_cycle,
		current_week,
		set_number,
		lift_name
	}: { current_cycle: ICycle; current_week: number; set_number: number; lift_name: string } =
		$props();

	let input_weight: number | null = $state(null);
	let input_repetitions: number | null = $state(null);
	const current_user: User = $state(get(user)) as User;
	const toast_store = getToastStore();

	const on_submit = async () => {
		if (
			current_user &&
			current_user?.role === 'superduper' &&
			input_weight !== 0 &&
			input_repetitions !== 0
		) {
			try {
				let response = await insert_set_with_pr_check(
					current_cycle.id,
					lift_name,
					current_week,
					new Date(),
					input_weight as number,
					input_repetitions as number,
					set_number
				);
				console.log(response);
				//@ts-ignore
				if (response.is_pr === true) {
					tick();
					toast_store.trigger({
						message: '!! NYTT PR !!',
						hideDismiss: true,
						timeout: 5000,
						background: 'bg-gradient-to-r from-tertiary-500 to-tertiary-400',
						classes: 'border-4 border-success-500'
					});
				}
				if (response.insert_set_status === 201) {
					tick();
					toast_store.trigger({
						message: 'settet ligger i db',
						hideDismiss: true,
						timeout: 5000,
						background: 'bg-gradient-to-r from-success-500 to-success-400',
						classes: 'border-4 border-success-500'
					});
					input_weight = null;
					input_repetitions = null;
				}
				if (response.insert_pr_status === 201) {
					tick();
					toast_store.trigger({
						message: 'wihoo nytt pr ligger i db',
						hideDismiss: true,
						timeout: 5000,
						background: 'bg-gradient-to-r from-success-500 to-success-400',
						classes: 'border-4 border-success-500'
					});
					input_weight = null;
					input_repetitions = null;
				}
			} catch (error) {
				toast_store.trigger({
					//@ts-ignore
					message: error.message,
					hideDismiss: true,
					timeout: 5000,
					background: 'bg-gradient-to-r from-error-500 to-error-400',
					classes: 'border-4 border-error-500'
				});
			}
		} else {
			if (input_weight === 0)
				toast_store.trigger({
					message: '0 i vikt e inte okej',
					hideDismiss: true,
					timeout: 5000,
					background: 'bg-gradient-to-r from-error-500 to-error-400',
					classes: 'border-4 border-error-500'
				});
			if (input_repetitions === 0) {
				toast_store.trigger({
					message: '0 i reps e inte okej',
					hideDismiss: true,
					timeout: 5000,
					background: 'bg-gradient-to-r from-error-500 to-error-400',
					classes: 'border-4 border-error-500'
				});
			}
		}
	};
	const onkeyup = (e: KeyboardEvent) => {
		if (e.key === 'Enter') on_submit();
	};
</script>

<div>
	<h2>Set {set_number}</h2>
</div>
<div class="flex justify-around">
	<div class="w-32 relative flex items-center h-12">
		<button
			type="button"
			id="decrement-button"
			onclick={() => (input_weight = input_weight! - 2.5)}
			class="variant-filled-secondary rounded-s-lg p-3 h-full
			focus:ring-secondary-400 focus:ring-2 focus:outline-none"
		>
			<svg
				class="w-3 h-3 text-surface-900"
				aria-hidden="true"
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 18 2"
			>
				<path
					stroke="currentColor"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M1 1h16"
				/>
			</svg>
		</button>

		<input
			type="number"
			class="input variant-lined-primary
			rounded-none h-full max-w-24 pb-2
			text-center placeholder-primary-500
			focus:ring-secondary-400 focus:ring-2 focus:outline-none"
			bind:value={input_weight}
			placeholder="0"
			{onkeyup}
		/>
		<div
			class="absolute bottom-0 start-1/2 -translate-x-1/2 flex pb-1 gap-1
			text-xs text-primary-500 stroke-primary-500 fill-none"
		>
			<svg class="w-4 h-4" viewBox="0 0 29 21" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path
					d="M21.7737 6L24.1638 3.34088C24.3469 3.1325 24.4427 2.90907 24.4458 2.68317C24.4478 2.46247 24.3582 2.24375 24.1823 2.03958C24.0063 1.83541 23.7475 1.6498 23.4206 1.49342C23.0937 1.33703 22.7052 1.21293 22.2773 1.12826C21.8495 1.04358 21.3908 0.999998 20.9275 1H8.13088C7.6676 0.999998 7.20887 1.04358 6.78104 1.12826C6.35321 1.21293 5.96469 1.33703 5.63779 1.49342C5.31089 1.6498 5.05204 1.83541 4.8761 2.03958C4.70016 2.24375 4.6106 2.46247 4.61256 2.68317C4.61568 2.90907 4.7115 3.1325 4.89462 3.34088L7.2847 6"
					stroke-width="2"
				/>
				<path
					d="M14.5292 4.22998C10.9435 4.22998 7.50443 5.23476 4.96763 7.02357C2.43082 8.81238 1.00378 11.2389 1.00002 13.77C1.00002 13.89 1.00002 14 1.00002 14.11C1.00002 14.22 1.00002 14.32 1.00002 14.42C0.997092 15.5083 1.28548 16.5872 1.85002 17.6C2.08896 18.0318 2.47305 18.4162 2.96919 18.72C3.82836 19.2249 4.91127 19.5009 6.02919 19.5H23.0292C24.1413 19.5048 25.2201 19.2321 26.075 18.73C26.5612 18.4362 26.9361 18.0616 27.1659 17.64C27.7714 16.569 28.0653 15.4229 28.03 14.27V14.2C28.03 14.07 28.03 13.93 28.03 13.78C28.03 11.2506 26.6085 8.82457 24.0774 7.03417C21.5464 5.24377 18.1124 4.23528 14.5292 4.22998Z"
					stroke-width="2"
				/>
				<path d="M7.77169 9V16.64" stroke-width="1.91" />
				<path
					d="M11.8234 9V10C11.8252 10.3764 11.7218 10.7494 11.519 11.0975C11.3162 11.4457 11.0181 11.7622 10.6417 12.0288C10.2653 12.2954 9.81797 12.507 9.32547 12.6513C8.83298 12.7957 8.30496 12.87 7.77169 12.87C8.84626 12.87 9.87682 13.1713 10.6367 13.7077C11.3965 14.244 11.8234 14.9715 11.8234 15.73V16.73"
					stroke-width="1.91"
				/>
				<path
					d="M18.5809 12.82H21.2867V13.77C21.2886 14.0212 21.2199 14.2702 21.0845 14.5025C20.9492 14.7348 20.75 14.9459 20.4984 15.1235C20.2467 15.3012 19.9477 15.4418 19.6185 15.5373C19.2894 15.6328 18.9367 15.6813 18.5809 15.68C17.8756 15.667 17.2054 15.46 16.7132 15.1032C16.2209 14.7464 15.9456 14.268 15.9459 13.77V11.86C15.9672 11.3715 16.2516 10.9071 16.7412 10.5614C17.2309 10.2158 17.8888 10.015 18.5809 10H21.2867"
					stroke-width="1.91"
				/>
			</svg>

			<span>vikt</span>
		</div>
		<button
			type="button"
			id="increment-button"
			onclick={() => (input_weight = input_weight! + 2.5)}
			class="variant-filled-primary rounded-e-lg p-3 h-full
			focus:ring-secondary-400 focus:ring-2 focus:outline-none"
		>
			<svg
				class="w-3 h-3 text-surface-900"
				aria-hidden="true"
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 18 18"
			>
				<path
					stroke="currentColor"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M9 1v16M1 9h16"
				/>
			</svg>
		</button>
	</div>

	<div class="w-32 relative flex items-center">
		<button
			type="button"
			id="decrement-button"
			onclick={() => (input_repetitions = input_repetitions! - 1)}
			class="variant-filled-secondary rounded-s-lg p-3 h-full
			focus:ring-secondary-400 focus:ring-2 focus:outline-none"
		>
			<svg
				class="w-3 h-3 text-surface-900"
				aria-hidden="true"
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 18 2"
			>
				<path
					stroke="currentColor"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M1 1h16"
				/>
			</svg>
		</button>

		<input
			type="number"
			class="input variant-lined-primary
			rounded-none h-full max-w-24 pb-2
			text-center placeholder-primary-500
			focus:ring-secondary-400 focus:ring-2 focus:outline-none"
			bind:value={input_repetitions}
			placeholder="0"
			{onkeyup}
		/>
		<div class="absolute bottom-0 start-1/2 -translate-x-1/2 flex pb-1 gap-1">
			<svg
				class="w-4 h-4 fill-primary-500"
				aria-hidden="true"
				viewBox="0 0 24 24"
				version="1.2"
				baseProfile="tiny"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M23.292 12.134c.138-.445.208-.91.208-1.384 0-2.619-2.131-4.75-4.75-4.75-1.396 0-2.685.61-3.573 1.632l-.056-.067c-.973-.974-2.349-1.533-3.776-1.533-1.422 0-2.794.556-3.77 1.525-.264-.431-.644-.813-1.122-1.108-.474-.294-1.032-.449-1.613-.449-.482 0-.955.109-1.369.316l-1.406.747c-1.442.721-2.051 2.526-1.313 4.002.272.543.714.982 1.248 1.272v4.663c0 1.654 1.346 3 3 3 .766 0 1.458-.297 1.989-.771.54.487 1.25.771 2.011.771h5c.778 0 1.479-.305 2.01-.795.796.5 1.731.795 2.74.795 2.895 0 5.25-2.355 5.25-5.25 0-.922-.25-1.825-.708-2.616zm-17.292 4.866c0 .552-.448 1-1 1s-1-.448-1-1v-6.382c-.144.072-.306.106-.471.106-.401 0-.813-.203-.988-.553-.247-.494-.031-1.095.463-1.342l1.361-.724c.141-.07.307-.105.475-.105.199 0 .4.05.561.149.294.183.599.504.599.851v8zm8 1h-5c-.404 0-.769-.244-.924-.617-.155-.374-.069-.804.217-1.09l4-4c.254-.254.394-.591.394-.95 0-.358-.14-.695-.394-.949s-.601-.381-.949-.381-.696.127-.952.382c-.252.252-.392.589-.392.948 0 .552-.448 1-1 1s-1-.448-1-1c0-.894.348-1.733.98-2.364.632-.631 1.498-.947 2.364-.947s1.731.316 2.363.948c.632.631.979 1.471.979 2.363 0 .893-.348 1.733-.979 2.364l-2.293 2.293h2.586c.552 0 1 .448 1 1s-.448 1-1 1zm4.75 0c-1.792 0-3.25-1.458-3.25-3.25 0-.552.448-1 1-1s1 .448 1 1c0 .689.561 1.25 1.25 1.25s1.25-.561 1.25-1.25-.561-1.25-1.25-1.25c-.552 0-1-.448-1-1s.448-1 1-1c.414 0 .75-.336.75-.75s-.336-.75-.75-.75c-.281 0-.536.155-.665.404-.178.343-.527.54-.889.54-.155 0-.312-.036-.459-.112-.491-.254-.682-.857-.428-1.348.475-.915 1.41-1.484 2.441-1.484 1.516 0 2.75 1.233 2.75 2.75 0 .611-.207 1.17-.545 1.627.639.594 1.045 1.434 1.045 2.373 0 1.792-1.458 3.25-3.25 3.25z"
				/>
			</svg>

			<span class="text-xs text-primary-500 align-middle">reps</span>
		</div>
		<button
			type="button"
			id="increment-button"
			onclick={() => (input_repetitions = input_repetitions! + 1)}
			class="variant-filled-primary rounded-e-lg p-3 h-full
			focus:ring-secondary-400 focus:ring-2 focus:outline-none"
		>
			<svg
				class="w-3 h-3 text-surface-900"
				aria-hidden="true"
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 18 18"
			>
				<path
					stroke="currentColor"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M9 1v16M1 9h16"
				/>
			</svg>
		</button>
	</div>
</div>

<style>
	input[type='number'] {
		appearance: textfield;
		-moz-appearance: textfield;
	}
</style>

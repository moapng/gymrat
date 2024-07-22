<script lang="ts">
	import { insert_exercise_log } from '$lib/api';
	import { user } from '$lib/stores/user';
	import type { User } from '@supabase/supabase-js';
	import { tick } from 'svelte';
	import { get } from 'svelte/store';

	let input_weight: number | null = $state(null);

	let input_repetitions: number | null = $state(null);
	const current_user: User = $state(get(user)) as User;

	let { exercise_id, show_toast, toast_message, toast_error } = $props();

	const onsubmit = async () => {
		if (
			current_user &&
			current_user?.role === 'superduper' &&
			input_weight !== null &&
			input_repetitions !== null
		) {
			try {
				let response = await insert_exercise_log(
					exercise_id as string,
					input_weight,
					input_repetitions,
					new Date(),
					99
				);
				if (response.status === 201) {
					tick();
					toast_message = 'uppdaterat databasen';
				}
			} catch (error) {
				toast_error = error.message;
			}
			// show_input = false;
			show_toast = true;
			setTimeout(() => {
				show_toast = false;
			}, 5000);
		}
	};
	const onkeyup = (e: KeyboardEvent) => {
		if (e.key === 'Enter') onsubmit();
	};
</script>

<div class="flex">
	<div class="w-1/2 relative flex items-center">
		<button
			type="button"
			id="decrement-button"
			onclick={() => (input_weight = input_weight - 2.5)}
			class="variant-ghost-primary rounded-s-lg p-3 h-11 focus:ring-secondary-400 focus:ring-2 focus:outline-none"
		>
			<svg
				class="w-3 h-3 text-gray-900"
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

		<div
			class="variant-ghost-primary
			input-group input-group-divider grid-cols-[auto_1fr_auto]
			rounded-none border-primary-500 h-11"
		>
			<svg
				class="input-group-shim w-6 h-6 my-auto"
				aria-hidden="true"
				viewBox="0 0 612 612"
				xmlns="http://www.w3.org/2000/svg"
				xmlns:xlink="http://www.w3.org/1999/xlink"
			>
				<path
					class="fill-tertiary-400"
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M610.434,512.716l-95.988-296.691c-4.244-13.117-16.459-22.003-30.245-22.003H382.904c8.211-13.563,13.028-29.399,13.028-46.379c0-49.586-40.346-89.933-89.933-89.933c-49.586,0-89.933,40.346-89.933,89.933c0,16.979,4.817,32.815,13.029,46.379H127.8c-13.786,0-26.001,8.886-30.245,22.003L1.567,512.716c-6.643,20.531,8.666,41.573,30.245,41.573h548.376C601.768,554.29,617.076,533.248,610.434,512.716z M258.452,147.643c0-26.221,21.327-47.548,47.548-47.548c26.221,0,47.548,21.327,47.548,47.548c0,22.705-16.015,41.682-37.327,46.379H295.78C274.467,189.326,258.452,170.348,258.452,147.643z M263.962,451.032l-27.475-52.756h-13.092v52.756h-31.83V320.978h31.83v50.208h13.092l26.927-50.208h34.198l-35.117,62.205v0.37l37.116,67.479H263.962z M431.369,451.032h-26.557v-3.644c0-2.726,0.178-5.45,0.178-5.45h-0.355c0,0-12.56,11.271-34.198,11.271c-33.294,0-63.85-24.912-63.85-67.479c0-37.827,28.555-66.931,68.219-66.931c33.28,0,50.017,17.271,50.017,17.271l-15.285,23.831c0,0-13.271-11.997-31.65-11.997c-27.282,0-38.375,17.462-38.375,36.73c0,24.75,17.092,39.472,37.294,39.472c15.27,0,26.362-9.449,26.362-9.449v-10.013h-18.365v-27.104h46.565L431.369,451.032L431.369,451.032z"
				/>
			</svg>

			<input
				type="number"
				class="variant-ghost-primary
					font-medium text-sm placeholder:text-tertiary-400
			focus:ring-secondary-400 focus:ring-2 focus:outline-none max-w-24"
				placeholder="0"
				bind:value={input_weight}
				{onkeyup}
			/>
		</div>
		<button
			type="button"
			id="increment-button"
			onclick={() => (input_weight = input_weight + 2.5)}
			class="variant-ghost-primary rounded-e-lg p-3 h-11 focus:ring-secondary-400 focus:ring-2 focus:outline-none"
		>
			<svg
				class="w-3 h-3 text-gray-900"
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
	<div class="col-span-2 relative flex items-center">
		<button
			type="button"
			id="decrement-button"
			onclick={() => (input_repetitions = input_repetitions - 1)}
			class="variant-ghost-primary rounded-s-lg p-3 h-11 focus:ring-secondary-400 focus:ring-2 focus:outline-none"
		>
			<svg
				class="w-3 h-3 text-gray-900"
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

		<div
			class="variant-ghost-primary
			input-group input-group-divider grid-cols-[auto_1fr_auto]
			rounded-none border-primary-500 h-11"
		>
			<svg
				class="input-group-shim w-6 h-6 my-auto"
				aria-hidden="true"
				viewBox="0 0 76 76"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					class="fill-tertiary-400"
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M 41.25,40L 28,53.25L 14.75,40L 41.25,40 Z M 61.25,36L 34.75,36L 48,22.75L 61.25,36 Z M 24,36L 24,23.2344L 22.9781,23.6995L 22.0558,24.0201L 21.0781,24.2418L 19.9896,24.3981L 19.9896,20.4398L 21.5294,20.0915L 23.0197,19.5729L 24.51,18.8426C 25.0087,18.5616 25.522,18.3695 26.0498,18L 29,18L 29,36L 24,36 Z M 56.1154,48.401C 56.1154,49.7363 55.9604,51.0043 55.6503,52.205C 55.3402,53.4057 54.8573,54.4573 54.2016,55.3598C 53.5458,56.2623 52.7027,56.9794 51.6722,57.5111C 50.6417,58.0429 49.4087,58.3088 47.9731,58.3088L 46.5778,58.2355L 45.4279,58.0554L 44.5373,57.8318L 43.904,57.616L 43.904,53.5469L 44.4799,53.8556L 45.2973,54.1466L 46.2552,54.3623L 47.2448,54.4494C 48.4824,54.4494 49.4291,54.107 50.0849,53.4222C 50.7407,52.7374 51.0765,51.7313 51.0923,50.404L 51.0171,50.404C 50.6635,50.8578 50.2083,51.2187 49.6515,51.4866C 49.0946,51.7544 48.4204,51.8883 47.6287,51.8883C 47.0112,51.8883 46.4155,51.7689 45.8416,51.5301C 45.2676,51.2913 44.7583,50.943 44.3136,50.4851C 43.869,50.0273 43.6696,49.4912 43.4018,48.8156C 43.1339,48.1401 43,47.3682 43,46.5C 43,45.4445 43.1709,44.5109 43.5126,43.6995C 43.8543,42.888 44.1652,42.1772 44.759,41.6283C 45.3527,41.0794 46.0513,40.6651 46.8549,40.3854C 47.6584,40.1057 48.522,39.9658 49.4456,39.9658C 49.9153,39.9658 50.4082,40.0193 50.9241,40.1262C 51.44,40.233 51.9433,40.4125 52.4342,40.6645C 52.925,40.9165 53.3927,41.2523 53.8374,41.6719C 54.282,42.0915 54.6739,42.6146 55.013,43.2414C 55.3521,43.8681 55.6206,44.6063 55.8185,45.456C 56.0165,46.3058 56.1154,47.2874 56.1154,48.401 Z M 50.8944,46.0894L 50.8013,45.3096L 50.5223,44.609C 50.3983,44.3979 50.2439,44.229 50.0592,44.1023C 49.8744,43.9756 49.6541,43.9123 49.3981,43.9123C 48.9521,43.9123 48.5827,44.0911 48.2898,44.4486C 47.9969,44.8062 47.8504,45.361 47.8504,46.1131C 47.8504,46.8124 47.9949,47.3435 48.2838,47.7064C 48.5728,48.0692 48.9363,48.2506 49.3744,48.2506C 49.6383,48.2506 49.8645,48.1952 50.0532,48.0844C 50.2419,47.9735 50.3983,47.8192 50.5223,47.6213L 50.8013,46.9285L 50.8944,46.0894 Z "
				/>
			</svg>

			<input
				type="number"
				class="variant-ghost-primary
					font-medium text-sm placeholder:text-tertiary-400
			focus:ring-secondary-400 focus:ring-2 focus:outline-none max-w-24"
				placeholder="0"
				bind:value={input_repetitions}
				{onkeyup}
			/>
		</div>
		<button
			type="button"
			id="increment-button"
			onclick={() => (input_repetitions = input_repetitions + 1)}
			class="variant-ghost-primary rounded-e-lg p-3 h-11 focus:ring-secondary-400 focus:ring-2 focus:outline-none"
		>
			<svg
				class="w-3 h-3 text-gray-900"
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

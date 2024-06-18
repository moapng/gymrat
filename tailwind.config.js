/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/routes/**/*.{svelte,js,ts}'],
	theme: {
		extend: {}
	},
	plugins: [require('daisyui')],
	daisyui: {
		themes: [
			{
				light: {
					primary: '#C9B3E3',

					'primary-focus': '#3F2461',

					'primary-content': '#251539',

					secondary: '#84C4A1',

					'secondary-focus': '#234C34',

					'secondary-content': '#102F1D',

					accent: '#C2BE88',

					'accent-focus': '#CBC460',

					'accent-content': '#6C661E',

					neutral: '#c95678',

					'neutral-focus': '#b32d66',

					'neutral-content': '#5e1735',

					'base-100': '#f1e9f3',

					'base-200': '#f9fafb',

					'base-300': '#ced3d9',

					'base-content': '#251539',

					info: '#1c92f2',

					success: '#009485',

					warning: '#ff9900',

					error: '#ff5724',

					'--rounded-box': '0',

					'--rounded-btn': '0',

					'--rounded-badge': '0',

					'--animation-btn': '.25s',

					'--animation-input': '.2s',

					'--btn-text-case': 'uppercase',

					'--navbar-padding': '.5rem',

					'--border-btn': ''
				}
			}
		]
	}
};

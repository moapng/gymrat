
import type { CustomThemeConfig } from '@skeletonlabs/tw-plugin';

export const kuromiTheme: CustomThemeConfig = {
	name: 'kuromi-theme',
	properties: {
		// =~= Theme Properties =~=
		"--theme-font-family-base": `Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'`,
		"--theme-font-family-heading": `ui-serif, Georgia, Cambria, 'Times New Roman', Times, serif`,
		"--theme-font-color-base": "65 0 119",
		"--theme-font-color-dark": "255 255 255",
		"--theme-rounded-base": "24px",
		"--theme-rounded-container": "24px",
		"--theme-border-base": "1px",
		// =~= Theme On-X Colors =~=
		"--on-primary": "65 0 119",
		"--on-secondary": "65 0 119",
		"--on-tertiary": "65 0 119",
		"--on-success": "65 0 119",
		"--on-warning": "65 0 119",
		"--on-error": "65 0 119",
		"--on-surface": "var(--color-primary-50)",
		// =~= Theme Colors  =~=
		// primary | #a65efd 
		"--color-primary-50": "242 231 255", // #f2e7ff
		"--color-primary-100": "237 223 255", // #eddfff
		"--color-primary-200": "233 215 255", // #e9d7ff
		"--color-primary-300": "219 191 254", // #dbbffe
		"--color-primary-400": "193 142 254", // #c18efe
		"--color-primary-500": "166 94 253", // #a65efd
		"--color-primary-600": "149 85 228", // #9555e4
		"--color-primary-700": "125 71 190", // #7d47be
		"--color-primary-800": "100 56 152", // #643898
		"--color-primary-900": "81 46 124", // #512e7c
		// secondary | #fd48e2 
		"--color-secondary-50": "255 228 251", // #ffe4fb
		"--color-secondary-100": "255 218 249", // #ffdaf9
		"--color-secondary-200": "255 209 248", // #ffd1f8
		"--color-secondary-300": "254 182 243", // #feb6f3
		"--color-secondary-400": "254 127 235", // #fe7feb
		"--color-secondary-500": "253 72 226", // #fd48e2
		"--color-secondary-600": "228 65 203", // #e441cb
		"--color-secondary-700": "190 54 170", // #be36aa
		"--color-secondary-800": "152 43 136", // #982b88
		"--color-secondary-900": "124 35 111", // #7c236f
		// tertiary | #7dcfb6 
		"--color-tertiary-50": "236 248 244", // #ecf8f4
		"--color-tertiary-100": "229 245 240", // #e5f5f0
		"--color-tertiary-200": "223 243 237", // #dff3ed
		"--color-tertiary-300": "203 236 226", // #cbece2
		"--color-tertiary-400": "164 221 204", // #a4ddcc
		"--color-tertiary-500": "125 207 182", // #7dcfb6
		"--color-tertiary-600": "113 186 164", // #71baa4
		"--color-tertiary-700": "94 155 137", // #5e9b89
		"--color-tertiary-800": "75 124 109", // #4b7c6d
		"--color-tertiary-900": "61 101 89", // #3d6559
		// success | #80f479 
		"--color-success-50": "236 253 235", // #ecfdeb
		"--color-success-100": "230 253 228", // #e6fde4
		"--color-success-200": "223 252 222", // #dffcde
		"--color-success-300": "204 251 201", // #ccfbc9
		"--color-success-400": "166 247 161", // #a6f7a1
		"--color-success-500": "128 244 121", // #80f479
		"--color-success-600": "115 220 109", // #73dc6d
		"--color-success-700": "96 183 91", // #60b75b
		"--color-success-800": "77 146 73", // #4d9249
		"--color-success-900": "63 120 59", // #3f783b
		// warning | #fbdb79 
		"--color-warning-50": "254 250 235", // #fefaeb
		"--color-warning-100": "254 248 228", // #fef8e4
		"--color-warning-200": "254 246 222", // #fef6de
		"--color-warning-300": "253 241 201", // #fdf1c9
		"--color-warning-400": "252 230 161", // #fce6a1
		"--color-warning-500": "251 219 121", // #fbdb79
		"--color-warning-600": "226 197 109", // #e2c56d
		"--color-warning-700": "188 164 91", // #bca45b
		"--color-warning-800": "151 131 73", // #978349
		"--color-warning-900": "123 107 59", // #7b6b3b
		// error | #eb5261 
		"--color-error-50": "252 229 231", // #fce5e7
		"--color-error-100": "251 220 223", // #fbdcdf
		"--color-error-200": "250 212 216", // #fad4d8
		"--color-error-300": "247 186 192", // #f7bac0
		"--color-error-400": "241 134 144", // #f18690
		"--color-error-500": "235 82 97", // #eb5261
		"--color-error-600": "212 74 87", // #d44a57
		"--color-error-700": "176 62 73", // #b03e49
		"--color-error-800": "141 49 58", // #8d313a
		"--color-error-900": "115 40 48", // #732830
		// surface | #601fb8 
		"--color-surface-50": "231 221 244", // #e7ddf4
		"--color-surface-100": "223 210 241", // #dfd2f1
		"--color-surface-200": "215 199 237", // #d7c7ed
		"--color-surface-300": "191 165 227", // #bfa5e3
		"--color-surface-400": "144 98 205", // #9062cd
		"--color-surface-500": "96 31 184", // #601fb8
		"--color-surface-600": "86 28 166", // #561ca6
		"--color-surface-700": "72 23 138", // #48178a
		"--color-surface-800": "58 19 110", // #3a136e
		"--color-surface-900": "47 15 90", // #2f0f5a

	}
}
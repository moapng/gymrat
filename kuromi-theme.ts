
import type { CustomThemeConfig } from '@skeletonlabs/tw-plugin';

export const kuromiTheme: CustomThemeConfig = {
	name: 'kuromi-theme',
	properties: {
		// =~= Theme Properties =~=
		"--theme-font-family-base": `Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'`,
		"--theme-font-family-heading": `ui-serif, Georgia, Cambria, 'Times New Roman', Times, serif`,
		"--theme-font-color-base": "0 0 0",
		"--theme-font-color-dark": "255 255 255",
		"--theme-rounded-base": "24px",
		"--theme-rounded-container": "24px",
		"--theme-border-base": "2px",
		// =~= Theme On-X Colors =~=
		"--on-primary": "var(--color-surface-900)",
		"--on-secondary": "var(--color-surface-900)",
		"--on-tertiary": "var(--color-surface-900)",
		"--on-success": "var(--color-surface-900)",
		"--on-warning": "var(--color-surface-900)",
		"--on-error": "var(--color-error-100)",
		"--on-surface": "var(--color-primary-300)",
		// =~= Theme Colors  =~=
		// primary | #ad52f8 
		"--color-primary-50": "243 229 254", // #f3e5fe
		"--color-primary-100": "239 220 254", // #efdcfe
		"--color-primary-200": "235 212 253", // #ebd4fd
		"--color-primary-300": "222 186 252", // #debafc
		"--color-primary-400": "198 134 250", // #c686fa
		"--color-primary-500": "173 82 248", // #ad52f8
		"--color-primary-600": "156 74 223", // #9c4adf
		"--color-primary-700": "130 62 186", // #823eba
		"--color-primary-800": "104 49 149", // #683195
		"--color-primary-900": "85 40 122", // #55287a
		// secondary | #f451d3 
		"--color-secondary-50": "253 229 248", // #fde5f8
		"--color-secondary-100": "253 220 246", // #fddcf6
		"--color-secondary-200": "252 212 244", // #fcd4f4
		"--color-secondary-300": "251 185 237", // #fbb9ed
		"--color-secondary-400": "247 133 224", // #f785e0
		"--color-secondary-500": "244 81 211", // #f451d3
		"--color-secondary-600": "220 73 190", // #dc49be
		"--color-secondary-700": "183 61 158", // #b73d9e
		"--color-secondary-800": "146 49 127", // #92317f
		"--color-secondary-900": "120 40 103", // #782867
		// tertiary | #68e6cc 
		"--color-tertiary-50": "232 251 247", // #e8fbf7
		"--color-tertiary-100": "225 250 245", // #e1faf5
		"--color-tertiary-200": "217 249 242", // #d9f9f2
		"--color-tertiary-300": "195 245 235", // #c3f5eb
		"--color-tertiary-400": "149 238 219", // #95eedb
		"--color-tertiary-500": "104 230 204", // #68e6cc
		"--color-tertiary-600": "94 207 184", // #5ecfb8
		"--color-tertiary-700": "78 173 153", // #4ead99
		"--color-tertiary-800": "62 138 122", // #3e8a7a
		"--color-tertiary-900": "51 113 100", // #337164
		// success | #8cd163 
		"--color-success-50": "238 248 232", // #eef8e8
		"--color-success-100": "232 246 224", // #e8f6e0
		"--color-success-200": "226 244 216", // #e2f4d8
		"--color-success-300": "209 237 193", // #d1edc1
		"--color-success-400": "175 223 146", // #afdf92
		"--color-success-500": "140 209 99", // #8cd163
		"--color-success-600": "126 188 89", // #7ebc59
		"--color-success-700": "105 157 74", // #699d4a
		"--color-success-800": "84 125 59", // #547d3b
		"--color-success-900": "69 102 49", // #456631
		// warning | #ecc142 
		"--color-warning-50": "252 246 227", // #fcf6e3
		"--color-warning-100": "251 243 217", // #fbf3d9
		"--color-warning-200": "250 240 208", // #faf0d0
		"--color-warning-300": "247 230 179", // #f7e6b3
		"--color-warning-400": "242 212 123", // #f2d47b
		"--color-warning-500": "236 193 66", // #ecc142
		"--color-warning-600": "212 174 59", // #d4ae3b
		"--color-warning-700": "177 145 50", // #b19132
		"--color-warning-800": "142 116 40", // #8e7428
		"--color-warning-900": "116 95 32", // #745f20
		// error | #ef295b 
		"--color-error-50": "253 223 230", // #fddfe6
		"--color-error-100": "252 212 222", // #fcd4de
		"--color-error-200": "251 202 214", // #fbcad6
		"--color-error-300": "249 169 189", // #f9a9bd
		"--color-error-400": "244 105 140", // #f4698c
		"--color-error-500": "239 41 91", // #ef295b
		"--color-error-600": "215 37 82", // #d72552
		"--color-error-700": "179 31 68", // #b31f44
		"--color-error-800": "143 25 55", // #8f1937
		"--color-error-900": "117 20 45", // #75142d
		// surface | #8500f2 
		"--color-surface-50": "237 217 253", // #edd9fd
		"--color-surface-100": "231 204 252", // #e7ccfc
		"--color-surface-200": "225 191 252", // #e1bffc
		"--color-surface-300": "206 153 250", // #ce99fa
		"--color-surface-400": "170 77 246", // #aa4df6
		"--color-surface-500": "133 0 242", // #8500f2
		"--color-surface-600": "120 0 218", // #7800da
		"--color-surface-700": "100 0 182", // #6400b6
		"--color-surface-800": "80 0 145", // #500091
		"--color-surface-900": "65 0 119", // #410077

	}
}
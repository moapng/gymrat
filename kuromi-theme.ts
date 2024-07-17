
import type { CustomThemeConfig } from '@skeletonlabs/tw-plugin';

export const kuromiTheme: CustomThemeConfig = {
	name: 'kuromi-theme',
	properties: {
		// =~= Theme Properties =~=
		"--theme-font-family-base": `Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'`,
		"--theme-font-family-heading": `ui-serif, Georgia, Cambria, 'Times New Roman', Times, serif`,
		"--theme-font-color-base": "var(--color-tertiary-500)",
		"--theme-font-color-dark": "var(--color-primary-50)",
		"--theme-rounded-base": "12px",
		"--theme-rounded-container": "12px",
		"--theme-border-base": "1px",
		// =~= Theme On-X Colors =~=
		"--on-primary": "var(--color-tertiary-500)",
		"--on-secondary": "var(--color-tertiary-500)",
		"--on-tertiary": "var(--color-primary-500)",
		"--on-success": "var(--color-success-900)",
		"--on-warning": "var(--color-warning-900)",
		"--on-error": "var(--color-error-900)",
		"--on-surface": "var(--color-surface-50)",
		// =~= Theme Colors  =~=
		// primary | #c7b1f3 
		"--color-primary-50": "247 243 253", // #f7f3fd
		"--color-primary-100": "244 239 253", // #f4effd
		"--color-primary-200": "241 236 252", // #f1ecfc
		"--color-primary-300": "233 224 250", // #e9e0fa
		"--color-primary-400": "216 200 247", // #d8c8f7
		"--color-primary-500": "199 177 243", // #c7b1f3
		"--color-primary-600": "179 159 219", // #b39fdb
		"--color-primary-700": "149 133 182", // #9585b6
		"--color-primary-800": "119 106 146", // #776a92
		"--color-primary-900": "98 87 119", // #625777
		// secondary | #f589e2 
		"--color-secondary-50": "254 237 251", // #feedfb
		"--color-secondary-100": "253 231 249", // #fde7f9
		"--color-secondary-200": "253 226 248", // #fde2f8
		"--color-secondary-300": "251 208 243", // #fbd0f3
		"--color-secondary-400": "248 172 235", // #f8aceb
		"--color-secondary-500": "245 137 226", // #f589e2
		"--color-secondary-600": "221 123 203", // #dd7bcb
		"--color-secondary-700": "184 103 170", // #b867aa
		"--color-secondary-800": "147 82 136", // #935288
		"--color-secondary-900": "120 67 111", // #78436f
		// tertiary | #4d1a3a 
		"--color-tertiary-50": "228 221 225", // #e4dde1
		"--color-tertiary-100": "219 209 216", // #dbd1d8
		"--color-tertiary-200": "211 198 206", // #d3c6ce
		"--color-tertiary-300": "184 163 176", // #b8a3b0
		"--color-tertiary-400": "130 95 117", // #825f75
		"--color-tertiary-500": "77 26 58", // #4d1a3a
		"--color-tertiary-600": "69 23 52", // #451734
		"--color-tertiary-700": "58 20 44", // #3a142c
		"--color-tertiary-800": "46 16 35", // #2e1023
		"--color-tertiary-900": "38 13 28", // #260d1c
		// success | #aeec71 
		"--color-success-50": "243 252 234", // #f3fcea
		"--color-success-100": "239 251 227", // #effbe3
		"--color-success-200": "235 250 220", // #ebfadc
		"--color-success-300": "223 247 198", // #dff7c6
		"--color-success-400": "198 242 156", // #c6f29c
		"--color-success-500": "174 236 113", // #aeec71
		"--color-success-600": "157 212 102", // #9dd466
		"--color-success-700": "131 177 85", // #83b155
		"--color-success-800": "104 142 68", // #688e44
		"--color-success-900": "85 116 55", // #557437
		// warning | #f2e757 
		"--color-warning-50": "253 251 230", // #fdfbe6
		"--color-warning-100": "252 250 221", // #fcfadd
		"--color-warning-200": "252 249 213", // #fcf9d5
		"--color-warning-300": "250 245 188", // #faf5bc
		"--color-warning-400": "246 238 137", // #f6ee89
		"--color-warning-500": "242 231 87", // #f2e757
		"--color-warning-600": "218 208 78", // #dad04e
		"--color-warning-700": "182 173 65", // #b6ad41
		"--color-warning-800": "145 139 52", // #918b34
		"--color-warning-900": "119 113 43", // #77712b
		// error | #ee4668 
		"--color-error-50": "252 227 232", // #fce3e8
		"--color-error-100": "252 218 225", // #fcdae1
		"--color-error-200": "251 209 217", // #fbd1d9
		"--color-error-300": "248 181 195", // #f8b5c3
		"--color-error-400": "243 126 149", // #f37e95
		"--color-error-500": "238 70 104", // #ee4668
		"--color-error-600": "214 63 94", // #d63f5e
		"--color-error-700": "179 53 78", // #b3354e
		"--color-error-800": "143 42 62", // #8f2a3e
		"--color-error-900": "117 34 51", // #752233
		// surface | #9f64c4 
		"--color-surface-50": "241 232 246", // #f1e8f6
		"--color-surface-100": "236 224 243", // #ece0f3
		"--color-surface-200": "231 216 240", // #e7d8f0
		"--color-surface-300": "217 193 231", // #d9c1e7
		"--color-surface-400": "188 147 214", // #bc93d6
		"--color-surface-500": "159 100 196", // #9f64c4
		"--color-surface-600": "143 90 176", // #8f5ab0
		"--color-surface-700": "119 75 147", // #774b93
		"--color-surface-800": "95 60 118", // #5f3c76
		"--color-surface-900": "78 49 96", // #4e3160

	}
}
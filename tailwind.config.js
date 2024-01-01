/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				black: '#000000',
				blue: '#00b4d8',
				'blue-hover': '#008dd8'
			}
		}
	},
	plugins: []
};

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			backgroundColor: {
				"master-green": "#adf3d4",
				"master-blue": "#103a61",
				"master-brown": "#c9a179",
			},
			colors: {
				"master-blue": "#103a61",
				"master-black": "#121519",
			},
		},
	},
	plugins: [],
};

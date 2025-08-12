/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}", // Scan all files in src
        "./public/index.html"         // Scan HTML if you add custom pages
    ],
    theme: {
        extend: {
            colors: {
                primary: "#2563eb", // Blue-600
                secondary: "#9333ea", // Purple-600
            },
            fontFamily: {
                sans: ["Inter", "sans-serif"], // Custom font
            },
        },
    },
    plugins: [],
}

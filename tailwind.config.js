/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx}",
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",

        // Or if using `src` directory:
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#007bff",
                "primary-light": "#0069d9",
                secondary: "#6c757d",
                "secondary-light": "#5a6268",
                warning: "#ffc107",
                "warning-light": "#e0a800",
                success: "#28a745",
                "success-light": "#218838",
                error: "#dc3545",
                "error-light": "#c82333",
                foreground: "#212529",
                background: "#f8f9fa",
            },
        },
    },
    plugins: [],
};

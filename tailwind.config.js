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
            fontSize: {
                xs: "12px",
                sm: "14px",
                base: "16px",
                lg: "18px",
                xl: "20px",
                "2xl": "24px",
                "3xl": "30px",
                "4xl": "36px",
                "5xl": "48px",
                "6xl": "64px",
            },
            fontWeight: {
                normal: "400",
                medium: "500",
                semibold: "600",
                bold: "700",
                extrabold: "800",
            },
            animation: {
                text: "text 5s ease infinite",
            },
            keyframes: {
                text: {
                    "0%, 100%": {
                        "background-size": "200% 200%",
                        "background-position": "left center",
                    },
                    "50%": {
                        "background-size": "200% 200%",
                        "background-position": "right center",
                    },
                },
            },
        },
    },
    plugins: [require("@tailwindcss/typography")],
};

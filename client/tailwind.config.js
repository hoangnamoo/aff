/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            keyframes: {
                shake: {
                    '0%, 100%': { transform: 'translateX(0)' },
                    '25%, 75%': { transform: 'translateX(5px)' },
                    '50%': { transform: 'translateX(-5px)' },
                },
                zoomIn: {
                    '0%': { transform: 'scale(140%)', opacity: '0%' },
                    '100%': { transform: 'scale(100%)', opacity: '100%' },
                },
                slideUp: {
                    '0%': { top: '100%' },
                    '70%': { top: '140%' },
                    '100%': { top: '0%' },
                },
            },
            animation: {
                shake: 'shake 0.3s ease-in-out',
                zoomIn: 'zoomIn 0.3s ease-in-out',
                slideUp: 'slideUp 0.3s ease-in-out',
            },
        },
        fontFamily: {
            sans: ['Open Sans', 'sans-serif'],
        },
    },
    plugins: [],
};

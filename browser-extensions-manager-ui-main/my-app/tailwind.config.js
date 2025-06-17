/** @type {import('tailwindcss').Config} */
export default {
  darkMode: false,
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        surface: 'rgb(var(--surface) / <alpha-value>)',
        'surface-variant': 'rgb(var(--surface-variant) / <alpha-value>)',
        foreground: 'rgb(var(--foreground) / <alpha-value>)',
        'inverse-foreground': 'rgb(var(--inverse-foreground) / <alpha-value>)',
        primary: 'rgb(var(--primary) / <alpha-value>)',
        'primary-hover': 'rgb(var(--primary-hover) / <alpha-value>)',
        secondary: 'rgb(var(--secondary) / <alpha-value>)',
        'secondary-hover': 'rgb(var(--secondary-hover) / <alpha-value>)',
        // accent: 'rgb(var(--accent) / <alpha-value>)',
        // neutral: 'rgb(var(--neutral) / <alpha-value>)',
      }
    },
  },
  plugins: [],
}


import type { Config } from 'tailwindcss';

export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          50: '#f6f7f9',
          100: '#eaeef3',
          200: '#cfd9e7',
          300: '#a6bad4',
          400: '#7892bd',
          500: '#5873a4',
          600: '#445a85',
          700: '#37486b',
          800: '#313f5c',
          900: '#2b364e',
          950: '#121726'
        }
      },
      fontFamily: {
        display: ['ui-sans-serif', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'monospace']
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(120,146,189,0.25), 0 6px 30px rgba(18,23,38,0.45)'
      }
    }
  },
  plugins: []
} satisfies Config;

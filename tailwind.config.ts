import type {Config} from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#1D1D1B',
        petroleum: '#183C3C',
        paper: '#F7F3EC',
        linen: '#E8DDCB',
        sand: '#D7C5A3',
        copper: '#B98B5A'
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'Inter', 'Arial', 'sans-serif']
      },
      boxShadow: {
        soft: '0 22px 60px rgba(29, 29, 27, 0.10)'
      }
    }
  },
  plugins: []
};

export default config;

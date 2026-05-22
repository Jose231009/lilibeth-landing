import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './hooks/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg:          '#0a0a0a',
        surface:     '#111111',
        accent:      '#C9A96E',
        'accent-dim':'rgba(201,169,110,0.15)',
        gold: {
          100: '#F5E6C8',
          300: '#E0C080',
          500: '#C9A96E',
          700: '#A07840',
          900: '#6B4F22',
        },
      },
      fontFamily: {
        serif:  ['var(--font-instrument)', 'Georgia', 'serif'],
        sans:   ['var(--font-outfit)',     'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow:    '0 0 30px rgba(201,169,110,0.25)',
        'glow-lg':'0 0 60px rgba(201,169,110,0.18), 0 0 120px rgba(201,169,110,0.08)',
        card:    '0 8px 32px rgba(0,0,0,0.5)',
      },
      backdropBlur: {
        xs: '4px',
      },
      animation: {
        'marquee':       'marquee 28s linear infinite',
        'marquee2':      'marquee2 28s linear infinite',
        'dot-pulse':     'dot-pulse 1.2s ease infinite',
        'border-spin':   'border-spin 4s linear infinite',
        'float':         'float 6s ease-in-out infinite',
        'pulse-dot':     'pulse-dot 2s cubic-bezier(0.4,0,0.6,1) infinite',
      },
      keyframes: {
        marquee:  { '0%': { transform: 'translateX(0%)' }, '100%': { transform: 'translateX(-50%)' } },
        marquee2: { '0%': { transform: 'translateX(-50%)' }, '100%': { transform: 'translateX(0%)' } },
        'dot-pulse': {
          '0%, 80%, 100%': { transform: 'scale(0.6)', opacity: '0.4' },
          '40%':           { transform: 'scale(1.0)', opacity: '1.0' },
        },
        'border-spin': { to: { '--angle': '360deg' } },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-12px)' },
        },
        'pulse-dot': {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0.4' },
        },
      },
    },
  },
  plugins: [],
};

export default config;

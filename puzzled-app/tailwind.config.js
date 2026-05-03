/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'pure-white': '#ffffff',
        'pearl': '#f7f7f3',
        'beige': '#f0f0ec',
        'washed-black': '#1a1a1a',
        'ink-black': '#000000',
        'dim-grey': '#6d6868',
        'concrete': '#d4d4d0',
        'silver-mist': '#b3b3b3',
        'energy-gold': '#ffba09',
        'deep-amber': '#d48f00',
        'coral-red': '#ff4d4d',
        'valid-green': '#00c454',
      },
      fontFamily: {
        display: ['Fraunces', 'Playfair Display', 'Georgia', 'serif'],
        ui: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'input': '8px',
        'card': '24px',
        'button': '999px',
        'tag': '9999px',
        'logo': '16px',
      },
      boxShadow: {
        'card': 'rgba(0,0,0,0.06) 0px 0px 0px 1px inset',
        'nav': 'rgba(0,0,0,0.04) 0px 0px 0px 1px',
        'drawer': 'rgba(0,0,0,0.12) -4px 0px 24px 0px',
        'elevated': 'rgba(0,0,0,0.08) 0px 4px 16px 0px',
      },
      keyframes: {
        snapIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0.7' },
          '60%': { transform: 'scale(1.02)', opacity: '1' },
          '100%': { transform: 'scale(1.0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
      animation: {
        'snap-in': 'snapIn 300ms cubic-bezier(0.19,1,0.22,1) forwards',
        'fade-in': 'fadeIn 150ms ease forwards',
        'slide-in-right': 'slideInRight 250ms ease-out forwards',
      },
    },
  },
  plugins: [],
}


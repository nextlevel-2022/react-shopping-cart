module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      container: {
        center: true,
        padding: '1rem',
        screens: {
          sm: '100%',
          md: '100%',
          lg: '1024px',
          xl: '1280px',
        },
      },
      colors: {
        white: '#FFFFFF',
        black: {
          100: '#AAAAAA',
          200: '#333333',
          300: '#000000',
        },
        gray: {
          100: '#F6F6F6',
          200: '#EEEEEE',
        },
        primary: {
          100: '#94E0DD',
          200: '#2AC1BC',
        },
        brown: {
          100: '#73675C',
        },
      },
    },
  },
  plugins: [require('tailwindcss-debug-screens')],
};

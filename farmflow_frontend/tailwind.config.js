/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',    // Default padding (for small screens)
          sm: '2rem',         // Padding for small screens (sm breakpoint)
          lg: '4rem',         // Padding for large screens (lg breakpoint)
          xl: '5rem',         // Padding for extra large screens (xl breakpoint)
          '2xl': '6rem',      // Padding for 2x extra large screens (2xl breakpoint)
        },
      },
      colors: {
        // Custom green color
        green: {
          600: '#16a34a',  // A deeper shade of green for highlighting active state
        },
        gray: {
          600: '#4b5563',  // A darker shade of gray for text
        },
      },
    },
  },
  plugins: [
    // Tailwind CSS plugins for typography and forms (optional)
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
}

// tailwind.config.js
import lineClamp from '@tailwindcss/line-clamp'
import daisyui from 'daisyui'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [lineClamp, daisyui],
  daisyui: {
    themes: ["dark"], // 👈 force dark mode only
  },
}

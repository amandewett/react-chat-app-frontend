/** @type {import('tailwindcss').Config} */
import defaultTheme from "tailwindcss/defaultTheme";

export default {
  content: ["index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        appColorWhiteSmoke: "#F5F5F5",
        appColorDimBlack: "#252525",
        appColorPrimary: "#0A66C2",
      },
      fontFamily: {},
      screens: {
        phone: { min: "350px", max: "639px" },
        // => @media (min-width: 350px and max-width: 639px) { ... }

        tablet: { min: "640px", max: "767px" },
        // => @media (min-width: 640px and max-width: 767px) { ... }

        laptop: { min: "768px", max: "1023px" },
        // => @media (min-width: 768px and max-width: 1023px) { ... }

        lgMonitor: { min: "1024px", max: "1279px" },
        // => @media (min-width: 1024px and max-width: 1279px) { ... }

        xlMonitor: { min: "1280px", max: "1535px" },
        // => @media (min-width: 1280px and max-width: 1535px) { ... }

        xxlMonitor: { min: "1536px" },
        // => @media (min-width: 1536px) { ... }
        ...defaultTheme.screens,
      },
    },
  },
  plugins: [],
};

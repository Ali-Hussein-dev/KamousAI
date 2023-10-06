import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      typography: (_theme: unknown) => ({
        DEFAULT: {
          css: {
            color: "",
            h1: {
              color: "",
            },
            h2: {
              color: "",
            },
            h3: {
              color: "",
            },
            h4: {
              color: "",
            },
            h5: {
              color: "",
            },
            h6: {
              color: "",
            },
            strong: {
              color: "",
            },
          },
        },
      }),
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      colors: {
        primary: {
          50: "#eef3ff",
          100: "#dee2f2",
          200: "#bdc2de",
          300: "#98a0ca",
          400: "#7a84ba",
          500: "#6672b0",
          600: "#5c68ac",
          700: "#4c5897",
          800: "#424e88",
          900: "#364379",
        }
      }
    },
  },
  plugins: [
    require("tailwind-custom-utilities"),
    require("@tailwindcss/typography"),
  ],
  corePlugins: {
    preflight: false,
  },
} satisfies Config;

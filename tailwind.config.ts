import type { Config } from "tailwindcss"

const config = {
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
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
        },
        theme: {
          primary: "#5c68ac", // primary-600
          secondary: "#BFB173", // light-amber
          accent: "#BFAA40", // amber
          base: "#424e88", // slate-800
          light: "#4c5897", // primary-700
          dark: "#364379", // primary-900
          destructive: "hsl(10, 100%, 40%)",
          success: "#48bb78",
        }
      },

      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    require("tailwind-custom-utilities"),
    require("@tailwindcss/typography"),
    require("tailwindcss-animate")],
  corePlugins: {
    preflight: false,
  },
} satisfies Config

export default config
import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
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
    },
  },
  plugins: [
    require("tailwind-custom-utilities"),
    require("@tailwindcss/typography"),
  ],
  corePlugins: {
    preflight: false,
  }
} satisfies Config;

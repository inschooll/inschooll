import { type Config } from "tailwindcss";

export default {
  content: [
    "./src/**/*.tsx",
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  // theme: {
  //   extend: {
  //     fontFamily: {
  //       sans: ["var(--font-sans)", ...fontFamily.sans],
  //     },
  //   },
  // },
  theme: {
    extend: {
      colors: {
        // custom colors
        cc: {
          primary: {
            main: "rgb(var(--color-primary) / <alpha-value>)",
            sub: "rgb(var(--color-primary-deep) / <alpha-value>)",
          },
          background: {
            main: "rgb(var(--color-bkg) / <alpha-value>)",
            sub: "rgb(var(--color-bkg-sub) / <alpha-value>)",
          },
          content: {
            main: "rgb(var(--color-content-main) / <alpha-value>)",
            sub: "rgb(var(--color-content-sub) / <alpha-value>)",
          },
          border: {
            main: "rgb(var(--color-border) / <alpha-value>)",
          },
          input: {
            text: "rgb(var(--color-input-text) / <alpha-value>)",
            bg: "rgb(var(--color-input-bg) / <alpha-value>)",
          },
        }
      }
    },
  },
  plugins: [],
} satisfies Config;

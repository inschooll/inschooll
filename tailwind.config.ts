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
      gridTemplateColumns: {
        '16': 'repeat(16, minmax(0, 1fr))',
      },
      colors: {
        // custom colors
        cc: {
          primary: {
            DEFAULT: "rgb(var(--color-primary) / <alpha-value>)",
            main: "rgb(var(--color-primary) / <alpha-value>)",
            sub: "rgb(var(--color-primary-deep) / <alpha-value>)",
          },
          red: {
            main: "rgb(var(--color-red) / <alpha-value>)",
          },
          green: {
            main: "rgb(var(--color-green) / <alpha-value>)",
          },
          background: {
            main: "rgb(var(--color-bkg) / <alpha-value>)",
            sub: "rgb(var(--color-bkg-compliment) / <alpha-value>)",
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
          sidebar: {
            bg: {
              DEFAULT: "rgb(var(--color-sidebar-selected-bg) / <alpha-value>)",
              hover: "rgb(var(--color-sidebar-selected-bg-hover) / <alpha-value>)"
            }
          }
        }
      }
    },
  },
  plugins: [],
} satisfies Config;

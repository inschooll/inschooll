import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
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
            DEFAULT: "rgb(var(--color-red) / <alpha-value>)",
          },
          green: {
            DEFAULT: "rgb(var(--color-green) / <alpha-value>)",
          },
          background: {
            DEFAULT: "rgb(var(--color-bkg) / <alpha-value>)",
            main: "rgb(var(--color-bkg) / <alpha-value>)",
            sub: "rgb(var(--color-bkg-compliment) / <alpha-value>)",
          },
          content: {
            DEFAULT: "rgb(var(--color-content-main) / <alpha-value>)",
            main: "rgb(var(--color-content-main) / <alpha-value>)",
            sub: "rgb(var(--color-content-sub) / <alpha-value>)",
          },
          border: {
            DEFAULT: "rgb(var(--color-border) / <alpha-value>)",
            main: "rgb(var(--color-border) / <alpha-value>)",
          },
          input: {
            DEFAULT: "rgb(var(--color-input-text) / <alpha-value>)",
            text: "rgb(var(--color-input-text) / <alpha-value>)",
            bg: "rgb(var(--color-input-bg) / <alpha-value>)",
          },
          sidebar: {
            bg: {
              DEFAULT: "rgb(var(--color-sidebar-selected-bg) / <alpha-value>)",
              hover: "rgb(var(--color-sidebar-selected-bg-hover) / <alpha-value>)"
            }
          }
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "rgb(var(--primary) / <alpha-value>)",
          foreground: "rgb(var(--primary-foreground) / <alpha-value>)",
          hover: "rgb(var(--primary-hover) / <alpha-value>)",
          stroke: {
            DEFAULT:  "rgb(var(--primary-stroke) / <alpha-value>)",
            hover: "rgb(var(--primary-stroke-hover) / <alpha-value>)",
          }
        },
        secondary: {
          DEFAULT: "rgb(var(--secondary) / <alpha-value>)",
          foreground: "rgb(var(--secondary-foreground) / <alpha-value>)",
          hover: "rgb(var(--secondary-hover) / <alpha-value>)",
          stroke: {
            DEFAULT:  "rgb(var(--secondary-stroke) / <alpha-value>)",
            hover: "rgb(var(--secondary-stroke-hover) / <alpha-value>)",
          }
        },
        tertiary: {
          DEFAULT: "rgb(var(--tertiary) / <alpha-value>)",
          foreground: "rgb(var(--tertiary-foreground) / <alpha-value>)",
          hover: "rgb(var(--tertiary-hover) / <alpha-value>)",
          stroke: {
            DEFAULT:  "rgb(var(--tertiary-stroke) / <alpha-value>)",
            hover: "rgb(var(--tertiary-stroke-hover) / <alpha-value>)",
          }
        },
        destructive: {
          DEFAULT: "rgb(var(--destructive) / <alpha-value>)",
          foreground: {
            DEFAULT: "rgb(var(--destructive-foreground) / <alpha-value>)",
            hover: "rgb(var(--destructive-foreground-hover) / <alpha-value>)",
          },
          hover: "rgb(var(--destructive-hover) / <alpha-value>)",
          stroke: {
            DEFAULT:  "rgb(var(--destructive-stroke) / <alpha-value>)",
            hover: "rgb(var(--destructive-stroke-hover) / <alpha-value>)",
          }
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
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
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config